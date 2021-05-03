import { Api } from './api.js';

export { VideoApi, Video };

class VideoApi {
    static get url() {
        return `${Api.baseUrl}/videos`;
    }

    static async createVideo(video, controller) {
        return await Api.post(`${VideoApi.url}`, true, video, controller);
    }

    static async updateVideo(video, controller) {
        return await Api.put(`${VideoApi.url}/${Video.id}`, true, video, controller);
    }

    static async deleteVideo(id, controller) {
        return await Api.delete(`${VideoApi.url}/${id}`, true, controller);
    }

    static async getVideo(id, controller) {
        return await Api.get(`${VideoApi.url}/${id}`,true,  controller);
    }

    static async getAllVideos(controller) {
        return await Api.get(VideoApi.url, true, controller);
    }
}

class Video {
    constructor(id, number, url) {
        if (id) {
            this.id = id;
        }
        this.number = number;
        this.url = url;
    }
}