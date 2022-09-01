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
      qrCodeData: {
        name: '',
        data: '',
      },
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
  <main class="max-w-screen-xl mx-auto px-4 py-8 md:py-10">
    <div class="mb-6">
      <h1 class="text-4xl tracking-tight font-bold text-black mb-4">Wifi QR-code generator</h1>

      <p>Generate a QR-code for your Wifi.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <WifiConfigForm @generate-qr-code="updateQrCodeData" />

      <QrCodePreview :qrCodeData="qrCodeData" />
    </div>
  </main>
</template>
