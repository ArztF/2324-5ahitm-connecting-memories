<template>
  <page-layout title="Gruppen">
    <div class="search-container" :class="{ show: showSearchBar }">
      <ion-searchbar v-model="input"></ion-searchbar>
    </div>
    <div class="corner-icons">
      <ion-icon :icon="searchOutline" @click="toggleSearchBar"></ion-icon>
      <ion-icon :icon="mapOutline"></ion-icon>
    </div>
    <h2 class="welcome-heading">
      What's <span>your</span><br />
      plan today?
    </h2>

    <div class="group-preview-box">
      <div class="group-preview-heading">
        <h3 class="preview-box-heading">Öffentliche Events</h3>
        <p class="more-pub-events">zeige mehr</p>
      </div>
      <div class="event-preview-card-wrapper">
        <event-preview-card
          v-for="(event, index) in filteredList()"
          :key="index"
          :event="event"
        />
      </div>
    </div>
    <div class="group-preview-box" v-if="false">
      <div class="group-preview-heading">
        <h3 class="preview-box-heading">Private Events</h3>
        <p class="more-priv-events">zeige mehr</p>
      </div>
      <event-preview-card
        v-for="(event, index) in filteredList()"
        :key="index"
        :event="event"
      />
    </div>
  </page-layout>
</template>

<script>
import {
  addCircleOutline,
  enterOutline,
  searchOutline,
  mapOutline,
} from "ionicons/icons";
import PageLayout from "@/components/PageLayout.vue";
import axios from "axios";
import { IonSearchbar } from "@ionic/vue";
import EventPreviewCard from "@/components/EventPreviewCard.vue";

export default {
  components: { PageLayout, IonSearchbar, EventPreviewCard },

  data() {
    return {
      userDetails: sessionStorage.getItem("userId"),
      addCircleOutline,
      enterOutline,
      mapOutline,
      searchOutline,
      groups: null,
      showSearchBar: false,
      input: "",
      publicEvents: null,
      noEventsFound: false,
      events: null,
    };
  },

  methods: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },

    filteredList() {
      if (this.input.length > 0) {
        return this.events.filter((el) =>
          el.groupName.toLowerCase().includes(this.input.toLowerCase())
        );
      } else {
        return this.events;
      }
    },

    onClickChangeFilter(id) {
      let chipid = document.getElementById(id);
      chipid.style.background = "#ff5400";
      chipid.style.color = "#fff";
      chipid.style.border = "#fff";
    },

    addparticipants() {
      axios
        .get(
          "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/event/" +
            this.userDetails
        )
        .then((response) => {
          this.event = response.data;
        });
      axios
        .post(
          "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/groupparticipant/signUpToGroup",
          {
            id: this.userDetails,
            eventgroup_id: this.event,
            customer_id: this.groups[0].groupAdmin,
          }
        )
        .then((response) => {
          console.log(response);
        });
    },
  },

  mounted() {
    axios
      .get(
        "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/event"
      )
      .then((response) => {
        console.log(response);
        this.events = response.data;
      })
      .catch(() => {
        console.log("error");
      });
  },
};
</script>