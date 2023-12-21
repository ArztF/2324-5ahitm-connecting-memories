<template style="overflow: scroll">
<ion-card>
    <img alt="Silhouette of mountains" :src="'http://localhost:8080/image/' + event?.bannerimg?.id" />
    <ion-card-header>
      <ion-card-title>{{ event?.eventname }}</ion-card-title>
    </ion-card-header>

    <ion-card-content v-if="event?.startdate != event?.enddate">
      {{ formatDate(event?.startdate)}} - {{formatDate(event?.enddate)}}
    </ion-card-content>

    <ion-card-content v-else>
      {{ formatDate(event?.startdate)}}
    </ion-card-content>
  </ion-card>
</template>

<script>
    import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
    import {formatDate} from "../utils/format";


export default {
    components: { IonCard, IonCardContent, IonCardHeader, IonCardTitle },

    props: {
        event: {
            type: Object,
            required: true
        }
    },

    mounted() {
        console.log(this.event);
    },

    methods: {
        formatDate
    }

};
</script>