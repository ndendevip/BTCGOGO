import { createClient } from '@libsql/client';

const client = createClient({
  url: "libsql://bitcoin-unlucky-bolt.turso.io",
  authToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk4NjI0MDAsImV4cCI6MTcxMjQ1NDQwMH0.YourSecretToken"
});

export interface UnluckyRecord {
  id: number;
  name: string;
  attempts: number;
  created_at: string;
}

export async function getUnluckyRecord(): Promise<UnluckyRecord | null> {
  const result = await client.execute(`
    SELECT * FROM unlucky_players 
    ORDER BY attempts DESC 
    LIMIT 1
  `);
  return result.rows[0] as UnluckyRecord || null;
}

export async function updateUnluckyRecord(name: string, attempts: number): Promise<void> {
  const currentRecord = await getUnluckyRecord();
  
  if (!currentRecord || attempts > currentRecord.attempts) {
    await client.execute({
      sql: "INSERT INTO unlucky_players (name, attempts) VALUES (?, ?)",
      args: [name, attempts]
    });
  }
}