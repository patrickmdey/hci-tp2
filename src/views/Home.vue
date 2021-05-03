<template>
  <div class="lg">
    <AppBar></AppBar>

    <v-img src="@/assets/home.png">
      <div class="my-2">
        <div>
          <h1 class="font-weight-black ml-4 white--text" style=" font-size: 130px">Bienvenido a</h1>
          <h1 class="font-weight-black ml-13 white--text mt-n16" style="font-size: 130px">QuickFitness</h1>
        </div>

        <v-row class="my-10">
          <v-col cols="1"></v-col>
          <v-col cols="5" class="ml-5">
            <v-btn color="secondary black--text" x-large @click="goToCreateRoutine()">Crear Rutina</v-btn>
            <v-btn color="secondary black--text" class="mx-5" x-large to="/create-exercise">Crear Ejercicio</v-btn>
          </v-col>
        </v-row>
      </div>
      <h4 class="font-weight-black mt-6 ml-10 white--text align-baseline" style=" font-size: 35px">¡Creá ejercicios y rutinas a tu medida!</h4>
    </v-img>
  </div>
</template>
<script>
import AppBar from "@/components/AppBar";
import router from "@/router";
import RoutineStore from "@/store/RoutineStore";
import CycleStore from "@/store/CycleStore";
import ExerciseStore from "@/store/ExerciseStore";

export default {
  components: {AppBar},

  methods: {
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
    }
  }
}

</script>