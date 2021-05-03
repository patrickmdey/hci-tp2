import { Api } from './api.js';

export { ImageApi, Image };

class ImageApi {

    constructor(routine_id, cycle_id, exercise_id) {
        this.routine_id = routine_id;
        this.cycle_id = cycle_id;
        this.exercise_id = exercise_id;
    }

    get url() {
        return `${Api.baseUrl}/routines/${this.routine_id}/cycles/${this.cycle_id}/exercises/${this.exercise_id}/images`;
    }

    async createImage(image, controller) {
        let response =  await Api.post(`${this.url}`, true, image, controller);
        image.id = response.id;
    }


    async deleteImage(id, controller) {
        return await Api.delete(`${this.url}/${id}`, true, controller);
    }

    async getImage(id, controller) {
        return await Api.get(`${this.url}/${id}`,true,  controller);
    }

    async getAllImages(controller) {
        return await Api.get(this.url, true, controller);
    }

    async updateImage(image, controller) {
        return await Api.put(`${this.url}/${image.id}`, true, image, controller);
    }
}

class Image {
    constructor(id, url) {
        if (id) {
            this.id = id;
        }
        this.number = 1;
        this.url = url;
    }
}