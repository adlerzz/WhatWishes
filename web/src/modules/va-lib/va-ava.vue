<template>
  <div class="va-ava">
    <img
      ref="imgref"
      :src="url"
      alt="avatar"
      v-show="false"
    >
    <div
      class="va-ava-box"
      :style="{width: avaSize + 'px', height: avaSize + 'px'}"
      @click="openLoad"
    >
      <img
        :src="url"
        :alt="file?.type"
        :width="width"
        :height="height"
      >
      <input
        id="file-input"
        type="file"
        v-show="false"
        @change="load"
      >
    </div>
  </div>
</template>

<script>
const AVA_SIZE = 128;

export default {
  name: "va-ava",
  props: {
    modelValue: [String, Object]
  },
  emit:["update:modelValue"],
  data() {
    return {
      file: null,
      avaSize: AVA_SIZE,
      width: this.modelValue?.width,
      height: this.modelValue?.height,
    }
  },
  methods: {
    openLoad() {
      document.getElementById('file-input').click();
    },
    load(event) {
      this.file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.url = reader.result;
      };
    },
    resize(){
      const imgref = this.$refs.imgref;
      this.avaSize = Math.min(imgref.width, AVA_SIZE);

      if (imgref.width > imgref.height) {
        this.height = Math.min(imgref.height, AVA_SIZE);
        this.width = this.height * (imgref.width / imgref.height);
      } else {
        this.width = Math.min(imgref.width, AVA_SIZE);
        this.height = this.width * (imgref.height / imgref.width);
      }
      return new Promise(r => setTimeout(r, 200));
    }

  },
  watch: {
    modelValue(n) {
      this.url = n.url;
    }
  },
  computed: {
    url:{
      get() {
        return this.modelValue?.url;
      },
      set(value){
        this.resize().then( (function() {
          this.$emit('update:modelValue', {url: value, width: this.width, height: this.height});
        }).bind(this));
      }
    }
  }
}
</script>

<style scoped>
  .va-ava {
    box-shadow: 0 0 1px 1px blue;
  }
  .va-ava-box {
    background-color: beige;
    overflow: hidden;
    display: flex;
    justify-content: center;
  }

</style>
