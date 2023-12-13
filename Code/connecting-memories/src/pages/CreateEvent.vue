<template>
  <page-layout title="Create Event">
    <div class="create-event" @keydown.enter="onClickSubmit()">
      <input
        class="create-event-input"
        v-model="eventName"
        placeholder="Eventname"
      />
      <places-completion @location="getLocation"></places-completion>
      <input class="create-event-input" id="file" type="file" />
    <div class="create-event-label-flex-box">
        <label style="margin-left: 3%; font-weight: bold;">Startdate</label>
        <label style="margin-left: 37%; font-weight: bold;">Enddate</label>
    </div>
      <div class="create-event-no-flex-box">
        <input
          id="startdate"
          class="create-event-input"
          type="date"
          v-model="startDate"
        />
        <input class="create-event-input" type="date" v-model="endDate" />
      </div>
      <textarea
        class="create-event-input"
        type="text"
        placeholder="Beschreibung"
        v-model="description"
      />
      <div class="radio-container">
        <div class="radio-create-event">
          <label class="label-radio">
            <input
              type="radio"
              name="isPublicEvent"
              value="true"
              v-model="isPublicEvent"
            />
            <span>Öffentlich</span>
          </label>
          <label class="label-radio">
            <input
              type="radio"
              name="isPublicEvent"
              value="false"
              v-model="isPublicEvent"
            />
            <span>Privat</span>
          </label>
        </div>
      </div>
      <div class="create-event-no-flex-box">
        <select
          class="create-event-input"
          v-model="kategorie"
          value="Kategorie"
        >
          <option value="" selected disabled hidden>Kategorie</option>
          <option value="konzert">Konzert</option>
          <option value="festival">Festival</option>
          <option value="kultur">Kultur</option>
          <option value="business">Business</option>
          <option value="andere">Andere</option>
        </select>
        <input
          class="create-event-input"
          type="number"
          placeholder="Ticketpreis ab"
          v-model="ticketPrice"
        />
         <select
          class="create-event-input"
          v-model="groupId"
          value="Gruppen Id"
        >
          <option value="" selected disabled hidden>Gruppen Id</option>
            <option v-for="(group, index) in groups" :key="index" :value="group.id">{{ group.groupName }}</option>
        </select>
      </div>
      <br />
      <ion-button
        @click="onClickSubmit"
        class="create-event-submit-button"
        type="submit"
        >CREATE EVENT</ion-button
      >
    </div>
  </page-layout>
</template>

<script>
import { toastController } from "@ionic/vue";
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import { useIonRouter, IonButton } from "@ionic/vue";
import PlacesCompletion from '../components/PlacesCompletion.vue';
import { backendErrorToast } from '@/utils/toast.js'
export default {
  components: {
    PageLayout,
    IonButton,
    PlacesCompletion
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
      kategorie: "",
      ticketPrice: "",
      isPublicEvent: Boolean,
      invalidInputs: [],
      typedInLocation: "",
      groupId: 0,
      groups: [],
      userDetails: 0
    };
  },

  async mounted() {
    // dont let the user access this page if he isnt logged in
    let userToken = sessionStorage.getItem("userToken");
    if (userToken == null) {
      this.router.push("/login");
    } else {
      this.router.push("/createevent");
      this.userDetails = sessionStorage.getItem("userToken");
      console.log(typeof this.userDetails);
      await axios.get('http://localhost:8080/api/eventgroup/byOwnerId/' + this.userDetails).then((response) => {
        this.groups = response.data
        console.log(this.groups);
      })
    }
  },

  methods: {
    getLocation(location) {
      this.typedInLocation = location
    },

    // check if the values which are given from the user are all valid
    // the will be checked again in the backend
    async onClickSubmit() {
      if (this.eventName.length == 0) {
        // if the input isnt valid then it will be pushed in an error array which, will be presented to the user after all values are checked
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
      if (this.kategorie.length == 0) {
        this.invalidInputs.push("Kategorie");
      }
      if (this.ticketPrice.length == 0) {
        this.invalidInputs.push("Ticketpreis");
      }
      if (this.endDate < this.startDate && this.endDate.length > 0) {
        this.invalidInputs.push("Enddatum darf nicht vor Startdatum sein");
      }
      if(this.groupId == '') {
        this.invalidInputs.push('Gruppe')
      }
      if (this.isPublicEvent != "true" && this.isPublicEvent != "false") {
        this.invalidInputs.push("Public oder Private");
      } else {
        if (this.isPublicEvent == "true") {
          this.isPublicEvent = true;
        } else {
          this.isPublicEvent = false;
        }
      }

      const input = document.getElementById("file");
    const file = input.files[0]
    const formData = new FormData();
    formData.set("name", "test")
    formData.set("file", file)

      // if there is an error the POST will not be executed
      if (this.invalidInputs.length != 0) {
        this.presentToast();
        // after the error message is displayed all the values will be reset to nothing, in order to get no errors or wrong inputs
        this.eventName = "";
        this.eventLocation = "";
        this.startDate = "";
        this.endDate = "";
        this.description = "";
        this.kategorie = "";
        this.ticketPrice = "";
        this.isPublicEvent = null;
      } else {
        if (this.endDate.length == 0) {
          this.endDate = this.startDate;
        }
        let imageId;
        // first the image will be POSTED in the image Collection
        await axios
          .post("http://localhost:8080/image", formData)
          .then((response) => {
            imageId = response.data;
          })
        let user
        await axios
            .get("http://localhost:8080/api/user/" + this.userDetails)  
            .then((response) => {
              user = response.data
            })

        // then the event with the image id will be POSTED
        await axios
          .post("http://localhost:8080/api/event", {
            eventname: this.eventName,
            location: this.typedInLocation,
            locationcords: "HTL Leonding",
            bannerimg: {id: imageId},
            startdate: this.startDate,
            enddate: this.endDate,
            beschreibung: this.description,
            kategorie: this.kategorie,
            veranstalter: "HTL Leonding",
            ticketpreis: this.ticketPrice,
            isPublic: this.isPublicEvent,
            owner: {id: user.id},
            eventGroup: {id: this.groupId}
          })
          .then((response) => {
            console.log("respoonse" + response);
            sessionStorage.setItem("addedEvent", response.data)
            this.router.push("/event");
          })
          .catch((res) => {
            backendErrorToast(res.response.data);
            this.eventName = "";
            this.eventLocation = "";
            this.startDate = "";
            this.endDate = "";
            this.description = "";
            this.kategorie = "";
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
    backendErrorToast
  },
};
</script>
