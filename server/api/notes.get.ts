export default defineEventHandler(async () => {
  const db = await useDb()
  return { driver: db.driver, version: await db.version(), notes: await db.listNotes() }
})
