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

  
  mounted() {
    let userToken = sessionStorage.getItem("userToken");
    
    if (!userToken) {
      this.router.push("/login");
    } else {
      this.router.push("/submittoevent");
    }
  },

  methods: {
    onClickSubmit() {
      
      axios
        .get("http://localhost:8080/api/event/" + this.eventLink)
        .then((response) => {
          
          this.existingEvent = response.data.existingEvent;
          this.userId = sessionStorage.getItem("userToken");
          
          for(let participants of this.existingEvent.participants) {
          
            if(participants._id == this.userId.user.id) {
              this.checkIfAlreadySubscribed = true;
            }
          }
          
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