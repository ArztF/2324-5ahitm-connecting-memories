<template>
  <page-layout title="Meine Gruppen">
    <group-preview-card
      v-for="(group, index) in groups"
      :key="index"
      :group="group"
    />
  </page-layout>
</template>
<script>
import PageLayout from "../components/PageLayout.vue";
import axios from "axios";
import GroupPreviewCard from "@/components/GroupPreviewCard.vue";
export default {
  components: {GroupPreviewCard, PageLayout },

  data() {
    return {
      groups: null,
      myGroups: null,
    };
  },

  
  mounted() {
      let id = sessionStorage.getItem("userToken")
    axios
      .get("http://localhost:8080/api/eventgroup/byOwnerId/" + id)
      .then((response) => (this.groups = response.data))
      .catch(() => {
        console.log("error");
      });

  },
};
</script>