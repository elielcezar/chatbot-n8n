# 🎨 Guia de Personalização

## Cores

### Alterar Cor Primária

A maneira mais simples é via config:

```javascript
ChatBot.init({
  webhookUrl: 'https://...',
  primaryColor: '#10B981' // Verde
});
```

### Cores Pré-definidas

```javascript
// Azul (padrão)
primaryColor: '#3B82F6'

// Verde
primaryColor: '#10B981'

// Roxo
primaryColor: '#8B5CF6'

// Rosa
primaryColor: '#EC4899'

// Laranja
primaryColor: '#F59E0B'

// Vermelho
primaryColor: '#EF4444'
```

---

## Posicionamento

### Posição do Botão

```javascript
// Canto inferior direito (padrão)
position: 'bottom-right'

// Canto inferior esquerdo
position: 'bottom-left'
```

### Z-Index Customizado

```javascript
// Útil se você tem modais ou overlays
zIndex: 9999
```

---

## Mensagens

### Mensagem de Boas-vindas

```javascript
ChatBot.init({
  webhookUrl: 'https://...',
  welcomeMessage: 'Olá! 👋 Bem-vindo à nossa imobiliária. Como posso ajudar você hoje?'
});
```

### Placeholder do Input

```javascript
placeholder: 'Digite sua dúvida aqui...'
```

### Título do Chat

```javascript
title: 'Suporte 24/7'
```

---

## Comportamentos Avançados

### Abrir Automaticamente

```javascript
// Inicializar o widget
ChatBot.init({ webhookUrl: '...' });

// Abrir após 3 segundos
setTimeout(() => {
  ChatBot.open();
}, 3000);
```

### Abrir em Páginas Específicas

```javascript
ChatBot.init({ webhookUrl: '...' });

// Abrir apenas na página de contato
if (window.location.pathname === '/contato') {
  ChatBot.open();
}
```

### Abrir ao Clicar em Botão

```html
<button id="help-button">Preciso de Ajuda</button>

<script>
  ChatBot.init({ webhookUrl: '...' });
  
  document.getElementById('help-button').addEventListener('click', () => {
    ChatBot.open();
  });
</script>
```

---

## Integrações Avançadas

### Google Analytics

```javascript
// Rastrear abertura do chat
window.addEventListener('chatbot-open', () => {
  gtag('event', 'chat_opened', {
    event_category: 'engagement',
    event_label: 'chatbot'
  });
});
```

### Facebook Pixel

```javascript
window.addEventListener('chatbot-open', () => {
  fbq('track', 'ChatOpened');
});
```

---

## Responsividade

O widget já é responsivo, mas você pode ajustar:

### Mobile

Em telas pequenas, o chat ocupa 100% da largura (com margens).

### Desktop

Largura fixa de 380px.

### Ajustar Altura

Edite `src/components/ChatWidget/ChatWindow.tsx`:

```typescript
// Linha atual
cb-h-[600px]

// Alterar para
cb-h-[700px] // Mais alto
cb-h-[500px] // Mais baixo
```

---

## Modificar Estilos Internos

Se você clonou o projeto e quer customizar mais:

### 1. Cores do Tailwind

Edite `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'var(--cb-primary-color, #3B82F6)',
      secondary: '#64748b', // Adicionar cor secundária
    },
  },
}
```

### 2. Estilos Customizados

Edite `src/index.css` para adicionar estilos globais.

### 3. Componentes

Cada componente está em `src/components/ChatWidget/`:
- `ChatButton.tsx` - Botão flutuante
- `ChatWindow.tsx` - Janela principal
- `ChatMessage.tsx` - Mensagens individuais
- `ChatInput.tsx` - Campo de input

---

## Internacionalização

### Português (padrão)

Já está configurado.

### Outros Idiomas

Edite `src/components/ChatWidget/ChatInput.tsx`:

```typescript
// Linha com o texto de ajuda
<p className="cb-text-xs cb-text-gray-400 cb-mt-2">
  Pressione Enter para enviar, Shift+Enter para nova linha
</p>
```

Edite `src/components/ChatWidget/ChatWindow.tsx`:

```typescript
// Status online
<p className="cb-text-xs cb-opacity-90">Online</p>
```

---

## Performance

### Lazy Loading

```javascript
// Carregar o script apenas quando necessário
const loadChatBot = () => {
  const script = document.createElement('script');
  script.src = '/chatbot.iife.js';
  script.onload = () => {
    ChatBot.init({ webhookUrl: '...' });
  };
  document.body.appendChild(script);
};

// Carregar ao rolar a página
window.addEventListener('scroll', loadChatBot, { once: true });
```

### Preload

```html
<link rel="preload" href="/chatbot.iife.js" as="script">
```

---

## Segurança

### Validação de Mensagens

No n8n, adicione validação:

```javascript
// Function node
const message = $json.message;

// Validar tamanho
if (message.length > 1000) {
  return {
    message: "Mensagem muito longa. Por favor, seja mais conciso."
  };
}

// Sanitizar entrada
const cleanMessage = message.replace(/<script>/gi, '');

// Processar...
```

### Rate Limiting

No n8n, adicione controle de taxa por sessionId.

---

## Temas Pré-configurados

### Tema Profissional

```javascript
ChatBot.init({
  webhookUrl: '...',
  title: 'Suporte Técnico',
  primaryColor: '#1e40af',
  welcomeMessage: 'Olá! Nossa equipe está pronta para ajudá-lo.',
  placeholder: 'Descreva seu problema...'
});
```

### Tema Amigável

```javascript
ChatBot.init({
  webhookUrl: '...',
  title: 'Oi! 👋',
  primaryColor: '#ec4899',
  welcomeMessage: 'Hey! Como vai? Em que posso ajudar? 😊',
  placeholder: 'Manda sua mensagem aqui...'
});
```

### Tema Minimalista

```javascript
ChatBot.init({
  webhookUrl: '...',
  title: 'Chat',
  primaryColor: '#374151',
  welcomeMessage: 'Como posso ajudar?',
  placeholder: 'Mensagem...'
});
```

---

## Próximos Passos

Depois de personalizar:

1. Teste em diferentes dispositivos
2. Faça o build: `npm run build`
3. Hospede o arquivo gerado
4. Integre no seu site
5. Monitore as conversas no n8n

**Divirta-se customizando! 🎨**

