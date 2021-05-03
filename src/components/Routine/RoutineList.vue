<template>
  <div>
    <div v-if="isEmpty">
      <h2 class="grey--text text-center">Todavía no creaste tus propias rutinas.<br>Puedes hacerlo clickeando en
        el botón:</h2>
      <v-row>
        <v-btn color="primary" @click="goToCreateRoutine()" class="mx-auto my-15" x-large>CREAR RUTINA</v-btn>
      </v-row>
    </div>

    <div v-else>
      <div v-for="routine in store.routines" :key="routine.id">
        <Routine v-if="alwaysTrue(routine.id)" :extern_name="routine.name" :extern_category="routine.category.name"
                 :extern_difficulty="routine.difficulty" :extern_routine_id="routine.id" :extern_creator="routine.creator.username" :extern_cycle_id="current_cycle"/>
      </div>
    </div>
  </div>

</template>

<script>
import RoutineStore from "@/store/RoutineStore";
import Routine from "@/components/Routine/Routine";
import CycleStore from "@/store/CycleStore";
import router from "@/router";
import ExerciseStore from "@/store/ExerciseStore";

export default {
  name: "RoutineList",
  components: {Routine},
  data() {
    return {
      store: RoutineStore,

      current_cycle: RoutineStore.currentMainCycleID,
    }
  },

  computed:{
    isEmpty(){
      return RoutineStore.routines.length === 0;
    }
  },

  methods: {

    async goToCreateRoutine() {

      let routine_id;

      if (CycleStore.currentRoutineID === null) {
        routine_id = await RoutineStore.createRoutine();
        CycleStore.setCurrentRoutine(routine_id);
      }

      await ExerciseStore.getMyExercises();
      await router.replace("/create-routine");
    },

    async size(){
      return parseInt(await RoutineStore.size());
    },

    async alwaysTrue(routine_id){
      await this.getMainCycleID(routine_id);
      return true
    },

    async getMainCycleID(routine_id) {
      this.current_cycle =  await CycleStore.getRoutineMainCycleID(routine_id);
      return this.current_cycle;
    }
  },

}
</script>

<style scoped>

</style>