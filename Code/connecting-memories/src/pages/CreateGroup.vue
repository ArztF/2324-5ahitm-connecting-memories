<template>
  <page-layout title="Create Group">
    <div v-if="!groupCreated" class="create-event" @keydown.enter="onClickSubmit()">
      <input
        class="create-event-input"
        v-model="groupName"
        placeholder="Gruppenname"
      />
      <input class="create-event-input" id="file" type="file" />
      <textarea
        class="create-event-input"
        type="text"
        placeholder="Beschreibung"
        v-model="groupDescription"
      />
      <ion-button
        @click="onClickSubmit"
        class="create-event-submit-button"
        type="submit"
        >CREATE GROUP</ion-button
      >
    </div>

    <div v-if="groupCreated">
      <h1>Mit folgendem Link können Sie andere Personen einladen!</h1>
      <div style="margin-top:40%">
        <div class="show-invitation-code-box">
          <input
            class="input-invitation-code"
            type="text"
            :value="invitationLink"
          />
        </div>
        <div class="show-invitation-code-box">
          <ion-button
            @click="publishedGroup"
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
import PageLayout from "../components/PageLayout.vue";
import { useIonRouter } from "@ionic/vue";
import axios from "axios";
import {presentToast} from "../utils/toast"

export default {
  components: { PageLayout },
  data() {
    return {
      groupName: "",
      groupDescription: "",
      invalidInputs: [],
      groupCreated: false,
      invitationLink: ""
    };
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  mounted() {
    let userToken = sessionStorage.getItem("userToken");
    if (userToken == null) {
      this.router.push("/login");
    } else {
      this.router.push("/creategroup");
    }
  },

  methods: {
    presentToast,
   async onClickSubmit() {
      if(this.groupName.length == 0) {
        this.invalidInputs.push('Gruppenname')
      }
      if(this.groupDescription.length == 0) {
        this.invalidInputs.push('Gruppen Beschreibung')
      }
      
      let userDetails = sessionStorage.getItem("userToken");

      const input = document.getElementById("file");
      const file = input.files[0]
      const formData = new FormData();
      formData.set("name", "test")
      formData.set("file", file)
      
      let imageId
      await axios
        .post("http://localhost:8080/image", formData)
        .then((response) => {
            imageId = response.data;
        })
      let user

      await axios
        .get("http://localhost:8080/api/user/" + userDetails)  
        .then((response) => {
            user = response.data
        })
        
      await axios.post('http://localhost:8080/api/eventgroup/addEventGroup', {
        groupName: this.groupName,
        description: this.groupDescription,
        groupAdmin: {id: user.id},
        image: {id: imageId}
      }).then((response) => {
        this.presentToast("Gruppe wurde erstellt")
        this.invitationLink = 'http://localhost:8081/#/submitToGroup?id=' + response.data.id
        this.groupCreated = true
      })
    },

    publishedGroup() {
      this.router.push('/')
    }
  },
};
</script>
