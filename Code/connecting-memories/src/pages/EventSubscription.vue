<template>
  <page-layout title="Event Subscription">
    <h1>Einmalzahlung</h1>
    <div class="subscription-box" id="mini">
        <h1>10,99€</h1>
        <p>1 Event eintragbar</p>
    </div>
    <h1>Subscription</h1>
    <div class="two-row">
     <div class="subscription-box" id="midi">
        <h1>10,99€</h1>
        <p>5 Events pro Monat möglich</p>
    </div>
    <div class="subscription-box" id="maxi">
        <h1>14,99€</h1>
        <p>10 Events pro Monat möglich</p>
    </div>
    </div>
    
    </page-layout>
</template>

<script>
import PageLayout from "../components/PageLayout.vue";
export default {
    components: {
        PageLayout
    }
}
</script>