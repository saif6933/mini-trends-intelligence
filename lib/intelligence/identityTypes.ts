export enum IdentityType {
  TRUE_DUPLICATE = "TRUE_DUPLICATE",
  INTENTIONAL_DUPLICATE = "INTENTIONAL_DUPLICATE",
  ALIAS_DUPLICATE = "ALIAS_DUPLICATE",
  CONFLICT_DUPLICATE = "CONFLICT_DUPLICATE",
  UNKNOWN_ENTITY = "UNKNOWN_ENTITY",
  CANONICAL_MATCH = "CANONICAL_MATCH",
}

export enum SignalSource {
  TREND = "trend",
  VIRAL = "viral",
  KEYWORD = "keyword",
}

export interface SignalRecord {
  source: SignalSource;
  country: string;
  category: string;
}

export interface IdentityDecision {
  type: IdentityType;
  canonical: string;
  reason: string;
}