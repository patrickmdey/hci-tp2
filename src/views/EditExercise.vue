<template>
  <div class="lg">
    <AppBar/>
    <h1 class="font-weight-black display-3 text-center my-8">
      EDITAR EJERCICIO</h1>
    <h3 class="font-weight-bold text-center my-7">Editá ejercicios a tu gusto eligiendo el nombre, la dificultad, las
      categorías y su descripción.</h3>
    <v-col cols="4" class="mx-auto">
      <v-divider class="mt-n4"></v-divider>
    </v-col>
    <EditExerciseCard></EditExerciseCard>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import EditExerciseCard from "@/components/Exercises/EditExerciseCard";

export default {
  name: "EditExercise",
  components: {EditExerciseCard, AppBar},
}

</script>

<style scoped>

</style>