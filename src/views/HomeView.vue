<script>
import WifiConfigForm from '@/components/WifiConfigForm.vue'

export default {
  components: {
    WifiConfigForm
  },
  data() {
    return {
      qrCodeData: '',
    }
  },
  methods: {
    updateQrCodeData(qrCodeData) {
      this.$data.qrCodeData = qrCodeData;
    },
  }
}
</script>

<template>
  <main>
    <h1>Wifi QR-code generator</h1>

    <WifiConfigForm @generate-qr-code="updateQrCodeData" />

    <p>{{ qrCodeData }}</p>
  </main>
</template>
