<template>
    <ion-card @click="showEventsInGroup" class="group-card">
        <ion-card-header class="group-card-header">
                    <ion-avatar class="group-image-box">
                        <ion-img :src="'http://localhost:8080/image/' + group?.image?.id" alt="Group Image" class="group-image"></ion-img>
                    </ion-avatar>
            <div class="group-text">       
                 <ion-card-title class="group-name">{{ group?.groupName }}</ion-card-title>
                    <p class="group-admin-name">{{ group?.groupAdmin?.vorname }} {{ group?.groupAdmin?.nachname}}</p>
                    <p class="group-participants">Teilnehmer:  0</p>
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
        IonCardTitle
      
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
            this.router.push("/group/" + this.group.id);
        },
        
    },
};
</script>

<style scoped>

.group-card {
    --background: #222;
    height: 12vh;
    --color: white;
    border-radius: 15px;
    display: flex;
    align-items: center; /* Zentriere den Inhalt vertikal */
    margin-bottom: 20px;
}

.group-card-header {
    display: flex;
    align-items: center; /* Zentriere den Inhalt vertikal */
    width: 100%; /* Breite auf 100% setzen, um sicherzustellen, dass alle Elemente sichtbar sind */
}

.group-image-box {
    width: 80px; /* Breite des Bildes */
    height: 80px; /* Höhe des Bildes */
    display: flex;
    justify-content: center; /* Zentriere den Inhalt horizontal */
    align-items: center; /* Zentriere den Inhalt vertikal */
}
.group-name{
    font-size: 20px;
    --color: white;
}

.group-image {  
    width: 100%; /* 100% Breite für das Bild */
    height: 100%; /* 100% Höhe für das Bild */
    border-radius: 20%; /* Runde die Ecken des Bildes ab */
}

.group-text {
    margin-left: 16px; /* Füge einen linken Abstand zum Bild hinzu */
    display: flex;
    flex-direction: column; /* Text untereinander anordnen */
    justify-content: center; /* Zentriere den Text vertikal */
}
.group-admin-name{
    margin: 2px 0;
}
.participants{
    margin: 6px 0;
}
.group-text p {
    font-size: 12px;
    font-weight: bold;
}

</style>