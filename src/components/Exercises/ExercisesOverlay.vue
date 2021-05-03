<template>
  <v-overlay :value="overlay" opacity="0.7">
    <v-card width="900" max-height="900" class="mx-auto my-10 overflow-x-auto" color="white black--text"
            v-scroll.self="onScroll">
      <v-row class="justify-center">
        <v-col cols="3"></v-col>
        <v-col cols="7">
          <v-card-title class="font-weight-black display-2"> ELEGIR EJERCICIO</v-card-title>
        </v-col>
        <v-col cols="1"></v-col>
        <v-col cols="1">
          <v-icon
              icon
              color="black"
              @click="closeOverlay()">mdi-close
          </v-icon>
        </v-col>
      </v-row>
      <h3 class="font-weight-bold text-center my-3">Agregá un ejercicio a tu rutina presionando el +.
        Puedes buscar por categorías o nombre.<br>También puedes crear un ejercicio a tu gusto.</h3>

      <v-col cols="8" class="mx-auto">
        <v-divider inset class="grey lighten-2"></v-divider>
      </v-col>

      <v-row justify="center">
          <v-btn class="mx-3" color="primary" x-large to="/create-exercise">Crear Ejercicio</v-btn>
      </v-row>


      <div>
        <div v-if="isEmpty" class="my-9">
          <h2 class="grey--text text-center">Todavía no creaste tus propios ejercicios.<br>Puedes hacerlo clickeando
            en el botón.</h2>
        </div>

        <div v-else>
          <v-col cols="12" class="mx-auto">
            <v-row class="align-center justify-center">
              <div v-for="exercise in store.exercises" :key="exercise.id">

                <v-card class="white black--text mx-6 my-2" width="260">

                  <v-toolbar color="primary" flat>
                    <v-toolbar-title>{{ exercise.name }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn fab color="secondary black--text" small @click="addExerciseToRoutine(exercise.id)">
                      <v-icon>mdi-plus</v-icon>
                    </v-btn>
                  </v-toolbar>

                  <v-card-text>
                    <p class="black--text" style="font-size: large" >Descripción:</p>
                    <template v-if="exercise.detail.length === 0">
                      <p class="grey--text text--2">No tiene descripción.</p>
                    </template>
                    <template v-else>
                      <p class="grey--text text--2">{{ exercise.detail }}</p>
                    </template>
                  </v-card-text>
                </v-card>
              </div>

            </v-row>
          </v-col>
        </div>
      </div>
    </v-card>
  </v-overlay>
</template>


<script>
import ExerciseStore from "@/store/ExerciseStore";
import {UserApi} from "@/api/user";
import {ExerciseApi} from "@/api/exercise";
import CycleStore from "@/store/CycleStore";

export default {
  name: "ExercisesOverlay",

  props: {
    overlay: {
      type: Boolean,
      default: false
    },

    routine_id: {
      type: Number,
      default: null,
    },

    cycle_id: {
      type: Number,
      default: null,
    },

    cycle_type: {
      type: Number,
      default: null,
    }

  },

  data() {
    return {
      absolute: true,

      show: false,
      store: ExerciseStore,
      scrollInvoked: 0,
    }
  },

  computed: {
    isEmpty() {
      return this.store.exercises.length === 0;
    }
  },

  methods: {

    async addExerciseToRoutine(exercise_id) {
      let exercise = await this.getExercise(exercise_id);

      await ExerciseStore.cloneExercise(exercise.name, exercise.detail, exercise.duration,
          exercise.repetitions, this.routine_id, this.cycle_id);


      await CycleStore.getCycleExercises(this.routine_id, this.cycle_id, this.cycle_type);
      this.closeOverlay();
    },

    closeOverlay() {
      this.$emit('closeOverlay');
    },

    async getAllExercises() {
      return await this.store.getMyExercises();
    },

    async size() {
      return parseInt(await this.store.size());
    },

    async getValuesID() {
      let user = await UserApi.getMyUser();
      return user.phone.split("/");
    },

    async getExercise(id) {
      try {
        let values = await this.getValuesID();
        let exercise = new ExerciseApi(values[0], values[1]);
        return await exercise.getExercise(id);
      } catch (error) {
        console.log(error);
      }
    },

    onScroll() {
      this.scrollInvoked++;
    },

  }
}
</script>

<style scoped>

</style>