// ==========================================================
// Mini Trends Intelligence System
// Canonical Keyword Map
// Foundation Phase
// ==========================================================


export interface KeywordCanonical {
  id: string;
  canonical: string;
  variants: string[];
}


// ----------------------------------------------------------
// Canonical Keyword Registry
// ----------------------------------------------------------

export const keywordCanonicalMap: KeywordCanonical[] = [

  {
    id: "us-congress",
    canonical: "US Congress",
    variants: [
      "Congress",
      "United States Congress",
      "US Congress",
    ],
  },


  {
    id: "supreme-court",
    canonical: "Supreme Court",
    variants: [
      "Supreme Court",
      "US Supreme Court",
      "Supreme Court of the United States",
    ],
  },


  {
    id: "artificial-intelligence",
    canonical: "Artificial Intelligence",
    variants: [
      "AI",
      "Artificial Intelligence",
      "AI Technology",
    ],
  },


  {
    id: "climate-change",
    canonical: "Climate Change",
    variants: [
      "Climate Change",
      "Global Warming",
      "Climate Crisis",
    ],
  },


];