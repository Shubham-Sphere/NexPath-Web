/**
 * End-to-end smoke test for the Supermemory v5 setup.
 *
 *   npm run memory:smoke
 *
 * Needs SUPERMEMORY_API_KEY in .env. It writes one document into a scratch
 * namespace, waits for processing, searches it, prints the profile, then
 * deletes the document again.
 */
import "dotenv/config";
import {
  forget,
  getClient,
  getProfile,
  profileToText,
  recall,
  remember,
  waitForDocument,
} from "../src/lib/supermemory.js";

const NAMESPACE = process.env.SUPERMEMORY_NAMESPACE ?? "nexpath_smoke";
const DOCUMENT_ID = `smoke_${Date.now()}`;

async function main() {
  if (!process.env.SUPERMEMORY_API_KEY) {
    console.error(
      "SUPERMEMORY_API_KEY is missing.\n" +
        "  1. cp .env.example .env\n" +
        "  2. add your key from https://console.supermemory.ai\n",
    );
    process.exit(1);
  }

  console.log(`namespace: ${NAMESPACE}`);
  console.log(`client:    ${getClient().constructor.name}`);

  console.log("\n[1/4] add document (dreaming: instant)");
  const { id, status } = await remember(
    NAMESPACE,
    "NexPath web smoke test. The NexPath assistant prefers TypeScript and stores memory per user namespace.",
    { id: DOCUMENT_ID, metadata: { source: "smoke-test" }, dreaming: "instant" },
  );
  console.log(`      id=${id} status=${status}`);

  console.log("\n[2/4] wait for processing");
  await waitForDocument(NAMESPACE, id);
  console.log("      system.status = done");

  console.log("\n[3/4] search");
  const results = await recall(NAMESPACE, "What language does NexPath prefer?", {
    searchMode: "hybrid",
    limit: 5,
  });
  if (results.length === 0) {
    console.log("      (no results — memories may still be forming)");
  }
  for (const result of results) {
    console.log(
      `      [${result.similarity.toFixed(3)}] ${result.memory ?? result.chunk ?? ""}`,
    );
  }

  console.log("\n[4/4] profile");
  const profile = await getProfile(NAMESPACE);
  const text = profileToText(profile);
  console.log(text ? `      ${text}` : "      (profile is empty)");

  console.log("\ncleanup: deleting the smoke-test document");
  await getClient().documents.delete(NAMESPACE, { ids: [id] });
  console.log("done. To also drop the extracted memories:");
  console.log(`  npx supermemory namespaces delete ${NAMESPACE}`);
}

main().catch((error) => {
  console.error("\nsmoke test failed:", error);
  process.exit(1);
});
