<template>
  <page-layout title="Connecting Memories">
    <ion-searchbar class="header-searchbar" v-model="input" @input="
          debounce(() => {
            input = $event.target.value;
          })
        "></ion-searchbar>
    <div class="event-preview-card-wrapper">
      <event-preview-card
        v-for="(event, index) in events"
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
      debounce: this.createDebounce(),
    };
  },

  methods: {

    onClickChangeFilter(id) {
      let chipid = document.getElementById(id);
      chipid.style.background = "#ff5400";
      chipid.style.color = "#fff";
      chipid.style.border = "#fff";
    },

    createDebounce () {
      let timeout = null
      return function (fnc) {
        clearTimeout(timeout)
        timeout = setTimeout(async () => {
          fnc()
          axios.post("http://localhost:3000/search/searchByKeyword", { keyword: this.input })
               .then((response) => {
               console.log(response.data);
               this.events = response.data
      })
        }, 500)
      }
    }
  },

  mounted() {
      axios
      .get("http://localhost:3000/event")
      .then((response) => {
        console.log(response.data.eventData);
        this.events = response.data.eventData
    })
      .catch(() => {
        console.log("error");
      }); 
  },
};
</script>