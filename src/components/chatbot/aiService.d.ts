// Type declarations for aiService module
export function fetchAIResponse(query: string): Promise<string>;
export function detectIntent(query: string): string | null;
