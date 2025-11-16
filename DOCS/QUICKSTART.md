# 🚀 Guia Rápido de Início

## Para Desenvolvedores

### 1. Clone e instale

```bash
cd ChatBot
npm install
```

### 2. Configure seu webhook n8n

Edite `src/App.tsx` e substitua a URL do webhook:

```typescript
const demoConfig: ChatBotConfig = {
  webhookUrl: 'https://SEU-N8N.app.n8n.cloud/webhook/chat', // ← Altere aqui
  // ... outras configurações
};
```

### 3. Execute em modo desenvolvimento

```bash
npm run dev
```

Abra http://localhost:3000 e teste o widget!

### 4. Build para produção

```bash
npm run build
```

O arquivo será gerado em `dist/chatbot.iife.js`

---

## Para Integração em Sites

### Passo 1: Obter o arquivo

Após fazer o build, você terá o arquivo:
- `dist/chatbot.iife.js` (o widget completo)

### Passo 2: Hospedar

Faça upload deste arquivo para:
- Seu servidor web
- CDN (Cloudflare, AWS S3, etc)
- GitHub Pages
- Netlify / Vercel

### Passo 3: Integrar

Adicione este código em qualquer página HTML:

```html
<!-- Incluir o script -->
<script src="https://seu-dominio.com/chatbot.iife.js"></script>

<!-- Inicializar -->
<script>
  ChatBot.init({
    webhookUrl: 'https://seu-n8n.com/webhook/chat'
  });
</script>
```

**Pronto! 🎉** O widget aparecerá automaticamente.

---

## Configuração do N8N

### Criar Webhook no N8N

1. Criar novo workflow
2. Adicionar node **Webhook**
3. Configurar:
   - Method: POST
   - Path: `/webhook/chat` (ou qualquer path)
4. Adicionar node **Function** com lógica de resposta:

```javascript
// Pegar mensagem do usuário
const userMessage = $json.message;

// Sua lógica aqui (IA, base de conhecimento, etc)
let botResponse = "Olá! Recebi sua mensagem: " + userMessage;

// Retornar resposta
return {
  message: botResponse
};
```

5. Adicionar node **Respond to Webhook**
6. Ativar o workflow
7. Copiar a URL do webhook

### Formato de Dados

**Enviado ao n8n:**
```json
{
  "message": "texto do usuário",
  "sessionId": "session_...",
  "timestamp": 1234567890
}
```

**Esperado do n8n:**
```json
{
  "message": "resposta do bot"
}
```

---

## Exemplos de Uso

### Exemplo 1: Site HTML Simples

```html
<!DOCTYPE html>
<html>
<head>
    <title>Meu Site</title>
</head>
<body>
    <h1>Bem-vindo!</h1>
    
    <script src="https://cdn.seusite.com/chatbot.iife.js"></script>
    <script>
      ChatBot.init({
        webhookUrl: 'https://seu-n8n.com/webhook/chat',
        title: 'Suporte',
        primaryColor: '#FF6B6B'
      });
    </script>
</body>
</html>
```

### Exemplo 2: WordPress

Adicione no footer do tema (footer.php):

```php
<script src="<?php echo get_template_directory_uri(); ?>/js/chatbot.iife.js"></script>
<script>
  ChatBot.init({
    webhookUrl: 'https://seu-n8n.com/webhook/chat',
    title: '<?php bloginfo('name'); ?>',
    primaryColor: '<?php echo get_theme_mod('primary_color'); ?>'
  });
</script>
```

### Exemplo 3: Next.js

Em `_app.tsx` ou `layout.tsx`:

```typescript
useEffect(() => {
  const script = document.createElement('script');
  script.src = '/chatbot.iife.js';
  script.async = true;
  script.onload = () => {
    (window as any).ChatBot.init({
      webhookUrl: process.env.NEXT_PUBLIC_WEBHOOK_URL,
      title: 'Atendimento',
    });
  };
  document.body.appendChild(script);
}, []);
```

---

## Troubleshooting

### O widget não aparece

✅ Verifique se o script foi carregado (abra o DevTools > Network)  
✅ Veja se há erros no Console  
✅ Certifique-se de chamar `ChatBot.init()`  

### Erro de CORS

✅ Configure CORS no n8n:
- Abra o webhook node
- Habilite CORS
- Ou configure headers no n8n

### Bot não responde

✅ Verifique se o webhook está ativo no n8n  
✅ Teste o webhook diretamente (Postman/cURL)  
✅ Veja o console para erros de rede  

---

## 📞 Precisa de Ajuda?

- Verifique o README.md completo
- Abra o arquivo demo.html para exemplos visuais
- Veja example-integration.html para código de integração

---

**Boa sorte com seu chatbot! 🎉**

