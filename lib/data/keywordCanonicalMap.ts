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

  {
    id: "chatgpt",
    canonical: "ChatGPT",
    variants: [
      "ChatGPT",
      "Chat GPT",
    ],
  },

  {
    id: "openai",
    canonical: "OpenAI",
    variants: [
      "OpenAI",
      "Open AI",
    ],
  },

  {
    id: "united-states",
    canonical: "United States",
    variants: [
      "United States",
      "USA",
    ],
  },

  {
    id: "india",
    canonical: "India",
    variants: [
      "India",
      "Bharat",
    ],
  },

  {
    id: "fifa",
    canonical: "FIFA",
    variants: [
      "FIFA",
    ],
  },

  {
    id: "premier-league",
    canonical: "Premier League",
    variants: [
      "Premier League",
    ],
  },

  {
    id: "google-gemini",
    canonical: "Google Gemini",
    variants: [
      "Google Gemini",
    ],
  },

  {
    id: "claude",
    canonical: "Claude",
    variants: [
      "Claude",
    ],
  },

];