<script setup>
import '@unocss/reset/tailwind.css';
</script>

<template>
  <div class="w-screen flex flex-col items-center">
    <div class="w-full h-12">ROOT PAGE!</div>
    <!-- Markup shared across all pages, ex: NavBar -->
    <div class="max-w-[720px]">
      <NuxtPage />
    </div>
  </div>
</template>
