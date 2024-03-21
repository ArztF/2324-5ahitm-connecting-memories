<template>
  <page-layout title="Profil">
  <div class="profile-container">
  <div class="profile-header">
    <h1>Profil</h1>
    <ion-icon :icon="settingsOutline"></ion-icon>
  </div>
  <div class="profile-info">
    <h2 id="prfile-name">Nico Obermair</h2>
    <p id="prfile-user">nico123</p>
    <p id="prfile-email">nico.obermair@gmail.com</p>
  </div>
  
  <div class="profile-actions">
    <button class="action-button saved">
      <ion-icon :icon="bookmarkOutline"></ion-icon>
      <p>Gespeichert</p>
    </button>
    <button class="action-button created">
      <ion-icon :icon="calendarOutline"></ion-icon>
      <p>Erstellte Events</p>
    </button>
  </div>
   <div class="profile-actions">
  <button class="action-button add-group">
    </button>
  </div>  
  <div class="groups-section">
  <h2>Gruppen</h2>
  <div class="group-buttons">
  <input type="radio" id="attend" name="group-selection" value="attend" checked>
  <label class="group-button-attend" for="attend">Beigetreten</label>

  <input type="radio" id="created" name="group-selection" value="created">
  <label class="group-button-created" for="created">Erstellt</label>
</div>
  <group-preview-card
      v-for="(group, index) in groups"
      :key="index"
      :group="group"
  />
  </div>
</div>
  </page-layout>
</template>

<script>
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  bookmarkOutline,
  calendarOutline,
  settingsOutline
} from "ionicons/icons";
export default {
  components: {
    GroupPreviewCard,
    PageLayout,
  },

  data() {
    return {
      groups: null,
      myGroups: null,
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
    
  
      //let id = sessionStorage.getItem("userToken")
    axios
      .get("http://localhost:8080/api/eventgroup/byOwnerId/" + 1)
      .then((response) => (this.groups = response.data))
      .catch(() => {
        console.log("error");
      });

    axios.get("http://localhost:8080/api/user/" + this.id).then((response) => {
  
      this.user = response.data;
      this.vorname = this.user.vorname;
      this.nachname = this.user.nachname;
      this.username = this.user.username;
      this.email = this.user.email;
    });
  },

  methods: {
  },

  setup() {
    const router = useRouter();
    return {
      bookmarkOutline,
      calendarOutline,
      settingsOutline,
      router,
    };
  },
};
</script>