<template>
  <div class="footer">
    <ion-icon
      @click="() => router.push('/', 'back', 'replace')"
      :icon="homeOutline"
      size="large"
    />
    <ion-icon
      @click="() => onCreateEventClicked()"
      :icon="addCircleOutline"
      size="large"
    ></ion-icon>
    <ion-icon
      @click="() => onSubmitToEventClicked()"
      :icon="enterOutline"
      size="large"
    ></ion-icon>
  </div>
</template>
  
<script>
import { IonIcon } from "@ionic/vue";
import {
  addCircleOutline,
  enterOutline,
  homeOutline,
} from "ionicons/icons";
import { useIonRouter } from '@ionic/vue';

export default {
  components: {
    IonIcon,
  },
  data() {
    return {
      isSelected: false,
    };
  },
  setup() {
    const router = useIonRouter();
    return {
      addCircleOutline,
      enterOutline,
      homeOutline,
      router,
    };
  },
  methods: {
    // check method to check if the user is logged in, because if he isnt he is not allowed to access this page
    onCreateEventClicked() {
      let userToken = sessionStorage.getItem("userToken")
      if(userToken == null) {
        sessionStorage.setItem("comeFromWhichPage", "createEvent")
        this.router.push('/login', 'replace')
      } else {
        this.router.push('/createevent', 'replace')
      }
    },

    // check method to check if the user is logged in, because if he isnt he is not allowed to access this page
    onSubmitToEventClicked() {
      let userToken = sessionStorage.getItem("userToken")
      if(userToken == null) {
        sessionStorage.setItem("comeFromWhichPage", "submitToEvent")
        this.router.push('/login', 'replace')
      } else {
        this.router.push('/submittoevent', 'replace')
      }
    }
  }
};
</script>