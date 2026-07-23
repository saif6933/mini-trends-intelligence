// ==========================================================
// Mini Trends Intelligence System
// Signal Engine (Phase 3.1.4 - Step 3)
// Version 1.0 - Production Grade
// ==========================================================

import { EnrichedKeywordResult } from "./contextEngine";

export interface SignalItem {
  country: string;
  category: string;
  source: string;
  signalType: string;
  collectedAt: string;
}

export interface AggregatedSignalResult {
  canonical: string;
  signals: SignalItem[];
}

/**
 * Signal Engine
 * Groups multiple signals under their respective canonical entities
 * while preserving existing context and identity without duplication logic or verification.
 */
export class SignalEngine {
  private signalMap: Map<string, SignalItem[]> = new Map();

  /**
   * Adds an enriched keyword result to the signal aggregator.
   */
  public addSignal(enrichedResult: EnrichedKeywordResult): void {
    const canonicalKey = enrichedResult.canonical || "Unknown";

    const signalItem: SignalItem = {
      country: enrichedResult.context.country,
      category: enrichedResult.context.category,
      source: enrichedResult.context.source,
      signalType: enrichedResult.context.signalType,
      collectedAt: enrichedResult.context.collectedAt,
    };

    if (!this.signalMap.has(canonicalKey)) {
      this.signalMap.set(canonicalKey, []);
    }

    this.signalMap.get(canonicalKey)!.push(signalItem);
  }

  /**
   * Retrieves all aggregated signals grouped by canonical entities.
   */
  public getAggregatedSignals(): AggregatedSignalResult[] {
    const results: AggregatedSignalResult[] = [];

    this.signalMap.forEach((signals, canonical) => {
      results.push({
        canonical,
        signals,
      });
    });

    return results;
  }

  /**
   * Clears the internal signal store.
   */
  public clear(): void {
    this.signalMap.clear();
  }
}