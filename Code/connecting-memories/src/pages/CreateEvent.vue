<template>
  <page-layout title="Create Event">
    <div class="create-event-wrapper">
      <h2 class="create-event-heading">Erstellen Sie ihr <span>Event</span></h2>
      <div class="create-event" @keydown.enter="onClickSubmit">
        <input
          class="create-event-input"
          type="text"
          placeholder="Eventname"
          v-model="eventName"
        />
        <places-completion @location="getLocation"></places-completion>
        <label for="file" class="file-label">Image Upload</label>
        <input
          id="file"
          class="file-input"
          type="file"
          @change="onFileSelected"
        />
        <div class="date-picker">
          <input
            class="create-event-input"
            type="date"
            placeholder="Startdatum"
            v-model="startDate"
          />
          <input
            class="create-event-input"
            type="date"
            placeholder="Enddatum"
            v-model="endDate"
          />
        </div>

        <div class="radio-group">
          <input
            type="radio"
            id="public"
            name="event-type"
            value="public"
            class="radio-input"
          />
          <label for="public" class="radio-label">Public</label>

          <input
            type="radio"
            id="private"
            name="event-type"
            value="private"
            class="radio-input"
          />
          <label for="private" class="radio-label">Private</label>
        </div>

        <textarea
          class="create-event-input"
          placeholder="Beschreibung"
          v-model="description"
        ></textarea>
        <input
          class="create-event-input"
          type="text"
          placeholder="Ticketpreis"
          v-model="ticketPrice"
        />
        <select class="create-event-input" v-model="groupId" value="Gruppen Id">
          <option value="" selected disabled hidden>Gruppen Id</option>
          <option
            v-for="(group, index) in groups"
            :key="index"
            :value="group.id"
          >
            {{ group.groupName }}
          </option>
        </select>
        <ion-button
          @click="onClickSubmit"
          class="create-event-submit-button"
          type="submit"
          >CREATE EVENT</ion-button
        >
      </div>
    </div>
  </page-layout>
</template>

<script>
import { toastController } from "@ionic/vue";
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import { useIonRouter, IonButton } from "@ionic/vue";
import PlacesCompletion from "../components/PlacesCompletion.vue";
import { backendErrorToast } from "@/utils/toast.js";
import { parseJwt } from "@/utils/parseJwt.js";
export default {
  components: {
    PageLayout,
    IonButton,
    PlacesCompletion,
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  data() {
    return {
      eventName: "",
      eventLocation: "",
      startDate: "",
      endDate: "",
      description: "",
      ticketPrice: "",
      isPublicEvent: Boolean,
      invalidInputs: [],
      typedInLocation: "",
      groupId: 0,
      groups: [],
      userDetails: 0,
    };
  },

  async mounted() {
    let userToken = sessionStorage.getItem("userToken");
    if (userToken == null) {
      this.router.push("/login");
    } else {
      this.router.push("/createevent");
      this.userDetails = sessionStorage.getItem("userId");
      await axios
        .get(
          "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/eventgroup/byOwnerId/" +
            this.userDetails
        )
        .then((response) => {
          this.groups = response.data;
        });
    }
  },

  methods: {
    parseJwt,
    onFileSelected(event) {
      const fileName = event.target.files[0].name;
      document.querySelector(".file-label").textContent = fileName;
    },

    getLocation(location) {
      this.typedInLocation = location;
    },

    async onClickSubmit() {
      if (this.eventName.length == 0) {
        this.invalidInputs.push("Eventname");
      }
      if (this.typedInLocation.length == 0) {
        this.invalidInputs.push("Event Location");
      }
      if (this.startDate.length == 0) {
        this.invalidInputs.push("Datum");
      }
      if (this.description.length == 0) {
        this.invalidInputs.push("Beschreibung");
      }
      if (this.ticketPrice.length == 0) {
        this.invalidInputs.push("Ticketpreis");
      }
      if (this.endDate < this.startDate && this.endDate.length > 0) {
        this.invalidInputs.push("Enddatum darf nicht vor Startdatum sein");
      }
      if (this.groupId == "") {
        this.invalidInputs.push("Gruppe");
      }

      const input = document.getElementById("file");
      const file = input.files[0];
      const formData = new FormData();
      formData.set("name", "test");
      formData.set("file", file);

      if (this.invalidInputs.length != 0) {
        this.presentToast();
        this.eventName = "";
        this.eventLocation = "";
        this.startDate = "";
        this.endDate = "";
        this.description = "";
        this.ticketPrice = "";
        this.isPublicEvent = null;
      } else {
        if (this.endDate.length == 0) {
          this.endDate = this.startDate;
        }
        let imageId;
        await axios
          .post(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/image",
            formData
          )
          .then((response) => {
            imageId = response.data;
          });
        let user;
        await axios
          .get(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/" +
              this.userDetails
          )
          .then((response) => {
            user = response.data;
          });

        await axios
          .post(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/event",
            {
              eventname: this.eventName,
              location: this.typedInLocation,
              locationcords: "HTL Leonding",
              bannerimg: { id: imageId },
              startdate: this.startDate,
              enddate: this.endDate,
              beschreibung: this.description,
              veranstalter: "HTL Leonding",
              ticketpreis: this.ticketPrice,
              isPublic: "true",
              owner: { id: user.id },
              eventGroup: { id: this.groupId },
            }
          )
          .then((response) => {
            console.log(response);
            sessionStorage.setItem("addedEvent", response.data.id);
            this.router.push("/eventadded");
          })
          .catch((res) => {
            backendErrorToast(res.response.data);
            this.eventName = "";
            this.eventLocation = "";
            this.startDate = "";
            this.endDate = "";
            this.description = "";
            this.ticketPrice = "";
            this.isPublicEvent = null;
          });
      }
    },

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
    backendErrorToast,
  },
};
</script>
