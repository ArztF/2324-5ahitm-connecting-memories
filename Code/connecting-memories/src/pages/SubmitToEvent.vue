<template>
  <page-layout title="Submit To Event">
    <div class="submit-to-event">
      <input
        placeholder="Einladungscode eingeben"
        class="submit-to-event-input"
        v-model="eventLink"
      />
      <ion-button
        @click="onClickSubmit()"
        class="submit-to-event-button"
        type="submit"
        >Bestätigen</ion-button
      >
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import { IonButton, useIonRouter, toastController } from "@ionic/vue";
import axios from "axios";

export default {
  components: { PageLayout, IonButton },
  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  data() {
    return {
      eventLink: "",
      existingEvent: Event,
      userId: Number,
      checkIfAlreadySubscribed: false,
    };
  },

  // get the userToken from the session storage
  mounted() {
    let userToken = sessionStorage.getItem("userToken");
    // if not logged in then forward the user to the login page
    if (!userToken) {
      this.router.push("/login");
    } else {
      this.router.push("/submittoevent");
    }
  },

  methods: {
    onClickSubmit() {
      // get the event with the eventLink which is put in
      axios
        .get("http://localhost:3000/event/" + this.eventLink)
        .then((response) => {
          // save the event in a global variable
          this.existingEvent = response.data.existingEvent;
          let userToken = sessionStorage.getItem("userToken");
          this.userId = this.parseJwt(userToken);
          // iterate the all the participants from the event
          for(let participants of this.existingEvent.participants) {
            // if the user is already in the array set the boolean to true
            if(participants._id == this.userId.user.id) {
              this.checkIfAlreadySubscribed = true;
            }
          }
          // if he is not subscribed push it to the array and update the event
          if(!this.checkIfAlreadySubscribed) {
            this.existingEvent.participants.push(this.userId.user.id);
            axios
              .put(
                "http://localhost:3000/event/" + this.eventLink,
                this.existingEvent
              )
              .then(() => {
                this.presentToastSuccess();
                //this.router.push("/registeredEvents", 'replace')
              });
              // display the error if he is already subscribed
          } else {
            this.presentToastAlreadySubscribed();
          }
        }).catch(() => {
          this.presentToastError();
        })
    },

    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    },

    async presentToastError() {
      const toast = await toastController.create({
        message: "Dieses Event gibt es nicht!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },

    async presentToastSuccess() {
      const toast = await toastController.create({
        message: "Sie haben sich erfolgreich für dieses Event registriert!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },

    async presentToastAlreadySubscribed() {
      const toast = await toastController.create({
        message: "Sie haben sich bereits für dieses Event angemeldet!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },
  },
};
</script>