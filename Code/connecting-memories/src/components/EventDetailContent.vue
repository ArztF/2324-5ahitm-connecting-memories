<template>
  <div>
    <img
      alt="Silhouette of mountains"
      :src="'http://localhost:8080/image/' + event.bannerimg.id"
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
import axios from "axios";
import { presentToast } from '@/utils/toast.js';
import { formatDate } from '@/utils/format.js';
import { copyTextToClipboard } from '@/utils/copyText.js'

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

  
  async mounted() {
    console.log(this.event);
    this.userId = sessionStorage.getItem("userToken");
    await axios
      .get("http://localhost:8080/api/user/" + this.userId)
      .then((response) => {
        console.log(response.data);
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

    copyTextToClipboard,

    favorizeEvent(eventId) {
      axios
        .get("http://localhost:8080/api/user/" + this.userId.user.id)
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
                "http://localhost:8080/api/user/" + this.userId.user.id,
                existingUser
              )
              .then((response) => {
                console.log(response);
                this.favorized = true;
                presentToast("Sie haben dieses Event zu ihren Favouriten hinzugefügt!")
              });
          } else {
            existingUser.favouriteEvents.splice(
              existingUser.favouriteEvents.indexOf(eventId),
              1
            );
            axios
              .put(
                "http://localhost:8080/api/user/" + this.userId.user.id,
                existingUser
              )
              .then((response) => {
                console.log(response);
                this.favorized = false;
                presentToast("Sie haben dieses Event aus ihren Favouriten entfernt!")
              });
          }
        })
        .catch(() => {
          this.presentToastError();
        });
    },

    setOpen(isOpen) {
      this.isOpen = isOpen;
    },

    presentToast,
    formatDate
  },
};
</script>