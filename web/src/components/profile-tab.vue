<template>
  <div class="profile-tab">
    <va-ava v-model="dProfile.ava"></va-ava>
    <va-editable-text v-model="dProfile.name"></va-editable-text>
    <va-editable-text v-model="dProfile.nick"></va-editable-text>
    <button @click="saveProfile">Save</button>
  </div>
</template>

<script>
import VaEditableText from "@/modules/va-lib/va-editable-text";
import VaAva from "@/modules/va-lib/va-ava";
import axios from "axios";
export default {
  name: "profile-tab",
  components: {VaAva, VaEditableText},
  props: {
    profile: Object
  },
  data(){
    return {
      dProfile: this.profile
    }
  },
  methods: {
    saveProfile(){
      axios.put('http://localhost:3400/users/' + this.profile.id, this.profile).then( response => {
        console.log(response);
      })
    }
  },
  watch: {
    profile(n) {
      console.log("Gotcha");
      this.dProfile = n;
    }
  }
}
</script>

<style scoped>
  .profile-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
