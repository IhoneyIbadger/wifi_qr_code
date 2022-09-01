<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header class="sticky top-0 bg-white shadow-sm z-50">
    <nav class="max-w-screen-xl mx-auto px-4 text-gray-500 font-medium text-sm h-16 flex items-center">
      <RouterLink to="/" class="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">Home</RouterLink>
      
      <RouterLink to="/about" class="px-3 py-2 rounded-md hover:bg-gray-100 hover:text-black">About</RouterLink>
    </nav>
  </header>
</template>