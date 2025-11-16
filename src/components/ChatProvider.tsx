import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import type { Message, ChatState, ChatBotConfig } from '../types/chat';
import { useN8nWebhook } from '../hooks/useN8nWebhook';

interface ChatContextValue extends ChatState {
  config: ChatBotConfig;
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  sendMessage: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

interface ChatProviderProps {
  config: ChatBotConfig;
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ config, children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    // Adicionar mensagem de boas-vindas se configurada
    if (config.welcomeMessage) {
      return [
        {
          id: 'welcome',
          text: config.welcomeMessage,
          sender: 'bot',
          timestamp: Date.now(),
        },
      ];
    }
    return [];
  });
  
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { sendMessage: sendToWebhook, isLoading } = useN8nWebhook(config.webhookUrl);

  const toggleChat = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const openChat = useCallback(() => {
    setIsOpen(true);
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim()) return;

    // Adicionar mensagem do usuário
    const userMessage: Message = {
      id: `user_${Date.now()}`,
      text: text.trim(),
      sender: 'user',
      timestamp: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setError(null);

    try {
      // Enviar para n8n e aguardar resposta
      const botResponse = await sendToWebhook(text);

      // Adicionar resposta do bot
      const botMessage: Message = {
        id: `bot_${Date.now()}`,
        text: botResponse,
        sender: 'bot',
        timestamp: Date.now(),
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Erro ao enviar mensagem';
        console.error('❌ [PROVIDER] ERRO:', errorMessage, err);
        setError(errorMessage);
        
        // Adicionar mensagem de erro mais detalhada
        const errorBotMessage: Message = {
          id: `error_${Date.now()}`,
          text: `Desculpe, ocorreu um erro: ${errorMessage}. Por favor, tente novamente.`,
          sender: 'bot',
          timestamp: Date.now(),
        };
      
      setMessages(prev => [...prev, errorBotMessage]);
    }
  }, [sendToWebhook]);

  const value: ChatContextValue = {
    messages,
    isOpen,
    isLoading,
    error,
    config,
    toggleChat,
    openChat,
    closeChat,
    sendMessage,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext deve ser usado dentro de um ChatProvider');
  }
  return context;
};

