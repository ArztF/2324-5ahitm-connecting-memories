import { createRouter, createWebHashHistory } from '@ionic/vue-router';

import EventPreview from '../pages/EventPreview.vue'
import EventDetail from '../pages/EventDetail.vue'
import CreateEvent from '../pages/CreateEvent.vue'
import SubmitToEvent from '../pages/SubmitToEvent.vue'
import EventSubscription from '../pages/EventSubscription.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import EventCreatedSuccessfully from '../pages/EventCreatedSuccessfully.vue'
import ProfilePage from '../pages/ProfilePage.vue';
import MyEvents from '../pages/MyEvents.vue';
import PaymentPage from '../pages/PaymentPage.vue';
import RegisteredEvent from '../pages/RegisteredEvents.vue';
import EventEdit from '../pages/EventEdit.vue'
import FavoriteEvents from '../pages/FavoriteEvents.vue'
import CreateGroup from '../pages/CreateGroup.vue'

const routes = [
  {
    path: '/',
    redirect: '/event'
  },
  {
    path: '/event',
    name: 'EventPreview',
    component: EventPreview
  },
  {
    path: '/eventdetail/:id',
    name: 'EventDetail',
    component: EventDetail
  },
  {
    path: '/eventedit/:id',
    name: 'EventEdit',
    component: EventEdit
  },
  {
    path: '/createevent',
    name: 'CreateEvent',
    component: CreateEvent
  },
  {
    path: '/submittoevent',
    name: 'SubmitToEvent',
    component: SubmitToEvent
  },
  {
    path: '/subscription',
    name: 'Subscription',
    component: EventSubscription
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/registration',
    name: 'Registration',
    component: RegistrationPage
  },
  {
    path: '/eventadded',
    name: 'EventAdded',
    component: EventCreatedSuccessfully
  },
  {
    path: '/profile/:id',
    name: 'Profile',
    component: ProfilePage
  },
  {
    path: '/myevents',
    name: 'MyEvents',
    component: MyEvents
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage
  },
  {
    path: '/registeredEvents',
    name: 'Registrierte Events',
    component: RegisteredEvent
  },
  {
    path: '/favoriteEvents',
    name: 'Favoritisierte Events',
    component: FavoriteEvents
  },
  {
    path: '/creategroup',
    name: 'Create Group',
    component: CreateGroup
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
