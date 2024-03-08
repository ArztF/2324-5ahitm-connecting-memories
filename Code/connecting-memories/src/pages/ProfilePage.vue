<template>
  <page-layout title="Profil">
    <div class="profile-container">
  <header class="profile-header">
    <h1>Profil</h1>
    <ion-icon :icon="settingsOutline"></ion-icon>
  </header>
  
  <section class="profile-info">
    <h2 id="prfile-name"></h2>
    <p id="prfile-user"></p>
    <p id="prfile-email"></p>
  </section>
  
  <div class="profile-actions">
    <button class="action-button saved">
      <ion-icon :icon="bookmarkOutline"></ion-icon>
      Gespeichert
    </button>
    <button class="action-button created">
      <ion-icon :icon="calendarOutline"></ion-icon>
      Erstellte Events
    </button>
    <button class="action-button add-group">
      <ion-icon :icon="addCircleOutline"></ion-icon>
    </button>
  </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toastController } from "@ionic/vue";
import {
  addCircleOutline,
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
  setup() {
    const router = useIonRouter();
    return {
      addCircleOutline,
      bookmarkOutline,
      calendarOutline,
      settingsOutline,
      router,
    }
  },

  
  mounted() {
    axios.get("http://localhost:8080/api/user/" + this.id).then((response) => {
  
      this.user = response.data;
      this.vorname = this.user.vorname;
      this.nachname = this.user.nachname;
      this.username = this.user.username;
      this.email = this.user.email;

      document.getElementById('profile-name').textContent = vorname + ' ' + nachname;
      document.getElementById('profile-user').textContent = username;
      document.getElementById('profile-email').textContent = email;
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
      router,
    };
  },
};
</script>