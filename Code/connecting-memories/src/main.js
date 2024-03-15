import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import { IonicVue } from '@ionic/vue';

/* Core CSS required for Ionic components to work properly 


import './theme/eventPreview.css'
import './theme/eventSubscription.css'
import './theme/submitToEvent.css'

import './theme/registration.css'
import './theme/eventCreatedSuccessfully.css'

import './theme/payment.css'*/
import '@ionic/vue/css/core.css';
import './theme/groupPreview.css'
import './theme/login.css'
import './theme/createEvent.css'
import './theme/profilePage.css'
import './theme/eventCreatedSuccessfully.css'
import './theme/eventPreviewCard.css'
import './theme/createGroup.css'
import './theme/eventDetail.css'
/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/core.css'

const app = createApp(App)
  .use(IonicVue)
  .use(router);
  
router.isReady().then(() => {
  app.mount('#app');
});