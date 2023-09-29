<template>
  <ion-page>
    <div class="registration-content-wrapper" @keydown.enter="submitClicked()">
      <div id="register-back-button">
        <ion-icon
          :icon="chevronBackOutline"
          @click="() => router.push('/login', 'back', 'replace')"
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
          >REGISTER</ion-button
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
      // check if the input fields are not empty
      if (
        this.vorname.length > 3 &&
        this.nachname.length > 3 &&
        this.username.length > 3 &&
        this.email.includes("@") &&
        this.password1.length >= 8 &&
        this.password1 === this.password2
      ) {
        // if they are correct create a json with the data which is pushed to the db
        const user = {
          vorname: this.vorname,
          nachname: this.nachname,
          username: this.username,
          email: this.email,
          password: this.password1,
          geburtsdatum: this.geburtsdatum,
          isVeranstalter: false,
        };
        // post the user in the db
        axios
          .post("http://localhost:3000/auth/register", user)
          .then((response) => {
            console.log(response);
            // forward the user
            this.router.push("/login", "forward", "replace");
          })
          .catch((res) => {
            this.backendErrorToast(res.response.data.message);
          });
      }
      // check if the inputs are valid
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
      // check vorname
      if (this.vorname.length < 3) {
        this.invalidInputs.push("Vorname");
      }
      // check nachname
      if (this.nachname.length < 3) {
        this.invalidInputs.push("Nachname");
      }
      // check username
      if (this.username.length < 3) {
        this.invalidInputs.push("Username");
      }
      // check email
      if (!this.email.includes("@")) {
        this.invalidInputs.push("Email");
      }
      // check password
      if (this.password1.length <= 8) {
        this.invalidInputs.push("Passwort");
      }
      // check password
      if (this.password1 !== this.password2) {
        this.invalidInputs.push(
          "Passwort stimmt nicht mit dem ersten Passwort überein!"
        );
      }
      // if there is an error display it
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

    async backendErrorToast(errMessage) {
      const toast = await toastController.create({
        message: errMessage,
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },
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