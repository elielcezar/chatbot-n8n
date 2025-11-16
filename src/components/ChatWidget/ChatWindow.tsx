import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useChatContext } from '../ChatProvider';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';

export const ChatWindow: React.FC = () => {
  const { isOpen, closeChat, messages, config } = useChatContext();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const title = config.title || 'Atendimento';
  const position = config.position || 'bottom-right';
  const zIndex = config.zIndex || 1000;

  const positionClasses = position === 'bottom-right' 
    ? 'cb-bottom-20 cb-right-4' 
    : 'cb-bottom-20 cb-left-4';

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  if (!isOpen) return null;

  return (
    <div 
      className={`cb-fixed ${positionClasses} cb-w-[380px] cb-h-[600px] cb-bg-white cb-rounded-2xl cb-shadow-2xl cb-flex cb-flex-col cb-overflow-hidden cb-animate-slide-up`}
      style={{ 
        zIndex: zIndex + 1,
        maxWidth: 'calc(100vw - 2rem)',
        maxHeight: 'calc(100vh - 8rem)',
      }}
    >
      {/* Header */}
      <div 
        className="cb-px-4 cb-py-4 cb-text-white cb-flex cb-items-center cb-justify-between"
        style={{ backgroundColor: config.primaryColor || '#3B82F6' }}
      >
        <div className="cb-flex cb-items-center cb-gap-3">
          <div className="cb-w-10 cb-h-10 cb-rounded-full cb-bg-white/20 cb-flex cb-items-center cb-justify-center">
            <span className="cb-text-xl">💬</span>
          </div>
          <div>
            <h3 className="cb-font-semibold cb-text-base">{title}</h3>
            <p className="cb-text-xs cb-opacity-90">Online</p>
          </div>
        </div>
        
        <button
          onClick={closeChat}
          className="cb-w-8 cb-h-8 cb-rounded-full hover:cb-bg-white/20 cb-flex cb-items-center cb-justify-center cb-transition-colors cb-border-0 cb-cursor-pointer cb-bg-transparent"
          aria-label="Fechar chat"
        >
          <X className="cb-w-5 cb-h-5 cb-text-white" />
        </button>
      </div>

      {/* Messages */}
      <div 
        ref={messagesContainerRef}
        className="cb-flex-1 cb-overflow-y-auto cb-p-4 cb-bg-gray-50 cb-custom-scrollbar"
      >
        {messages.length === 0 ? (
          <div className="cb-flex cb-items-center cb-justify-center cb-h-full cb-text-gray-400 cb-text-sm">
            Nenhuma mensagem ainda. Comece a conversa!
          </div>
        ) : (
          <>
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
          </>
        )}
      </div>

      {/* Input */}
      <ChatInput />
    </div>
  );
};

