import { createRouter, createWebHashHistory } from '@ionic/vue-router';
import GroupDetail from '../pages/GroupDetail.vue'
import EventDetail from '../pages/EventDetail.vue'
import CreateEvent from '../pages/CreateEvent.vue'
import SubmitToEvent from '../pages/SubmitToEvent.vue'
import EventSubscription from '../pages/EventSubscription.vue'
import LoginPage from '../pages/LoginPage.vue'
import RegistrationPage from '../pages/RegistrationPage.vue';
import EventCreatedSuccessfully from '../pages/EventCreatedSuccessfully.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import EventEdit from '../pages/EventEdit.vue';
import CreateGroup from '../pages/CreateGroup.vue';
import GroupPreview from "@/pages/GroupPreview.vue";
import MyGroups from "@/pages/MyGroups.vue";
import SubmitToGroup from "@/pages/SubmitToGroup.vue";
import ChangeProfile from "@/pages/ChangeProfile.vue";
import DetailProfile from "@/pages/DetailProfile.vue";
import CreateEventForGroup from "@/pages/CreateEventForGroup.vue";
import SavedEvent from "@/pages/SavedEvent.vue";
import CreatedEvent from "@/pages/CreatedEvent.vue";
import EventForGroup from "@/pages/EventForGroup.vue";
import PublicEvent from "@/pages/PublicEvent.vue";
import PrivateEvent from "@/pages/PrivateEvent.vue";

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
    path: '/eventforgroup/:id',
    name: 'CreateEventForGroup',
    component: CreateEventForGroup
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
    path: '/profile',
    name: 'Profile',
    component: ProfilePage
  },
  
  {
    path: '/changeprofile/:id',
    name: 'ChangeProfile',
    component: ChangeProfile
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
  },
  {
    path: '/detailprofile/:id',
    name: 'DetailProfile',
    component: DetailProfile
  },
  {
    path: '/createdevents/',
    name: 'CreatedEvent',
    component: CreatedEvent
  },
  {
    path: '/publicevents/',
    name: 'PublicEvent',
    component: PublicEvent
  },
  {
    path: '/privateevents/',
    name: 'PrivateEvent',
    component: PrivateEvent
  },
  {
    path: '/savedevents/',
    name: 'SavedEvent',
    component: SavedEvent
  },
  {
    path: '/eventsforgroup/:id',
    name: 'EventForGroup',
    component: EventForGroup
  },
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
})

export default router
