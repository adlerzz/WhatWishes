<template>
  <div class="table">
    <button
        class="button-add"
        @click="add(-1)"
    >+</button>
    <div
        class="row"
        v-for="(item, index) in list"
        :key="item.id"
    >
      <div class="cell">
        <button
            class="button-add"
            @click="add(index)"
        >+</button>
      </div>
      <div class="cell">
        <input
            type="checkbox"
            v-model="item.checked"
        >
        <va-editable-text
            class="text"
            v-model="item.title"
            :placeholder="'[Tap to edit]'"
        />
      </div>
      <div class="cell">
        <button v-if="index !== 0"
            class="button-up"
            @click="up(index)"
        >&#8593;</button>
      </div>
      <div class="cell">
        <button v-if="index !== list.length - 1"
            class="button-down"
            @click="down(index)"
        >&#8595;</button>
      </div>
      <div class="cell">
        <button
            class="button-rem"
            @click="rem(index)"
        >-</button>
      </div>
    </div>

  </div>
</template>

<script>
import VaEditableText from "@/modules/va-lib/va-editable-text";
export default {
  name: "va-editable-list",
  components: {VaEditableText},
  data(){
    return {
      dItems: this.items
    }
  },
  props: {
    items: Array
  },
  emits: ['update:items'],
  computed: {
    list() {
      return this.items;
    }
  },
  methods: {
    add(index){
      this.dItems.splice(index+1, 0, {title: "", id: -1, selected: false});
    },
    rem(index){
      this.dItems.splice(index, 1);
    },
    up(index){
      const item = this.dItems[index];
      this.dItems.splice(index, 1);
      this.dItems.splice(index-1, 0, item);
    },
    down(index){
      const item = this.dItems[index];
      this.dItems.splice(index, 1);
      this.dItems.splice(index+1, 0, item);
    }
  }


}
</script>

<style scoped>
  .table{
    display: flex;
    flex-direction: column;
  }
  .row{
    display: flex;
  }
  .cell:nth-of-type(1) {
    flex: 0 0 25px;
  }
  .cell:nth-of-type(2) {
    display: flex;
    flex: 1 0 auto;
  }
  .cell:nth-of-type(3) {
    flex: 0 0 25px;
  }
  .cell:nth-of-type(4) {
    flex: 0 0 25px;
  }
  .cell:nth-of-type(2):hover {
    background-color: #EFEFEF;
  }
  button {
    border-radius: 50%;
    border-width: 0;
    width: 24px;
    height: 24px;
    border-color: #FCFCFC;
  }
  .button-add {
    position: relative;
    top: 10px;
  }
  button {
    opacity: 0.3;
  }
  button:hover {
    opacity: 1.0;
  }
  .text {
    flex: 1 1 auto;
    text-align: left;
  }

</style>
