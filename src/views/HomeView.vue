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
    <section class="max-w-prose w-full mx-auto p-4 md:py-5 text-center">
      <h1 class="text-5xl tracking-tight font-bold text-indigo-500 mb-2">WiFi QR Code Generator</h1>

      <p class="text-2xl tracking-tight font-bold text-black">Generate a QR Code for Your WiFi</p>
    </section>

    <section class="max-w-screen-xl w-full mx-auto p-4 md:py-5">
      <div class="bg-gray-200 rounded-lg p-8 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-8">
        <WifiConfigForm @generate-qr-code="updateQrCodeData" />

        <QrCodePreview :qrCodeData="qrCodeData" />
      </div>
    </section>

    <section class="max-w-prose w-full mx-auto p-4 md:py-5">
      <h2 class="text-3xl tracking-tight font-bold text-black mb-3">Why Should I Generate a QR Code for My WiFi?</h2>

      <p>
        To connect to a WiFi network, you usually have to manually select a network and then enter a complicated password.
        With a QR Code, this is done automatically: simply scan the code with your phone's camera and the device will be connected to the network.
        With us you can easily and free of charge create a QR Code for your own WiFi network, which you can show for example to visitors at your home, so you don't have to look up the WiFi password every time.
        You don't have to worry about the code expiring either, as long as you don't change the WiFi password.
        In addition, the generation runs locally in your browser, so your password will not be passed on.
      </p>
    </section>

    <section class="max-w-prose w-full mx-auto p-4 md:py-5">
      <h2 class="text-3xl tracking-tight font-bold text-black mb-3">How Do I Generate a WiFi QR Code?</h2>

      <ol class="list-decimal pl-4">
        <li>Select the encryption type of your network. Most routers use WPA / WPA 2, but some older devices still use WEP.</li>
        <li>Enter the exact name of your WiFi.</li>
        <li>If your device has a password, enter it (again, make sure it is spelled correctly).</li>
        <li>Generate the QR Code and download it in the desired format.</li>
        <li>Never worry about entering the wrong password again</li>
      </ol>
    </section>
  </main>
</template>
