<template>
  <page-layout title="Profil">
    <div class="profile-container">
      <div class="profile-header">
        <h1>Profil</h1>
        <div style="margin-left: 65%">
          <ion-icon
            :icon="settingsOutline"
            @click="() => router.push(`/changeprofile/${id}`, 'back')"
          ></ion-icon>
          <ion-icon :icon="logOutOutline" @click="logout()"></ion-icon>
        </div>
      </div>
      <div class="profile-info">
        <h2 id="prfile-name">{{ vorname }} {{ nachname }}</h2>
        <p id="prfile-user">{{ username }}</p>
        <p id="prfile-email">{{ email }}</p>
      </div>

      <div class="profile-actions">
        <button
          class="action-button saved"
          @click="() => router.push('/savedevents', 'back')"
        >
          <ion-icon :icon="bookmarkOutline"></ion-icon>
          <p>Gespeichert</p>
        </button>
        <button
          class="action-button created"
          @click="() => router.push('/mygroups', 'back')"
        >
          <ion-icon :icon="calendarOutline"></ion-icon>
          <p>Erstellte Events</p>
        </button>
      </div>
      <div class="profile-actions">
        <button
          class="action-button add-group"
          @click="() => router.push('/creategroup', 'back')"
        ></button>
      </div>
      <div class="groups-section">
        <h2>Gruppen</h2>
        <div class="group-buttons">
          <input
            type="radio"
            id="attend"
            name="group-selection"
            value="attend"
            checked
            @click="switchOperation"
          />
          <label class="group-button-attend" for="attend">Beigetreten</label>

          <input
            type="radio"
            id="created"
            name="group-selection"
            value="created"
            @click="switchOperation"
          />
          <label class="group-button-created" for="created">Erstellt</label>
        </div>
        <group-preview-card
          v-for="(group, index) in groups"
          :key="index"
          :group="group"
        />
      </div>
    </div>
  </page-layout>
</template>

<script>
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";
import PageLayout from "@/components/PageLayout.vue";
import { useRouter } from "vue-router";
import axios from "axios";
import {
  bookmarkOutline,
  calendarOutline,
  settingsOutline,
  logOutOutline,
} from "ionicons/icons";
export default {
  components: {
    GroupPreviewCard,
    PageLayout,
  },

  data() {
    return {
      groups: null,
      myGroups: null,
      id: 0,
      vorname: "",
      nachname: "",
      username: "",
      email: "",
      password: "",
      user: null,
      invalidInputs: [],
      isCreated: true,
    };
  },

  async mounted() {
    this.id = sessionStorage.getItem("userId");
    this.groups = await axios
      .get(
        "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/groupparticipant/getByCustomerId/" +
          1
      )
      .then((response) => (this.groups = response.data))
      .catch(() => {
        console.log("error");
      });

    this.user = await axios
      .get(
        "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/" +
          this.id
      )
      .then((response) => {
        this.user = response.data;
        this.vorname = this.user.vorname;
        this.nachname = this.user.nachname;
        this.username = this.user.username;
        this.email = this.user.email;
      });
  },

  methods: {
    logout() {
      sessionStorage.clear()
      this.router.replace("/")
    },

    async switchOperation() {
      console.log("in");
      this.isCreated = !this.isCreated;
      if (this.isCreated) {
        this.groups = await axios
          .get(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/groupparticipant/getByCustomerId/" +
              this.id
          )
          .then((response) => (this.groups = response.data))
          .catch(() => {
            console.log("error");
          });
      } else {
        await axios
          .get(
            "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/eventgroup/byOwnerId/" +
              this.id
          )
          .then((response) => (this.groups = response.data))
          .catch(() => {
            console.log("error");
          });
      }
    },
  },

  setup() {
    const router = useRouter();
    return {
      bookmarkOutline,
      calendarOutline,
      settingsOutline,
      router,
      logOutOutline,
    };
  },
};
</script>