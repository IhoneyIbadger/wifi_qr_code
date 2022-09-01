<script>
import WifiConfigForm from '@/components/WifiConfigForm.vue'
import QrCodePreview from '@/components/QrCodePreview.vue'

export default {
  components: {
    WifiConfigForm,
    QrCodePreview,
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

    <QrCodePreview :qrCodeData="qrCodeData" />
  </main>
</template>
