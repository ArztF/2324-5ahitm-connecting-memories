<template>
  <page-layout title="Edit Event">
    <div class="create-event" @keydown.enter="onClickSubmit()">
      <event-preview-card
        style="margin-bottom: -1%"
        :isClickable="false"
        :event="updateValues"
      ></event-preview-card>
      <div class="create-event1">
        <input
          style="width: 45%"
          class="create-event-input"
          placeholder="Eventname"
          v-model="currentEventName"
        />
        <input
          style="width: 46%"
          class="create-event-input"
          v-model="currentEventLocation"
          placeholder="Ort"
        />
      </div>
      <textarea
        class="create-event-input"
        type="text"
        placeholder="Beschreibung"
        v-model="currentDescription"
      />
      <br />
      <div class="create-event-label-flex-box" style="margin-top: -4%">
        <label style="margin-left: 3%; font-weight: bold">Startdate</label>
        <label style="margin-left: 25%; font-weight: bold">Enddate</label>
      </div>
      <div class="create-event-no-flex-box">
        <input
          id="startdate"
          class="create-event-input"
          type="date"
          :value="startdate"
        />
        <input class="create-event-input" type="date" :value="enddate" />
      </div>

      <ion-button
        @click="onClickSubmit"
        class="create-event-submit-button"
        type="submit"
        >SAVE CHANGES</ion-button
      >
    </div>
  </page-layout>
</template>

<script>
import { toastController } from "@ionic/vue";
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import { useIonRouter, IonButton } from "@ionic/vue";
import EventPreviewCard from "../components/EventPreviewCard.vue";
import dayjs from "dayjs";
import de from "dayjs/locale/de";

export default {
  components: {
    PageLayout,
    IonButton,
    EventPreviewCard,
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  // with every reload of the page it will get all events from the db an will be saved in the global variable event
  mounted() {
    axios
      .get("http://localhost:3000/event/" + this.eventId)
      .then((response) => {
        this.event = response.data.existingEvent;
        this.currentEventName = this.event?.eventname;
        this.currentEventLocation = this.event?.location;
        this.currentDescription = this.event?.beschreibung;
      })
      .catch(() => {
        console.log("error");
      });
    // format the date
    this.startdate = this.formatDate(this.event?.startdate);
    this.enddate = this.formatDate(this.event?.enddate);
  },

  computed: {
    // create a json to update the event with the new data
    updateValues() {
      let updateEvent = {
        eventname: this.currentEventName,
        location: this.currentEventLocation,
        beschreibung: this.currentDescription,
        bannerimg: this.event?.bannerimg,
        startdate: this.startdate,
        enddate: this.enddate,
      };
      return updateEvent;
    },
  },

  data() {
    return {
      eventName: "",
      eventLocation: "",
      startDate: "",
      endDate: "",
      description: "",
      currentEventName: "",
      currentEventLocation: "",
      currentDescription: "",
      currentStartDate: "",
      currentEndDate: "",
      event: null,
      eventId: this.$route.params.id,
      date: null,
    };
  },

  methods: {
    // function to update the event
    async onClickSubmit() {
      await axios
        .put("http://localhost:3000/event/" + this.eventId, this.updateValues)
        .then((response) => {
          console.log(response);
          this.router.push("/event", "replace");
        });
    },

    // format the date in the following format YYYY-MM-DD
    formatDate(inDate) {
      dayjs.locale(de);
      const date = dayjs(inDate);
      return date.format("YYYY-MM-DD");
    },

    // if there are invalid inputs the following message will be displayed
    async presentToast() {
      let errorMessage = "";
      for (let i = 0; i < this.invalidInputs.length; i++) {
        if (this.invalidInputs.length - 1 == i) {
          errorMessage += this.invalidInputs[i] + " ";
        } else {
          errorMessage += this.invalidInputs[i] + ", ";
        }
      }
      const toast = await toastController.create({
        message: errorMessage + "dürfen nicht leer sein!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
      this.invalidInputs = [];
    },
  },
};
</script>