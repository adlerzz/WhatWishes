<template>
  <div class="profile-tab">
    <div class="profile-tab-grid">

        <va-ava style="grid-area: ava" v-model="dProfile.ava"/>

        <va-editable-text style="grid-area: name" v-model="dProfile.name" label="Name:"/>
        <va-editable-text style="grid-area: nick" v-model="dProfile.nick" label="Nick:"/>

        <button style="grid-area: save" @click="saveProfile">Save</button>

    </div>
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
  data() {
    return {
      dProfile: this.profile
    }
  },
  methods: {
    saveProfile() {
      axios.put('http://localhost:3400/users/' + this.profile.id, this.profile).then(response => {
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

  .profile-tab-grid {
    display: grid;
    grid-template-areas:
      "ava ava name"
      "ava ava nick"
      ". save ."
    ;
  }
</style>
