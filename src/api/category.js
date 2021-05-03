import { Api } from './api.js';

export { CategoryApi, Category };

class CategoryApi {
    static get url() {
        return `${Api.baseUrl}/categories`;
    }

    static async createCategory(category, controller) {
        let result =  await Api.post(`${CategoryApi.url}`, true, category, controller);
        category.id = result.id;
    }

    static async updateCategory(category, controller) {
        return await Api.put(`${CategoryApi.url}/${Category.id}`, true, category, controller);
    }

    static async deleteCategory(id, controller) {
        return await Api.delete(`${CategoryApi.url}/${id}`, true, controller);
    }

    static async getCategory(id, controller) {
        return await Api.get(`${CategoryApi.url}/${id}`,true,  controller);
    }

    static async getAllCategories(controller) {
        return await Api.get(CategoryApi.url, true, controller);
    }
}

class Category {
    constructor(id, name, detail) {
        if (id) {
            this.id = id;
        }
        this.name = name;
        this.detail = detail;
    }
}