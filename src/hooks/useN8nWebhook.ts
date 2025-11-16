import { useState, useCallback } from 'react';
import type { N8nWebhookResponse, N8nWebhookPayload } from '../types/chat';

interface UseN8nWebhookReturn {
  sendMessage: (message: string) => Promise<string>;
  isLoading: boolean;
  error: string | null;
}

// Gerar ID de sessão único para o usuário
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('chatbot-session-id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('chatbot-session-id', sessionId);
  }
  return sessionId;
};

export const useN8nWebhook = (webhookUrl: string): UseN8nWebhookReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (message: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const payload: N8nWebhookPayload = {
        message,
        sessionId: getSessionId(),
        timestamp: Date.now(),
      };

      console.log('🚀 [HOOK] Enviando para n8n:', webhookUrl);
      console.log('📤 [HOOK] Payload:', payload);

      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      console.log('📡 [HOOK] Status:', response.status);
      console.log('📡 [HOOK] Headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ [HOOK] Erro HTTP:', response.status, errorText);
        throw new Error(`Erro na requisição: ${response.status}`);
      }

      // Pegar resposta como texto primeiro
      const responseText = await response.text();
      console.log('📥 [HOOK] Resposta (texto):', responseText);

      // Verificar se resposta está vazia
      if (!responseText || responseText.trim() === '') {
        console.error('❌ [HOOK] Resposta vazia do n8n');
        throw new Error('Resposta vazia do servidor');
      }

      // Tentar parsear como JSON
      let data: any;
      try {
        data = JSON.parse(responseText);
        console.log('📦 [HOOK] Resposta (JSON):', data);
      } catch (e) {
        // Se não for JSON válido, usar o texto direto
        console.log('⚠️ [HOOK] Não é JSON, retornando texto direto');
        return responseText;
      }

      // Tentar extrair mensagem de diferentes formatos possíveis
      let botMessage = 
        data?.message || 
        data?.response || 
        data?.text || 
        data?.output ||
        data?.result ||
        (typeof data === 'string' ? data : null);

      console.log('💬 [HOOK] Mensagem extraída:', botMessage);

      // Se não encontrou, tentar no primeiro item do array
      if (!botMessage && Array.isArray(data) && data.length > 0) {
        botMessage = data[0]?.message || data[0]?.text || data[0]?.output;
        console.log('💬 [HOOK] Mensagem extraída do array:', botMessage);
      }

      // Se ainda não encontrou, mostrar estrutura completa
      if (!botMessage) {
        console.error('❌ [HOOK] Formato não reconhecido. Estrutura completa:', JSON.stringify(data, null, 2));
        throw new Error('Formato de resposta não reconhecido');
      }

      console.log('✅ [HOOK] Sucesso! Retornando:', botMessage.substring(0, 100) + '...');
      return botMessage;

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error('❌ [HOOK] ERRO CAPTURADO:', errorMessage, err);
      setError(errorMessage);
      throw err; // Re-lançar o erro para o ChatProvider capturar
    } finally {
      setIsLoading(false);
    }
  }, [webhookUrl]);

  return { sendMessage, isLoading, error };
};