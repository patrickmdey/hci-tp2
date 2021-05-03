<template>
  <div class="lg">
    <v-row class="align-center justify-center my-n3">
      <v-col cols="3">
        <h3 class="text-right mt-n7">Nombre del ejercicio:</h3>
      </v-col>

      <v-col cols="4" class="justify-center">
        <v-form v-model="valid">
          <v-text-field solo label="Ejercicio" id="name_input"
                        :rules="nameRules"
                        required></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="3">
        <v-btn large class="mt-n8" color="primary" @click="setName()">Confirmar</v-btn>
      </v-col>
    </v-row>

    <v-card class="mx-auto white mt-2 mb-6" width="980">
      <v-toolbar flat color="secondary" height="75">
        <v-toolbar-title class="font-weight-bold text--black text-h6">Nombre del ejercicio:</v-toolbar-title>
        <v-toolbar-title class="font-weight-black text--black text-h5 ml-3">{{ name.toUpperCase() }}</v-toolbar-title>
      </v-toolbar>

      <v-row>
        <v-col cols="6">
          <v-list class="mx-auto">
            <v-list-item>
              <v-col cols="1"></v-col>
              <v-col cols="6">
                <header class="headline ml-n4">Link de la imágen:</header>
              </v-col>
            </v-list-item>

            <v-list-item class="mb-n6">
              <v-row class="ml-8 my-n2">
                <v-col cols="1"></v-col>
                <v-col cols="8">
                  <v-text-field label="Ingrese el link de la imagen" id="url_id">{{name}}</v-text-field>
                </v-col>
                <v-btn fab color="primary" class="mt-4" small @click="insertPic()">
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </v-row>
            </v-list-item>

            <div v-if="hasPic">
              <v-list-item>
                <v-img :src="url" class="ml-7"
                       height="250"
                       width="400"/>
              </v-list-item>
            </div>
            <div v-else>
              <v-list-item>
                <v-card color="grey lighten-3"
                        class="ml-7 mt-6"
                        height="280"
                        width="400">
                  <h3 class="grey--text text--darken-1 font-weight-medium text-center align-content-center py-14 my-16">
                    Vacío</h3>
                </v-card>
              </v-list-item>

              <v-list-item class="mt-4">
                <v-row justify="center">
                  <p v-if="emptyImageError" class="red--text" style="font-size: 19px">Por favor ingrese la url de la
                    imagen.</p>
                </v-row>
              </v-list-item>
            </div>


          </v-list>
        </v-col>

        <v-col cols="6">
          <v-list class="mx-2">

            <v-list-item class>
              <header class="headline ml-n4">Dificultad:</header>
            </v-list-item>

            <v-list-item>
              <v-chip-group mandatory color="primary" class="ml-n3">
                <v-chip @click="setDifficulty(3)">Difícil</v-chip>
                <v-chip @click="setDifficulty(2)">Medio</v-chip>
                <v-chip @click="setDifficulty(1)">Fácil</v-chip>
              </v-chip-group>
            </v-list-item>

            <v-list-item>
              <v-row class="mt-4">
                <header class="headline">Tiempo:</header>
                <DefaultCounter :start-time="15" :addValue="5"></DefaultCounter>
                <p class="mt-2">Segundos</p>
              </v-row>
            </v-list-item>


            <v-list-item>
              <header class="headline ml-n4">Descripción:</header>
            </v-list-item>

            <v-list-item>
              <v-textarea class="ml-n3" solo auto-grow background-color="grey lighten-3" label="Ingresar descripción"
                          v-model="description">{{description}}
              </v-textarea>
            </v-list-item>

            <v-list-item class="mt-5">
              <v-col cols="12">
                <v-row>
                  <div class="mx-auto">
                    <v-btn color="primary" class="mx-5" x-large @click="addExercise()">Guardar</v-btn>
                    <v-btn color="primary" class="mx-5" x-large @click="cancelExercise()">Cancelar</v-btn>
                    <p v-if="emptyNameError" class="red--text mb-0 pb-0 mt-2" style="font-size: 19px">Por favor ingrese o confirme
                      el nombre para el ejercicio.</p>
                  </div>
                </v-row>
              </v-col>
            </v-list-item>

          </v-list>
        </v-col>
      </v-row>

    </v-card>
  </div>
</template>

<script>
import ExerciseStore from "@/store/ExerciseStore";
import index from "@/router/index";
import ImagesStore from "@/store/ImageStore";
import DefaultCounter from "@/components/Routine/DefaultCounter";

export default {
  name: "EditExerciseCard",
  components: {DefaultCounter},

  data() {
    return {
      name: ExerciseStore.toEditExercise.name,
      store: ExerciseStore,
      picStore: ImagesStore,
      url: '',
      difficulty: ExerciseStore.toEditExercise.difficulty,
      time: ExerciseStore.toEditExercise.time,
      description: ExerciseStore.toEditExercise.detail,
      router: index,
      id: ExerciseStore.toEditExercise.id,

      valid: false,
      nameRules: [
        v => !!v || 'Se requiere un nombre.',
      ],

      emptyNameError: false,
      emptyImageError: false,
      exerciseCreatedFlag: true,
    }
  },

  computed:{
    hasPic() {
      return this.url !== '';
    },
  },
  methods: {

    setName() {
      let input = document.querySelector('#name_input');
      this.name = input.value;
    },

    async addExercise() {
      if (this.name.length === 0) {
        this.emptyNameError = true;
      }
      else if(this.exerciseCreatedFlag === true){
        await this.store.updateExercise(this.id, this.name, this.description, this.time, this.difficulty);
        this.store.editID = null;
        await this.store.getMyExercises();
        this.exerciseCreatedFlag = false;

        await this.router.replace("/my-exercises");
      }
      else {
        await this.store.createExercise(this.name, this.description, this.time, this.difficulty);
        await this.store.getMyExercises();
        this.exerciseCreatedFlag = false;
        await this.router.back();
      }
    },

    async cancelExercise() {
        this.router.back();
    },

    setDifficulty(difficulty) {
      this.difficulty = difficulty;
    },

    setTime(time) {
      this.time = time;
    },

    getTime() {
      return this.time;
    },

    async insertPic() {
      this.url = document.querySelector('#url_id').value;
      if(this.url.length === 0){
        this.emptyImageError = true;
      }
      else{
        this.id = await this.store.createExercise(this.name, this.description, this.time, this.difficulty);
        this.exerciseCreatedFlag = true;
        await this.picStore.createImage(this.url, this.id);
      }
    }
  },
}
</script>

<style scoped>

</style>