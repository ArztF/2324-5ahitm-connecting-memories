<template>
    <ion-card
            class="ion-card-container"
            @click="showEventsInGroup"
    >
        <img
                alt="Silhouette of mountains"
                class="preview-card-image"
                :src="'http://localhost:8080/image/' + group?.image?.id"
        />
        <ion-card-header class="event-preview-header">
            <div class="event-preview-name-icon-wrapper">
                <ion-card-title class="event-preview-title">{{
                    group?.groupName
                    }}</ion-card-title>
                <slot />
            </div>
        </ion-card-header>
    </ion-card>
</template>

<script>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
} from "@ionic/vue";
import { useIonRouter } from "@ionic/vue";
import {
    calendarOutline,
    informationCircleOutline,
    locationOutline,
    bookmarkOutline,
    imageOutline,
    pencilOutline
} from "ionicons/icons";
export default {
    components: {
        IonCard,
        IonCardHeader,
        IonCardTitle,
    },

    setup() {
        const router = useIonRouter();
        return {
            router,
            imageOutline,
            bookmarkOutline,
            locationOutline,
            calendarOutline,
            informationCircleOutline,
            pencilOutline
        };
    },

    props: {
        group: {
            type: Object,
            required: true,
        },
    },

    methods: {
        showEventsInGroup() {
            sessionStorage.setItem("groupId", this.group.id);
            this.router.push("/event/" + this.group.id);
        }
    },
};
</script>
