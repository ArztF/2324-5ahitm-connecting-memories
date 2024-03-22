<template>
  <ion-page>
    <ion-content class="ion-content-wrapper">
      <slot />
    </ion-content>
    <home-footer />
  </ion-page>
  
</template>
<script>
import { IonPage, IonContent } from "@ionic/vue";
import HomeFooter from './HomeFooter.vue';
export default {
  components: {
    IonPage,
    HomeFooter,
    IonContent,
  },

  props: {
    title: {
      type: String,
      required: false
    }
  }
};
</script>
