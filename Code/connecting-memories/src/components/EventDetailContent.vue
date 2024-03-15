<template>
  <div>
    <img class="img-detail-content"
      alt="Silhouette of mountains"
      :src="'http://localhost:8080/image/' + this.event?.bannerimg?.id"
    />
    <div class="event-preview-header-icon-box">
      <ion-card-title class="eventDetailHeadline">
      {{ event?.eventname }}
    </ion-card-title>
      <ion-icon :icon="imageOutline"></ion-icon>
    </div>
    <div class="event-preview-content">
        <ion-icon :icon="calendarOutline"></ion-icon>
        <p>{{ formatDate(event?.startdate, event?.enddate) }}</p>
    </div>
    <ion-card-content>
      <div class="event-preview-content">
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
        <ion-icon :icon="megaphoneOutline"></ion-icon>
        <p>{{ event?.veranstalter }}</p>
        <ion-icon :icon="ticketOutline"></ion-icon>
        <p>ab {{ event?.ticketpreis }}€</p>
      <p style="text-align: left; margin-top: 3%">{{ event?.beschreibung }}</p>
      </div>
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
      userToken: null,
      userId: null,
      imgSrc: null,
    };
  },

  props: {
    event: {
      type: Object,
      required: false,
    },
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
      this.router.push("/eventedit/" + this.event.id);
    },

    copyTextToClipboard,

    setOpen(isOpen) {
      this.isOpen = isOpen;
    },

    presentToast,
    formatDate
  },
};
</script>