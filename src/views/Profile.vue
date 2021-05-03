<template>
  <div>
    <AppBar></AppBar>
    <h1 class="font-weight-black display-3 text-center my-8">MI PERFIL</h1>
    <h3 class="font-weight-bold text-center my-7">Aquí puedes ver tu perfil. Modificá tu foto, nombre de usuario y correo electrónico a
      gusto.</h3>
    <v-col cols="4" class="mx-auto">
      <v-divider class="mt-n4"></v-divider>
    </v-col>
    <MyProfile></MyProfile>
  </div>
</template>

<script>
import AppBar from "@/components/AppBar";
import MyProfile from "@/components/MyProfile";

export default {
  name: "Profile",
  components: {AppBar, MyProfile},
}
</script>

<style scoped>

</style>