<template>
  <page-layout :title="event?.eventname">
    <div v-if="publishedEvent">
      <h1>Your Event will look like this</h1>
      <event-preview-card :event="event" :isClickable="isPreviewClickable" />
      <div class="publish-delete-class">
        <ion-button
          @click="publishEvent"
          class="login-submit-button"
          type="submit"
          >PUBLISH</ion-button
        >
        <ion-button
          @click="deleteEvent"
          class="login-submit-button"
          type="submit"
          >DELETE</ion-button
        >
      </div>
    </div>
  </page-layout>
</template>

<script>
import axios from "axios";
import EventPreviewCard from "../components/EventPreviewCard.vue";
import PageLayout from "../components/PageLayout.vue";
import { useIonRouter } from "@ionic/vue";
import {presentToast} from "../utils/toast"

export default {
  components: {
    EventPreviewCard,
    PageLayout,
  },

  data() {
    return {
      event: null,
      eventId: "",
      isPreviewClickable: false,
      publishedEvent: true,
    };
  },

  methods: {
    presentToast,
    publishEvent() {
      this.presentToast("Event wurde erfolgreich erstellt!")
      this.router.push("/");
    },

    deleteEvent() {
      axios
        .delete("http://localhost:8080/api/event/" + this.eventId)
        .then((response) => {
          this.event = response.data
          this.presentToast("Event wurde nicht erstellt!")
          this.router.push("/");
        });

    },
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  mounted() {
    this.eventId = sessionStorage.getItem("addedEvent");
    axios
      .get("http://localhost:8080/api/event/" + this.eventId)
      .then((response) => {
        console.log(response);
        this.event = response.data
      })
      .catch(() => {
        console.log("error");
      });
  },
};
</script>