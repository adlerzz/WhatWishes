<template>
  <div class="subs-tab">
    <ul>
      <div v-for="sub in subs" :key="sub.id" class="sub-item">
        <div class="sub-item-content">
          <label>{{sub.nick}}</label>
          <button @click="loadPublicLists(sub)">l</button>
          <div v-if="sub.lists" class="sub-lists">
            <div v-for="list in sub.lists" :key="list.id" class="sub-list">
              <label>{{list.title}}</label>
              <div class="sub-wishes">
                <div v-for="wish in list.wishes" :key="wish.id" class="sub-wish">
<!--                  {{wish.title}}-->
                  <wish-rec :model-value="wish" :editable="false"></wish-rec>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </ul>
  </div>
</template>

<script>
import axios from "axios";
import WishRec from "@/components/wish-rec";

export default {
  name: "subscriptions-tab",
  components: {WishRec},
  props: {
    subs: Array
  },
  methods: {
    loadPublicLists(sub) {
      if(!sub.lists) {
        axios.get(`http://localhost:3400/users/${sub.id}/lists`).then(response => {
          sub.lists = response.data;
        });
      }
      console.log(sub);
    }
  }
}
</script>

<style scoped>
  label {
    font-size: 18px;
    font-weight: bold;
  }

  .sub-item {
    margin: 9px;
  }
  .sub-item-content {
    display: flex;
    flex-direction: column;
  }
  .sub-lists {
    display: flex;
  }
  .sub-wishes {
    display: flex;
    flex-direction: column;
  }
</style>
