import React from 'react';
import { ChatProvider } from '../ChatProvider';
import { ChatButton } from './ChatButton';
import { ChatWindow } from './ChatWindow';
import type { ChatBotConfig } from '../../types/chat';

interface ChatWidgetProps {
  config: ChatBotConfig;
}

export const ChatWidget: React.FC<ChatWidgetProps> = ({ config }) => {
  // Aplicar cor primária como variável CSS
  React.useEffect(() => {
    if (config.primaryColor) {
      document.documentElement.style.setProperty('--cb-primary-color', config.primaryColor);
    }
  }, [config.primaryColor]);

  return (
    <ChatProvider config={config}>
      <div className="chatbot-container">
        <ChatButton />
        <ChatWindow />
      </div>
    </ChatProvider>
  );
};

export default ChatWidget;

