<template>
  <div class="lg">
    <AppBar/>
      <h1 class="font-weight-black display-3 text-center my-8">
        CREAR EJERCICIO</h1>
      <h3 class="font-weight-bold text-center my-7">Creá ejercicios a tu gusto eligiendo el nombre, la dificultad, las
        categorías y su descripción.</h3>
      <v-col cols="4" class="mx-auto">
        <v-divider class="mt-n4"></v-divider>
      </v-col>
      <Exercise></Exercise>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import Exercise from "@/components/Exercises/Exercise";

export default {
  name: "CreateExercise",
  components: {Exercise, AppBar},
}
</script>

<style scoped>

</style>