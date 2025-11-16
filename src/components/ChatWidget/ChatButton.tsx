import React from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useChatContext } from '../ChatProvider';

export const ChatButton: React.FC = () => {
  const { isOpen, toggleChat, config } = useChatContext();
  
  const position = config.position || 'bottom-right';
  const zIndex = config.zIndex || 1000;

  const positionClasses = position === 'bottom-right' 
    ? 'cb-bottom-4 cb-right-4' 
    : 'cb-bottom-4 cb-left-4';

  return (
    <button
      onClick={toggleChat}
      className={`cb-fixed ${positionClasses} cb-w-14 cb-h-14 cb-rounded-full cb-shadow-lg cb-flex cb-items-center cb-justify-center cb-transition-all cb-duration-300 hover:cb-scale-110 cb-cursor-pointer cb-border-0`}
      style={{ 
        backgroundColor: config.primaryColor || '#3B82F6',
        zIndex,
      }}
      aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
    >
      {isOpen ? (
        <X className="cb-w-6 cb-h-6 cb-text-white" />
      ) : (
        <MessageCircle className="cb-w-6 cb-h-6 cb-text-white" />
      )}
    </button>
  );
};

