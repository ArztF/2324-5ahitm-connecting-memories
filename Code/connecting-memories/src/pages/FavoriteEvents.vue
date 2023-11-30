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
    let userToken = sessionStorage.getItem("userToken");
    await axios
      .get("http://localhost:8080/api/user/" + userToken)
      .then((response) => {
        
        this.users = response.data.existingUser;
        
        this.userId = response.data.existingUser._id;
        
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