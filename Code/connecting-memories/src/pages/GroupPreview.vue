<template>
    <page-layout title="Gruppen">
        <ion-searchbar class="header-searchbar" v-model="input"></ion-searchbar>
        <div class="event-preview-card-wrapper">
            <group-preview-card
                    v-for="(group, index) in filteredList()"
                    :key="index"
                    :group="group"
            />
            <button @click="addparticipants">Participants anlegen</button>
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
            event: null
        };
    },

    methods: {

        filteredList () {
            if (this.input.length > 0) {
                return this.groups.filter((el) => el.groupName.toLowerCase().includes(this.input.toLowerCase()) )
            } else {
                return this.groups
            }
        },

        onClickChangeFilter(id) {
            let chipid = document.getElementById(id);
            chipid.style.background = "#ff5400";
            chipid.style.color = "#fff";
            chipid.style.border = "#fff";
        },

        addparticipants () {
            axios.get("http://localhost:8080/api/event/1")
                .then((response) => {
                    this.event = response.data
                })
            axios
                .post("http://localhost:8080/api/groupparticipant/signUpToGroup",
                    {
                        id: 1,
                        eventgroup_id: this.event,
                        customer_id: this.groups[0].groupAdmin
                    })
                .then((response) => {
                    console.log(response)
                })
            
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