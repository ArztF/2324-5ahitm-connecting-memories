<template>
  <ion-page>
    <home-header 
    :headerTitle="title"
    />
    <ion-content class="ion-content-wrapper">
      <slot />
    </ion-content>
    <home-footer />
  </ion-page>
  
</template>
<script>
import { IonPage, IonContent } from "@ionic/vue";
import HomeFooter from './HomeFooter.vue';
import HomeHeader from './HomeHeader.vue';
export default {
  components: {
    IonPage,
    HomeFooter,
    IonContent,
    HomeHeader
  },

  props: {
    title: {
      type: String,
      required: false
    }
  }
};
</script>
