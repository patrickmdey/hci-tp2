<template>
  <div class="lg">
    <v-card width="720" class="mx-auto my-5">
      <v-toolbar color="secondary" flat class="font-weight-bold text--black text-h6">
        <v-row>
          <v-col cols="4">
            <v-toolbar-title class="font-weight-bold text--black text-h6 my-auto">{{ extern_name }}</v-toolbar-title>
          </v-col>
          <v-spacer></v-spacer>
          <v-btn text right fab large class="my-auto" @click="removeRoutine()">
            <v-icon @click="deleteRoutine">mdi-delete</v-icon>
          </v-btn>
        </v-row>
      </v-toolbar>

      <v-row>
        <v-col cols="7" class="mt-n6">
          <v-list>
            <v-subheader class="grey lighten-2 font-weight-medium black--text">Ejercitación principal</v-subheader>
          </v-list>
          <v-list v-for="exercise in store" :key="exercise.id">
            <v-list-item dense>
              <v-row>
                <v-col cols="5">{{ exercise.name }}</v-col>
                <v-spacer></v-spacer>
                <v-col cols="4">{{ exercise.time }} segundos</v-col>
              </v-row>
            </v-list-item>
            <v-divider></v-divider>
            <v-divider></v-divider>
          </v-list>

        </v-col>
        <v-divider vertical class="ml-n3"></v-divider>
        <v-col cols="5">
          <v-container class="my-auto mx-auto">
            <v-card-text class="text-body-1 text-center mt-n3" icon="mdi-schedule">Tiempo estimado: {{ time }} minutos
            </v-card-text>
            <v-chip-group>
              <v-row justify="center">
                <v-chip> {{ extern_category }}</v-chip>
                <v-chip>{{ getDifficulty() }}</v-chip>
              </v-row>
            </v-chip-group>

            <v-btn class="mt-5" block color="primary" to="/create-routine">Ver rutina completa</v-btn>
            <h1 class="subtitle-1 mt-3 text-center">Creada por {{ extern_creator.toUpperCase() }}</h1>
          </v-container>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
import CategoryStore from "@/store/CategoryStore";
import CycleStore from "@/store/CycleStore";
import RoutineStore from "@/store/RoutineStore";

export default {
  name: "Routine",

  props: {
    extern_name: {
      type: String,
      default: ''
    },

    extern_difficulty: {
      type: String,
    },

    extern_routine_id: {
      type: Number,
    },
    extern_cycle_id: {
      type: Number,
    },

    extern_creator: {
      type: String
    },

    extern_category: {
      type: String,
    }
  },

  data() {
    return {
      name: '',
      time: 0,
      creator: '',
      store: null,

    }
  },


  methods: {

    setStore(){
      this.store = CycleStore.getCycleExercises(this.extern_routine_id, this.extern_cycle_id, 2);
    },

    async getCategory() {
      return await CategoryStore.getCategory(this.extern_category).name;
    },

    async deleteRoutine() {
      await RoutineStore.deleteRoutine(this.extern_routine_id);
      await RoutineStore.getMyRoutines();
    },

    alwaysTrue(){
      this.setStore();
      return true;
    },

    getDifficulty() {
      if (this.extern_difficulty === "beginner")
        return "Fácil";
      if (this.extern_difficulty === "intermediate")
        return "Medio";
      if (this.extern_difficulty === "advanced")
        return "Dificil";
    }

  }

}
</script>

<style scoped>

</style>