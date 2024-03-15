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
  </div>
</div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toastController } from "@ionic/vue";
import {
    bookmarkOutline,
  calendarOutline,
  settingsOutline
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
      currentVorname: "",
      currentNachname: "",
      currentEmail: "",
      currentUsername: "",
      user: null,
      invalidInputs: [],
    };
  },
   
  

  
  mounted() {
    axios.get("http://localhost:8080/api/user/" + this.id).then((response) => {
  
      this.user = response.data;
      this.vorname = this.user.vorname;
      this.nachname = this.user.nachname;
      this.username = this.user.username;
      this.email = this.user.email;
    });
  },

  methods: {

    async onSubmitClicked() {
      let updateUser;
  
      if (
        this.vorname.length < 3 &&
        this.nachname.length < 3 &&
        this.username.length < 3 &&
        this.email.includes("@")
      ) {
  
        this.invalidInputs.push("Ihre Eingaben sind leider nicht valid!");
        this.presentToast(this.invalidInputs);
      }
  
      if (this.invalidInputs.length == 0) {
        updateUser = {
          vorname: this.vorname,
          nachname: this.nachname,
          username: this.username,
          email: this.email,
        };
  
        await axios
          .put("http://localhost:8080/api/user/" + this.id, updateUser)
          .then((response) => {
            console.log(response);
          });
      }
    },

    async presentToast() {
      let errorMessage = "";
      for (let i = 0; i < this.invalidInputs.length; i++) {
        if (this.invalidInputs.length - 1 == i) {
          errorMessage += this.invalidInputs[i] + " ";
        } else {
          errorMessage += this.invalidInputs[i] + ", ";
        }
      }
      const toast = await toastController.create({
        message: errorMessage + "darf nicht leer sein!",
        duration: 1500,
        cssClass: "custom-toast",
      });

      await toast.present();
      this.invalidInputs = [];
    },
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