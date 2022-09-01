<script>
import QRCode from 'qrcode';

export default {
  props: {
    qrCodeData: String,
  },
  data() {
    return {
      previewUrl: '',
    };
  },
  watch: {
    async qrCodeData(newData) {
      if(newData === '') {
        this.$data.previewUrl = '';

        return;
      };

      this.$data.previewUrl = await QRCode.toDataURL(newData);
    }
  }
}
</script>

<template>
  <div>
    <img :src="previewUrl">
  </div>
</template>
