import { ChatXAI } from "@langchain/xai";
import { ChatPromptTemplate } from "@langchain/core/prompts";
import { config } from '../config/env';

// Initialize the ChatXAI instance
const createChatInstance = () => {
  return new ChatXAI({
    apiKey: config.xai.apiKey,
    model: "grok-beta",
    temperature: 0.2,
    maxRetries: 2
  });
};

// Create a prompt template for sentiment analysis
const promptTemplate = ChatPromptTemplate.fromMessages([
  ["system", "You are a sentiment analysis expert. Analyze the emotional tone of the input text and provide a detailed analysis. Format your response as follows:\n\nSentiment: [positive/negative/neutral]\nConfidence: [high/medium/low]\nAnalysis: [your detailed explanation]"],
  ["human", "{input}"]
]);

export const analyzeSentiment = async (text: string) => {
  try {
    const chat = createChatInstance();
    const chain = promptTemplate.pipe(chat);
    
    const response = await chain.invoke({
      input: text,
    });

    return response.content;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('Failed to analyze sentiment. Please try again.');
    }
    throw new Error('An unexpected error occurred during sentiment analysis.');
  }
};