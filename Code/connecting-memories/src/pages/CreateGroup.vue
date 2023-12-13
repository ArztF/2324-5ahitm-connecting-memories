<template>
  <page-layout title="Create Group">
    <div class="create-event" @keydown.enter="onClickSubmit()">
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
  </page-layout>
</template>

<script>
import PageLayout from "../components/PageLayout.vue";
import { useIonRouter } from "@ionic/vue";
import axios from "axios";

export default {
  components: { PageLayout },
  data() {
    return {
      groupName: "",
      groupDescription: "",
      invalidInputs: [],
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
      })
    },
  },
};
</script>
