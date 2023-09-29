<template>
  <ion-card
    class="ion-card-container"
    @click="onClickDetailView"
  >
    <!-- TODO: Image Source Should be a prop too -->
    <img
      alt="Silhouette of mountains"
      class="preview-card-image"
      :src="'http://localhost:3000/image/'+event?.bannerimg"
    />
    <ion-card-header class="event-preview-header">
      <div class="event-preview-name-icon-wrapper">
        <ion-card-title class="event-preview-title">{{
          event?.eventname
        }}</ion-card-title>
        <slot />
      </div>
    </ion-card-header>

    <ion-card-content>
      <div class="event-preview-content">
        <ion-icon :icon="locationOutline"></ion-icon>
        <p>{{ event?.location }}</p>
      </div>
      <div class="event-preview-content">
        <ion-icon
          class="event-preview-calendar-icon"
          :icon="calendarOutline"
        ></ion-icon>
        <p>{{ formatDate(event?.startdate, event?.enddate) }}</p>
      </div>
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import dayjs from "dayjs";
import de from "dayjs/locale/de";
import {
  calendarOutline,
  informationCircleOutline,
  locationOutline,
  bookmarkOutline,
  imageOutline,
  pencilOutline
} from "ionicons/icons";
export default {
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonIcon,
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
      imageOutline,
      bookmarkOutline,
      locationOutline,
      calendarOutline,
      informationCircleOutline,
      pencilOutline
    };
  },

  props: {
    event: {
      type: Object,
      required: true,
    },
    isClickable: {
      type: Boolean,
      required: false,
      default: true
    }
  },

  methods: {
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

    // Click Event to get to the Detailview Page
    onClickDetailView() {
      if(this.isClickable) {
        this.router.push("/eventdetail/" + this.event._id, "replace");
      } else {
        console.log('error');
      }
    }
  },
};
</script>
