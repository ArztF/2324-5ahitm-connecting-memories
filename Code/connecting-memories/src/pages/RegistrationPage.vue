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
import { backendErrorToast } from "@/utils/toast.js";
import { parseJWT } from "@/utils/parseJwt.js";

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
    parseJWT,
    getAccessToken() {
      const body = {
        client_id: "cm_client",
        client_secret: "oP0MjdWi5ccfCzLEZ4UZvuKlys4VDdJt",
        grant_type: "client_credentials",
      };

      return axios.post("/realms/cmRealm/protocol/openid-connect/token", body, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });
    },

    async submitClicked() {
      if (
        this.vorname.length > 3 &&
        this.nachname.length > 3 &&
        this.username.length > 3 &&
        this.email.includes("@") &&
        this.password1.length >= 2 &&
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

        this.getAccessToken().then((response) => {
          this.createUser(user, response.data.access_token);
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

    backendErrorToast,

    createUser(user, token) {
      let registrationData = {
        username: user.email,
        email: user.email,
        firstName: user.vorname,
        lastName: user.nachname,
        enabled: true,
        credentials: [
          {
            type: "password",
            value: user.password,
            temporary: false,
          },
        ],
      };

      // Registrieren
      axios
        .post("/admin/realms/cmRealm/users", registrationData, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          axios
            .post(
              "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/register",
              user
            )
            .then(async () => {

              axios
                .get("/admin/realms/cmRealm/users?email=" + user.email, {
                  headers: { Authorization: "Bearer " + token },
                })
                .then((response) => {

                  const options = {
                    method: "put",
                    headers: {
                      Authorization: "Bearer " + token,
                      "Access-Control-Allow-Origin": "*",
                    },
                  };
                  fetch(
                    `/admin/realms/cmRealm/users/${response.data[0].id}/execute-actions-email?client_id=cm_client`,
                    options
                  );
                });
              const token2 = await this.submitClickedLogin(user);
              const uid = parseJWT(token2).sub;

              this.mapDefaultRole(uid, token);
              this.router.push("/login", "forward");
            })
        });
    },
    mapDefaultRole(uid, token) {
      axios
        .get(
          `/admin/realms/cmRealm/clients/6e105bf8-def4-474e-9802-2c2ab869a5b9/roles/default`,
          { headers: { authorization: "Bearer " + token } }
        )
        .then((role) => {
          this.mapRole(role, uid, token);
        });
    },

    mapRole(role, uid, token) {
      axios
        .post(
          `/admin/realms/cmRealm/users/${uid}/role-mappings/clients/6e105bf8-def4-474e-9802-2c2ab869a5b9`,
          [role],
          { headers: { authorization: "Bearer " + token } }
        )
        .then(() => {});
    },

    async submitClickedLogin(user) {
      await axios
        .post(
          "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/login",
          {
            email: user.email,
            password: user.password,
          }
        )
        .then(async (response) => {
          if (response.status == 200) {
            this.getAccessToken();
            let comeFromWhichPage = sessionStorage.getItem("comeFromWhichPage");
            if (comeFromWhichPage == "createEvent") {
              this.router.push("createevent");
            } else {
              this.router.push("/");
            }
            sessionStorage.setItem("comeFromWhichPage", "");
          } else {
            backendErrorToast("Login war nicht erfolgreich");
          }
        });
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