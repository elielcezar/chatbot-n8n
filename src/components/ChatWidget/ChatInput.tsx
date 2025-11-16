import React, { useState, useRef, KeyboardEvent } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { useChatContext } from '../ChatProvider';

export const ChatInput: React.FC = () => {
  const { sendMessage, isLoading, config } = useChatContext();
  const [inputValue, setInputValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const placeholder = config.placeholder || 'Digite sua mensagem...';

  const handleSubmit = async () => {
    if (!inputValue.trim() || isLoading) return;
    
    await sendMessage(inputValue);
    setInputValue('');
    
    // Reset altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Enter envia, Shift+Enter adiciona nova linha
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
    
    // Auto-resize do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <div className="cb-border-t cb-border-gray-200 cb-p-4 cb-bg-white">
      {isLoading && (
        <div className="cb-flex cb-items-center cb-gap-2 cb-text-sm cb-text-gray-500 cb-mb-2">
          <Loader2 className="cb-w-4 cb-h-4 cb-animate-spin" />
          <span>Digitando...</span>
        </div>
      )}
      
      <div className="cb-flex cb-gap-2 cb-items-end">
        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={isLoading}
          rows={1}
          className="cb-flex-1 cb-resize-none cb-border cb-border-gray-300 cb-rounded-lg cb-px-3 cb-py-2 cb-text-sm cb-outline-none focus:cb-border-primary cb-transition-colors disabled:cb-bg-gray-50 disabled:cb-cursor-not-allowed"
          style={{ maxHeight: '120px' }}
        />
        
        <button
          onClick={handleSubmit}
          disabled={!inputValue.trim() || isLoading}
          className="cb-flex-shrink-0 cb-w-10 cb-h-10 cb-rounded-lg cb-flex cb-items-center cb-justify-center cb-transition-all cb-border-0 cb-cursor-pointer disabled:cb-opacity-50 disabled:cb-cursor-not-allowed hover:cb-opacity-90"
          style={{ backgroundColor: config.primaryColor || '#3B82F6' }}
          aria-label="Enviar mensagem"
        >
          <Send className="cb-w-5 cb-h-5 cb-text-white" />
        </button>
      </div>
      
      <p className="cb-text-xs cb-text-gray-400 cb-mt-2">
        Pressione Enter para enviar, Shift+Enter para nova linha
      </p>
    </div>
  );
};

