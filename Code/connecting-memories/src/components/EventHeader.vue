<template>
  <p>Veranstalter: {{ groupAdmin?.vorname }} {{ groupAdmin?.nachname }}</p>
</template>

<script>

import axios from "axios";
  export default {
      data () {
          return {
              groupAdmin: null
          }
      },

      async mounted () {
          let id = sessionStorage.getItem("groupId")
          await axios
              .get("http://localhost:8080/api/eventgroup/getById/" + id)
              .then((response) => {
                  this.groupAdmin = response.data.groupAdmin
              })

          console.log(this.groupAdmin)
      }
  }
</script>