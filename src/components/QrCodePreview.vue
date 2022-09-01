<script>
import QRCode from 'qrcode';
import html2pdf from 'html2pdf.js';

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

      this.$data.previewUrl = await QRCode.toDataURL(newData.data, {scale: 10});
    },
  },
  methods: {
    downloadPdf() {
      html2pdf()
        .set({
          margin: [20, 0],
          filename: 'Wifi-QR-code.pdf',
        })
        .from(this.qrCodeTemplate(), 'string')
        .toPdf()
        .save();
    },
    async downloadImage() {
      const dataUrl = await html2pdf()
        .from(this.qrCodeTemplate(), 'string')
        .outputImg('dataurlstring');
      
      const link = document.createElement('a');
      link.download = 'Wifi-QR-code.jpg';
      link.href = dataUrl;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    async print() {
      const blob = await html2pdf()
        .set({
          margin: [20, 0],
          filename: 'Wifi-QR-code.pdf',
        })
        .from(this.qrCodeTemplate(), 'string')
        .outputPdf('blob');

      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = url;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    qrCodeTemplate() {
      return `
        <div class="flex justify-center text-white">
          <div class="flex flex-col bg-indigo-500 shadow-sm rounded-lg p-6">
            <div class="flex justify-center">
              <img src="${this.$data.previewUrl}" class="h-80 w-80 rounded-md">
            </div>
            <span class="block w-80 text-xl text-center break-words">Wifi name: ${this.$props.qrCodeData.name}</span>
            <span class="block w-80 text-center mb-4">Scan with your phone to connect!</span>
            <span class="block w-80 text-sm text-center">Generated on <a href="https://wifi2qr.com">wifi2qr.com</a></span>
          </div>
        </div>
      `;
    }
  }
}
</script>

<template>
  <div class="flex justify-center space-x-4">
    <div class="flex flex-col bg-indigo-500 shadow-sm rounded-lg p-4 min-w-0">
      <img v-if="previewUrl" :src="previewUrl" class="max-w-64 rounded-md mb-4">
      <div v-else class="flex justify-center items-center text-center max-w-64 aspect-square rounded-md bg-white text-xl text-gray-700 p-4">
        Fill in your WiFi data to generate a QR code.
      </div>

      <span v-if="qrCodeData.name" class="text-xl text-white text-center max-w-64 break-words">Wifi name: {{qrCodeData.name}}</span>
    </div>

    <div v-if="previewUrl" class="flex flex-col justify-center grow-1">
      <button @click="downloadPdf" type="button" class="flex items-center py-4 px-8 border-b border-b-gray-500 rounded-t-md hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>

        <span>Download as PDF</span>
      </button>

      <button @click="downloadImage" type="button" class="flex items-center py-4 px-8 border-b border-b-gray-500 hover:bg-gray-100">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="mr-2" viewBox="0 0 16 16">
          <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
          <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
        </svg>

        <span>Download as image</span>
      </button>

      <button @click="print" type="button" class="flex items-center py-4 px-8 rounded-b-md hover:bg-gray-100">
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
    width: 100%;
    height: auto;
    image-rendering: pixelated;
  }

  .max-w-64 {
    max-width: 16rem;
  }
</style>