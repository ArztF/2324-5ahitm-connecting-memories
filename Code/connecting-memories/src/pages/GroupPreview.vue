<template>
    <page-layout title="Connecting Memories">
        <ion-searchbar class="header-searchbar" v-model="input" @input="
          debounce(() => {
            input = $event.target.value;
          })
        "></ion-searchbar>
        <div class="event-preview-card-wrapper">
            <group-preview-card
                    v-for="(group, index) in groups"
                    :key="index"
                    :group="group"
            />
            <h1 v-if="noEventsFound">Es wurden keine Events gefunden</h1>
        </div>
    </page-layout>
</template>

<script>
import { addCircleOutline, enterOutline, searchOutline } from "ionicons/icons";
import PageLayout from "@/components/PageLayout.vue";
import axios from "axios";
import { IonSearchbar } from "@ionic/vue";
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";

export default {
    components: {GroupPreviewCard, PageLayout, IonSearchbar },

    data() {
        return {
            addCircleOutline,
            enterOutline,
            searchOutline,
            groups: null,
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
                            this.groups = response.data
                        })
                }, 500)
            }
        }
    },

    mounted() {
        axios
            .get("http://localhost:8080/api/eventgroup/getAll")
            .then((response) => {
                this.groups = response.data
            })
            .catch(() => {
                console.log("error");
            });
    },
};
</script>