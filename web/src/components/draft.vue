<template>
  <div class="main">
    <va-tab :defaultTabIndex="0">
      <va-tab-item title="Profile">
        <profile-tab :profile="profile"/>
      </va-tab-item>
      <va-tab-item title="Lists">
        <lists-tab :lists="lists"/>
      </va-tab-item>
      <va-tab-item title="Subscriptions">
        <subscriptions-tab :subs="subs"/>
      </va-tab-item>
    </va-tab>
  </div>
  <button @click="logout">Log out</button>
</template>

<script>
import axios from "axios";
import ProfileTab from "@/components/profile-tab";
import ListsTab from "@/components/lists-tab";
import SubscriptionsTab from "@/components/subscriptions-tab";
import VaTab from "@/modules/va-lib/va-tab";
import VaTabItem from "@/modules/va-lib/va-tab-item";
import {loggedAs} from "@/services/login.service";
export default {
  name: "draft",
  components: {
    VaTabItem,
    VaTab,
    SubscriptionsTab,
    ListsTab,
    ProfileTab
  },
  data() {
    return {
      profile: { },
      lists: [ ],
      subs: [ ]
    }
  },
  methods: {
    logout(){
      this.$emit('emit', {event: 'logout'});
    }
  },
  emits: [
      'emit'
  ],
  mounted(){
    console.log('mounted draft');
    const userId = loggedAs();
    axios.get(`http://localhost:3400/users/${userId}/full`).then(response => {
      this.profile = response.data;
      this.lists = response.data.links.lists;
      this.subs = response.data.links.subscriptions;
    });
  }
}
</script>

<style scoped>
   .main {
     width: 600px;
     background-color: white;
   }


</style>
