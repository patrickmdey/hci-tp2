import {Api} from '@/api/api.js';

export {RoutineApi, Routine};

class RoutineApi {
    static get url() {
        return `${Api.baseUrl}/routines`;
    }

    static async createRoutine(routine, controller) {
        const response = await Api.post(`${RoutineApi.url}`, true, routine, controller);
        routine.id = response.id;
    }

    static async getRoutine(id, controller) {
        return await Api.get(`${RoutineApi.url}/${id}`, true, controller);
    }

    static async updateRoutine(routine, controller) {
        return await Api.put(`${RoutineApi.url}/${routine.id}`, true, routine, controller);
    }

    static async deleteRoutine(id, controller) {
        return await Api.delete(`${RoutineApi.url}/${id}`, true, controller);
    }

    static async getAllRoutines(controller) {
        return await Api.get(`${RoutineApi.url}`, true, controller);
    }
}

class Routine {
    constructor(routine_id, name, detail, isPublic, difficulty, category) {

        if (routine_id) {
            this.id = routine_id;
        }
        this.name = name;
        this.detail = detail;
        this.isPublic = isPublic;
        this.category = category;
        this.difficulty = difficulty;

    }
}