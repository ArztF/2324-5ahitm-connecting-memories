<template>
  <h1 id="headingPayment">Zahlung</h1>
  <page-layout>
    <button class="paypal-option1"></button>
    <button class="applepay-option2"></button>

    <div class="paymentDetails">
      <h2 id="paymentinfo">Zahlungsinfos</h2>
      <p id="abomodel">Abomodel:</p>
    </div>

    <div class="contactInfos">
      <h2 id="contactinfo">Kontaktinformationen</h2>
      <input
        class="contact-input"
        v-model="vorname"
        name="vorname"
        placeholder="Vorname"
      />
      <input
        class="contact-input"
        v-model="nachname"
        name="nachname"
        placeholder="Nachname"
      />
      <input
        class="contact-big-input"
        type="email"
        v-model="email"
        name="email"
        placeholder="Email"
      />
      <input
        class="contact-mid-input"
        v-model="straße"
        name="straße"
        placeholder="Straße"
      />
      <input
        class="contact-small-input"
        v-model="hausnummer"
        name="hausnummer"
        placeholder="Nr"
      />
      <input
        class="contact-mid-input"
        v-model="stadt"
        name="stadt"
        placeholder="Stadt"
      />
      <input
        class="contact-small-input"
        v-model="plz"
        name="plz"
        placeholder="Plz"
      />
    </div>
    <div class="paying-box">
      <ion-button @click="submitClicked" class="pay-submit-button" type="submit"
        >Kauf abschließen</ion-button
      >
    </div>
  </page-layout>
</template>

<script>
import PageLayout from "../components/PageLayout.vue";
export default {
  components: {
    PageLayout,
  },
};
</script>