// Tipos para o sistema de chat

export type MessageSender = 'user' | 'bot';

export interface Message {
  id: string;
  text: string;
  sender: MessageSender;
  timestamp: number;
}

export interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
}

export type ChatPosition = 'bottom-right' | 'bottom-left';

export interface ChatBotConfig {
  webhookUrl: string;
  title?: string;
  welcomeMessage?: string;
  placeholder?: string;
  primaryColor?: string;
  position?: ChatPosition;
  zIndex?: number;
}

export interface ChatBotAPI {
  init: (config: ChatBotConfig) => void;
  open: () => void;
  close: () => void;
  destroy: () => void;
}

export interface N8nWebhookResponse {
  message?: string;
  response?: string;
  text?: string;
  error?: string;
}

export interface N8nWebhookPayload {
  message: string;
  sessionId: string;
  timestamp: number;
}

