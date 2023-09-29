<template>
  <div>
    <!-- TODO: Image Source Should be a prop too -->
    <img
      alt="Silhouette of mountains"
      :src="'http://localhost:3000/image/' + event?.bannerimg"
    />
    <ion-card-title class="eventDetailHeadline"
      >{{ event?.eventname }}
    </ion-card-title>
    <div class="event-preview-header-icon-box">
      <ion-icon :icon="imageOutline"></ion-icon>
      <ion-icon
        v-if="!favorized"
        @click="favorizeEvent(event?._id)"
        :icon="bookmarkOutline"
      ></ion-icon>
      <ion-icon v-else @click="favorizeEvent()" :icon="bookmark"></ion-icon>
      <ion-icon @click="editEvent" :icon="pencilOutline"></ion-icon>
    </div>
    <ion-card-content>
      <div class="event-preview-content">
        <ion-icon :icon="locationOutline"></ion-icon>
        <p id="event-location-detail" @click="setOpen(true)">
          {{ event?.location }}
        </p>
        <ion-modal :is-open="isOpen">
          <ion-header>
            <h1></h1>
          </ion-header>
          <div class="small-map-wrapper">
            <small-map :cords="cords" />
          </div>
          <div class="footer">
            <ion-icon
              @click="setOpen(false)"
              :icon="arrowBackOutline"
              size="large"
            ></ion-icon>
          </div>
        </ion-modal>
      </div>
      <div class="event-preview-content">
        <ion-icon :icon="calendarOutline"></ion-icon>
        <p>{{ formatDate(event?.startdate, event?.enddate) }}</p>
      </div>
      <div class="event-preview-content">
        <ion-icon :icon="megaphoneOutline"></ion-icon>
        <p>{{ event?.veranstalter }}</p>
      </div>
      <div class="event-preview-content">
        <ion-icon :icon="ticketOutline"></ion-icon>
        <p>ab {{ event?.ticketpreis }}€</p>
      </div>
      <div v-if="!event?.isPublic" class="event-preview-content">
        <ion-icon :icon="keyOutline"></ion-icon>
        <p>{{ event?._id }}</p>
        <ion-icon
          :icon="copyOutline"
          @click="copyTextToClipboard(event?._id)"
          class="copy-button"
          >Text kopieren</ion-icon
        >
      </div>
      <div class="event-preview-content-category">
        <p style="text-align: left; margin-top: 1%">{{ event?.kategorie }}</p>
      </div>
      <p style="text-align: left; margin-top: 3%">{{ event?.beschreibung }}</p>
    </ion-card-content>
  </div>
</template>

<script>
import {
  calendarOutline,
  locationOutline,
  openOutline,
  arrowBackOutline,
  ticketOutline,
  pricetagOutline,
  megaphoneOutline,
  keyOutline,
  copyOutline,
  bookmarkOutline,
  bookmark,
  imageOutline,
  pencilOutline,
} from "ionicons/icons";
import { IonCardTitle, IonIcon, IonHeader, IonCardContent } from "@ionic/vue";
import { IonModal } from "@ionic/vue";
import SmallMap from "./SmallMap.vue";
import { useIonRouter } from "@ionic/vue";
import dayjs from "dayjs";
import de from "dayjs/locale/de";
import axios from "axios";
import Clipboard from "clipboard";
import { toastController } from "@ionic/vue";

