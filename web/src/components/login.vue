<template>
  <select v-model="selected">
    <option v-for="i in userIds" :value="i" :key="i">{{i}}</option>
  </select>
</template>

<script>
import {loginAs} from "@/services/login.service";

export default {
  name: "login",
  data(){
    return ({
      selected: null,
      userIds: [
        'user10',
        'user11',
        'user12',
        'user13',
        'user14',
        'user15',
      ]
    })
  },
  methods: {
  },
  watch: {
    selected(userId) {
      console.log('clikd ' + userId);
      loginAs(userId);
      this.$emit('emit', {event: 'login', context: userId});
    }
  },
  emits: [
      'emit'
  ]
}
</script>

<style scoped>

</style>
