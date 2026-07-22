import { SignalRecord } from "./identityTypes";
export const entityRegistry: {
  canonical: string;
  signals: SignalRecord[];
}[] = [];
entityRegistry.push({
  canonical: "ChatGPT",
  signals: [],
});