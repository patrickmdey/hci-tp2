import {ExerciseApi, Exercise} from "@/api/exercise";
import {UserApi} from "@/api/user";

const ExerciseStore = {
        exercises: [],

        editID: null,
        toEditExercise: null,

        //METODO QUE CREA UN EJERCICIO
        async createExercise(name, detail, duration, difficulty) {
            try {

                const exerciseCredentials = new Exercise(null, name, detail, duration, difficulty);
                let values = await this.getValuesID();
                let exercise = new ExerciseApi(values[0], values[1]);


                await exercise.createExercise(exerciseCredentials);
                return exerciseCredentials.id;

            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE CLONA UN EJERCICIO
        async cloneExercise(name, detail, duration, difficulty, routine_id, cycle_id) {
            try {

                const exerciseCredentials = new Exercise(null, name, detail, duration, difficulty);
                let exercise = new ExerciseApi(routine_id, cycle_id);


                await exercise.createExercise(exerciseCredentials);


                return exerciseCredentials.id;

            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE BORRA UN EJERCICIO
        async deleteExercise(exercise_id) {
            try {
                let values = await this.getValuesID();
                let exercise = new ExerciseApi(values[0], values[1]);

                await exercise.deleteExercise(exercise_id);

                await this.getMyExercises();

            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE ME DEVUELVE TODOS MIS EJERCICIOS
        async getMyExercises() {
            try {
                let values = await this.getValuesID();
                let exerciseApi = new ExerciseApi(values[0], values[1]);
                let retrieved = await exerciseApi.getAllExercises();

                this.exercises = [];    //aseguramos que este limpio

                let i;
                let array = [];
                for (i = 0; i < retrieved.totalCount; i++) {
                    array.push(retrieved.results[i]);
                }
                this.exercises = array;
                return array;

            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE LA CANTIDAD DE EJERCICIOS CREADOS
        async size() {
            try {

                let values = await this.getValuesID();
                let exerciseApi = new ExerciseApi(values[0], values[1]);

                let retrieved = await exerciseApi.getAllExercises();

                return retrieved.totalCount;

            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE UN EJERCICIO
        async getExercise(id) {
            try {
                let values = await this.getValuesID();
                let exercise = new ExerciseApi(values[0], values[1]);
                return await exercise.getExercise(id);
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE UN EJERCICIO DE UN CICLO
        async getCycleExercise(routine_id, cycle_id, exercise_id) {
            try {
                let exercise = new ExerciseApi(routine_id, cycle_id);
                return await exercise.getExercise(exercise_id);
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE EL ARRAY: [routineID, cycleID]
        async getValuesID() {
            let user = await UserApi.getMyUser();
            return user.phone.split("/");
        },

        //METODO QUE ACTUALIZA UN EJERCICIO
        async updateExercise(exercise_id, name, detail, duration, difficulty) {
            try {
                let values = await this.getValuesID();
                let exercise = new ExerciseApi(values[0], values[1]);
                let to_update = new Exercise(exercise_id, name, detail, duration, difficulty);

                await exercise.updateExercise(to_update);
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE ACTUALIZA UN EJERCICIO DE UN CICLO

        async updateCycleExercise(exercise_id, name, detail, duration, difficulty, routine_id, cycle_id) {
            try {
                let exercise = new ExerciseApi(routine_id, cycle_id);
                let to_update = new Exercise(exercise_id, name, detail, duration, difficulty);

                await exercise.updateExercise(to_update);
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE ACTUALIZA EL VALOR DEL EJERCICIO QUE SE ESTA EDITANDO

        async updateToEditExercise() {
            if (this.editID === null)
                this.toEditExercise = null;
            this.toEditExercise = await this.getExercise(this.editID);
        }
    }
;

export default ExerciseStore;