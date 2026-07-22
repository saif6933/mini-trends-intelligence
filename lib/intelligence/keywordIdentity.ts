import {
  IdentityDecision,
  IdentityType,
} from "./identityTypes";

import { entityRegistry } from "./entityRegistry";

export function resolveKeywordIdentity(
  keyword: string
): IdentityDecision {

  const entity = entityRegistry.find(
    (item) =>
      item.canonical.toLowerCase() ===
      keyword.trim().toLowerCase()
  );

  if (entity) {
    return {
      type: IdentityType.CANONICAL_MATCH,
      canonical: entity.canonical,
      reason: "Canonical entity found",
    };
  }

  return {
    type: IdentityType.UNKNOWN_ENTITY,
    canonical: keyword.trim(),
    reason: "Entity not found",
  };

}

export function testKeywordIdentity(): void {

  console.log("IDENTITY FUNCTION RUNNING");

  console.log(
    resolveKeywordIdentity("ChatGPT")
  );

}