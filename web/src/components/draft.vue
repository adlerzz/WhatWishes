<template>
  <div class="main">
    <va-tab :defaultTabIndex="0">
      <va-tab-item title="Profile">
        <profile-tab :profile="profile"></profile-tab>
      </va-tab-item>
      <va-tab-item title="Lists">
        <lists-tab :lists="lists"></lists-tab>
      </va-tab-item>
      <va-tab-item title="Subscriptions">
        <subscriptions-tab :subs="subs"></subscriptions-tab>
      </va-tab-item>
    </va-tab>
  </div>
</template>

<script>
import axios from "axios";
import ProfileTab from "@/components/profile-tab";
import ListsTab from "@/components/lists-tab";
import SubscriptionsTab from "@/components/subscriptions-tab";
import VaTab from "@/modules/va-lib/va-tab";
import VaTabItem from "@/modules/va-lib/va-tab-item";
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
  mounted(){
    axios.get('http://localhost:3400/users/user15/full').then(response => {
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
   }


</style>
