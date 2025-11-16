import React from 'react';
import { Bot, User } from 'lucide-react';
import type { Message } from '../../types/chat';

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.sender === 'bot';
  const time = new Date(message.timestamp).toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  // Função para renderizar markdown básico
  const renderFormattedText = (text: string) => {
    const lines = text.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Processar negrito **texto**
      let formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Processar emojis e ícones (manter como está)
      // Já vêm renderizados do backend
      
      return (
        <React.Fragment key={lineIndex}>
          <span dangerouslySetInnerHTML={{ __html: formattedLine }} />
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      );
    });
  };

  return (
    <div 
      className={`cb-flex cb-gap-2 cb-mb-4 cb-animate-fade-in ${isBot ? 'cb-justify-start' : 'cb-justify-end'}`}
    >
      {isBot && (
        <div className="cb-flex-shrink-0 cb-w-8 cb-h-8 cb-rounded-full cb-bg-gray-200 cb-flex cb-items-center cb-justify-center">
          <Bot className="cb-w-5 cb-h-5 cb-text-gray-600" />
        </div>
      )}
      
      <div className={`cb-flex cb-flex-col cb-max-w-[70%] ${isBot ? 'cb-items-start' : 'cb-items-end'}`}>
        <div 
          className={`cb-px-4 cb-py-2 cb-rounded-2xl cb-break-words ${
            isBot 
              ? 'cb-bg-gray-100 cb-text-gray-800' 
              : 'cb-text-white'
          }`}
          style={!isBot ? { backgroundColor: 'var(--cb-primary-color)' } : {}}
        >
          <div className="cb-text-sm cb-leading-relaxed">
            {renderFormattedText(message.text)}
          </div>
        </div>
        <span className="cb-text-xs cb-text-gray-400 cb-mt-1 cb-px-1">{time}</span>
      </div>

      {!isBot && (
        <div className="cb-flex-shrink-0 cb-w-8 cb-h-8 cb-rounded-full cb-bg-gray-700 cb-flex cb-items-center cb-justify-center">
          <User className="cb-w-5 cb-h-5 cb-text-white" />
        </div>
      )}
    </div>
  );
};