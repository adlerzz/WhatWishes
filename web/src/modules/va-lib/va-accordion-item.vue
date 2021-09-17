<template>
  <div class="va-accordion-item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "va-accordion-item",
  props: {
    title: String
  }
}
</script>

<style scoped>

</style>
