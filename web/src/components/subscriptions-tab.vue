<template>
  <div class="subs-tab">
    <ul>
      <li v-for="sub in subs" :key="sub.id">{{sub.nick}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "subscriptions-tab",
  props: {
    subs: Array
  }
}
</script>

<style scoped>

</style>
