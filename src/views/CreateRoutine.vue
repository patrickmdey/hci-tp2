<template>
  <div class="lg">
    <AppBar/>
    <h1 class="font-weight-black display-3 text-center my-8">CREAR RUTINA</h1>
    <h3 class="font-weight-bold text-center my-7">Creá o editá rutinas a tu gusto
      eligiendo el nombre, los ejercicios,
      la dificultad y las categorías.</h3>
    <v-col cols="4" class="mx-auto">
      <v-divider class="mt-n4"></v-divider>
    </v-col>
    <CreateRoutineCard></CreateRoutineCard>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import CreateRoutineCard from "@/components/Routine/CreateRoutineCard";
import UserStore from "@/store/UserStore";

export default {
  name: "CreateRoutine",
  components: {CreateRoutineCard, AppBar},
  data() {
    return {
      profile: UserStore,
      title: '',
    }
  }
}
</script>

<style scoped>

</style>