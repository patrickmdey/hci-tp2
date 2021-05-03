import {Routine, RoutineApi} from "@/api/routine";
import CycleStore from "@/store/CycleStore";
import {UserApi} from "@/api/user";
import UserStore from "@/store/UserStore";

const RoutineStore = {
    routines: [],

    currentMainCycleID: null,
    cycleIDArray: [],

    //METODO QUE BORRA UNA RUTINA
    async deleteRoutine(routine_id) {
        await CycleStore.cleanAllCycles(routine_id);

        for (let i = 0; i < 3; i++) {
            let id = await RoutineStore.cycleIDArray[i];
            await CycleStore.deleteCycle(routine_id, id);
        }
        await RoutineApi.deleteRoutine(routine_id);
    },
    //METODO QUE CREA "MIS EJERCICIOS"
    async myExercisesRoutine() {
        try {
            const myBag = new Routine(null, "MagicBag", "", false, "rookie",
                {id: parseInt(localStorage.getItem("magicCategory"))});

            await RoutineApi.createRoutine(myBag);


            return myBag.id;

        } catch (error) {
            console.log(error)
        }
    },

    //METODO QUE CREA UNA RUTINA
    async createRoutine() {
        const routine = new Routine(null, "", "", false, "advanced",
            {id: parseInt(localStorage.getItem("magicCategory"))});

        await RoutineApi.createRoutine(routine);


        this.cycleIDArray = [];       //limpio cycleIDArray

        let array = [
            {
                name: "Calentamiento", type: "warmup", order: 1
            }, {
                name: "Ejercitación principal", type: "exercise", order: 2
            },
            {name: "Enfriamiento", type: "cooldown", order: 3}
        ];

        let i;
        let cycleID = [];
        for (i = 0; i < 3; i++) {
            cycleID[i] = await CycleStore.createCycle(routine.id, array[i].name, array[i].type, array[i].order);
        }


        this.cycleIDArray = cycleID;
        return routine.id;
    },

    //METODO QUE ACTUALIZA UNA RUTINA
    async updateRoutine(routine_id, name, detail, difficulty, category) {
        try {

            let difficulties = ["beginner", "intermediate", "advanced"];
            let to_update = new Routine(routine_id, name, detail, true, difficulties[difficulty - 1], category);

            await RoutineApi.updateRoutine(to_update);
        } catch (error) {
            console.log(error);
        }
    },

    //Error 404 no encuentra en la api el path para este metodo
    //Si se hace en swagger me da unauthorized aunque este logeado

    async getAllMyRoutines() {
        this.routines = []; // Limpio mis rutinas
        try {
            let myRoutines = await UserApi.getMyRoutines();
            let array = [];
            for (let i = 0; i < myRoutines.totalCount; i++) {
                array.push(myRoutines.results[i]);
            }
            this.routines = array;
        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE DEVUELVE TODAS MIS RUTINAS
    //HABIA UN ERROR CON EL /user/current/routines
    async getMyRoutines() {
        try {
            let retrieved = await RoutineApi.getAllRoutines();

            let currentUser = await UserStore.getCurrentUser();
            let currentUserID = currentUser.id;
            this.routines = [];    //aseguramos que este limpio

            let i;
            let array = [];
            for (i = 0; i < retrieved.totalCount; i++) {
                if (retrieved.results[i].isPublic && retrieved.results[i].creator.id === currentUserID)
                    array.push(retrieved.results[i]);
            }

            this.routines = array;

            return array;

        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE DEVUELVE LA CANTIDAD DE RUTINAS CREADAS
    async size() {
        await this.getMyRoutines();
        return this.routines.length;
    }
};

export default RoutineStore;