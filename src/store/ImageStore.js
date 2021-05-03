import {ImageApi, Image} from "@/api/image";
import {UserApi} from "@/api/user";

const imageStore = {

        //METODO QUE CREA UNA IMAGEN
        async createImage(url, exercise_id) {
            try {

                const image = new Image(null, url);
                let values = await this.getValuesID();
                let imageApi = new ImageApi(values[0], values[1], exercise_id);
                await imageApi.createImage(image);
                return image.id;
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE LA CANTIDAD DE IMAGENES CREADAS
        async size() {
            try {

                let values = await this.getValuesID();
                let imageApi = new ImageApi(values[0], values[1]);
                let retrieved = await imageApi.getAllImages();

                return retrieved.totalCount;
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE CLONA UNA IMAGEN
        async cloneImage(url, routine_id, cycle_id, exercise_id) {
            try {
                const image = new Image(null, url);
                let imageApi = new ImageApi(routine_id, cycle_id, exercise_id);

                await imageApi.createImage(image);
                return image.id;
            } catch (error) {
                console.log(error);
            }
        },


        //METODO QUE ME DEVUELVE LA IMAGEN DE UN EJERCICIO
        async getExerciseImage(exercise_id) {
            try {
                let values = await this.getValuesID();
                let image = new ImageApi(values[0], values[1], exercise_id);
                return await image.getAllImages();
            } catch (error) {
                console.log(error);
            }
        },

        //METODO QUE DEVUELVE EL ARRAY: [routineID, cycleID]
        async getValuesID() {
            let user = await UserApi.getMyUser();
            return user.phone.split("/");
        },

    }
;

export default imageStore;