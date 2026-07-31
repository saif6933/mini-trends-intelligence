import {
  IdentityDecision,
  IdentityType,
} from "./identityTypes";

import { entityRegistry } from "./entityRegistry";
import { keywordCanonicalMap } from "../data/keywordCanonicalMap";

export function resolveKeywordIdentity(
  keyword: string
): IdentityDecision {

  const trimmedKeyword = keyword.trim().toLowerCase();

  let resolvedCanonical = keyword.trim();

  for (const entry of keywordCanonicalMap) {
    const matchesCanonical = entry.canonical.toLowerCase() === trimmedKeyword;
    const matchesVariant = entry.variants.some(
      (v) => v.toLowerCase() === trimmedKeyword
    );

    if (matchesCanonical || matchesVariant) {
      resolvedCanonical = entry.canonical;
      break;
    }
  }

  const entity = entityRegistry.find(
    (item) =>
      item.canonical.toLowerCase() ===
      resolvedCanonical.toLowerCase()
  );

  if (entity) {
    return {
      type: IdentityType.CANONICAL_MATCH,
      canonical: entity.canonical,
      reason: "Canonical entity found",
    };
  }

  entityRegistry.push({
    canonical: resolvedCanonical,
    signals: [],
  });

  return {
    type: IdentityType.CANONICAL_MATCH,
    canonical: resolvedCanonical,
    reason: "Resolved via canonical map and registered",
  };

}

export function testKeywordIdentity(): void {

  console.log("IDENTITY FUNCTION RUNNING");

  console.log(
    resolveKeywordIdentity("ChatGPT")
  );

}