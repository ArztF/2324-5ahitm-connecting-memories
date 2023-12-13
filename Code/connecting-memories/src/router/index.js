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
import PaymentPage from '../pages/PaymentPage.vue';
import EventEdit from '../pages/EventEdit.vue'
import CreateGroup from '../pages/CreateGroup.vue'
import GroupPreview from "@/pages/GroupPreview.vue";
import MyGroups from "@/pages/MyGroups.vue";

const routes = [
  {
    path: '/',
    redirect: '/group'
  },
  {
    path: '/group',
    name: 'GroupPreview',
    component: GroupPreview
  },
  {
    path: '/event/:id',
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
    path: '/mygroups',
    name: 'MyGroups',
    component: MyGroups
  },
  {
    path: '/payment',
    name: 'Payment',
    component: PaymentPage
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
