const CATALOG_URL = "https://models.dev/catalog.json"
const cache: { value?: CatalogIdentity; expiresAt?: number } = {}

export type CatalogIdentity = {
  offerings: ReadonlyMap<string, string>
  models: ReadonlyMap<string, string>
}

export async function loadCatalogIdentity() {
  if (cache.value && (cache.expiresAt ?? 0) > Date.now()) return { catalog: cache.value, stale: false }
  return fetch(CATALOG_URL, { signal: AbortSignal.timeout(10_000) })
    .then(async (response) => {
      if (!response.ok) throw new Error(`Model catalog returned ${response.status}`)
      return catalogIdentity(await response.json())
    })
    .then((value) => {
      cache.value = value
      cache.expiresAt = Date.now() + 5 * 60_000
      return { catalog: value, stale: false }
    })
    .catch(() => ({ catalog: cache.value, stale: true }))
}

export function catalogIdentity(value: unknown): CatalogIdentity {
  if (!record(value) || !record(value.models) || !record(value.providers)) throw new Error("Invalid model catalog")
  const offerings = new Map<string, string>()
  const candidates = new Map<string, Set<string>>()

  return {
    offerings,
    models: new Map(
      [...candidates.entries()].flatMap(([model, labs]) => (labs.size === 1 ? [[model, [...labs][0]!]] : [])),
    ),
  }
}

function record(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value)
}
