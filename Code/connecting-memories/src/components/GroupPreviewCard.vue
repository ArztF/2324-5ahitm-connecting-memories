<template>
<!--    <ion-card @click="showEventsInGroup">-->
<!--        <ion-card-header>-->
<!--            <ion-card-title>{{ group?.groupName }}</ion-card-title>-->
<!--        </ion-card-header>-->

<!--        <ion-card-content>-->
<!--            <img :src="'http://localhost:8080/image/' + group?.image?.id" alt="Group Image" style="width: 100%; height: auto;" />-->
<!--        </ion-card-content>-->
<!--    </ion-card>-->
    <ion-card @click="showEventsInGroup">
        <ion-card-header>
            <ion-row class="group-header">
                <ion-col size="2">
                    <ion-avatar>
                        <ion-img :src="'http://localhost:8080/image/' + group?.image?.id" alt="Group Image"></ion-img>
                    </ion-avatar>
                </ion-col>
                <ion-col size="11" class="group-name-col">
                    <ion-card-title class="group-name">{{ group?.groupName }}</ion-card-title>
                </ion-col>
            </ion-row>
        </ion-card-header>

        <ion-card-content>
            <!-- Other content if needed -->
        </ion-card-content>
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

<style scoped>
/* Add your styles here */
ion-card {
    cursor: pointer;
}

.group-header {
    align-items: center;
    display: flex;
}

.group-name-col {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 16px; /* Add padding as needed */
}

.group-name {
    margin-left: 16px; /* Adjust margin as needed */
}
</style>