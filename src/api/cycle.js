import {Api} from "@/api/api";

export {CycleApi, CycleCredentials}


//PARA USARLO SI O SI HAY QUE INSTANCIAR CYCLEAPI
//Ejemplo --> let cycle = new CycleApi(routine_id)

class CycleApi {
    constructor(routine_id) {
        this.routine_id = routine_id;
    }

    get url() {
        return `${Api.baseUrl}/routines/${this.routine_id}/cycles`;
    }

    async createCycle(credentials, controller) {
        const response = await Api.post(`${this.url}`, true, credentials, controller);
        credentials.id = response.id;
    }

    async getCycle(id, controller){
        return await Api.get(`${this.url}/${id}`, true, controller);
    }

    async updateCycle(id, credentials, controller) {
        return await Api.put(`${this.url}/${id}`, true, credentials, controller);
    }

    async deleteCycle(id, controller) {
        return await Api.delete(`${this.url}/${id}`, true, controller);
    }

    async getRoutineCycles(controller){
        return await Api.get(`${this.url}`, true, controller);
    }

}

class CycleCredentials {
    constructor(id, name, detail, type, order, repetitions) {
        if (id){
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
        this.type = type;
        this.order = order;
        this.repetitions = repetitions;
    }
}


