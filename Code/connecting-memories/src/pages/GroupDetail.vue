<template style="overflow: scroll">
  <page-layout>
    <div class="group-detail-container">
  <div class="group-detail-header">
    <h1>{{group?.groupName}}</h1>
  </div>
   <group-preview-card :group="group"/>

  
  <div class="group-detail-events-heading">
        <h3 class="group-detail-heading">Events in dieser Gruppe</h3>
        <p class="more-events">zeige mehr</p>
  </div>
  <div v-for="(event, index) of events" :key="index">
  <event-preview-card :event="event" :isClickable="true"/>
  </div>
 <div class="add-event-action">
  <button class="button-add-event" @click="() => router.push('/createevent', 'back')">
    </button>
  </div> 
      </div>
  </page-layout>
</template>

<script>
import { addCircleOutline, enterOutline, searchOutline } from "ionicons/icons";
import PageLayout from "@/components/PageLayout.vue";
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";
import EventPreviewCard from '../components/EventPreviewCard.vue';

export default {
  components: { PageLayout,GroupPreviewCard, EventPreviewCard},

  setup() {
    const router = useRouter();
    return {
      router,
    };
  },

  data() {
    return {
      addCircleOutline,
      enterOutline,
      searchOutline,
      events: null,
      publicEvents: null,
      noEventsFound: false,
      group: null,
    };
  },

  methods: {
  },

  mounted() {


      //let id = sessionStorage.getItem("groupId")
      axios
      .get("http://localhost:8080/api/eventgroup/getById/" + 1)
      .then((response) => {
        this.group = response.data
        axios
      .get("http://localhost:8080/api/event/getByGroupId/" + this.group.id)
      .then((response) => {
        this.events = response.data
    })
      .catch(() => {
        console.log("error");
      }); 
    })
      .catch(() => {
        console.log("error");
      }); 

      
  },
};
</script>
