import React from 'react';
import ChatWidget from './components/ChatWidget';
import type { ChatBotConfig } from './types/chat';

// Configuração de exemplo para desenvolvimento
const demoConfig: ChatBotConfig = {
  
  // URL de Teste
  //webhookUrl: 'https://n8n.ecwd.cloud/webhook-test/57ddf665-20de-483c-bd7c-258890364422',

  // URL de Produção
  webhookUrl: 'https://n8n.ecwd.cloud/webhook/57ddf665-20de-483c-bd7c-258890364422',

  title: 'Atendimento Imobiliária',
  welcomeMessage: 'Olá! Bem-vindo à nossa imobiliária. Como posso ajudá-lo hoje?',
  placeholder: 'Digite sua mensagem aqui...',
  primaryColor: '#10B981',
  position: 'bottom-right',
  zIndex: 9999,
};

function App() {
  return (
    <div>
      <ChatWidget config={demoConfig} />
    </div>
  );
}

export default App;

