<template>
  <div class="lg">
    <v-row class="align-center justify-center my-n3">
      <v-col cols="3">
        <h3 class="text-right mt-n7">Nombre de la Rutina:</h3>
      </v-col>

      <v-col cols="4" class="justify-center">
        <v-form v-model="valid">
          <v-text-field solo label="Rutina" id="name_input"
                        :rules="nameRules"
                        required></v-text-field>
        </v-form>
      </v-col>

      <v-col cols="3">
        <v-btn large class="mt-n8" color="primary" @click="setName()">Confirmar</v-btn>
      </v-col>
    </v-row>

    <v-card width="1200" class="align-center mx-auto mb-10">
      <v-toolbar color="secondary" flat height="75">
        <v-toolbar-title class="font-weight-bold text--black text-h6">Nombre de la rutina:</v-toolbar-title>
        <v-toolbar-title class="font-weight-black text--black text-h5 ml-3">{{
            routine.name.toUpperCase()
          }}
        </v-toolbar-title>
      </v-toolbar>
      <v-row>


        <v-col cols="8">
          <!--calentamiento-->
          <CreateRoutinePart :cycleType="0" :routineID="routine.currentRoutineID" :cycleID="routine.warmup"/>
          <!--principal-->
          <CreateRoutinePart :cycleType="1" :routineID="routine.currentRoutineID" :cycleID="routine.exercise"/>
          <!--enfriamiento-->
          <CreateRoutinePart :cycleType="2" :routineID="routine.currentRoutineID" :cycleID="routine.cooldown"/>
        </v-col>


        <v-col cols="4">
          <v-list>
            <v-list-item class>
              <header class="headline ml-n4 mt-16">Dificultad:</header>
            </v-list-item>

            <v-list-item>
              <v-chip-group column mandatory color="primary" class="ml-n3">
                <v-chip @click="setDifficulty(3)">Difícil</v-chip>
                <v-chip @click="setDifficulty(2)">Medio</v-chip>
                <v-chip @click="setDifficulty(1)">Fácil</v-chip>
              </v-chip-group>
            </v-list-item>

            <v-list-item>
              <header class="headline ml-n4 mt-12">Categorías:</header>
            </v-list-item>

            <v-list-item>
              <v-row>
                <v-chip-group color="primary" v-for="category in categories" :key="category">
                  <v-chip @click="addCategory(category)">{{ category }}</v-chip>
                </v-chip-group>
              </v-row>

            </v-list-item>

            <v-list-item>
              <header class="headline ml-n4 mt-12">Descripción:</header>
            </v-list-item>

            <v-list-item>
              <v-textarea class="ml-n3 mt-2" solo auto-grow background-color="grey lighten-3"
                          label="Ingresar descripción"
                          v-model="routine.detail">
              </v-textarea>
            </v-list-item>


            <v-list-item class="my-12">
              <v-row justify="center">
                <v-btn color="primary" large class="mx-2" @click="saveRoutine()">Guardar</v-btn>
                <v-btn color="primary" large class="mx-2" @click="cancel()">Cancelar</v-btn>
              </v-row>
            </v-list-item>
            <v-list-item>
              <p v-if="emptyNameError" class="red--text ml-4 mt-n5" style="font-size: 19px">Por favor ingrese o
                confirme el nombre para la rutina.</p>
            </v-list-item>

            <v-list-item>
              <p v-if="emptyRoutineError" class="red--text ml-4" style="font-size: 19px">Se requiere al
                menos un ejercicio en cada
                sección para guardar la rutina.</p>
            </v-list-item>

          </v-list>
        </v-col>
      </v-row>
    </v-card>

  </div>
</template>

<script>
import CreateRoutinePart from "@/components/Routine/CreateRoutinePart";
import RoutineStore from "@/store/RoutineStore";
import CycleStore from "@/store/CycleStore";
import router from "@/router";

export default {
  name: "RoutineCard",
  data() {
    return {
      routine: {
        name: '',
        difficulty: 3,
        detail: '',
        currentRoutineID: CycleStore.currentRoutineID,

        category: {},

        warmup: RoutineStore.cycleIDArray[0],
        exercise: RoutineStore.cycleIDArray[1],
        cooldown: RoutineStore.cycleIDArray[2],
      },

      store: RoutineStore,
      openOverlay: false,

      categories: ['Abdominales', 'Brazos', 'Piernas', 'Cardio', 'Salud'],
      sports: ['Fútbol', 'Hockey', 'Voley'],

      valid: false,
      nameRules: [
        v => !!v || 'Se requiere un nombre.',
      ],
      emptyNameError: false,
      emptyRoutineError: false,
    }
  },
  props: ['routine_name'],
  components: {
    CreateRoutinePart,
    //ExercisesOverlay,
  },
  methods: {
    setName() {
      let input = document.querySelector('#name_input');

      this.routine.name = input.value;
      this.emptyNameError = false;
    },

    setDifficulty(difficulty) {
      this.routine.difficulty = difficulty;
    },


    async saveRoutine() {
      if (this.routine.name.length === 0) {
        this.emptyNameError = true;
      } else if (CycleStore.exercises[0].length === 0 || CycleStore.exercises[1].length === 0 || CycleStore.exercises[2].length === 0) {
        this.emptyRoutineError = true;
      } else {

        await this.store.updateRoutine(CycleStore.currentRoutineID, this.routine.name,
            this.routine.detail, this.routine.difficulty, this.routine.category);

        await this.cleanRoutine();

        CycleStore.currentRoutineID = null;

        await router.replace("/home");

      }
    },

    addCategory(category_name) {
      this.routine.category = {id: parseInt(localStorage.getItem(category_name))};
    },

    async cancel() {
      await this.store.deleteRoutine(CycleStore.currentRoutineID);
      await this.cleanRoutine();

      CycleStore.currentRoutineID = null;
      await router.replace("/home");
    },

    async cleanRoutine() {
      document.querySelector('#name_input').value = "";

      this.routine.name = '';
      this.routine.detail = '';
      this.routine.difficulty = 3;
      this.routine.category = {};
    }

  }
}

</script>

<style scoped>

</style>