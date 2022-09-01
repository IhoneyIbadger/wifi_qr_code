<script>
import QRCode from 'qrcode';

export default {
  props: {
    qrCodeData: Object,
  },
  data() {
    return {
      previewUrl: '',
    };
  },
  watch: {
    async qrCodeData(newData) {
      if(newData.data === '') {
        this.$data.previewUrl = '';

        return;
      };

      this.$data.previewUrl = await QRCode.toDataURL(newData.data);
    }
  }
}
</script>

<template>
  <div class="flex justify-center space-x-4">
    <div class="flex flex-col bg-indigo-500 shadow-sm rounded-lg p-4">
      <img v-if="previewUrl" :src="previewUrl" class="w-64 rounded-md mb-4">
      <div v-else class="flex justify-center items-center text-center w-64 h-64 rounded-md bg-white text-xl text-gray-700 p-4">
        Fill in your wifi data to see the QR-code.
      </div>

      <span v-if="qrCodeData.name" class="w-64 text-xl text-white text-center">Wifi Name / SSID: {{qrCodeData.name}}</span>
    </div>

    <div class="flex flex-col justify-center grow-1">
      <button class="flex items-center py-4 px-8 border-b border-b-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>

        <span>Download as image</span>
      </button>

      <button class="flex items-center py-4 px-8 border-b border-b-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>

        <span>Download as PDF</span>
      </button>

      <button class="flex items-center py-4 px-8">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
          <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
          <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
        </svg>

        <span>Print</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
  img {
    image-rendering: pixelated;
  }
</style>