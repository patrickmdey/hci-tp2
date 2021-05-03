import {Credentials, UserApi, Verification, NoPasswordCredentials} from "@/api/user";
import router from "@/router";
import CategoryStore from "@/store/CategoryStore";
import RoutineStore from "@/store/RoutineStore";
import CycleStore from "@/store/CycleStore";

const UserStore = {
    username: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    fullName: '',
    id: '',
    pic: '',

//METODO QUE CONCATENA FIRSTNAME CON LASTNAME
    setFullName() {
        this.fullName = this.firstName + " " + this.lastName;
    },

    //METODO QUE REGISTRA AL USUARIO
    async registerFetch() {
        try {
            this.setFullName();
            const credentials = new Credentials(this.username, this.password, this.fullName, this.email, "0");
            await UserApi.register(credentials);
            this.id = credentials.id;

        } catch (error) {
            console.log(error)
        }
    },

    //METODO QUE VERIFICA LA REGISTRACION DE UN USUARIO Y CREA SU "MIS EJERCICIOS"
    async verifyEmail(code) {
        try {
            const verification = new Verification(this.email, code);
            await UserApi.verifyEmail(verification);
            await this.loginUser();
            await CategoryStore.createMagicCategory();                   //Creo categoria falsa

            let routineID = await RoutineStore.myExercisesRoutine();    //Creo la rutina falsa para meter todos los "mis ejercicios"
            let firstPhone = await this.updateMyRoutineID(routineID);  //Dejo en phone el id de la rutina falsta (ES UN STRING)

            let cycleID = await CycleStore.myCycle(routineID);        //Dejo en phone el id del ciclo falso
            //phone:"routineID/cycleID"
            await this.updateMyCycleID(cycleID, firstPhone);

            await router.replace("/home");

        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE ACTUALIZA UN USUARIO
    async updateUser(fullName, avatarURL) {
        let user = await UserApi.getMyUser();
        let credentials = new NoPasswordCredentials(user.username, fullName, user.email, user.phone, avatarURL);
        let updated = await UserApi.update(credentials);
        this.fullName = updated.fullName;
        this.pic = updated.avatarURL;
    },

    //METODO QUE DEJA EN PHONE EL ID DE LA RUTINA "MIS EJERCICIOS"
    async updateMyRoutineID(routineID) {
        let routineString = routineID.toString();
        let credentials = new Credentials(this.username, this.password, this.fullName, this.email, routineString);
        try {
            await UserApi.update(credentials);
            return routineID;
        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE DEJA EN PHONE EL ID DEL CICLO FALSO
    async updateMyCycleID(cycleID, firstPhone) {
        let cycle = cycleID.toString();

        let secondPhone = firstPhone.toString().concat("/", cycle);   //"1/1"

        let credentials = new Credentials(this.username, this.password, this.fullName, this.email, secondPhone);
        try {
            await UserApi.update(credentials);
        } catch (error) {
            console.log(error);
        }
    },

    //METODO QUE REALIZA EL LOGIN DEL USUARIO
    async loginUser() {
        try {
            const credentials = new Credentials(this.username, this.password, this.fullName, this.email, "0");
            await UserApi.login(credentials);

        } catch (error) {
            console.log(error);
        }
    },


    //METODO QUE DEVUELVE MI USUARIO
    async getCurrentUser() {
        return await UserApi.getMyUser();
    }


}

export default UserStore;