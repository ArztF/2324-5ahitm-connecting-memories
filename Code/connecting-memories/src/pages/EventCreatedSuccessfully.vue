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

    <div v-if="!publishedEvent">
      <h1>Mit folgendem Code können Sie andere Personen einladen!</h1>
      <div style="margin-top:40%">
        <div class="show-invitation-code-box">
          <input
            class="input-invitation-code"
            type="text"
            :value="this.eventId"
          />
        </div>
        <div class="show-invitation-code-box">
          <ion-button
            @click="publishedPrivateEvent"
            class="button-invitation-code"
            type="submit"
            >Fertig</ion-button
          >
        </div>
      </div>
    </div>
  </page-layout>
</template>

<script>
import axios from "axios";
import EventPreviewCard from "../components/EventPreviewCard.vue";
import PageLayout from "../components/PageLayout.vue";
import { useIonRouter } from "@ionic/vue";
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
    publishEvent() {
      console.log(this.event);
      if (!this.event.isPublic) {
        this.publishedEvent = false;
      } else {
        this.router.push("/");
      }
    },

    deleteEvent() {
      axios
        .delete("http://localhost:8080/api/event/" + this.eventId)
        .then((response) => (this.event = response.data.existingEvent));

      this.router.push("/");
    },

    publishedPrivateEvent() {
      this.router.push("/myevents");
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
      .then((response) => (this.event = response.data.existingEvent))
      .catch(() => {
        console.log("error");
      });
  },
};
</script>