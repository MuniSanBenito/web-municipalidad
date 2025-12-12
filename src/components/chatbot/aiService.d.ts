// Type declarations for aiService module
export function fetchAIResponse(query: string): Promise<{ response: string; usedGemma: boolean }>
export const getAIResponse: typeof fetchAIResponse
export { fetchEnhancedAIResponse, getProviderStats } from './aiServiceEnhanced'
