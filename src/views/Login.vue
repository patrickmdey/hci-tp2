<template>
  <div class="lg">
    <v-img src="@/assets/primary-background.png" height="800"
           class="pb-16">
      <v-card width="500" height="700" class="mx-auto mt-16 text-center" color="accent white--text" flat>
        <v-row justify="center">
          <v-img src="@/assets/logo.png" max-width="200" max-height="200" lass="justify-center"></v-img>
        </v-row>
        <v-card-title primary-title class="justify-center font-weight-black" style="font-size:32px;">QuickFitness
        </v-card-title>

        <div id="login-error-message-none" style="display:none;height:50px"></div>

        <div id="login-error-message" style="display:none;height:36px;">
          <p style="margin:0 auto 16px auto;width:300px;border-radius:5px;
          background-color:#FF3D00;text-align:center;
          padding:5px;">Usuario y/o contraseña inválidos.</p>
        </div>

        <v-card-text>
          <v-form v-model="formValid" ref="myForm">
            <p class="text-left white--text" style="font-size:22px">Nombre Usuario</p>
            <v-text-field solo label="Nombre Usuario" id="username" :rules="rules.required">Nombre de Usuario</v-text-field>

            <p class="text-left white--text mt-3" style="font-size:22px">Contraseña</p>
            <v-text-field solo label="Contraseña" id="password"
                          :type="showPassword ? 'text' : 'password'"
                          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                          @click:append="showPassword = !showPassword"
                          :rules="rules.required"
            >Contraseña
            </v-text-field>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-col>
            <div class="text-center">
              <v-btn color="secondary black--text mt-n3" x-large @click="loginUser()">
                Iniciar Sesión
              </v-btn>
            </div>
          </v-col>
        </v-card-actions>
        <div class="text-center">
          <v-btn color="secondary black--text" x-large @click="openOverlay=true">
            Registrarse
          </v-btn>
        </div>
      </v-card>

      <RegisterOverlay :overlay="openOverlay" @closeOverlay="openOverlay=false"></RegisterOverlay>
    </v-img>
  </div>
</template>

<script>
// @ is an alias to /src
import RegisterOverlay from "@/components/RegisterOverlay";
import {Credentials, UserApi} from "@/api/user";
import router from "@/router";

export default {
  name: 'Home',
  data() {
    return {
      showPassword: false,
      openOverlay: false,
      formValid: false,
      rules: {
        required: [value => !!value || "Campo requerido."]
      }
    }
  },
  components: {
    RegisterOverlay,
  },

  methods: {
    async loginUser() {
      if(this.$refs.myForm.validate()) {
        try {
          let username = document.querySelector('#username');
          let password = document.querySelector('#password');
          const credentials = new Credentials(username.value, password.value, null, null);
          await UserApi.login(credentials);
          await router.replace("/home");
        } catch (error) {

          let msg = document.getElementById("login-error-message");
          msg.setAttribute("style", "display:block;height:36px;");
          console.log(error);
        }
      }
    },

  }
}
</script>
