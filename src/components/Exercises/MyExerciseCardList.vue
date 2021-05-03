<template>
  <div>
    <div v-if="isEmpty" class="my-9">
      <h2 class="grey--text text-center">Todavía no creaste tus propios ejercicios.<br>Puedes hacerlo clickeando en
        el botón:</h2>
      <v-row>
        <v-btn color="primary" to="/create-exercise" class="mx-auto my-11" x-large>CREAR EJERCICIO</v-btn>
      </v-row>
    </div>

    <div v-else>
      <v-col cols="8" class="mx-auto">
        <v-row class="align-center justify-center">
          <div v-for="exercise in store.exercises" :key="exercise.id">
            <MyExerciseCard :extern_name="exercise.name" :extern_description="exercise.detail"
                            :extern_exercise_id="exercise.id"
                            class="mx-3 my-3"></MyExerciseCard>
          </div>

        </v-row>
      </v-col>
    </div>


  </div>
</template>

<script>
import MyExerciseCard from "@/components/Exercises/MyExerciseCard";
import ExerciseStore from "@/store/ExerciseStore";

export default {
  name: "MyExerciseCardList",
  components: {MyExerciseCard},

  data() {
    return {
      count: 0,
      store: ExerciseStore,
      url: 'https://cdn.vuetifyjs.com/images/parallax/material.jpg',
    }
  },

  computed:{
    isEmpty() {
      return this.store.exercises.length === 0;
    }
  },


  methods: {
    async size() {
      return parseInt(await this.store.size());
    },
  }
}
</script>

<style scoped>

</style>