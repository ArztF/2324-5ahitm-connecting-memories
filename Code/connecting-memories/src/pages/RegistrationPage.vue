<template>
  <ion-page>
    <h1 class="registration-heading">Registrierung</h1>
    <div class="registration-content-wrapper" @keydown.enter="submitClicked()">
      <div id="register-back-button">
        <ion-icon
          :icon="chevronBackOutline"
          @click="() => router.push('/login', 'back')"
        />
      </div>
      <div class="register">
        <input
          class="register-input"
          v-model="vorname"
          name="vorname"
          placeholder="Vorname"
        />
        <input
          class="register-input"
          v-model="nachname"
          name="nachname"
          placeholder="Nachname"
        />
        <input
          class="register-input"
          v-model="username"
          name="username"
          placeholder="Benutzername"
        />
        <input
          class="register-input"
          type="email"
          v-model="email"
          name="email"
          placeholder="Email"
        />
        <input
          class="register-input"
          type="date"
          v-model="geburtsdatum"
          name="geburtsdatum"
          placeholder="Geburtsdatum"
        />
        <input
          class="register-input"
          type="password"
          v-model="password1"
          name="password1"
          placeholder="Passwort"
        />
        <input
          class="register-input"
          type="password"
          v-model="password2"
          name="password2"
          placeholder="Passwort wiederholen"
        />
        <ion-button
          @click="submitClicked"
          class="login-submit-button"
          type="submit"
          >REGISTRIEREN</ion-button
        >
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonPage, toastController, IonIcon } from "@ionic/vue";
import axios from "axios";
import { useIonRouter } from "@ionic/vue";
import { chevronBackOutline } from "ionicons/icons";
import { backendErrorToast } from '@/utils/toast.js'

export default {
  components: {
    IonPage,
    IonIcon,
  },

  data() {
    return {
      vorname: "",
      nachname: "",
      username: "",
      email: "",
      password1: "",
      password2: "",
      geburtsdatum: null,
      invalidInputs: [],
    };
  },

  methods: {
    async submitClicked() {
      if (
        this.vorname.length > 3 &&
        this.nachname.length > 3 &&
        this.username.length > 3 &&
        this.email.includes("@") &&
        this.password1.length >= 8 &&
        this.password1 === this.password2
      ) {
    
        const user = {
          vorname: this.vorname,
          nachname: this.nachname,
          username: this.username,
          email: this.email,
          password: this.password1,
          geburtsdatum: this.geburtsdatum,
          isVeranstalter: false,
        };
        
        axios
          .post("http://localhost:8080/api/user/register", user)
          .then((response) => {
            console.log(response);
            
            this.router.push("/login", "forward");
          })
          .catch((res) => {
            backendErrorToast(res.response.data.message);
          });
      }
      
      if (
        this.vorname.length < 3 &&
        this.nachname.length < 3 &&
        this.username.length < 3 &&
        !this.email.includes("@") &&
        this.password1.length <= 8 &&
        this.password1 !== this.password2
      ) {
        this.invalidInputs.push("Es darf kein Feld leer sein!");
      }
      
      if (this.vorname.length < 3) {
        this.invalidInputs.push("Vorname");
      }
      
      if (this.nachname.length < 3) {
        this.invalidInputs.push("Nachname");
      }
      
      if (this.username.length < 3) {
        this.invalidInputs.push("Username");
      }
      
      if (!this.email.includes("@")) {
        this.invalidInputs.push("Email");
      }
      
      if (this.password1.length <= 8) {
        this.invalidInputs.push("Passwort");
      }
      
      if (this.password1 !== this.password2) {
        this.invalidInputs.push(
          "Passwort stimmt nicht mit dem ersten Passwort überein!"
        );
      }
      
      if (this.invalidInputs.length != 0) {
        this.presentToast();
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

    backendErrorToast,
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
      chevronBackOutline,
    };
  },
};
</script>