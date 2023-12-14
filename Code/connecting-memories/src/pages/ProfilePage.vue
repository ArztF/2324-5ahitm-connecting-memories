<template>
  <page-layout title="Profil">
    <div class="profile-content-wrapper" style="margin-top: 35%;">
      <div class="profile">
        <input
          class="profile-input"
          v-model="vorname"
          name="vorname"
          placeholder="Vorname"
        />
        <input
          class="profile-input"
          name="nachname"
          v-model="nachname"
          placeholder="Nachname"
        />
        <input
          class="profile-input"
          v-model="username"
          placeholder="Benutzername"
        />
        <input
          class="profile-input"
          type="email"
          v-model="email"
          name="email"
          placeholder="Email"
        />
        <ion-button
          @click="onSubmitClicked"
          class="profile-submit-button"
          type="submit"
          >Profil bearbeiten</ion-button
        >
      </div>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import { toastController } from "@ionic/vue";

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
      router,
    };
  },
};
</script>