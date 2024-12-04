import React, { useState } from 'react';
import { ChatMessage } from './components/ChatMessage';
import { ChatInput } from './components/ChatInput';
import { ErrorMessage } from './components/ErrorMessage';
import { analyzeSentiment } from './utils/sentiment';
import { BrainCircuit } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  analysis?: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    setIsProcessing(true);
    setError(null);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now(),
      text,
      isBot: false
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Get sentiment analysis from LLM
      const analysis = await analyzeSentiment(text);
      
      // Add bot response with analysis
      const botMessage: Message = {
        id: Date.now() + 1,
        text: analysis,
        isBot: true,
        analysis
      };
      
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 text-3xl font-bold text-purple-500">
            <BrainCircuit size={40} />
            <span>Sentiment Analysis AI</span>
          </div>
          <p className="mt-2 text-gray-400">Get detailed sentiment analysis of your text using AI</p>
        </div>

        <div className="bg-gray-800 rounded-xl shadow-xl p-4">
          {error && <ErrorMessage message={error} />}
          
          <div className="space-y-4 mb-4 max-h-[60vh] overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 py-8">
                Enter some text to analyze its sentiment
              </div>
            ) : (
              messages.map(message => (
                <ChatMessage
                  key={message.id}
                  isBot={message.isBot}
                  message={message.text}
                  analysis={message.analysis}
                />
              ))
            )}
          </div>
          
          <ChatInput 
            onSendMessage={handleSendMessage} 
            disabled={isProcessing} 
            placeholder="Type your text for sentiment analysis..."
          />
        </div>
      </div>
    </div>
  );
}

export default App;