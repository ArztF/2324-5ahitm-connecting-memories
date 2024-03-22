<template>
  <ion-card
    class="ion-card-container"
    @click="onClickDetailView"
  >
    <img
      alt="Silhouette of mountains"
      class="publish-preview-card-image"
      :src="'http://localhost:8080/image/' + event?.bannerimg?.id"
    />
    <ion-card-header class="publish-event-preview-header">
      <p class="date-event-preview">{{ formatDate(event?.startdate, event?.enddate) }}</p>
      <div class="publish-event-preview-name-icon-wrapper">
        <ion-card-title class="publish-event-preview-title">{{event?.eventname}}</ion-card-title>
        <slot />
      </div>
      <p class="location-event-preview">{{ event?.location }}</p>
      <p class="beschreibung-event-preview">{{ event?.beschreibung }}</p>
    </ion-card-header>

    <ion-card-content>
      
    </ion-card-content>
  </ion-card>
</template>

<script>
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import { formatDate } from '@/utils/format.js';

export default {
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
  },

  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },

  props: {
    event: {
      type: Object,
      required: true,
    },
    isClickable: {
      type: Boolean,
      required: false
    }
  },

  methods: {
    formatDate,

    
    onClickDetailView() {
        this.router.push("/eventdetail/" + this.event.id);
    }
  },
};
</script>
