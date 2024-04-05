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
      <span>Private</span> <br />
      Events
    </h2>

    <div class="group-preview-box">
      <div class="event-preview-card-wrapper" v-if="groups?.length > 0">
        <group-preview-card
          v-for="(group, index) in filteredList()"
          :key="index"
          :group="group?.eventGroup"
        />
      </div>

      <!--<h1 v-else>Es noch keine privaten Events!</h1>-->
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
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";

export default {
  components: { GroupPreviewCard, PageLayout, IonSearchbar },

  data() {
    return {
      userDetails: 0,
      addCircleOutline,
      enterOutline,
      mapOutline,
      searchOutline,
      groups: null,
      showSearchBar: false,
      input: "",
      publicEvents: null,
      noEventsFound: false,
      event: null,
    };
  },

  methods: {
    toggleSearchBar() {
      this.showSearchBar = !this.showSearchBar;
    },

    filteredList() {
      if (this.input.length > 0) {
        return this.groups.filter((el) =>
          el.groupName.toLowerCase().includes(this.input.toLowerCase())
        );
      } else {
        return this.groups;
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
    this.userDetails = sessionStorage.getItem("userId");
    axios
      .get(
        "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/groupparticipant/getByCustomerId/" +
          this.userDetails
      )
      .then((response) => {
        console.log(response);
        this.groups = response.data;
      })
      .catch(() => {
        console.log("error");
      });
  },
};
</script>