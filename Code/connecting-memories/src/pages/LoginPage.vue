<template>
  <ion-page>
    <div class="login-content-wrapper" @keydown.enter="submitClicked()">
      <div id="login-back-button" >
          <ion-icon :icon="chevronBackOutline" @click="() => router.push('/', 'back', 'replace')" />
      </div>
      <div class="login">
        
        <input class="register-input" v-model="email" name="email" placeholder="Email" />
        <input class="register-input" v-model="password" type="password" name="password" placeholder="Passwort" />
        <p>Sie haben noch keinen Account? Hier <span @click="() => router.push('/registration', 'replace')" style="color: #ff5400; font-weight: bold;">registrieren</span></p>
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
      // check if the email and password input is empty
      if (!this.email.length == 0 && !this.password.length == 0) {
        // send a post to check in the backend if the user exists
        await axios
          .post("http://localhost:8080/api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            
            if (response.data.status != 403) {
              console.log(response.data);
              sessionStorage.setItem("userToken", response.data);
              let comeFromWhichPage = sessionStorage.getItem("comeFromWhichPage");
              if(comeFromWhichPage == "createEvent") {
                this.router.push('createevent', 'replace')
              } else {
                this.router.push('/', 'replace')
              }
              sessionStorage.setItem("comeFromWhichPage", "")
            }
          })
          .catch((res) => {
            backendErrorToast(res.response.data.message);
          });
      }
      // check if the email is valid
      if(this.email.length == 0 && !this.email.includes('@') ){
        this.invalidInputs.push("Etwas Stimmt nicht mit deiner Email");
      }
      // check if the password is valid
      if(this.password.length == 0 && this.password.length < 8){
        this.invalidInputs.push("Dein Passwort ist zu kurz");
      }
      // if there is an invalid input display the error
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