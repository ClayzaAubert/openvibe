import { describe, expect, test } from "bun:test"
import { catalogIdentity } from "./catalog-identity"

describe("stats catalog identity", () => {
  test("returns empty identity", () => {
    const identity = catalogIdentity({ models: {}, providers: {} })
    expect(identity.offerings.size).toBe(0)
    expect(identity.models.size).toBe(0)
  })

  test("rejects invalid catalogs", () => {
    expect(() => catalogIdentity({})).toThrow("Invalid model catalog")
  })
})
