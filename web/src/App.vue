<template>
  <div id="app">
    <draft/>
  </div>
</template>

<script>
import Draft from "@/components/draft";

export default {
  name: 'App',
  components: {
    Draft
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
}
</style>
