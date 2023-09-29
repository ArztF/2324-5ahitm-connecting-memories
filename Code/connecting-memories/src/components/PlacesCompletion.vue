<template>
  <div id="placesCompletion">
    <input
      id="searchResults"
      type="text"
      v-model="location"
      placeholder="Eventort"
      class="create-event-input"
    />
    <div id="dropdown">
      <p
        v-for="(item, index) in searchResults"
        :key="index"
        @click="select(item[0])"
      >
        {{ item[0] }} ({{ item[1] }})
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    location: "",
    searchResults: [],
    service: null, // will reveal this later 🕵️
  }),
  // computed: {
  //   getSearchresults() {
  //       return this.searchResults
  //   }
  // },

  methods: {
    MapsInit() {
      this.service = new window.google.maps.places.AutocompleteService();
    },
    displaySuggestions(predictions, status) {
      if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
        this.searchResults = [];
        return;
      }
      this.searchResults = predictions.map(
        (prediction) => prediction.description
      );
    },
    select(item) {
      this.searchResults = [];
      this.location = item;
    },
  },

  watch: {
    // function where it send a GET request with the text which is given in from the user
    async location(newValue) {
      this.$emit("location", this.location)
      if (newValue) {
        // GET Request
        await axios
          .get(
            `http://dev.virtualearth.net/REST/v1/Autosuggest?query=${newValue}&maxResults=5&userRegion=AT&key=Ap76NONbS2RlTIGIFEuEoM5fWWuHrqxAxeNs0qPlm4kOAWE___vNIYQw-ipbloKD`,
            {}
          )
          .then((response) => {
            //create searchResult Array
            this.searchResults = [];
            //check if the response isnt empty
            if (response.data.resourceSets[0].resources[0].value) {
              this.searchResults = [];
              // iterate the searchresults
              for (
                let i = 0;
                i < response.data.resourceSets[0].resources[0].value.length;
                i++
              ) {
                // we only want places and adresses so we check if it is a place, and then push it to the array
                if (
                  response.data.resourceSets[0].resources[0].value[i].__type ==
                  "Place"
                ) {
                  this.searchResults.push([
                    response.data.resourceSets[0].resources[0].value[i].address
                      .locality,
                    response.data.resourceSets[0].resources[0].value[i].address
                      .countryRegion,
                  ]);
                  // Check if it is a Address and then push it to the array
                } else if (
                  response.data.resourceSets[0].resources[0].value[i].__type ==
                  "Address"
                ) {
                  this.searchResults.push([
                    response.data.resourceSets[0].resources[0].value[i].address
                      .formattedAddress,
                    response.data.resourceSets[0].resources[0].value[i].address
                      .countryRegion,
                  ]);
                }
              }
            }
          });
      }
    },
  },
};
</script>
