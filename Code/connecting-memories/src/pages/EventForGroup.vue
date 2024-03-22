<template>
    <page-layout title="Gruppen">
        <div class="search-container" :class="{'show': showSearchBar}">
                <ion-searchbar v-model="input"></ion-searchbar>
            </div>
        <div class="corner-icons">
        <ion-icon :icon="searchOutline" @click="toggleSearchBar"></ion-icon>
        <ion-icon :icon="mapOutline"></ion-icon>
        </div>
        <h2 class="welcome-heading"><span>Events</span> für <br>
        <span>{{group?.groupName}}</span> 
        </h2>
        
        <div class="group-preview-box">
            <div class="event-preview-card-wrapper" v-if="groups?.length > 0">
            <group-preview-card
                    v-for="(group, index) in filteredList()"
                    :key="index"
                    :group="group?.eventGroup"
            />
        </div>
        </div>
    </page-layout>
</template>

<script>
import { addCircleOutline, enterOutline, searchOutline,mapOutline } from "ionicons/icons";
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
            mapOutline,
            searchOutline,
            groups: null,
            showSearchBar: false,
            input: "",
            publicEvents: null,
            noEventsFound: false,
            event: null
        };
    },

    methods: {
        toggleSearchBar() {
            this.showSearchBar = !this.showSearchBar;
        },

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
        let userToken = sessionStorage.getItem('userToken')
        console.log(userToken);
        axios
            .get("http://localhost:8080/api/groupparticipant/getByCustomerId/" + userToken)
            .then((response) => {
                console.log(response);
                this.groups = response.data
            })
            .catch(() => {
                console.log("error");
            });
    },
};
</script>