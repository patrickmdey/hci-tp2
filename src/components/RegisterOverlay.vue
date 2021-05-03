<template>
  <div>
    <!-- OVERLAY -->
    <v-overlay :value="overlay" opacity="0.7" :absolute="absolute">
      <v-card width="600" height="530" class="mx-auto px-5 text-center" color="accent white--text" flat>
        <div v-if="step === 0">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10">
              <v-card-title class="font-weight-black display-2 my-2 justify-center">REGISTRARSE</v-card-title>
            </v-col>
            <v-row justify="end">
              <v-btn
                  @click="closeOverlay()"
                  icon
                  color="white"
              >
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-row>
          </v-row>
          <!-- FULLNAME -->
          <v-row class="justify-center mb-n3">
            <v-col cols="6">
              <v-text-field
                  solo
                  v-model="firstName"
                  :error-messages="firstNameErrors"
                  label="Nombre *"
                  required
                  background-color="white"
                  light
                  @blur="$v.firstName.$touch()"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  solo
                  v-model="lastName"
                  :error-messages="lastNameErrors"
                  label="Apellido *"
                  required
                  background-color="white"
                  light
                  @blur="$v.lastName.$touch()"
              ></v-text-field>
            </v-col>
          </v-row>
          <!-- USERNAME -->
          <v-form>
            <v-text-field
                solo
                v-model="username"
                :error-messages="nameErrors"
                label="Nombre de usuario *"
                required
                background-color="white"
                light
                @blur="$v.username.$touch()"
            ></v-text-field>
            <!-- EMAIL -->
            <v-text-field
                solo
                light
                v-model="email"
                :error-messages="emailErrors"
                label="Correo electrónico *"
                required

                @blur="$v.email.$touch()"
            ></v-text-field>
            <!-- PASSWORD -->
            <v-text-field
                solo
                light
                class="black--text"
                v-model="password"
                :error-messages="passwordErrors"
                label="Contraseña *"
                required

                @blur="$v.password.$touch()"
                hint="Minimo 5 caracteres"

                :type="showPassword ? 'text' : 'password'"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                @click:append="showPassword = !showPassword"


            >Contraseña
            </v-text-field>
          </v-form>

          <v-card-actions>
            <v-col>
              <div class="text-center">
                <v-btn
                    color="secondary black--text mt-n3" x-large
                    class="mr-4"
                    @click="toUserStore()">
                  Siguiente
                </v-btn>
              </div>
            </v-col>
          </v-card-actions>
        </div>

        <div v-else-if="step === 1">
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="10">
              <v-card-title class="font-weight-black display-2 my-2 justify-center">VERIFICACIÓN</v-card-title>
            </v-col>
            <v-col cols="1">
              <v-row justify="end">
                <v-btn
                    @click="closeOverlay"
                    icon
                    color="white"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-row>
            </v-col>
          </v-row>
          <v-row>
            <h3>Se envió el código de verificación a</h3>
            <h3 class="secondary--text ml-2"> {{ email }}</h3>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="5" class="justify-center">
              <v-text-field id="verification_code" light solo label="Código de verificación"></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
          </v-row>
          <v-btn color="secondary black--text" @click="verifyWrapper()" large>Verificar</v-btn>
        </div>

      </v-card>
    </v-overlay>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, email, minLength} from 'vuelidate/lib/validators'
import UserStore from "@/store/UserStore";

export default {
  name: "Register",
  props: {
    overlay: {
      type: Boolean,
      default: false
    }
  },

  mixins: [validationMixin],

  validations: {
    username: {required},
    firstName: {required},
    lastName: {required},
    email: {required, email},
    password: {required, minLength: minLength(5)},
    fullName: {required},
    select: {required},
  },

  data() {
    return {
      absolute: true,

      step: 0,

      profile: UserStore,

      username: '',
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      fullName: '',
      showPassword: false,
    }
  },

  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.username.$dirty) return errors
      !this.$v.username.required && errors.push('Se requiere un nombre de usuario.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Correo electrónico inválido.')
      !this.$v.email.required && errors.push('Se requiere un correo electrónico.')
      return errors
    },
    passwordErrors() {
      const errors = []
      if (!this.$v.password.$dirty) return errors
      !this.$v.password.minLength && errors.push('Se requieren mínimo 5 caracteres.')
      !this.$v.password.required && errors.push('Se requiere una contraseña.')
      return errors
    },
    firstNameErrors() {
      const errors = []
      if (!this.$v.firstName.$dirty) return errors
      !this.$v.firstName.required && errors.push('Se requiere el nombre.')
      return errors
    },

    lastNameErrors() {
      const errors = []
      if (!this.$v.lastName.$dirty) return errors
      !this.$v.lastName.required && errors.push('Se requiere el apellido.')
      return errors
    },
  },

  methods: {

    async toUserStore() {
      this.profile.username = this.username;
      this.profile.firstName = this.firstName;
      this.profile.lastName = this.lastName;
      this.profile.email = this.email;
      this.profile.password = this.password;
      this.profile.fullName = this.fullName;
      await this.profile.registerFetch();

      this.step = 1;
    },

    setFullName() {
      this.fullName = this.firstName + " " + this.lastName;
    },

    register() {
      this.$v.$touch()
    },

    async verifyWrapper() {
      let input = document.querySelector('#verification_code');
      await this.profile.verifyEmail(input.value);
    },

    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.password = ''
      this.select = null
    },

    closeOverlay() {
      this.step = 0;
      this.clear()
      this.$emit('closeOverlay');
    },
  },
}
</script>

<style scoped>

</style>