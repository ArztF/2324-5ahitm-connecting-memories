import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import GroupDetail from '../pages/GroupDetail.vue'
import EventDetail from '../pages/EventDetail.vue'
import CreateEvent from '../pages/CreateEvent.vue'
import SubmitToEvent from '../pages/SubmitToEvent.vue'
import EventSubscription from '../pages/EventSubscription.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue'
import EventCreatedSuccessfully from '../pages/EventCreatedSuccessfully.vue'
import ProfilePage from '../pages/ProfilePage.vue';
import EventEdit from '../pages/EventEdit.vue'
import CreateGroup from '../pages/CreateGroup.vue'
import GroupPreview from "@/pages/GroupPreview.vue";
import MyGroups from "@/pages/MyGroups.vue";
import SubmitToGroup from "@/pages/SubmitToGroup.vue";

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
    path: '/group/:id',
    name: 'GroupDetail',
    component: GroupDetail
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
    path: '/creategroup',
    name: 'Create Group',
    component: CreateGroup
  },
  {
    path: '/submitToGroup',
    name: 'Gruppe beitreten',
    component: SubmitToGroup
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
