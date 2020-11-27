<template>
  <v-main>
    <div class="home">
      <center>
        <img alt="Vue logo" src="../assets/logo.png">
        <h1>{{ $store.getters['sample/get_greet'] }}</h1>
      </center>
    </div>
  </v-main>
</template>

<script>
export default {
  name: 'Home',
}
</script>
