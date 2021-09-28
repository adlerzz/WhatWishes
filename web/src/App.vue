<template>
  <div id="app">
    <router/>
  </div>
</template>

<script>

import Router from "@/components/router";

export default {
  name: 'App',
  components: {
    Router,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  background-color: beige;
  height: 100vh;
}
</style>
