<template>
  <div class="lg">
    <AppBar></AppBar>
    <h1 class="font-weight-black display-3 text-center my-8">MIS EJERCICIOS</h1>
    <h3 class="font-weight-bold text-center my-7">Aquí se encuentran todos los ejercicios que creaste.
      Puedes inspeccionarlos, editarlos o borrarlos.</h3>
    <v-col cols="4" class="mx-auto">
      <v-divider class="mt-n4"></v-divider>
    </v-col>
    <MyExerciseCardList></MyExerciseCardList>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import MyExerciseCardList from "@/components/Exercises/MyExerciseCardList";

export default {
  name: "MyExercises",
  components: {MyExerciseCardList, AppBar}
}
</script>

<style scoped>

</style>