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
import {useIonRouter} from "@ionic/vue";

export default {
  components: {GroupPreviewCard, PageLayout },
  setup() {
      const router = useIonRouter();
      return {
          router
      }
  },
  data() {
    return {
      groupId: 0,
      group: null,
      customer: null
    };
  },

  async mounted() {

    this.groupId = this.$route.query.id;

    await axios
      .get("http://localhost:8080/api/eventgroup/getById/" + this.groupId)
      .then((response) => {
        this.group = response.data;
      });
  },

  methods: {
    async submitToGroup() {
        let userId = sessionStorage.getItem("userToken");
        axios
            .get("http://localhost:8080/api/user/" + userId)
            .then((response) => {
                this.customer = response.data
            })
        await axios.post('http://localhost:8080/api/groupparticipant/signUpToGroup', {
            customer: this.customer,
            eventGroup: this.group
        }).then((response) => {
            console.log(response)
            this.router.replace('/events/' + this.group.id)
        })
    }
  }
};
</script>