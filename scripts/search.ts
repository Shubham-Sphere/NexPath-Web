/**
 * Search the Supermemory namespace from the terminal.
 *
 *   npm run memory:search -- "what do I like?"
 *
 * Uses SUPERMEMORY_NAMESPACE from .env (default: nexpath).
 */
import "dotenv/config";
import { getProfile, profileToText, recall } from "../src/lib/supermemory.js";

const query = process.argv.slice(2).join(" ");
if (!query) {
  console.error('usage: npm run memory:search -- "your query"');
  process.exit(1);
}

const namespace = process.env.SUPERMEMORY_NAMESPACE ?? "nexpath";

try {
  const results = await recall(namespace, query, { limit: 10 });
  console.log(`${results.length} result(s) in "${namespace}"\n`);
  for (const result of results) {
    console.log(
      `[${result.similarity.toFixed(3)}] ${result.memory ?? result.chunk ?? ""}`,
    );
  }

  const profile = profileToText(await getProfile(namespace));
  if (profile) {
    console.log(`\n--- profile ---\n${profile}`);
  }
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
}
