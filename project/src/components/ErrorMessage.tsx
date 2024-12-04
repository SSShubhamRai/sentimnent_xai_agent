import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center gap-2 p-4 text-red-400 bg-red-950/50 rounded-lg">
      <AlertCircle className="shrink-0" />
      <p>{message}</p>
    </div>
  );
};