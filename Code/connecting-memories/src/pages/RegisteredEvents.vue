<template>
  <page-layout title="Registered Event">
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
import axios from "axios";
export default {
  components: {
    PageLayout,
    EventPreviewCardVue,
  },
  setup() {},

  data() {
    return {
      events: null,
      userId: "",
      filteredEvents: [],
    };
  },

  // get all events after every reload
  async mounted() {
    await axios
      .get("http://localhost:8080/api/event")
      .then((response) => {
        // save all events in a global variable
        this.events = response.data.eventData;
        // get the userToken, parse it and save it in a global variable
        let userToken = sessionStorage.getItem("userToken");
        this.userId = userToken.user.id;
        // itarate all the events
        for (let item of this.events) {
          // check if they are privat events
          if (!item.isPublic) {
            // iterate the participants array in the even
            for (let parti of item.participants) {
              // check if the userId and the participantsId match
              if (this.userId.localeCompare(parti._id) == 0) {
                // if they match push it to the array which is displayed
                this.filteredEvents.push(item);
              }
            }
          }
        }
      })
      .catch(() => {
        console.log("error");
      });
  },

  methods: {
    filteredList() {
      // get the userToken from the sessionStorage, parse it and save it to the global variable
      let userToken = sessionStorage.getItem("userToken");
      this.userId = userToken.user.id;
      // iterate all the events
      for (let item of this.events) {
        // iterate the participants array in the event
        for (let participants of item.participants) {
          // check if userId mathces with the participantsId
          if (this.userId == participants) {
            // push it to the array
            this.filteredEvents.push(item);
          }
        }
      }
      // return the array which is displayed
      return this.filteredEvents;
    },
  },
};
</script>