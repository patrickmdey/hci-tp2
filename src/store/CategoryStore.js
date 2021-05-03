import {Category, CategoryApi} from "@/api/category";

const CategoryStore = {

    category: ['Abdominales', 'Brazos', 'Piernas', 'Cardio', 'Salud'],

    //CREA RUTINA FALSA "MIS RUTINAS"
    async createMagicCategory() {

        if (parseInt(localStorage.getItem("magicCategory")) !== 1) {
            try {
                const magic = new Category(null, "Magic Category", "");
                await CategoryApi.createCategory(magic);

                localStorage.setItem("magicCategory", magic.id);

                for (const key of this.category) {
                    let aux = new Category(null, key,key);
                    await CategoryApi.createCategory(aux);
                    localStorage.setItem(key, aux.id);
                }

            } catch (error) {
                console.log(error)
            }
        }
    },


    //ME DEVUELVE LA CATEGORIA SEGUN ID
    async getCategory(id){
        return await CategoryApi.getCategory(id);
    }
}

export default CategoryStore;