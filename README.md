# 💬 ChatBot Widget N8N

Widget de chat standalone e universal que se conecta ao n8n via webhook. Pode ser integrado em qualquer site (HTML, PHP, WordPress, Next.js, etc.) através de uma simples tag `<script>`.

## ✨ Características

- ✅ **Universal**: Funciona em qualquer site (HTML, PHP, WordPress, Next.js, etc)
- ✅ **Fácil integração**: Apenas uma tag `<script>`
- ✅ **Sem conflitos**: CSS prefixado (`cb-`) para evitar conflitos com estilos do site
- ✅ **Totalmente configurável**: Cores, posição, mensagens, etc
- ✅ **Responsivo**: Funciona perfeitamente em mobile e desktop
- ✅ **Acessível**: Construído com boas práticas de acessibilidade
- ✅ **Histórico de sessão**: Mantém conversas durante a navegação
- ✅ **TypeScript**: Código totalmente tipado
- ✅ **Leve**: Build otimizado com Vite

## 🚀 Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+
- npm ou yarn

### Instalar dependências

```bash
npm install
```

### Modo desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000 para ver o widget em ação.

### Build para produção

```bash
npm run build
```

Isso vai gerar o arquivo `dist/chatbot.iife.js` pronto para uso em qualquer site.

## 📦 Como Usar em Produção

### 1. Fazer o build

```bash
npm run build
```

### 2. Hospedar o arquivo

Faça upload do arquivo `dist/chatbot.iife.js` para seu servidor ou CDN.

### 3. Integração básica

Adicione este código em qualquer página HTML:

```html
<!-- Incluir o script -->
<script src="https://seu-dominio.com/chatbot.iife.js"></script>

<!-- Inicializar o widget -->
<script>
  ChatBot.init({
    webhookUrl: 'https://seu-n8n.com/webhook/chat'
  });
</script>
```

### 4. Integração avançada

```html
<script>
  ChatBot.init({
    webhookUrl: 'https://seu-n8n.com/webhook/chat',
    title: 'Atendimento Imobiliária',
    welcomeMessage: 'Olá! Como posso ajudar você hoje?',
    placeholder: 'Digite sua mensagem...',
    primaryColor: '#10B981',
    position: 'bottom-right',
    zIndex: 9999
  });
</script>
```

## ⚙️ Configurações

| Propriedade | Tipo | Obrigatório | Padrão | Descrição |
|------------|------|-------------|--------|-----------|
| `webhookUrl` | string | ✅ Sim | - | URL do webhook do n8n |
| `title` | string | ❌ Não | "Atendimento" | Título exibido no cabeçalho do chat |
| `welcomeMessage` | string | ❌ Não | - | Mensagem inicial do bot |
| `placeholder` | string | ❌ Não | "Digite sua mensagem..." | Placeholder do campo de input |
| `primaryColor` | string | ❌ Não | "#3B82F6" | Cor primária (hex) |
| `position` | string | ❌ Não | "bottom-right" | Posição do botão: "bottom-right" ou "bottom-left" |
| `zIndex` | number | ❌ Não | 1000 | z-index do widget |

## 🔌 API Programática

Você pode controlar o widget via JavaScript:

```javascript
// Abrir o chat programaticamente
ChatBot.open();

// Fechar o chat
ChatBot.close();

// Destruir completamente o widget
ChatBot.destroy();
```

## 📋 Formato do Webhook N8N

### Requisição enviada ao n8n

O widget envia um POST com o seguinte formato:

```json
{
  "message": "Olá, preciso de ajuda",
  "sessionId": "session_1234567890_abc123",
  "timestamp": 1234567890123
}
```

- `message`: Mensagem do usuário
- `sessionId`: ID único da sessão (gerado automaticamente)
- `timestamp`: Timestamp da mensagem

### Resposta esperada do n8n

O widget espera uma resposta JSON com um dos seguintes campos:

```json
{
  "message": "Olá! Como posso ajudar você?"
}
```

ou

```json
{
  "response": "Olá! Como posso ajudar você?"
}
```

ou

```json
{
  "text": "Olá! Como posso ajudar você?"
}
```

O widget verifica estes 3 campos nessa ordem e usa o primeiro que encontrar.

## 🔧 Exemplo de Workflow N8N

Aqui está um exemplo básico de workflow n8n:

1. **Webhook Trigger**: Configurar para receber POST
2. **Function Node**: Processar a mensagem e gerar resposta
3. **Respond to Webhook**: Retornar resposta

Exemplo de código no Function Node:

```javascript
// Pegar mensagem do usuário
const userMessage = $json.message;
const sessionId = $json.sessionId;

// Sua lógica de resposta aqui
let botResponse = "Olá! Recebi sua mensagem: " + userMessage;

// Retornar resposta
return {
  message: botResponse
};
```

## 🎨 Customização Avançada

### Cores

O widget usa CSS variables para cores. Você pode customizar via `primaryColor`:

```javascript
ChatBot.init({
  webhookUrl: 'https://...',
  primaryColor: '#FF6B6B' // Vermelho customizado
});
```

### Estilos do Site

Todos os estilos do widget são prefixados com `cb-` para evitar conflitos com o site hospedeiro.

## 📱 Responsividade

O widget é totalmente responsivo:

- **Desktop**: Janela de 380x600px
- **Mobile**: Adapta-se ao tamanho da tela (max-width: calc(100vw - 2rem))

## 🌐 Compatibilidade

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Opera 76+
- ✅ Mobile browsers (iOS Safari, Chrome Android)

## 🛠️ Estrutura do Projeto

```
ChatBot/
├── src/
│   ├── components/
│   │   ├── ChatWidget/
│   │   │   ├── index.tsx         # Componente principal
│   │   │   ├── ChatButton.tsx    # Botão flutuante
│   │   │   ├── ChatWindow.tsx    # Janela do chat
│   │   │   ├── ChatMessage.tsx   # Mensagem individual
│   │   │   └── ChatInput.tsx     # Input de mensagem
│   │   └── ChatProvider.tsx      # Context provider
│   ├── hooks/
│   │   └── useN8nWebhook.ts      # Hook para comunicação n8n
│   ├── types/
│   │   └── chat.ts               # Tipos TypeScript
│   ├── utils/
│   │   └── shadowDOM.ts          # Utilitário Shadow DOM
│   ├── App.tsx                   # App de desenvolvimento
│   ├── main.tsx                  # Entry point dev
│   ├── widget.tsx                # Entry point produção
│   └── index.css                 # Estilos globais
├── package.json
├── vite.config.ts                # Config do Vite
├── tailwind.config.js            # Config do Tailwind
└── README.md
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

MIT

## 🆘 Suporte

Se você encontrar problemas ou tiver dúvidas:

1. Verifique se o webhook do n8n está funcionando corretamente
2. Abra o console do navegador para ver possíveis erros
3. Certifique-se de que a URL do webhook está correta
4. Verifique se o CORS está configurado corretamente no n8n

## 🎯 Roadmap

- [ ] Suporte a markdown nas mensagens
- [ ] Upload de arquivos
- [ ] Emojis picker
- [ ] Temas pré-definidos
- [ ] Múltiplos idiomas
- [ ] Analytics integrado

---

Feito com ❤️ para integração com n8n

