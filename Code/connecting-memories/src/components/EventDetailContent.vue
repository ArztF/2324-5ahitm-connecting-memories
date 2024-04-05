<template>
  <div class="event-detail-container">
    <div class="event-detail-header">
      <h1>{{ event?.eventname }}</h1>
      <ion-icon :icon="bookmarkOutline"></ion-icon>
    </div>
    <img
      class="img-detail-content"
      alt="Silhouette of mountains"
      :src="
        'https://student.cloud.htl-leonding.ac.at/connecting-memories/image/' +
        this.event?.bannerimg?.id
      "
    />

    <ion-card-content class="detail-content-event">
      <div class="event-detail-date-content">
        <p>{{ formatDate(event?.startdate, event?.enddate) }}</p>
      </div>
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
        <p>{{ event?.veranstalter }}</p>
        <p style="text-align: left; margin-top: 4vh">
          {{ event?.beschreibung }}
        </p>
      </div>
    </ion-card-content>
  </div>
</template>

<script>
import { bookmarkOutline, bookmark } from "ionicons/icons";
import { IonIcon, IonHeader, IonCardContent } from "@ionic/vue";
import { IonModal } from "@ionic/vue";
import SmallMap from "./SmallMap.vue";
import { useIonRouter } from "@ionic/vue";
import axios from "axios";
import { presentToast } from "@/utils/toast.js";
import { formatDate } from "@/utils/format.js";
import { copyTextToClipboard } from "@/utils/copyText.js";

export default {
  components: {
    SmallMap,
    IonModal,
    IonIcon,
    IonHeader,
    IonCardContent,
  },
  setup() {
    const router = useIonRouter();
    return {
      router,
      bookmarkOutline,
      bookmark,
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
    formatDate,
  },
};
</script>