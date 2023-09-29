<template>
  <page-layout title="Connecting Memories">
    <ion-searchbar class="header-searchbar" v-model="input"></ion-searchbar>
    <div class="event-preview-card-wrapper">
      <event-preview-card
        v-for="(event, index) in filteredList()"
        :key="index"
        :event="event"
      />
      <h1 v-if="noEventsFound">Es wurden keine Events gefunden</h1>
    </div>
  </page-layout>
</template>

<script>
import { addCircleOutline, enterOutline, searchOutline } from "ionicons/icons";
import EventPreviewCard from "../components/EventPreviewCard.vue";
import PageLayout from "@/components/PageLayout.vue";
import axios from "axios";
import { IonSearchbar } from "@ionic/vue";

export default {
  components: { EventPreviewCard, PageLayout, IonSearchbar },

  data() {
    return {
      addCircleOutline,
      enterOutline,
      searchOutline,
      events: null,
      input: "",
      publicEvents: null,
      noEventsFound: false,
    };
  },

  methods: {
    // function to search for the input
    filteredList() {
      // get all events from the db and then check if they are public --> if they are public push them to the new array
      this.publicEvents = this.events?.filter((el) => el.isPublic === true);
      // check if the input in the searchbar is not empty
      if (this.input.length > 0) {
        // convert the eventname to lower case and then check if it is included in the eventname
        if (
          this.publicEvents.filter((el) =>
            el.eventname.toLowerCase().includes(this.input.toLowerCase())
          ).length
        ) {
          // return the event which maches the criterium 
          return this.publicEvents.filter((el) =>
            el.eventname.toLowerCase().includes(this.input.toLowerCase())
          );
          // do the same with location
        } else if (
          this.publicEvents.filter((el) =>
            el.location.toLowerCase().includes(this.input.toLowerCase())
          ).length
        ) {
          // return the location if it matches
          return this.publicEvents.filter((el) =>
            el.location.toLowerCase().includes(this.input.toLowerCase())
          );
          // startdate
        } else if (
          this.publicEvents.filter((el) =>
            el.startdate.toLowerCase().includes(this.input.toLowerCase())
          ).length
        ) {
          // return the startdate if it matches
          return this.publicEvents.filter((el) =>
            el.startdate.toLowerCase().includes(this.input.toLowerCase())
          );
          //enddate
        } else if (
          this.publicEvents.filter((el) =>
            el.enddate.toLowerCase().includes(this.input.toLowerCase())
          ).length
        ) {
          // return the enddate if it matches
          return this.publicEvents.filter((el) =>
            el.enddate.toLowerCase().includes(this.input.toLowerCase())
          );
        } 
        // if no events are found then set the variable to true in order to show it on the display
         else {
          this.noEventsFound = true;
        }
      } else {
        // sort the events startdate
        return this.publicEvents?.sort((a, b) => {
          return new Date(a.startdate) - new Date(b.startdate);
        });
      }
    },

    onClickChangeFilter(id) {
      let chipid = document.getElementById(id);
      chipid.style.background = "#ff5400";
      chipid.style.color = "#fff";
      chipid.style.border = "#fff";
    },
  },

  // get all events from the db
  mounted() {
    axios
      .get("http://localhost:3000/event")
      .then((response) => (this.events = response.data.eventData))
      .catch(() => {
        console.log("error");
      });
  },
};
</script>