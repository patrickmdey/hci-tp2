<template>
  <div class="lg">
    <div v-if="alwaysTrue()">
      <v-row>
        <v-col cols="1"></v-col>
        <v-col cols="4">
          <v-list class="mx-auto mt-n10">

            <v-list-item>
              <v-col cols="1"></v-col>
              <v-col cols="6">
                <header class="headline ml-n10">Foto de perfil:</header>
              </v-col>
            </v-list-item>

            <v-list-item v-if="hasPic">
              <v-img :src="picture" max-width="360" height="250" class="ml-n4 mb-5"/>
            </v-list-item>
            <v-list-item v-else>
              <v-card color="grey lighten-2" width="360" height="250" class="ml-n4 mb-5">
                <h3 class="grey--text text--darken-1 font-weight-medium text-center align-content-center py-16 my-10">
                  {{ initials }}</h3>

              </v-card>
            </v-list-item>

            <v-list-item class="mb-n6 ml-n4">
              <v-row class="my-n6">

                <v-col cols="8">
                  <v-text-field label="Ingrese el link de la imagen" v-model="picture" id="url_id"></v-text-field>
                </v-col>
                <v-btn color="primary" class="mt-6" @click="insertPic()">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
                <p v-if="emptyImageError" class="red--text ml-3">Por favor, asegurate de haber ingresado <br>un link
                  valido para la foto</p>
              </v-row>
            </v-list-item>

          </v-list>
        </v-col>

        <v-col cols="3">
          <v-list class="mt-2 ml-n15">
            <v-list-item>
              <v-row class="ml-1">
                <h3 class="font-weight-medium">Nombre:</h3>
                <h3 class="font-weight-light ml-2"> {{ name }}</h3>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row class="ml-1">
                <h3 class="font-weight-medium">Nombre de usuario: </h3>
                <h3 class="font-weight-light ml-2"> {{ username }}</h3>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row class="ml-1">
                <h3 class="font-weight-medium">Correo electrónico: </h3>
                <h3 class="font-weight-light ml-2"> {{ email }}</h3>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row class="ml-1">
                <h3 class="font-weight-medium">Cantidad de ejercicios creados:</h3>
                <h3 class="font-weight-light ml-2">{{ created_exercises }}</h3>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row class="ml-1">
                <h3 class="font-weight-medium">Cantidad de rutinas creadas: </h3>
                <h3 class="font-weight-light ml-2">{{created_routines}}</h3>
              </v-row>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="3">
          <v-list>
            <v-list-item>
              <v-btn class="my-5" color="primary" large @click="goToMyRoutines()">Mis Rutinas</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn class="my-5" color="primary" large @click="goToMyExercises()">Mis ejercicios</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn class="my-5" color="primary" large @click="closeSession()"> cerrar sesión</v-btn>
            </v-list-item>
          </v-list>
        </v-col>
        <v-col cols="1"></v-col>
      </v-row>

    </div>
  </div>
</template>

<script>
import {UserApi} from "@/api/user";
import router from "@/router";
import ExerciseStore from "@/store/ExerciseStore";
import UserStore from "@/store/UserStore";
import RoutineStore from "@/store/RoutineStore";

export default {
  name: "Profile",
  data() {
    return {
      username: 'undef',
      name: 'undef',
      email: 'undef',
      initials: '',
      picture: '',
      created_exercises: 'undef',
      created_routines: 'undef',
      password: '',

      emptyImageError: false
    }
  },

  computed: {
    hasPic() {
      return UserStore.pic !== '';
    },
  },

  methods: {
    async goToMyRoutines() {
      try {
        await RoutineStore.getMyRoutines();
        await router.replace("/my-routines");
      } catch (error) {
        console.log(error);
      }
    },

    async closeSession() {
      try {
        await UserApi.logout();
        await router.replace("/");
      } catch (error) {
        console.log(error);
      }
    },

    async goToMyExercises() {
      await ExerciseStore.getMyExercises();
      await router.replace("/my-exercises");
    },

    async setUserValues() {
      let user = await UserApi.getMyUser();

      this.username = user.username;
      this.name = user.fullName;
      this.email = user.email;
      this.created_exercises = await ExerciseStore.size();
      this.created_routines = await RoutineStore.size();
    },


    async alwaysTrue() {
      await this.setUserValues();
      return true;
    },

    async insertPic() {
      this.picture = document.querySelector('#url_id').value;
      if (this.picture.length === 0) {
        this.emptyImageError = true;
      } else {
        await UserStore.updateUser(this.name, this.picture);
        this.emptyImageError = false;
      }
    },
  }
}
</script>

<style scoped>

</style>