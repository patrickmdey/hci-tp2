import {Api} from '@/api/api.js';

export {UserApi, Credentials, Verification, NoPasswordCredentials};

class UserApi {
    static get url() {
        return `${Api.baseUrl}/user`;
    }

    static async register(credentials, controller) {
        const response =  await Api.post(`${UserApi.url}`, false, credentials, controller);
        credentials.id = response.id;
    }

    static async verifyEmail(verification, controller) {
        return await Api.post(`${UserApi.url}/verify_email`, false, verification, controller);
    }

    static async resendVerification(credentials, controller) {
        return await Api.post(`${UserApi.url}/resend_verification`, false, credentials, controller);
    }

    static async getMyUser(controller) {
        return await Api.get(`${UserApi.url}/current`, true, controller);
    }

    static async getUser(id, controller) {
        return  await Api.get(`${UserApi.url}/${id}`, true, controller);
    }

    static async deleteMyUser(controller) {
        return await Api.delete(`${UserApi.url}/current`, true, controller);
    }

    static async login(credentials, controller) {
        const result = await Api.post(`${UserApi.url}/login`, false, credentials, controller);
        Api.token = result.token;
        credentials.phone = result.phone;
    }

    static async update(credentials, controller) {
        return await Api.put(`${UserApi.url}/current`, true, credentials, controller);
    }

    static async logout(controller) {
        await Api.post(`${UserApi.url}/logout`, true, controller);
        Api.token = undefined;
    }

    static async getMyRoutines(controller){
        await Api.get(`${UserApi.url}/current/routines`, true, controller);
    }
}

class Credentials {
    constructor(username, password, fullName, email, magicRoutineID) {
        this.username = username;
        this.password = password;
        this.fullName = fullName;
        this.gender = "other";
        this.birthdate = 284007600000;
        this.email = email;
        this.phone = magicRoutineID;
        this.avatarURL = "https://flic.kr/p/3ntH2u";

        this.id = null;
    }
}

class NoPasswordCredentials{
    constructor(username,fullName,email,phone, avatarURL) {
        this.username = username;
        this.fullName = fullName;
        this.gender = "other";
        this.birthdate = 284007600000;
        this.email = email;
        this.phone = phone;
        this.avatarURL = avatarURL;
    }
}

class Verification {
    constructor(email, code) {
        this.email = email;
        this.code = code;
    }
}