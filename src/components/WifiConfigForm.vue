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
      let data = 'WIFI:';

      data += `T:${wifiConfig.type};`;
      data += `S:${this.escapeForQrCode(wifiConfig.ssid)};`;

      if(wifiConfig.type !== 'nopass') {
        data += `P:${this.escapeForQrCode(wifiConfig.password)};`;
      }

      this.$emit('generate-qr-code', data);
    },
    escapeForQrCode(string) {
      return string.replace(/[\\;,":]/g, match => `\\${match}`);
    },
  },
}
</script>

<template>
  <form @submit.prevent="generateQrCodeData">
    <div class="form-group">
      <select v-model="wifiConfig.type" required>
        <option disabled value="">Select your encryption type</option>
        <option v-for="authType in authTypes" :key="authType.value" :value="authType.value">{{ authType.name }}</option>
      </select>
    </div>

    <div class="form-group">
      <input type="text" v-model="wifiConfig.ssid" required>
    </div>

    <div class="form-group">
      <input v-if="wifiConfig.type !== 'nopass'" type="password" v-model="wifiConfig.password" required>
    </div>

    <button>Generate QR-code</button>
  </form>
</template>
