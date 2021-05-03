<template>
  <div class="lg">
    <AppBar></AppBar>
    <h1 class="font-weight-black display-3 text-center my-8">MIS RUTINAS</h1>
    <h3 class="font-weight-bold text-center my-7">Aquí se encuentran todas las rutinas que creaste.
      Puedes inspeccionarlas, editarlas o borrarlas.</h3>
    <v-col cols="4" class="mx-auto">
      <v-divider class="mt-n4"></v-divider>
    </v-col>
    <RoutineList></RoutineList>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import RoutineList from "@/components/Routine/RoutineList";

export default {
  name: "MyRoutines",
  components: {RoutineList, AppBar}
}
</script>


<style scoped>

</style>