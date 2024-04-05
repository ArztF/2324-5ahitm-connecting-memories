<template>
  <page-layout :title="event?.eventname">
    <event-detail-content :event="event" />
    <div id="button-box">
      <ion-button
          @click="deleteEvent"
          id="publish-join-button"
          type="submit"
          >Teilnehmen</ion-button>
    </div>
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

  mounted () {

    axios
        .get("https://student.cloud.htl-leonding.ac.at/connecting-memories/api/event/" + this.eventId)
        .then((response) => {
          this.event = response.data
        ;})
        .catch(() => {
          console.log("error");
        });
  }
};
</script>