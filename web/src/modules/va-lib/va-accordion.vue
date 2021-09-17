<template>
  <div class="va-accordion">
    <div class="va-accordion-item" v-for="(item, index) in items" :key="'item' + index">
      <button @click="expandByIndex(index)">{{item.props.title}}</button>
      <div>
        <component
          :is="item"
          v-show="index === expandedItemIndex"
        ></component>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "va-accordion",
  data() {
    return {
      expandedItemIndex: {
        type: Number,
        default: -1
      }
    };
  },
  methods: {
    expandByIndex(index) {
      if(this.expandedItemIndex === index){
        this.expandedItemIndex = -1
      } else {
        this.expandedItemIndex = index;
      }
    }
  },
  computed: {
    items(){
      return this.$slots.default().flatMap( slot =>
          (slot.type?.name === 'va-accordion-item') ? slot : slot.children
      );

    },
  }
}
</script>

<style scoped>

</style>
