export default defineEventHandler(async (event) => {
  const { text } = await readBody<{ text?: string }>(event)
  const trimmed = text?.trim()
  if (!trimmed) throw createError({ statusCode: 400, statusMessage: 'text is required' })
  return (await useDb()).addNote(trimmed.slice(0, 200))
})
