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

export default {
  name: "DefaultCounter",

  props: {
    startTime: {type: Number},
    addValue: {type: Number},

  },

  data() {
    return {
      counter: this.startTime,
    }
  },

  methods: {
    addTimes() {
      this.counter += this.addValue;
    },

    subTimes() {
      if (this.counter >= this.addValue) {
        this.counter -= this.addValue;
      }
    }
  }
}
</script>

<style scoped>

</style>