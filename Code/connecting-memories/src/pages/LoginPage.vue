<template>
  <ion-page>
    <div class="login-content-wrapper" @keydown.enter="submitClicked()">
      <div id="login-back-button" >
          <ion-icon :icon="chevronBackOutline" @click="() => router.push('/', 'back')" />
      </div>
      <div class="login">
        <input class="register-input" v-model="email" name="email" placeholder="Email" />
        <input class="register-input" v-model="password" type="password" name="password" placeholder="Passwort" />
        <p>Sie haben noch keinen Account? Hier <span @click="() => router.push('/registration')">registrieren</span></p>
        <ion-button @click="submitClicked()" class="login-submit-button" type="submit">LOGIN</ion-button>
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonButton,toastController, IonPage,IonIcon } from "@ionic/vue";
import axios from "axios";
import { chevronBackOutline } from "ionicons/icons";
import { useIonRouter } from '@ionic/vue';
import { backendErrorToast } from '@/utils/toast.js'

export default {
  components: {
    IonButton,
    IonPage,
    IonIcon
  },

  data() {
    return {
      email: "",
      password: "",
      user: null,
      invalidInputs: [],
    };
  },

  methods: {
    async submitClicked() {
      if (!this.email.length == 0 && !this.password.length == 0) {
        await axios
          .post("http://localhost:8080/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.status == 200) {
              console.log(response.data);
              sessionStorage.setItem("userToken", response.data);
              let comeFromWhichPage = sessionStorage.getItem("comeFromWhichPage");
              if(comeFromWhichPage == "createEvent") {
                this.router.push('createevent')
              } else {
                this.router.push('/')
              }
              sessionStorage.setItem("comeFromWhichPage", "")
            } else {
                backendErrorToast("Login war nicht erfolgreich");
            }
          })
      }
      if(this.email.length == 0 && !this.email.includes('@') ){
        this.invalidInputs.push("Etwas Stimmt nicht mit deiner Email");
      }
      if(this.password.length == 0 && this.password.length < 8){
        this.invalidInputs.push("Dein Passwort ist zu kurz");
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
        message: errorMessage,
        duration: 1500,
        cssClass: "custom-toast",
      });

      await toast.present();
      this.invalidInputs = [];
    },

    backendErrorToast
  },

  setup() {
    const router = useIonRouter();
    return {
      chevronBackOutline,
      router
    };
  },
};
</script>