<template>
  <input
      type="checkbox"
      v-model="dValue.checked"
  >
  <va-editable-text
      v-if="editable"
      class="text"
      v-model="dValue.title"
      :placeholder="'[Tap to edit]'"
  />
  <span v-else>{{dValue.title}}</span>
</template>

<script>
import VaEditableText from "@/modules/va-lib/va-editable-text";
export default {
  name: "wish-rec",
  components: {VaEditableText},
  props: {
    modelValue: Object,
    editable: {
      type: Boolean,
      required: true
    }
  },
  data(){
    return ({
      dValue: this.modelValue
    });
  },
  watch: {
    dValue(n){
      console.log(n);
      this.$emit('update:modelValue', n);
    }
  },
  emits: ["update:modelValue"]
}
</script>

<style scoped>

</style>
