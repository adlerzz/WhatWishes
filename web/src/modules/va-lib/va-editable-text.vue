<template>
  <div @click="startEditing">
    <label v-if="label">{{label}}</label>
    <span v-show="!editing && modelValue">
      <span>{{modelValue}}</span>
      <div class="icon">&#9998;</div>
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
    label: String,
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

  .icon {
    display: inline-block;
    cursor: pointer;
    transform: scaleX(-1);
    opacity: 0.1;
  }

  .icon:hover {
    opacity: 0.8;
  }
</style>
