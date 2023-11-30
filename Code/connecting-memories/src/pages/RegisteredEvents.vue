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

 
  async mounted() {
    await axios
      .get("http://localhost:8080/api/event")
      .then((response) => {
 
        this.events = response.data.eventData;
  
        let userToken = sessionStorage.getItem("userToken");
        this.userId = userToken.user.id;
  
        for (let item of this.events) {
  
          if (!item.isPublic) {
  
            for (let parti of item.participants) {
  
              if (this.userId.localeCompare(parti._id) == 0) {
  
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
  
      let userToken = sessionStorage.getItem("userToken");
      this.userId = userToken.user.id;
  
      for (let item of this.events) {
  
        for (let participants of item.participants) {
  
          if (this.userId == participants) {
  
            this.filteredEvents.push(item);
          }
        }
      }
  
      return this.filteredEvents;
    },
  },
};
</script>