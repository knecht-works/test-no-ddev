<script setup lang="ts">
useHead({ title: 'Nuxt Test | Knecht' })

// Forward the host headers so the server route sees the hostname the page was
// requested with (the Knecht preview origin), not the internal fetch origin.
const { data: env } = await useFetch('/api/env', {
  headers: useRequestHeaders(['host', 'x-forwarded-host']),
})

const rows = computed(() => [
  ['Host', env.value?.host],
  ['Node version', env.value?.node],
  ['Nuxt version', env.value?.nuxt],
  ['Package manager', env.value?.packageManager],
  ['KNECHT_PREVIEW_URL', env.value?.previewUrl],
  ['Server time', env.value?.serverTime],
])
</script>

<template>
  <main class="kit-container kit-stack">
    <span class="kit-badge kit-mb-4">nuxt-test-e2e</span>

    <h1>Nuxt Fixture <span class="kit-accent-text">Knecht.works</span></h1>

    <p class="kit-muted">
      A small demo page, built with the Knecht Styleguide Kit. Served from
      <code class="kit-code">{{ env?.host }}</code> at {{ env?.serverTime }}.
    </p>

    <div class="kit-stack">
      <a class="kit-button kit-button--solid" href="https://knecht.works">Go to knecht.works</a>
      <button class="kit-button" data-kit-toast="Up and running! 🚀">Show toast</button>
      <a class="kit-button kit-button--ghost" href="https://github.com/knecht-works/test-no-ddev">Go to Repo</a>
    </div>

    <section class="kit-card kit-stack kit-mt-8">
      <dl class="kit-dl">
        <div v-for="[label, value] in rows" :key="label" class="kit-dl-row">
          <dt>{{ label }}</dt>
          <dd>{{ value ?? '—' }}</dd>
        </div>
      </dl>
    </section>

    <p class="kit-muted">
      <NuxtLink to="/about">about page</NuxtLink>
    </p>
  </main>
</template>