export default {
  components: {
    SmallMap,
    IonModal,
    IonCardTitle,
    IonIcon,
    IonHeader,
    IonCardContent,
  },
  setup() {
    const router = useIonRouter();
    return {
      router,
      locationOutline,
      calendarOutline,
      openOutline,
      arrowBackOutline,
      ticketOutline,
      pricetagOutline,
      megaphoneOutline,
      keyOutline,
      copyOutline,
      bookmarkOutline,
      bookmark,
      imageOutline,
      pencilOutline,
    };
  },

  data() {
    return {
      isOpen: false,
      cords: null,
      favorized: false,
      checkIfAlreadyFavourized: false,
      userToken: null,
      userId: null,
    };
  },

  props: {
    event: {
      type: Object,
      required: false,
    },
  },

  // Get the UserToken and then check if it has favorized Events, in order to show it in the Favourized-Events-Page
  async mounted() {
    this.userToken = sessionStorage.getItem("userToken");
    this.userId = this.parseJwt(this.userToken);
    await axios
      .get("http://localhost:3000/user/" + this.userId.user.id)
      .then((response) => {
        let existingUser = response.data.existingUser;
        for (let favEvents of existingUser.favouriteEvents) {
          if (favEvents._id == this.event?._id) {
            this.favorized = true;
          }
        }
      })
      .catch(() => {
        console.log("error");
      });
  },

  watch: {
    // Get the Locatoins Coordinates in order to display them on the map
    event() {
      let url =
        "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" +
        this.event?.location;
      axios
        .get(url)
        .then((response) => {
          return (this.cords = response.data[0]);
        })
        .catch(() => {
          console.log("Ort nicht gefunden");
        });
    },
  },

  methods: {
    editEvent() {
      this.router.push("/eventedit/" + this.event._id, "replace");
    },

    // Function to favourize the specific event
    // When already favourized then it is unfavourized
    favorizeEvent(eventId) {
      axios
        .get("http://localhost:3000/user/" + this.userId.user.id)
        .then((response) => {
          let existingUser = response.data.existingUser;
          for (let favEvents of existingUser.favouriteEvents) {
            if (favEvents._id == eventId) {
              this.checkIfAlreadyFavourized = true;
            }
          }

          if (!this.checkIfAlreadyFavourized) {
            existingUser.favouriteEvents.push(eventId);
            axios
              .put(
                "http://localhost:3000/user/" + this.userId.user.id,
                existingUser
              )
              .then((response) => {
                console.log(response);
                this.favorized = true;
                this.presentToastSuccessfullyAddedToFavourite();
              });
          } else {
            existingUser.favouriteEvents.splice(
              existingUser.favouriteEvents.indexOf(eventId),
              1
            );
            axios
              .put(
                "http://localhost:3000/user/" + this.userId.user.id,
                existingUser
              )
              .then((response) => {
                console.log(response);
                this.favorized = false;
                this.presentToastEventDeletedFromFavouriteEvents();
              });
          }
        })
        .catch(() => {
          this.presentToastError();
        });
    },

    // Code to copy the invitation code per click
    copyTextToClipboard(text) {
      const clipboard = new Clipboard(".copy-button", {
        text: () => text,
      });

      clipboard.on("success", () => {
        console.log("Text erfolgreich kopiert: " + text);
        clipboard.destroy();
        this.presentToast();
      });

      clipboard.on("error", (e) => {
        console.error("Fehler beim Kopieren des Textes: " + e);
        clipboard.destroy();
      });

      clipboard.onClick({
        currentTarget: document.querySelector(".copy-button"),
      });
    },

    // function to open the map modal
    setOpen(isOpen) {
      this.isOpen = isOpen;
    },

    formatDate(startdate, enddate) {
      if (enddate == startdate || enddate == null) {
        dayjs.locale(de);
        const date = dayjs(startdate);
        return date.format("dddd, DD. MMMM YYYY");
      } else {
        dayjs.locale(de);
        const start = dayjs(startdate);
        const end = dayjs(enddate);
        return start.format("DD.") + " - " + end.format("DD. MMMM YYYY");
      }
    },

    async presentToast() {
      const toast = await toastController.create({
        message: "Der Einladungscode wurde kopiert!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },

    async presentToastSuccessfullyAddedToFavourite() {
      const toast = await toastController.create({
        message: "Sie haben dieses Event zu ihren Favouriten hinzugefügt!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },

    async presentToastEventDeletedFromFavouriteEvents() {
      const toast = await toastController.create({
        message: "Sie haben dieses Event aus ihren Favouriten entfernt!",
        duration: 3000,
        cssClass: "custom-toast",
      });

      await toast.present();
    },

    parseJwt(token) {
      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      var jsonPayload = decodeURIComponent(
        window
          .atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    },
  },
};
</script>