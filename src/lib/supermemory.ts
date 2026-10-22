/**
 * Supermemory v5 memory layer for NexPath web.
 *
 * Rules that are load-bearing (see .agents/skills/supermemory):
 *  - Every write and every search names exactly ONE namespace, and it is always
 *    the first argument. There is no namespace field in the request body.
 *  - Auth is `Authorization: Bearer sm_...` only, read from SUPERMEMORY_API_KEY.
 *  - `dreaming: "instant"` whenever the next step reads memories or the profile.
 *  - v5 only. No containerTag, no customId, no /v3/ or /v4/ paths.
 */
import { Supermemory } from "supermemory";
import type { FilterExpression } from "supermemory";

export type SearchMode = "hybrid" | "memories" | "chunks";
export type Rerank = "none" | "order" | "aggregate";
export type Dreaming = "dynamic" | "instant";
export type TaskType = "memory" | "superrag";
export type MetadataValue = string | number | boolean | string[];

export interface RememberOptions {
  /** Stable document id. Reusing it appends/diffs into the same document. */
  id?: string;
  metadata?: Record<string, MetadataValue>;
  /** Context that guides extraction inside the namespace (max 1500 chars). */
  supportingContext?: string;
  /** Metadata values that isolate related context within the namespace. */
  group?: Record<string, MetadataValue>;
  /** ISO 8601 timestamp for when the source content is from. */
  date?: string;
  /** "memory" (default) for durable context, "superrag" for retrieval-only indexing. */
  taskType?: TaskType;
  /** "instant" makes memories available right away; "dynamic" batches extraction. */
  dreaming?: Dreaming;
}

export interface RecallOptions {
  /** "hybrid" (default), "memories" for learned facts, "chunks" for source text. */
  searchMode?: SearchMode;
  limit?: number;
  /** Minimum relevance score, 0 to 1. Default 0.3. */
  threshold?: number;
  rerank?: Rerank;
  rewriteQuery?: boolean;
  /** Typed metadata filter. Never a JSON string. */
  filter?: FilterExpression;
  include?: { documents?: boolean; related?: boolean; forgotten?: boolean };
}

export interface RememberResult {
  id: string;
  status: string;
}

export interface RecalledMemory {
  id: string;
  memory?: string;
  chunk?: string;
  similarity: number;
  isLatest: boolean;
  isInference: boolean;
  metadata: Record<string, unknown>;
}

let client: Supermemory | null = null;

/** Lazily builds the SDK client from SUPERMEMORY_API_KEY. */
export function getClient(): Supermemory {
  if (client) return client;
  const apiKey = process.env.SUPERMEMORY_API_KEY;
  if (!apiKey) {
    throw new Error(
      "SUPERMEMORY_API_KEY is not set. Copy .env.example to .env and add your key from https://console.supermemory.ai",
    );
  }
  client = new Supermemory({ apiKey });
  return client;
}

/** Replace anything that is not allowed in a namespace path segment. */
function sanitize(value: string): string {
  return value.trim().replace(/[^a-zA-Z0-9_-]+/g, "_");
}

/** One namespace per end user: `user_123`. */
export function userNamespace(userId: string | number): string {
  return `user_${sanitize(String(userId))}`;
}

/** Per user AND per project: `user_123_project_abc`. */
export function projectNamespace(
  userId: string | number,
  projectId: string | number,
): string {
  return `${userNamespace(userId)}_project_${sanitize(String(projectId))}`;
}

/** Shared company knowledge: `org_acme_kb`. Read with a second search. */
export function orgNamespace(name: string): string {
  return `org_${sanitize(name)}`;
}

/**
 * Ingest content into a namespace. Returns the document id and status.
 * `status` is "queued" when work started, or the current state for a duplicate id.
 */
export async function remember(
  namespace: string,
  content: string,
  options: RememberOptions = {},
): Promise<RememberResult> {
  const { id, status } = await getClient().add(namespace, {
    content,
    ...options,
  });
  return { id, status };
}

/** Search one namespace. Branch on `memory` vs `chunk` per result. */
export async function recall(
  namespace: string,
  query: string,
  options: RecallOptions = {},
): Promise<RecalledMemory[]> {
  const { results } = await getClient().search(namespace, { query, ...options });
  return results as RecalledMemory[];
}

/** The maintained profile for a namespace: standing facts, recent context, buckets. */
export async function getProfile(namespace: string) {
  const { profile } = await getClient().profile(namespace);
  return profile;
}

/** Flatten a profile into text you can drop into a prompt. */
export function profileToText(profile: {
  static?: { memory: string }[];
  dynamic?: { memory: string }[];
  buckets?: Record<string, { memory: string }[]>;
}): string {
  const lines: string[] = [];
  for (const item of profile.static ?? []) lines.push(item.memory);
  for (const item of profile.dynamic ?? []) lines.push(item.memory);
  for (const [bucket, items] of Object.entries(profile.buckets ?? {})) {
    for (const item of items) lines.push(`${bucket}: ${item.memory}`);
  }
  return lines.join("\n");
}

/**
 * Poll until the document finished processing.
 * `system.status` is one of: unknown, queued, extracting, chunking, embedding,
 * indexing, done, failed.
 */
export async function waitForDocument(
  namespace: string,
  id: string,
  { timeoutMs = 120_000, intervalMs = 1_000 } = {},
): Promise<void> {
  const deadline = Date.now() + timeoutMs;
  for (;;) {
    const doc = await getClient().documents.get(namespace, id);
    const status = doc.system.status;
    if (status === "done") return;
    if (status === "failed") {
      throw new Error(`document ${id} failed to process`);
    }
    if (Date.now() > deadline) {
      throw new Error(
        `document ${id} still "${status}" after ${timeoutMs}ms. Memory formation may need more time, or use dreaming: "instant".`,
      );
    }
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

/** Preview which memories match a meaning. Review `matches` before deleting. */
export async function previewForget(
  namespace: string,
  query: string,
) {
  return getClient().memories.forgetMatching(namespace, { query, dryRun: true });
}

/** Delete specific memories by id. */
export async function forget(
  namespace: string,
  ids: string[],
) {
  return getClient().memories.forget(namespace, { ids });
}
