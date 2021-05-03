<template>
  <div class="lg">
    <v-row justify="center">
      <v-btn class="ml-6 mr-1 black--text" style="font-size:27px" icon @click="subTimes()">-</v-btn>
      <v-card outlined width="55" height="38">
        <v-card-text class="black--text text-center pl-0 pr-0 py-2 align-center justify-center" style="font-size:20px">
          {{ counter }}
        </v-card-text>
      </v-card>
      <v-btn class="ml-1 mr-6 black--text" style="font-size:25px" icon @click="addTimes()">+</v-btn>
    </v-row>
  </div>
</template>

<script>
import CycleStore from "@/store/CycleStore";

export default {
  name: "CycleCounter",

  props:{
    routineID: {type: Number},
    cycleID: {type: Number},
  },

  data() {
    return {
      counter: 1,
      add_value: 1,
    }
  },

  methods:{
    async addTimes() {
      this.counter += parseInt(this.add_value);
      let cycle = await CycleStore.getCycle(this.routineID, this.cycleID);
      await CycleStore.updateCycle(this.routineID, this.cycleID,cycle.name, cycle.detail,cycle.type, cycle.order, this.counter);
    },
    async subTimes() {
      if (this.counter >= this.add_value) {
        this.counter -= parseInt(this.add_value);
        let cycle = await CycleStore.getCycle(this.routineID, this.cycleID);
        await CycleStore.updateCycle(this.routineID, this.cycleID,cycle.name, cycle.detail,cycle.type, cycle.order, this.counter);
      }
    },
  }

}
</script>

<style scoped>

</style>