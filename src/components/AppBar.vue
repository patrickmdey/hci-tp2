<template>
  <v-app-bar
      app
      color="accent"
      height="85"
      class="lg">

    <v-col cols="2">
      <v-tab to="/home" class="ml-n10">
        <v-img src="@/assets/logoCompleto.png" max-width="200" max-height="200" class="justify-center my-3"></v-img>
      </v-tab>
    </v-col>

    <v-col cols="6">
      <v-form>
        <v-text-field label="Buscar" solo append-icon='mdi-magnify' class="mt-7 mr-2"></v-text-field>
      </v-form>
    </v-col>

    <v-tabs fixed-tabs centered>
      <v-tabs-slider color="secondary"></v-tabs-slider>
      <v-menu offset-y tile open-on-hover close-delay="3">
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> Rutinas
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical>
          <v-tab @click="goToMyRoutines()">Mis Rutinas</v-tab>
          <v-tab @click="goToCreateRoutine()">Crear rutina</v-tab>

        </v-tabs>
      </v-menu>

      <v-menu offset-y tile open-on-hover close-delay="3">
        <template v-slot:activator="{ on, attrs }">
          <v-tab v-bind="attrs" v-on="on" class="white--text text-center"> Ejercicios
            <v-icon color="white">mdi-chevron-down</v-icon>
          </v-tab>
        </template>
        <v-tabs vertical>
          <v-tab @click="goToMyExercises()">Mis Ejercicios</v-tab>
          <v-tab to="/create-exercise">Crear ejercicio</v-tab>
        </v-tabs>
      </v-menu>

      <v-tab class="white--text text-center" to="/profile">Perfil</v-tab>
    </v-tabs>
  </v-app-bar>
</template>

<script>

import ExerciseStore from "@/store/ExerciseStore";
import router from "@/router";
import RoutineStore from "@/store/RoutineStore";
import CycleStore from "@/store/CycleStore";

export default {
  name: "AppBar",
  data() {
    return {
      routineItems: [
        {title: 'Mis Rutinas', path: '/my-workouts'},
        {title: 'Crear Rutina', path: '/create-routine'},
      ],
      exerciseItems: [
        {title: 'Mis Ejercicios', path: '/my-exercises',},
        {title: 'Crear Ejercicio', path: '/create-exercise'},
      ],
    }
  },
  methods: {
    async goToMyExercises() {
      await ExerciseStore.getMyExercises();
      await router.replace("/my-exercises");
    },

    async goToCreateRoutine() {

      let routine_id;

      if (CycleStore.currentRoutineID === null) {
        routine_id = await RoutineStore.createRoutine();
        CycleStore.setCurrentRoutine(routine_id);
      }

      await ExerciseStore.getMyExercises();

      for(let i = 0; i<3; i++)
        CycleStore.exercises[i] = [];

      await router.replace("/create-routine");
    },

    async goToMyRoutines(){
      try {
        await RoutineStore.getMyRoutines();
        await router.replace("/my-routines");
      }catch(error){
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>