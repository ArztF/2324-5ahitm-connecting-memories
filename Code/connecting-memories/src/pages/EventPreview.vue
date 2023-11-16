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

  watch: {
    input() {
      
    }
  },

  methods: {

    filteredList() {
    

      // this.publicEvents = this.events?.filter((el) => el.isPublic === true);
    
      // if (this.input.length > 0) {
    
      //   if (
      //     this.publicEvents.filter((el) =>
      //       el.eventname.toLowerCase().includes(this.input.toLowerCase())
      //     ).length
      //   ) {
    
      //     return this.publicEvents.filter((el) =>
      //       el.eventname.toLowerCase().includes(this.input.toLowerCase())
      //     );
    
      //   } else if (
      //     this.publicEvents.filter((el) =>
      //       el.location.toLowerCase().includes(this.input.toLowerCase())
      //     ).length
      //   ) {
    
      //     return this.publicEvents.filter((el) =>
      //       el.location.toLowerCase().includes(this.input.toLowerCase())
      //     );
    
      //   } else if (
      //     this.publicEvents.filter((el) =>
      //       el.startdate.toLowerCase().includes(this.input.toLowerCase())
      //     ).length
      //   ) {
    
      //     return this.publicEvents.filter((el) =>
      //       el.startdate.toLowerCase().includes(this.input.toLowerCase())
      //     );
    
      //   } else if (
      //     this.publicEvents.filter((el) =>
      //       el.enddate.toLowerCase().includes(this.input.toLowerCase())
      //     ).length
      //   ) {
    
      //     return this.publicEvents.filter((el) =>
      //       el.enddate.toLowerCase().includes(this.input.toLowerCase())
      //     );
      //   } 
    
      //    else {
      //     this.noEventsFound = true;
      //   }
      // } else {
    
      //   return this.publicEvents?.sort((a, b) => {
      //     return new Date(a.startdate) - new Date(b.startdate);
      //   });
      // }
    },

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
          axios.post("http://localhost:3000/search/searchByKeword", { keyword: this.eventname })
      .then((response) => {
              console.log(response);
      })
        }, 500)
      }
    }
  },

  mounted() {
      axios
      .get("http://localhost:3000/event")
      .then((response) => {
        this.events = response.data.eventData
        return this.events?.sort((a, b) => {
           return new Date(a.startdate) - new Date(b.startdate);
      })
      .catch(() => {
        console.log("error");
      });
      
     
    });
  },
};
</script>