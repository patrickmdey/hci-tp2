<template>
  <div>
    <v-card
        class="mx-auto primary white--text"
        width="300"
    >
      <v-img v-if="alwaysTrue()" :src="url_src" height="200px"></v-img>


      <v-row>
        <v-col cols="7" class="align-content-center">
          <v-card-title>
            {{ extern_name }}
          </v-card-title>

        </v-col>

        <v-card-actions class="align-content-center justify-end">
          <v-icon @click="show = !show" color="white">{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-card-actions>

        <v-card-actions class="align-content-center justify-end">
          <v-icon color="white"  @click="goToEditExercise()">mdi-pencil</v-icon>
        </v-card-actions>

        <v-card-actions class="align-content-center justify-end">
          <v-icon color="white" @click="deleteExercise()">mdi-delete</v-icon>
        </v-card-actions>


      </v-row>

      <v-expand-transition mode="in-out">
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text class="white black--text">
            {{ extern_description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </div>
</template>

<script>
import ImagesStore from "@/store/ImageStore";
import ExerciseStore from "@/store/ExerciseStore";
import router from "@/router";

export default {
  name: "MyExerciseCard",

  props: {
    extern_name: {
      type: String,
      default: ''
    },

    extern_description: {
      type: String,
      default: ''
    },

    extern_exercise_id: {
      type: Number,
      default: null
    },


  },
  data() {
    return {
      type: Boolean,
      show: false,
      url_src: '',
    }
  },

  methods: {
    async setImage() {
      let result = await ImagesStore.getExerciseImage(this.extern_exercise_id);
      if (result.totalCount !== 0) {
        this.url_src = result.results[0].url;
      }
    },

    alwaysTrue() {
      this.setImage();
      return true;
    },

    goToEditExercise() {
      ExerciseStore.editID = this.extern_exercise_id;
      ExerciseStore.updateToEditExercise();
      router.replace("/edit-exercise");
    },

    async deleteExercise() {
      await ExerciseStore.deleteExercise(this.extern_exercise_id);
      await ExerciseStore.getMyExercises();
    }
  }
}
</script>

<style scoped>

</style>