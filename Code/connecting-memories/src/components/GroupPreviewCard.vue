<template>
    <ion-card
            class="ion-card-container"
            @click="onClickDetailView"
    >
<!--        <pre>-->
<!--            {{ group }}-->
<!--        </pre>-->
        <img
                alt="Silhouette of mountains"
                class="preview-card-image"
                :src="'http://localhost:8080/image/' + group.image.id"
        />
        <ion-card-header class="event-preview-header">
            <div class="event-preview-name-icon-wrapper">
                <ion-card-title class="event-preview-title">{{
                    group?.groupname
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
import { formatDate } from '@/utils/format.js';
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
        isClickable: {
            type: Boolean,
            required: false,
            default: true
        }
    },

    methods: {
        formatDate,


        onClickDetailView() {
            if(this.isClickable) {
                this.router.push("/eventdetail/" + this.group.id);
            } else {
                console.log('error');
            }
        }
    },
};
</script>
