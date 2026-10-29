import { createPool, type ResultSetHeader } from 'mysql2/promise'
import pg from 'pg'

export interface Note {
  id: number
  text: string
  createdAt: string
}

export interface Db {
  driver: 'mysql' | 'postgres'
  version(): Promise<string>
  listNotes(): Promise<Note[]>
  addNote(text: string): Promise<Note>
}

let db: Promise<Db> | null = null

// One pool per process, opened on first use: a missing or wrong URL only fails
// the database card, the rest of the page still renders.
export function useDb(): Promise<Db> {
  db ??= connect().catch((e) => {
    db = null
    throw e
  })
  return db
}

async function connect(): Promise<Db> {
  const url = process.env.DATABASE_URL
  if (!url) throw createError({ statusCode: 503, statusMessage: 'DATABASE_URL is not set' })
  const { protocol } = new URL(url)
  if (protocol === 'mysql:' || protocol === 'mariadb:') return mysqlDb(url.replace(/^mariadb:/, 'mysql:'))
  if (protocol === 'postgres:' || protocol === 'postgresql:') return postgresDb(url)
  throw createError({ statusCode: 503, statusMessage: `Unsupported DATABASE_URL scheme "${protocol}"` })
}

async function mysqlDb(url: string): Promise<Db> {
  const pool = createPool({ uri: url, dateStrings: true })
  await pool.query('CREATE TABLE IF NOT EXISTS notes (id INT AUTO_INCREMENT PRIMARY KEY, text TEXT NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP)')
  const rows = async <T>(sql: string, params: unknown[] = []) => (await pool.query(sql, params))[0] as T[]
  const select = 'SELECT id, text, created_at AS createdAt FROM notes'
  return {
    driver: 'mysql',
    version: async () => (await rows<{ version: string }>('SELECT VERSION() AS version'))[0]!.version,
    listNotes: () => rows<Note>(`${select} ORDER BY id DESC LIMIT 20`),
    addNote: async (text) => {
      const [result] = await pool.query<ResultSetHeader>('INSERT INTO notes (text) VALUES (?)', [text])
      return (await rows<Note>(`${select} WHERE id = ?`, [result.insertId]))[0]!
    },
  }
}

async function postgresDb(url: string): Promise<Db> {
  const pool = new pg.Pool({ connectionString: url })
  await pool.query('CREATE TABLE IF NOT EXISTS notes (id SERIAL PRIMARY KEY, text TEXT NOT NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())')
  const rows = async <T>(sql: string, params: unknown[] = []) => (await pool.query(sql, params)).rows as T[]
  const columns = 'id, text, created_at AS "createdAt"'
  return {
    driver: 'postgres',
    version: async () => (await rows<{ version: string }>('SELECT version()'))[0]!.version,
    listNotes: () => rows<Note>(`SELECT ${columns} FROM notes ORDER BY id DESC LIMIT 20`),
    addNote: async text => (await rows<Note>(`INSERT INTO notes (text) VALUES ($1) RETURNING ${columns}`, [text]))[0]!,
  }
}
