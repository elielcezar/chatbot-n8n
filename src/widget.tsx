import React from 'react';
import ReactDOM from 'react-dom/client';
import ChatWidget from './components/ChatWidget';
import type { ChatBotConfig, ChatBotAPI } from './types/chat';
import './index.css';

// Estado global do widget
let widgetRoot: ReactDOM.Root | null = null;
let widgetContainer: HTMLDivElement | null = null;
let currentConfig: ChatBotConfig | null = null;

// Função para criar o container do widget
const createWidgetContainer = (): HTMLDivElement => {
  const container = document.createElement('div');
  container.id = 'n8n-chatbot-widget-root';
  container.style.position = 'fixed';
  container.style.zIndex = '999999';
  container.style.pointerEvents = 'none';
  
  // Permitir pointer events apenas nos elementos do widget
  const style = document.createElement('style');
  style.textContent = `
    #n8n-chatbot-widget-root * {
      pointer-events: auto;
    }
  `;
  container.appendChild(style);
  
  document.body.appendChild(container);
  return container;
};

// Função para injetar estilos inline (para build standalone)
const injectStyles = () => {
  // Os estilos do Tailwind serão injetados automaticamente pelo Vite
  // Esta função pode ser usada para adicionar estilos customizados se necessário
};

// Implementação da API pública
const ChatBotAPI: ChatBotAPI = {
  init: (config: ChatBotConfig) => {
    if (!config.webhookUrl) {
      console.error('ChatBot: webhookUrl é obrigatório');
      return;
    }

    // Limpar instância anterior se existir
    if (widgetRoot) {
      ChatBotAPI.destroy();
    }

    currentConfig = config;

    // Criar container
    widgetContainer = createWidgetContainer();
    
    // Injetar estilos
    injectStyles();

    // Criar div para o React
    const appDiv = document.createElement('div');
    widgetContainer.appendChild(appDiv);

    // Renderizar o widget
    widgetRoot = ReactDOM.createRoot(appDiv);
    widgetRoot.render(
      <React.StrictMode>
        <ChatWidget config={config} />
      </React.StrictMode>
    );

    console.log('ChatBot inicializado com sucesso');
  },

  open: () => {
    // Disparar evento customizado para abrir o chat
    window.dispatchEvent(new CustomEvent('chatbot-open'));
  },

  close: () => {
    // Disparar evento customizado para fechar o chat
    window.dispatchEvent(new CustomEvent('chatbot-close'));
  },

  destroy: () => {
    if (widgetRoot) {
      widgetRoot.unmount();
      widgetRoot = null;
    }

    if (widgetContainer && widgetContainer.parentNode) {
      widgetContainer.parentNode.removeChild(widgetContainer);
      widgetContainer = null;
    }

    currentConfig = null;
    console.log('ChatBot destruído');
  },
};

// Expor API globalmente
if (typeof window !== 'undefined') {
  (window as any).ChatBot = ChatBotAPI;
}

// Permitir import ES6 também
export default ChatBotAPI;

