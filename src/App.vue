<template>

  <v-app class="lg">
    <noscript>
      <strong>Usted no cuenta con JavaScript habilitado en su navegador. Es necesario para poder navegar en QuickFitness.<br>
        Puede seguir el manual de instrucciones en el siguiente <a href="https://www.enable-javascript.com/es/">link</a></strong>
    </noscript>
    <v-main>
        <router-view></router-view>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: 'App',

  components: {Footer},


  data: () => ({
    items: ['Rutinas', 'Ejercicios']
  }),
};
</script>
