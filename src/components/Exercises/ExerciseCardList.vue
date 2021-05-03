<template>
  <div>

    <div v-if="size()===0" class="my-9">
      <h2 class="grey--text text-center">Todavía no creaste tus propios ejercicios.<br>Puedes hacerlo clickeando en
        el botón.</h2>
      <v-row>
        <v-btn color="primary" to="/create-exercise" class="mx-auto my-11" x-large>CREAR EJERCICIO</v-btn>
      </v-row>
    </div>

    <div v-else>
      <v-col cols="12" class="mx-auto">
        <v-row class="align-center justify-center">
          <div v-for="exercise in store.exercises" :key="exercise.id">
            <ExerciseCard :extern_name="exercise.name" :extern_description="exercise.detail"
                            class="mx-3 my-3"></ExerciseCard>
          </div>

        </v-row>
      </v-col>
    </div>


  </div>
</template>

<script>
import ExerciseCard from "@/components/Exercises/ExerciseCard";
import ExerciseStore from "@/store/ExerciseStore";

export default {
  name: "ExerciseCardList",
  components: {ExerciseCard},

  data() {
    return {
      count: 0,
      store: ExerciseStore,
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