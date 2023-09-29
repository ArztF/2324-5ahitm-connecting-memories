<template>
  <div style="height: 600px">
    <div class="info" style="width: 80vw"></div>
    <l-map
      style="height: 100%; width: 100%"
      :zoom="zoom"
      :center="center"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-marker :lat-lng="markerLatLng"></l-marker>
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
    </l-map>
  </div>
</template>

<script>
import { LMap, LTileLayer, LMarker } from "vue3-leaflet";

export default {
  components: {
    LMap,
    LTileLayer,
    LMarker
  },
  props: {
    cords: {
      type: Object,
      required: false,
    },
  },
  data() {
    return {
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution:
        '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      zoom: 100,
      center: [this.cords.lat, this.cords.lon],
      markerLatLng: [this.cords.lat, this.cords.lon],
    };
  },
  methods: {
    zoomUpdated(zoom) {
      this.zoom = zoom;
    },
    centerUpdated(center) {
      this.center = center;
    },
    boundsUpdated(bounds) {
      this.bounds = bounds;
    },
  },
};
</script>
