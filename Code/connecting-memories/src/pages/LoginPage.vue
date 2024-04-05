<template>
  <ion-page>
    <h1 class="login-heading">Login</h1>
    <div class="login-content-wrapper" @keydown.enter="submitClicked()">
      <div id="login-back-button">
        <ion-icon
          :icon="chevronBackOutline"
          @click="() => router.push('/', 'back')"
        />
      </div>
      <div class="login">
        <input
          class="register-input"
          v-model="email"
          name="email"
          placeholder="Email"
        />
        <input
          class="register-input"
          v-model="password"
          type="password"
          name="password"
          placeholder="Passwort"
        />
        <p>
          Sie haben noch keinen Account? Hier
          <span @click="() => router.push('/registration')">registrieren</span>
        </p>
        <ion-button
          @click="submitClicked()"
          class="login-submit-button"
          type="submit"
          >LOGIN</ion-button
        >
      </div>
    </div>
  </ion-page>
</template>

<script>
import { IonButton, toastController, IonPage, IonIcon } from "@ionic/vue";
import axios from "axios";
import { chevronBackOutline } from "ionicons/icons";
import { useIonRouter } from "@ionic/vue";
import { backendErrorToast } from "@/utils/toast.js";
import { parseJwt } from "@/utils/parseJwt.js";

export default {
  components: {
    IonButton,
    IonPage,
    IonIcon,
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
    parseJwt,
    async submitClicked() {
      if (!this.email.length == 0 && !this.password.length == 0) {
        await axios
          .post(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/login",
            {
              email: this.email,
              password: this.password,
            }
          )
          .then(async (response) => {
            if (response.status == 200) {
              sessionStorage.setItem("userId", response.data);
              console.log(response);
              console.log("beidl");
              this.getAccessToken();
            }
          });
      }
      if (this.email.length == 0 && !this.email.includes("@")) {
        this.invalidInputs.push("Etwas Stimmt nicht mit deiner Email");
      }
      if (this.password.length == 0 && this.password.length < 8) {
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

    backendErrorToast,

    getAccessToken() {
      const body = {
        client_id: "cm_client",
        client_secret: "bp5HJf8tPamuekr4wAUuMSTFFxc6nLLS",
        grant_type: "client_credentials",
      };

      axios
        .post("/realms/cmRealm/protocol/openid-connect/token", body, {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        })
        .then((response) => {
          console.log(response.data.access_token);
          this.getUserToken(response.data.access_token);
        })
        .catch(() => {
          this.presentToast(
            "User existiert nicht oder Email wurde noch nicht bestätigt."
          );
        });
    },

    getUserToken(token) {
      console.log("beidl2");
      const body = {
        client_id: "cm_client",
        client_secret: "bp5HJf8tPamuekr4wAUuMSTFFxc6nLLS",
        grant_type: "password",
        username: this.email,
        password: this.password,
      };
      console.log(body);

      axios
        .get("/admin/realms/cmRealm/users?email=" + this.email, {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          console.log(response);
          if (!response.data[0].emailVerified) {
            this.backendErrorToast("Email wurde noch nicht verifiziert!");
            return;
          } else {
            axios
              .post("realms/cmRealm/protocol/openid-connect/token", body, {
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              })
              .then((response) => {
                sessionStorage.setItem("userToken", response.data.access_token);
                this.router.push("/");
              });
          }
        })
        .catch(() => {
          backendErrorToast(
            "User existiert nicht oder Email wurde noch nicht bestätigt."
          );
        });
    },
  },

  setup() {
    const router = useIonRouter();
    return {
      chevronBackOutline,
      router,
    };
  },
};
</script>