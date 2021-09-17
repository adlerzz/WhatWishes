<template>

  <div class="va-tab">
    <div class="va-tab-buttons">
      <button
          class="va-tab-button"
          :class="{selected: selectedTabIndex === index}"
          v-for="(title, index) in titles"
          :key="'title'+index"
          @click="changeTab(index)">
        {{ title }}
      </button>
    </div>
    <div class="va-tab-items-wrapper">
      <div class="va-tab-items">
        <div
            class="va-tab-item"
            v-for="(tab, index) in tabs"
            :key="'tab'+index">
          <div class="va-tab-item-wrapper" v-show="selectedTabIndex === index">
            <component :is="tab"></component>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "va-tab",
  props: {
    defaultTabIndex: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      selectedTabIndex: 0,
    }
  },
  emits: [
    'update:selectedTabIndex'
  ],

  computed: {

    tabs() {
      console.log(["compute tabs", this.$slots.default(), this.$el]);
      return this.$slots.default().flatMap(slot =>
          (slot.type?.name === 'va-tab-item') ? slot : slot.children
      );
    },

    titles() {
      return this.tabs.map(tab => tab.props.title);
    }
  },

  methods: {
    changeTab(index) {
      this.selectedTabIndex = index;
      // this.tab = this.tabs.filter( (tab, index) => index === this.selectedTabIndex).pop();
    }
  }

}
</script>

<style scoped>

.va-tab-items {
  display: flex;
  flex-direction: column;
}

.va-tab-item {
  /*border: 1px solid blue;*/
}

.va-tab-button {
  border: none;
  border-top: 4px lightblue solid;
  border-left: 1px lightblue solid;
  border-right: 1px lightblue solid;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  background-color: inherit;
  padding: 4px 10px;
}

.va-tab-button:not(.selected) {
  border-top-color: lightblue;
  background-color: whitesmoke;
  transition: border-top-color 0.3s ease-in;
}

.va-tab-button.selected {
  border-top-color: blue;
  transition: border-top-color 0.3s ease-out;
}

.tab-animation-enter-from,
.tab-animation-leave-to {
  opacity: 0;
}

.tab-animation-enter-active,
.tab-animation-leave-active {
  transition: opacity 0.5s linear;
}


</style>
