<template>
  <page-layout :title="event?.eventname">
    <event-detail-content :event="event" />
  </page-layout>
</template>

<script>
import {
  calendarOutline,
  locationOutline,
  addCircleOutline,
  enterOutline,
  searchOutline,
} from "ionicons/icons";
import PageLayout from "@/components/PageLayout.vue";
import EventDetailContent from "@/components/EventDetailContent.vue";
import axios from "axios";

export default {
  components: { PageLayout, EventDetailContent },
  setup() {
    return {
      locationOutline,
      calendarOutline,
      addCircleOutline,
      enterOutline,
      searchOutline,
    };
  },

  data() {
    return {
      eventId: this.$route.params.id,
      event: null
    };
  },
  // with every reload of the page it will get all events from the db an will be saved in the global variable event
  mounted () {
    axios
        .get("http://localhost:3000/event/" + this.eventId)
        .then((response) => (this.event = response.data.existingEvent))
        .catch(() => {
          console.log("error");
        });
  }
};
</script>