<script>
export default {
  data() {
    return {
      authTypes: [
        { name: 'WPA / WPA2', value: 'WPA' },
        { name: 'WEP', value: 'WEP' },
        { name: 'No password', value: 'nopass' },
      ],
      wifiConfig: {
        type: '',
        ssid: '',
        password: '',
      },
      passwordVisible: false,
    };
  },
  methods: {
    generateQrCodeData() {
      const wifiConfig = this.$data.wifiConfig;
      let qrCodeData = 'WIFI:';

      qrCodeData += `T:${wifiConfig.type};`;
      qrCodeData += `S:${this.escapeForQrCode(wifiConfig.ssid)};`;

      if(wifiConfig.type !== 'nopass') {
        qrCodeData += `P:${this.escapeForQrCode(wifiConfig.password)};`;
      }

      this.$emit('generate-qr-code', {
        name: wifiConfig.ssid,
        password: wifiConfig.type === 'nopass' ? '' : wifiConfig.password,
        data: qrCodeData,
      });
    },
    escapeForQrCode(string) {
      return string.replace(/[\\;,":]/g, match => `\\${match}`);
    },
  },
}
</script>

<template>
  <form @submit.prevent="generateQrCodeData">
    <div class="mb-6">
      <label for="type" class="block text-sm font-medium text-gray-700 mb-2">Encryption type</label>

      <select id="type" v-model="wifiConfig.type" required class="block w-full bg-white rounded-md shadow-sm py-3 px-6 sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-0">
        <option disabled value="">Select your encryption type</option>
        <option v-for="authType in authTypes" :key="authType.value" :value="authType.value">{{ authType.name }}</option>
      </select>
    </div>

    <div class="mb-6">
      <label for="ssid" class="block text-sm font-medium text-gray-700 mb-2">WiFi name</label>

      <input id="ssid" type="text" v-model="wifiConfig.ssid" required class="block w-full bg-white rounded-md shadow-sm py-3 px-6 sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-0">
    </div>

    <div v-if="wifiConfig.type !== 'nopass'" class="mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>

      <div class="flex gap-2">
        <input id="password" :type="passwordVisible ? 'text' : 'password'" v-model="wifiConfig.password" required class="block w-full bg-white rounded-md shadow-sm py-3 px-6 sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-0">

        <button @click="passwordVisible = !passwordVisible" type="button" title="Show / hide password" class="bg-white rounded-md shadow-sm p-3 sm:text-sm focus:ring-2 focus:ring-indigo-500 outline-0">

          <svg v-if="passwordVisible" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
          </svg>

          <svg v-else xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-slash" viewBox="0 0 16 16">
            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z"/>
            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z"/>
            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z"/>
          </svg>
        </button>
      </div>
    </div>

    <button class="block bg-indigo-500 text-white rounded-md shadow-sm py-3 px-6 sm:text-sm">Generate QR Code</button>
  </form>
</template>
