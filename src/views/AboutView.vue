<script>
import { useHead } from '@vueuse/head'

export default {
  setup() {
    useHead({
      title: 'About | WiFi QR Code Generator',
      meta: [
        {
          name: 'description',
          content: 'How our WiFi QR Code generator works and other information about us.',
        },
        {
          name: 'keywords',
          content: 'QR Code, WiFi, generator, network, password',
        },
      ],
    });
  },
}
</script>

<template>
  <main class="py-8 md:py-10">
    <section class="max-w-prose w-full mx-auto p-4 md:py-5 text-center">
      <h1 class="text-5xl tracking-tight font-bold text-indigo-500">About</h1>
    </section>

    <section class="max-w-prose w-full mx-auto p-4 md:py-5">
      <h2 class="text-3xl tracking-tight font-bold text-black mb-3"></h2>

      <p>
      </p>
    </section>
  </main>
</template>
