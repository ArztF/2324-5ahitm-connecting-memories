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
import { IonButton, useIonRouter } from "@ionic/vue";
import { presentToast } from '@/utils/toast.js';
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
        .get("http://localhost:8080/api/event/" + this.eventLink)
        .then((response) => {
          // save the event in a global variable
          this.existingEvent = response.data.existingEvent;
          this.userId = sessionStorage.getItem("userToken");
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
                "http://localhost:8080/api/event/" + this.eventLink,
                this.existingEvent
              )
              .then(() => {
                presentToast("Sie haben sich erfolgreich für dieses Event registriert!")
              });
              // display the error if he is already subscribed
          } else {
            presentToast("Sie haben sich bereits für dieses Event angemeldet!")
          }
        }).catch(() => {
          presentToast("Dieses Event gibt es nicht!")
        })
    },

    presentToast,
  },
};
</script>