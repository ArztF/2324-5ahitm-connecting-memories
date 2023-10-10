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
import { parseJwt } from '@/utils/parseJwt.js';
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

  // get all events after every reload
  mounted() {
    axios
      .get("http://localhost:3000/event")
      .then((response) => (this.events = response.data.eventData))
      .catch(() => {
        console.log("error");
      });

    this.userId = sessionStorage.getItem("userToken");
    this.userId = this.parseJwt(this.userId);
    this.userId = this.userId.user.id;
  },

  methods: {
    parseJwt,

    // check if the user which is logged in is the owner of the event
    filteredList() {
      this.myEvents = this.events?.filter(
        (el) => el.owner?._id === this.userId
      );
      // return the event which he created
      return this.myEvents;
    },
  },
};
</script>