<script setup>
import { RouterView } from 'vue-router'
import HeaderNavigation from '@/components/HeaderNavigation.vue'
import FooterNavigation from '@/components/FooterNavigation.vue'
</script>

<template>
  <HeaderNavigation />

  <RouterView />

  <FooterNavigation />
</template>

<style scoped>

</style>
