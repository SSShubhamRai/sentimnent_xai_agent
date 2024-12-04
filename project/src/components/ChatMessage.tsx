import React from 'react';
import { MessageCircle, Bot } from 'lucide-react';

interface ChatMessageProps {
  isBot: boolean;
  message: string;
  analysis?: string;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ isBot, message, analysis }) => {
  const formatAnalysis = (text: string) => {
    return text.split('\n').map((line, index) => (
      <p key={index} className="mb-2 last:mb-0">
        {line}
      </p>
    ));
  };

  return (
    <div className={`flex items-start gap-4 ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
      <div className={`p-2 rounded-full ${isBot ? 'bg-purple-600' : 'bg-blue-600'}`}>
        {isBot ? <Bot size={24} className="text-white" /> : <MessageCircle size={24} className="text-white" />}
      </div>
      <div className={`flex-1 px-4 py-3 rounded-lg ${isBot ? 'bg-gray-800' : 'bg-gray-700'}`}>
        {isBot ? formatAnalysis(message) : <p className="text-gray-100">{message}</p>}
      </div>
    </div>
  );
};