<template>
  <page-layout title="Profil">
  <div class="profile-edit-header">
    <h1 class="profil-edit-heading">Profil bearbeiten</h1>
  </div>
  <div class="profile-edit-container">
    <input class="change-input" type="text" placeholder="Vorname" v-model="vorname"/>
    <input class="change-input" type="text" placeholder="Nachname" v-model="nachname"/>
    <input class="change-input" type="text" placeholder="Username" v-model="username"/>
    <input class="change-input" type="text" placeholder="Email" v-model="email"/>
    <input class="change-input" type="date" placeholder="Geburtsdatum" v-model="email"/>
    <input class="change-input" type="password" placeholder="Password" v-model="password"/>
    <input class="change-input" type="password" placeholder="Password wiederholen" v-model="password"/>
    <ion-button
        @click="onClickSubmit"
        class="change-profil-submit-button"
        type="submit"
        >DATEN SPEICHERN</ion-button>
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
      userId: this.$route.params.id,
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
    axios.get("http://localhost:8080/api/user/" + this.userId).then((response) => {
  
      this.user = response.data;
      this.vorname = this.user.vorname;
      this.nachname = this.user.nachname;
      this.username = this.user.username;
      this.email = this.user.email;
      this.password = this.user.password;
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
          .put("http://localhost:8080/api/user/" + this.userId, updateUser)
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