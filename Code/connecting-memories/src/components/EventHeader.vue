<template>
  <p>Gruppen Admin: {{ groupAdmin?.vorname }} {{ groupAdmin?.nachname }}</p>
    <div class="event-preview-conten">
    <ion-icon :icon="keyOutline"></ion-icon>
    <p>{{ group?.id }}</p>
    <ion-icon
            :icon="copyOutline()"
            @click="copyTextToClipboard(group?.id)"
            class="copy-button"
    >Text kopieren</ion-icon
    >
    </div>
  <p>Diese Gruppe hat {{ groupParticipants }} Mitglieder</p>
</template>

<script>

import axios from "axios";
import {IonIcon} from "@ionic/vue";
import {copyTextToClipboard} from "@/utils/copyText";
import {copyOutline, keyOutline} from "ionicons/icons";
  export default {
      methods: {
          keyOutline() {
              return keyOutline
          },
          copyOutline() {
              return copyOutline
          }, copyTextToClipboard},
      components: {IonIcon},
      data () {
          return {
              groupAdmin: null,
              group: null,
              groupParticipants: null
          }
      },

      async mounted () {
          let id = sessionStorage.getItem("groupId")
          await axios
              .get("http://localhost:8080/api/eventgroup/getById/" + id)
              .then((response) => {
                  this.groupAdmin = response.data.groupAdmin
                  this.group = response.data
              })

          await axios
              .get("http://localhost:8080/api/groupparticipant/")
              .then((response) => {
                this.groupParticipants = response.data.length
              })
      }
  }
</script>