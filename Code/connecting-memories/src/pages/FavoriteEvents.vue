<template>
  <page-layout title="Favorite Events">
    <div class="event-preview-card-wrapper">
      <event-preview-card-vue
        v-for="(event, index) in filteredEvents"
        :key="index"
        :event="event"
      />
    </div>
  </page-layout>
</template>
  
  <script>
import PageLayout from "@/components/PageLayout.vue";
import EventPreviewCardVue from "../components/EventPreviewCard.vue";
import { parseJwt } from '@/utils/parseJwt.js';
import axios from "axios";
export default {
  components: {
    PageLayout,
    EventPreviewCardVue,
  },
  setup() {},

  data() {
    return {
      users: null,
      userId: "",
      filteredEvents: [],
    };
  },

  async mounted() {
    // get the userToken from the sessionStorage and then parse them
    let userToken = sessionStorage.getItem("userToken");
    userToken = this.parseJwt(userToken).user.id;
    // get the logged in user from the db
    await axios
      .get("http://localhost:8080/api/user/" + userToken)
      .then((response) => {
        // save the user
        this.users = response.data.existingUser;
        // save the userId
        this.userId = response.data.existingUser._id;
        // iterate the favouriteEvents entity and push them to the global variable
        for (let item of this.users.favouriteEvents) {
          this.filteredEvents.push(item);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  },

  methods: {
    filteredList() {
      // get the userToken from the session storage and parse it
      let userToken = sessionStorage.getItem("userToken");
      userToken = this.parseJwt(userToken);
      this.userId = userToken.user.id;
      // iterate all the events
      for (let item of this.events) {
        // iterate the participants entity from the event
        for (let participants of item.participants) {
          // check if the userId and the participants match
          if (this.userId == participants) {
            // then push it to the array
            this.filteredEvents.push(item);
          }
        }
      }
      // return
      return this.filteredEvents;
    },

    parseJwt
  },
};
</script>