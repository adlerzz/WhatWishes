<template>
  <div @click="startEditing">

    <span v-show="!editing && modelValue">
      <span class="icon">&#9998;</span>
      <span>{{modelValue}}</span>
    </span>
    <span
        class="placeholder"
        v-show="!editing && !modelValue"
    >{{placeholder}}</span>
    <input
        ref="input"
        v-show="editing"
        @blur="stopEditing"
        @keyup.enter="stopEditing"
        :value="modelValue"
        @input="emitInput"
    >
  </div>
</template>

<script>
export default {
  name: "va-editable-text",
  props: {
    modelValue: String,
    placeholder: String
  },
  emits: ['update:modelValue'],
  data(){
    return {
      editing: false
    }
  },
  methods: {
    startEditing(){
      this.editing = true;
      this.$nextTick( function(){
        this.$refs.input.focus();
      });

    },
    stopEditing(){
      this.editing = false
    },
    emitInput(event){
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>

<style scoped>
  span.placeholder {
    font-style: italic;
    opacity: 0.3;
  }

  span.icon {
    opacity: 0.1;
  }

  span.icon:hover {
    opacity: 0.8;
  }
</style>
