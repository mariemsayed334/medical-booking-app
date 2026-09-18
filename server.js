
import { JSONFile } from 'lowdb/node';
import { Low } from 'lowdb';
import { createApp } from 'json-server/lib/app.js';
import { NormalizedAdapter } from 'json-server/lib/adapters/normalized-adapter.js';
import { Observer } from 'json-server/lib/adapters/observer.js';

const PORT = process.env.PORT || 3001;
const DB_FILE = new URL('./db.json', import.meta.url).pathname;

const adapter = new Observer(new NormalizedAdapter(new JSONFile(DB_FILE)));
const db = new Low(adapter, {});
await db.read();

const app = createApp(db, { logger: true, static: [] });

app.listen(PORT, () => {
  console.log(`MediBook API running on port ${PORT}`);
});