<template>
  <div>
    <ion-header>
      <ion-toolbar>
        <div class="header-wrapper">
          <img
            @click="() => router.push('/', 'back')"
            class="logo"
            alt="Silhouette of mountains"
            src="../../public/assets/Logo-Nico.svg"
          />

          <h1 class="main-header-title">{{ headerTitle }}</h1>
          <ion-menu-button id="main-content"> </ion-menu-button>
        </div>
      </ion-toolbar>
    </ion-header>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <div class="menu-buttons" @click="onRedirectClicked('myevents')">Meine erstellten Events</div><br>
        <div
          class="menu-buttons"
          @click="onRedirectClicked('registeredEvents')"
        >
          Registrierte Events
        </div>
        <br />
        <div
          @click="onRedirectClicked('profile/' + this.userId)"
          class="menu-buttons"
        >
          Mein Profil
        </div>
        <br />
        <div
          @click="onRedirectClicked('createGroup')"
          class="menu-buttons"
        >
          Gruppe erstellen
        </div>
        <br />
        <div class="menu-buttons" @click="onClickLogout()">Abmelden</div>
      </ion-content>
    </ion-menu>
  </div>
</template>

<script>
import { useIonRouter } from "@ionic/vue";
// import { menuSlider } from "./MenuSlider.vue";
import {
  IonHeader,
  IonContent,
  IonMenu,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from "@ionic/vue";
import { menuOutline, arrowBackOutline } from "ionicons/icons";

export default {
  components: {
    IonHeader,
    IonContent,
    IonMenu,
    IonMenuButton,
    IonTitle,
    IonToolbar,
  },

  props: {
    headerTitle: {
      type: String,
      required: false,
    },
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
      menuOutline,
      arrowBackOutline,
    };
  },
  mounted() {
    let user = sessionStorage.getItem("userToken");
    if (user != null) {
      this.userId = user;
    }
  },
  data() {
    return {
      userId: String
    };
  },
  methods: {
    // logout function
    onClickLogout() {
      sessionStorage.removeItem("userToken");
      this.router.push("/");
    },


    onRedirectClicked(redirectLink) {
      let userToken = sessionStorage.getItem("userToken")
      if(userToken == null) {
        sessionStorage.setItem("comeFromWhichPage", "submitToEvent")
        this.router.push('/login')
      } else {
        this.router.push('/' + redirectLink)
      }
    }
  },
};
</script>