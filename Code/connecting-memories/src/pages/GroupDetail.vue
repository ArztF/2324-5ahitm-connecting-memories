<template style="overflow: scroll">
  <page-layout :title="events?.groupName">
    <ion-searchbar v-if="events?.length !== 0 && 1 !== 1"  class="header-searchbar" v-model="input" @input="
          debounce(() => {
            input = $event.target.value;
          })
        "></ion-searchbar>
      <event-header :group="events"></event-header>      
  </page-layout>
</template>

<script>
import { addCircleOutline, enterOutline, searchOutline } from "ionicons/icons";
import EventHeader from "../components/EventHeader.vue"
import PageLayout from "@/components/PageLayout.vue";
import axios from "axios";
import { IonSearchbar } from "@ionic/vue";

export default {
  components: { PageLayout, IonSearchbar, EventHeader },

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
               this.events = response.data
      })
        }, 500)
      }
    }
  },

  mounted() {
      let id = sessionStorage.getItem("groupId")
      axios
      .get("http://localhost:8080/api/eventgroup/getById/" + id)
      .then((response) => {
        this.events = response.data
    })
      .catch(() => {
        console.log("error");
      }); 
  },
};
</script>

<style scoped>
/* Add your styles here */
.heading {
  color: var(--ion-color-primary);
}
</style>