<script>
export default {
  data() {
    return {
      authTypes: [
        { name: 'No password', value: 'nopass' },
        { name: 'WEP', value: 'WEP' },
        { name: 'WPA / WPA2', value: 'WPA' },
      ],
      wifiConfig: {
        type: '',
        ssid: '',
        password: '',
      },
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

      <select id="type" v-model="wifiConfig.type" required class="block w-full rounded-md shadow-sm py-3 px-6 sm:text-sm">
        <option disabled value="">Select your encryption type</option>
        <option v-for="authType in authTypes" :key="authType.value" :value="authType.value">{{ authType.name }}</option>
      </select>
    </div>

    <div class="mb-6">
      <label for="ssid" class="block text-sm font-medium text-gray-700 mb-2">Wifi name / SSID</label>

      <input id="ssid" type="text" v-model="wifiConfig.ssid" required class="block w-full rounded-md shadow-sm py-3 px-6 sm:text-sm">
    </div>

    <div v-if="wifiConfig.type !== 'nopass'" class="mb-6">
      <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>

      <input id="password" type="password" v-model="wifiConfig.password" required class="block w-full rounded-md shadow-sm py-3 px-6 sm:text-sm">
    </div>

    <button class="block bg-indigo-500 text-white rounded-md shadow-sm py-3 px-6 sm:text-sm">Generate QR-code</button>
  </form>
</template>
