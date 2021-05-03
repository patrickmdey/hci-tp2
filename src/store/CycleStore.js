import {CycleCredentials, CycleApi} from "@/api/cycle";
import {ExerciseApi} from "@/api/exercise";
import RoutineStore from "@/store/RoutineStore";


const CycleStore = {

    currentRoutineID: null,
    exercises: [[], [], []],

    setCurrentRoutine(routine_id) {
        this.currentRoutineID = routine_id;
    },

    //METODO QUE CREA EL CICLO FALSO
    async myCycle(routine_id) {
        try {
            const credentials1 = new CycleCredentials(null, "Cycle",
                "", "warmup", 1, 1);

            const credentials2 = new CycleCredentials(null, "Cycle",
                "", "warmup", 2, 1);

            const credentials3 = new CycleCredentials(null, "Cycle",
                "", "warmup", 3, 1);

            const cycle = new CycleApi(routine_id);

            await cycle.createCycle(credentials1); //"EL QUE USAMOS"
            let id = credentials1.id;

            //RELLENAMOS PARA LLEGAR A 3 POR RUTINA
            await cycle.createCycle(credentials2);
            await cycle.createCycle(credentials3);

            return id;          //ID del ciclo (magico)

        } catch (error) {
            console.log(error);
        }
    },


    //METODO QUE CREA UN CICLO
    async createCycle(routine_id, name, type, order) {
        try {
            const credentials = new CycleCredentials(null, name,
                "", type, order, 1);

            const cycle = new CycleApi(routine_id);

            await cycle.createCycle(credentials);

            return credentials.id;

        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE DEVUELVE TODOS LOS EJERCICIOS DE UN CICLO(Y ACTUALIZA EL ARRAY PASAMANOS)
    async getCycleExercises(routine_id, cycle_id, type) {
        try {
            let exerciseApi = new ExerciseApi(routine_id, cycle_id);
            let retrieved = await exerciseApi.getAllExercises();

            this.exercises[type] = [];    //aseguramos que este limpio

            let i;
            let array = [];
            for (i = 0; i < retrieved.totalCount; i++) {
                array.push(retrieved.results[i]);
            }
            this.exercises[type] = array;
            return array;

        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE DEVUELVE CUANTOS EJERCICIOS HAY EN UN CICLO
    async size(routine_id, cycle_id) {
        try {

            let exerciseApi = new ExerciseApi(routine_id, cycle_id);

            let retrieved = await exerciseApi.getAllExercises();

            return retrieved.totalCount;

        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE BORRO UN EJERCICIO DE UN CICLO
    async deleteExercise(routine_id, cycle_id, exercise_id) {
        try {
            let exercise = new ExerciseApi(routine_id, cycle_id);

            await exercise.deleteExercise(exercise_id);


        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE BORRA UN CICLO COMPLETO
    async deleteCycle(routine_id, cycle_id) {
        try {
            let cycleApi = new CycleApi(routine_id);
            await cycleApi.deleteCycle(cycle_id);
        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE ME DEVUELVE UN CICLO
    async getCycle(routine_id, cycle_id) {
        let cycleApi = new CycleApi(routine_id);
        return await cycleApi.getCycle(cycle_id);
    },

    //METODO QUE BORRA TOD0 LO QUE HAY EN TODOS LOS CICLOS DE UNA RUTINA
    async cleanAllCycles(routine_id) {
        try {
            for (let i = 0; i < 3; i++) {
                let cycle = await this.getCycleExercises(routine_id, RoutineStore.cycleIDArray[i], i);

                for (let j = 0; i < cycle.totalCount; j++) {
                    await this.deleteExercise(routine_id, RoutineStore.cycleIDArray[i], cycle.results[j].id);
                }

                this.exercises[i] = [];
            }
        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE ACTUALIZA UN CICLO

    async updateCycle(routine_id, cycle_id, name, detail, type, order, repetitions){
        try {
            let cycleApi = new CycleApi(routine_id);
            let newCycle = new CycleCredentials(cycle_id, name, detail, type, order, repetitions);

            await cycleApi.updateCycle(cycle_id, newCycle);
        }catch (error){
            console.error();
        }
    },

    //METODO QUE ME DEVUELVE LOS CICLOS DE UNA RUTINA
    async getRoutineCycles(routine_id){
        let cycleApi = new CycleApi(routine_id);
        return await cycleApi.getRoutineCycles();
    },

    //METODO QUE ME DEVUELVE EL ID DE LA EJERCITACION PRINCIPAL DE UNA RUTINA
    async getRoutineMainCycleID(routine_id){
        let aux =await this.getRoutineCycles(routine_id);
        RoutineStore.currentMainCycleID = aux.results[1].id;
    }

};

export default CycleStore;