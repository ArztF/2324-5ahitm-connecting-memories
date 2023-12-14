<template>
    <page-layout title="Gruppe Beitreten">
        <ion-card
            class="ion-card-container"
            @click="showEventsInGroup"
        >
        
        <ion-card-header class="event-preview-header">
            <div class="event-preview-name-icon-wrapper">
                <ion-card-title class="event-preview-title">
                    {{ group?.groupName }}
                </ion-card-title>
                <slot />
            </div>
        </ion-card-header>
        </ion-card>

         <div class="show-invitation-code-box">
          <ion-button
            @click="submitToGroup"
            class="button-invitation-code"
            type="submit"
            >Beitreten</ion-button
          >
        </div>
    </page-layout>
</template>

<script>
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import { IonCard, IonCardHeader, IonCardTitle } from "@ionic/vue";

export default {
  components: { PageLayout, IonCard, IonCardHeader, IonCardTitle },
  data() {
    return {
      groupId: 0,
      group: null,
      userId: 0
    };
  },

  async mounted() {
    this.userId = sessionStorage.getItem("userToken");
    this.groupId = this.$route.query.id;
    console.log(this.groupId);

    await axios
      .get("http://localhost:8080/api/eventgroup/getById/" + this.groupId)
      .then((response) => {
        this.group = response.data;
        console.log(this.group);
      });
  },

  methods: {
    async submitToGroup() {
        await axios.post('http://localhost:8080/api/groupparticipant/signUpToGroup', {
            customer: {id: this.userId},
            eventGroup: {id: this.groupId}
        }).then((response) => {
            console.log(response);
        })
    }
  }
};
</script>