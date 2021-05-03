<template>
  <div class="lg">
    <v-img src="@/assets/primary-background.png">
      <p class="font-weight-black text-center white--text" style="font-size: 80px">¡UPS!</p>
      <p class="font-weight-black text-center white--text" style="font-size: 40px">No se pudo encontrar la página que
        buscás.</p>
      <v-row justify="center" align="center">
        <p class="font-weight-black text-center white--text" style="font-size: 50px">Error</p>
        <p class="font-weight-black text-center white--text ml-5" style="font-size: 70px">404</p>
      </v-row>

      <v-row justify="center">
        <v-col cols="6" justify="center">
          <v-row justify="center">
            <v-img
                src="https://media1.tenor.com/images/fed248bcfaa50b75bcefc7006ce2643e/tenor.gif?itemid=14965302"
                lazy-src="https://picsum.photos/id/11/100/60"
                max-width="70%"
                max-height="300"
            >
              <template v-slot:placeholder>
                <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                >
                  <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                  ></v-progress-circular>
                </v-row>
              </template>
            </v-img>
          </v-row>
        </v-col>

        <v-col>
          <p class="font-weight-black my-8 text-center white--text" style="font-size: 30px">Puedes volver haciendo
            click aquí:</p>
          <v-row justify="center">
            <v-btn color="secondary black--text mt-n3" x-large to="/home">VOLVER AL INICIO</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>

<script>
export default {
  name: "404Error"
}
</script>

<style scoped>

</style>