<script>
import QRCode from 'qrcode';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export default {
  props: {
    qrCodeData: Object,
  },
  data() {
    return {
      previewUrl: '',
      colors: [
        { name: 'Black', value: 'bg-black' },
        { name: 'Red', value: 'bg-red-500' },
        { name: 'Orange', value: 'bg-orange-500' },
        { name: 'Yellow', value: 'bg-yellow-500' },
        { name: 'Green', value: 'bg-green-500' },
        { name: 'Blue', value: 'bg-blue-500' },
        { name: 'Indigo', value: 'bg-indigo-500' },
      ],
      design: {
        color: 'bg-indigo-500',
        nameVisible: true,
        passwordVisible: false,
      },
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
    async downloadPdf() {
      const div = this.qrCodeTemplate();
      const hidden = this.createHiddenElement();
      
      hidden.append(div);

      const canvas = await html2canvas(div);
      const doc = new jsPDF();
      
      doc.addImage(canvas.toDataURL(), 'PNG', 50, 20, 110, canvas.height / canvas.width * 110);
      doc.save('Wifi-QR-Code.pdf');

      hidden.remove();
    },
    async downloadImage() {
      const div = this.qrCodeTemplate();
      const hidden = this.createHiddenElement();
      
      hidden.append(div);

      const canvas = await html2canvas(div);

      hidden.remove();
      
      const link = document.createElement('a');
      link.download = 'Wifi-QR-Code.png';
      link.target = '_blank';
      link.href = canvas.toDataURL();

      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    async print() {
      const div = this.qrCodeTemplate();
      const hidden = this.createHiddenElement();
      
      hidden.append(div);

      const canvas = await html2canvas(div);
      const doc = new jsPDF();
      
      doc.addImage(canvas.toDataURL(), 'PNG', 50, 20, 110, canvas.height / canvas.width * 110);
      const blob = doc.output('blob');

      hidden.remove();
      
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.target = '_blank';
      link.href = url;

      document.body.appendChild(link);
      link.click();
      link.remove();
    },
    qrCodeTemplate() {
      let name = '';
      if(this.$data.design.nameVisible) {
        name = `
          <div class="w-80 mt-4">
            <span class="block text-sm">WiFi name</span>
            <span class="block text-xl break-words">${this.escapeHtml(this.$props.qrCodeData.name)}</span>
          </div>
        `;
      }

      let password = '';
      if(this.$data.design.passwordVisible) {
        password = `
          <div class="w-80 mt-4">
            <span class="block text-sm">Password</span>
            <span class="block text-xl break-words">${this.escapeHtml(this.$props.qrCodeData.password)}</span>
          </div>
        `;
      }

      const html = `
        <div class="flex flex-col ${this.$data.design.color} shadow-sm rounded-lg p-6 text-white">
          <div class="flex justify-center">
            <img src="${this.$data.previewUrl}" class="h-80 w-80 rounded-md">
          </div>
          ${name}
          ${password}
          <span class="block w-80 text-xl text-center mt-6">Scan with your phone to connect!</span>
          <span class="block w-80 text-xs text-center mt-2">Generated on <a href="https://wifi2qr.com">wifi2qr.com</a></span>
        </div>
      `.trim();

      const template = document.createElement('template');
      template.innerHTML = html;

      return template.content.firstChild;
    },
    createHiddenElement() {
      const hidden = document.createElement('div');
      
      hidden.style.position = 'fixed';
      hidden.style.top = '-9999px';
      hidden.style.left = '-9999px';
      hidden.style.width = '23rem';

      document.body.append(hidden);

      return hidden;
    },
    escapeHtml(string) {
      const text = document.createTextNode(string);
      const p = document.createElement('p');
      p.appendChild(text);
      
      return p.innerHTML;
    },
  }
}
</script>

<template>
  <div>
    <div class="flex justify-center space-x-8 h-full">
      <div :class="design.color" class="flex flex-col shadow-sm rounded-lg p-4 min-w-0 text-white">
        <img v-if="previewUrl" :src="previewUrl" class="max-w-64 rounded-md">
        <div v-else class="flex justify-center items-center text-center max-w-64 aspect-square rounded-md bg-white text-xl text-gray-700 p-4">
          Fill in your WiFi data to generate a QR code.
        </div>

        <div v-if="previewUrl && design.nameVisible" class="max-w-64 mt-4">
          <span class="block text-sm">WiFi name</span>
          <span class="block text-xl break-words">{{qrCodeData.name}}</span>
        </div>

        <div v-if="previewUrl && design.passwordVisible && qrCodeData.password" class="max-w-64 mt-4">
          <span class="block text-sm">Password</span>
          <span class="block text-xl break-words">{{qrCodeData.password}}</span>
        </div>
      </div>

      <div v-if="previewUrl" class="flex flex-col justify-center grow">
        <button @click="downloadPdf" type="button" class="flex items-center py-4 px-8 border-b border-b-gray-500 rounded-t-md hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-xl text-indigo-500 mr-2" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>

          <span>Download as PDF</span>
        </button>

        <button @click="downloadImage" type="button" class="flex items-center py-4 px-8 border-b border-b-gray-500 hover:bg-gray-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-xl text-indigo-500 mr-2" viewBox="0 0 16 16">
            <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
            <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
          </svg>

          <span>Download as image</span>
        </button>

        <button @click="print" type="button" class="flex items-center py-4 px-8 rounded-b-md hover:bg-gray-100 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" fill="currentColor" class="text-xl text-indigo-500 mr-2" viewBox="0 0 16 16">
            <path d="M2.5 8a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z"/>
            <path d="M5 1a2 2 0 0 0-2 2v2H2a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v1a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-1h1a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-1V3a2 2 0 0 0-2-2H5zM4 3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v2H4V3zm1 5a2 2 0 0 0-2 2v1H2a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v-1a2 2 0 0 0-2-2H5zm7 2v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1z"/>
          </svg>

          <span>Print</span>
        </button>

        <div class="mb-6">
          <label for="color" class="block text-sm font-medium text-gray-700 mb-2">Color</label>

          <select id="color" v-model="design.color" required class="block w-full bg-white rounded-md shadow-sm py-3 px-6 sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-0">
            <option v-for="color in colors" :key="color.value" :value="color.value">{{ color.name }}</option>
          </select>
        </div>

        <div class="flex items-center mb-6">
          <input id="name-visible" type="checkbox" v-model="design.nameVisible" class="mr-2">
          <label for="name-visible" class="text-sm font-medium text-gray-700">WiFi name visible</label>
        </div>

        <div v-if="qrCodeData.password" class="flex items-center">
          <input id="password-visible" type="checkbox" v-model="design.passwordVisible" class="mr-2">
          <label for="password-visible" class="text-sm font-medium text-gray-700">Password visible</label>
        </div>
      </div>
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