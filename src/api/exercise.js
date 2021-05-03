import {Api} from '@/api/api.js';

export {ExerciseApi, Exercise};

class ExerciseApi {
    constructor(routine_id, cycle_id) {
        this.routine_id = routine_id;
        this.cycle_id = cycle_id;
    }

    get url() {
        return `${Api.baseUrl}/routines/${this.routine_id}/cycles/${this.cycle_id}/exercises`;
    }

    async createExercise(exercise, controller) {
        let response = await Api.post(`${this.url}`, true, exercise, controller);
        exercise.id = response.id;
    }

    async getExercise(id, controller) {
        return await Api.get(`${this.url}/${id}`, true, controller);
    }

    async updateExercise(exercise, controller) {
        return await Api.put(`${this.url}/${exercise.id}`, true, exercise, controller);
    }

    async deleteExercise(id, controller) {
        return await Api.delete(`${this.url}/${id}`, true, controller);
    }

    async getAllExercises(controller) {
        return await Api.get(`${this.url}`, true, controller);
    }
}

class Exercise {
    constructor(id, name, detail, duration,difficulty) {
        if(id){
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.type = "exercise";
        this.duration = duration;
        this.repetitions = difficulty;
    }
}