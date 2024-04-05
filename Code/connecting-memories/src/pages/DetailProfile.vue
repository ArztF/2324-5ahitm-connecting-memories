<template>
  <page-layout title="Profil">
  <div class="profile-container">
  <div class="profile-header">
    <h1>Profil</h1>
    <ion-icon :icon="pencilOutline"></ion-icon>
  </div>
  <div class="profile-info-box">
    <h2 class="profile-info-name">Nico Obermair</h2>
    <p class="profile-infos">nico123</p>
    <p class="profile-infos">nico.obermair@gmail.com</p>
    <p class="profile-infos">Beigentreten am: 10.4.2021</p>
  </div>
  <div class="event-preview-heading">
        <h3 class="event-box-heading">Teilgenommene Events</h3>
        <p class="more-events">zeige mehr</p>
  </div>

</div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  pencilOutline
} from "ionicons/icons";
export default {
  components: {
    PageLayout,
  },

  data() {
    return {
      id: this.$route.params.id,
      vorname: "",
      nachname: "",
      username: "",
      email: "",
      password: "",
      user: null,
      invalidInputs: [],
    };
  },
   
  

  
  mounted() {
    axios.get("https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/" + this.id).then((response) => {
  
      this.user = response.data;
      this.vorname = this.user.vorname;
      this.nachname = this.user.nachname;
      this.username = this.user.username;
      this.email = this.user.email;
    });
  },


  setup() {
    const router = useRouter();
    return {
      pencilOutline,
      router,
    };
  },
};
</script>
