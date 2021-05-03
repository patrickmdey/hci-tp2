<template>
  <div class="lg">
    <v-container class="my-4">
      <v-card width="720" class="mx-auto">
        <v-toolbar color="grey lighten-3" flat height="60">
          <v-row>
            <v-toolbar-title class="font-weight-bold text--black text-h6">{{ name[cycleType] }}</v-toolbar-title>
          </v-row>
        </v-toolbar>

        <v-row>
          <v-col cols="9" class="ml-2">

            <div v-if="size()===0">
              <p class="grey--text">Todavía no hay ejercicios agregados.</p>
            </div>

            <div v-else>

              <!-- RECORRO EJERCICIOS  -->
              <v-list v-for="exercise in store.exercises[cycleType]" :key="exercise.id">

                <v-list-item> {{ exercise.name }}
                  <v-row class="mt-n4" align="center">
                    <v-spacer></v-spacer>
                    <ExerciseCounter class="justify-center align-center" :exerciseID="exercise.id"
                                     :routineID="routineID" :cycleID="cycleID"
                    ></ExerciseCounter>
                    <p class="mb-n1 mr-2">segundos</p>
                    <v-btn icon color="black" @click="deleteExercise(exercise.id)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-row>
                </v-list-item>
                <v-divider></v-divider>
              </v-list>
            </div>
          </v-col>


          <v-divider vertical class="ml-n3"></v-divider>

          <v-row class="justify-center" justify="center">
            <v-col align-self="center">
              <CycleCounter :routineID="routineID" :cycleID="cycleID" class="align-center justify-center"
                            start_value="0"/>
              <p class="text-center my-2">Series</p>
            </v-col>
          </v-row>

        </v-row>
      </v-card>
    </v-container>
    <v-btn color="primary" class="mt-n3 ml-11" @click="addExerciseToCycle()">Agregar Ejercicio</v-btn>
    <ExercisesOverlay :routine_id="routineID" :cycle_id="cycleID" :cycle_type="cycleType"
                      :overlay="openOverlay" @closeOverlay="openOverlay=false"/>
  </div>
</template>

<script>
import ExerciseCounter from "@/components/Routine/ExerciseCounter";
import CycleCounter from "@/components/Routine/CycleCounter";
import ExercisesOverlay from "@/components/Exercises/ExercisesOverlay";
import CycleStore from "@/store/CycleStore";

export default {
  name: "CreateRoutinePart",
  props: {

    cycleType: {
      type: Number
    },

    routineID: {
      type: Number,
      default: null
    },

    cycleID: {
      type: Number,
      default: null
    }
  },
  components: {
    CycleCounter,
    ExerciseCounter,
    ExercisesOverlay,
  },


  data() {
    return {
      store: CycleStore,

      openOverlay: false,

      repetitions: 1,

      name: ["Calentamiento", "Ejercitación Principal", "Enfriamiento"],
    }
  },

  computed: {
    isEmpty() {
      return this.store.exercises[this.cycleType].length === 0;
    }
  },

  methods: {

    async addExerciseToCycle() {
      this.openOverlay = true
    },

    async size() {

      await CycleStore.getCycleExercises(this.routineID, this.cycleID, this.cycleType);

      return parseInt(await this.store.size(this.routineID, this.cycleID));
    },


    async deleteExercise(exercise_id) {
      await this.store.deleteExercise(this.routineID, this.cycleID, exercise_id);
      await CycleStore.getCycleExercises(this.routineID, this.cycleID, this.cycleType);

    },
  }
}
</script>

<style scoped>

</style>