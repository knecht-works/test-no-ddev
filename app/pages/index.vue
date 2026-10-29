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

const { data: notes, error: notesError, refresh: refreshNotes } = await useFetch('/api/notes')
const text = ref('')
const saving = ref(false)

async function addNote() {
  if (!text.value.trim()) return
  saving.value = true
  try {
    await $fetch('/api/notes', { method: 'POST', body: { text: text.value } })
    text.value = ''
    await refreshNotes()
  }
  finally {
    saving.value = false
  }
}
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

    <section class="kit-card kit-stack kit-mt-8">
      <h2 class="kit-text-xl">Database</h2>
      <p v-if="notesError" class="kit-muted">
        {{ notesError.data?.statusMessage ?? notesError.message }}
      </p>
      <template v-else-if="notes">
        <dl class="kit-dl">
          <div class="kit-dl-row">
            <dt>Driver</dt>
            <dd>{{ notes.driver }}</dd>
          </div>
          <div class="kit-dl-row">
            <dt>Version</dt>
            <dd>{{ notes.version }}</dd>
          </div>
        </dl>
        <form class="kit-flex kit-gap-2" @submit.prevent="addNote">
          <input v-model="text" class="kit-grow kit-p-2 kit-border kit-rounded" placeholder="Write a note" maxlength="200">
          <button class="kit-button kit-button--solid" type="submit" :disabled="saving">Add note</button>
        </form>
        <p v-if="!notes.notes.length" class="kit-muted">No notes yet.</p>
        <ul v-else class="kit-stack kit-gap-1">
          <li v-for="note in notes.notes" :key="note.id">
            {{ note.text }} <span class="kit-muted kit-text-sm">{{ note.createdAt }}</span>
          </li>
        </ul>
      </template>
    </section>

    <p class="kit-muted">
      <NuxtLink to="/about">about page</NuxtLink>
    </p>
  </main>
</template>
