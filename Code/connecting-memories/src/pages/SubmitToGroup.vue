<template>
  <page-layout title="Gruppe Beitreten">
    <group-preview-card :group="group" />
    <div class="show-invitation-code-box">
      <ion-button
        @click="submitToGroup"
        class="button-invitation-code"
        type="submit"
        >Beitreten
      </ion-button>
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";
import { useIonRouter } from "@ionic/vue";
import { presentToast } from "../utils/toast";

export default {
  components: { GroupPreviewCard, PageLayout },
  setup() {
    const router = useIonRouter();
    return {
      router,
    };
  },
  data() {
    return {
      groupId: 0,
      group: null,
      customer: null,
    };
  },

  async mounted() {
    this.groupId = this.$route.query.id;

    await axios
      .get(
        "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/eventgroup/getById/" +
          this.groupId
      )
      .then((response) => {
        this.group = response.data;
      });
  },

  methods: {
    presentToast,
    async submitToGroup() {
      let userId = sessionStorage.getItem("userToken");
      axios
        .get(
          "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/user/" +
            userId
        )
        .then((response) => {
          axios
            .post(
              "https://student.cloud.htl-leonding.ac.at/connecting-memories/api/groupparticipant/signUpToGroup",
              {
                customer: { id: response.data.id },
                eventGroup: { id: this.group.id },
              }
            )
            .then((response) => {
              this.presentToast(
                "Sie sind erfolgreich in die Gruppe beigetreten!"
              );
              console.log(response);
              this.router.replace("/events/" + this.group.id);
            });
        });
    },
  },
};
</script>