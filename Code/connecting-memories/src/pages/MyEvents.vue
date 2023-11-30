<template>
  <page-layout title="Meine Events">
    <event-preview-card
      v-for="(event, index) in filteredList()"
      :key="index"
      :event="event"
    />
  </page-layout>
</template>
<script>
import PageLayout from "../components/PageLayout.vue";
import EventPreviewCard from "../components/EventPreviewCard.vue";
import axios from "axios";
export default {
  components: { PageLayout, EventPreviewCard },

  data() {
    return {
      events: null,
      myEvents: null,
      userId: "",
    };
  },

  
  mounted() {
    axios
      .get("http://localhost:8080/api/event")
      .then((response) => (this.events = response.data.eventData))
      .catch(() => {
        console.log("error");
      });

    this.userId = sessionStorage.getItem("userToken");

  },

  methods: {

  
    filteredList() {
      this.myEvents = this.events?.filter(
        (el) => el.owner?._id === this.userId
      );
      
      return this.myEvents;
    },
  },
};
</script>