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
  <main class="py-8 md:py-10">
    <section class="max-w-prose mx-auto px-4 py-4 md:py-5 text-center">
      <h1 class="text-4xl tracking-tight font-bold text-black mb-2">WiFi QR Code Generator</h1>

      <h2 class="text-xl tracking-tight font-bold text-black">Generate a QR-code for your Wifi.</h2>
    </section>

    <section class="max-w-screen-xl mx-auto px-4 py-4 md:py-5">
      <div class="bg-gray-200 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
        <WifiConfigForm @generate-qr-code="updateQrCodeData" />

        <QrCodePreview :qrCodeData="qrCodeData" />
      </div>
    </section>
  </main>
</template>
