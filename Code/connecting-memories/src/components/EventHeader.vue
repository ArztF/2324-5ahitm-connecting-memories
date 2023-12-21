<template>
  <div>
    <ion-card>
      <ion-card-header>
        <ion-row class="group-header">
          <ion-col size="2">
            <ion-avatar>
              <ion-img
                :src="'http://localhost:8080/image/' + group?.image?.id"
                alt="Group Image"
              ></ion-img>
            </ion-avatar>
          </ion-col>
          <ion-col size="10" class="group-name-col">
            <ion-card-title class="group-name">{{
              group?.groupName
            }}</ion-card-title>
            <p style="text-align: left; padding-left: 16px">
              {{ group?.groupAdmin?.vorname }} {{ group?.groupAdmin?.nachname }}
            </p>
          </ion-col>
        </ion-row>
      </ion-card-header>
    </ion-card>
    <div style="margin-bottom: 150px">
      <h1 class="heading">Events</h1>
      <event-preview
        v-for="(event, index) in events"
        :key="index"
        :event="event"
      ></event-preview>
    </div>
  </div>
</template>

<script>
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";
import axios from "axios";
import { copyTextToClipboard } from "@/utils/copyText";
import { copyOutline, keyOutline } from "ionicons/icons";
import EventPreview from "./EventPreview.vue";

export default {
  methods: {
    keyOutline() {
      return keyOutline;
    },
    copyOutline() {
      return copyOutline;
    },
    copyTextToClipboard,
  },
  components: { EventPreview, IonCard, IonCardHeader, IonCardTitle },
  data() {
    return {
      events: null,
      groupParticipants: null,
    };
  },
  props: {
    group: {
      type: Object,
      required: true,
    },
  },

  async mounted() {
    let groupId = sessionStorage.getItem("groupId");
    //   await axios
    //       .get("http://localhost:8080/api/groupparticipant/")
    //       .then((response) => {
    //           this.groupParticipants = response.data
    //           let i = 0
    //           for(const user of this.groupParticipants) {
    //             if(i < 3) {
    //                 if(i == 2) {
    //                     this.participantText += user.username + ",..."
    //                 } else {
    //                     this.participantText += user.username * ", "
    //                     i++;
    //                 }
    //             }
    //           }
    //       })

    await axios
      .get("http://localhost:8080/api/event/getByGroupId/" + groupId)
      .then((response) => {
        this.events = response.data;
      });
  },
};
</script>

<style scoped>
/* Add your styles here */
ion-card {
    cursor: pointer;
}

.group-header {
    align-items: center;
    display: flex;
}

.group-name-col {
    display: block;
}

.group-name {
    margin-left: 16px; /* Adjust margin as needed */
}
</style>