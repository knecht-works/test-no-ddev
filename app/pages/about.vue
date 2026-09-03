<script setup lang="ts">
useHead({ title: 'About | Knecht' })
</script>

<template>
  <main class="kit-container kit-stack">
    <span class="kit-badge kit-mb-4">nuxt-test-e2e</span>

    <h1>About <span class="kit-accent-text">this fixture</span></h1>

    <p class="kit-muted">
      A second route so Knecht can test client-side navigation. This repo has no
      <code class="kit-code">.ddev/config.yaml</code> on purpose — Knecht detects
      the environment on its own and runs <code class="kit-code">pnpm dev</code>.
    </p>

    <p class="kit-muted">
      <NuxtLink to="/">back to the start page</NuxtLink>
    </p>
  </main>
</template>
