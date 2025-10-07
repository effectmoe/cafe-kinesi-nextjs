'use client';

import { useState, useEffect } from 'react';
import {
  useChatConfiguration,
  useAIGuardrails,
  useRAGConfiguration
} from '@/hooks/useSanityConfig';
import { Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  sources?: any[];
  confidence?: number;
  provider?: string;
}

export function EnhancedChatSection() {
  const chatConfig = useChatConfiguration();
  const guardrails = useAIGuardrails();
  const ragConfig = useRAGConfiguration();

  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState('');

  useEffect(() => {
    // セッションID生成
    setSessionId(`session-${Date.now()}`);

    // ウェルカムメッセージ（フォールバック対応）
    const welcomeMessage = chatConfig?.config?.chatUI?.welcomeMessage ||
      'こんにちは！Cafe Kinesiのサポートチャットです。ウェルネス、瞑想、ヨガに関するご質問にお答えします。';

    setMessages([{
      role: 'assistant',
      content: welcomeMessage
    }]);
  }, [chatConfig]);

  const sendMessage = async (messageText?: string) => {
    const text = messageText || input;
    if (!text.trim() || loading) return;

    // ユーザーメッセージ追加
    const userMessage: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat/rag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          sessionId
        })
      });

      const data = await response.json();

      // AI応答追加
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        sources: data.sources,
        confidence: data.confidence,
        provider: data.provider
      }]);

    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'エラーが発生しました。もう一度お試しください。'
      }]);
    } finally {
      setLoading(false);
    }
  };

  // フォールバック設定
  const defaultConfig = {
    chatUI: {
      title: 'Cafe Kinesiサポート',
      welcomeMessage: 'こんにちは！Cafe Kinesiのサポートチャットです。ウェルネス、瞑想、ヨガに関するご質問にお答えします。',
      placeholder: 'ご質問をお聞かせください...',
      primaryColor: '#8B5A3C'
    },
    quickQuestions: [
      {
        icon: '🧘',
        label: '瞑想について',
        question: '瞑想を始めたいのですが、初心者でもできる簡単な方法はありますか？'
      },
      {
        icon: '🍃',
        label: '営業時間',
        question: 'Cafe Kinesiの営業時間を教えてください。'
      },
      {
        icon: '🌸',
        label: 'アロマの効果',
        question: 'アロマテラピーにはどのような効果がありますか？'
      },
      {
        icon: '🥗',
        label: 'おすすめメニュー',
        question: '健康的でおすすめのメニューはありますか？'
      }
    ]
  };

  const config = chatConfig.config || defaultConfig;
  const ui = config.chatUI || defaultConfig.chatUI;

  return (
    <div
      className="chat-container max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      style={{
        '--primary-color': ui.primaryColor || '#f59e0b'
      } as React.CSSProperties}
    >
      {/* ヘッダー */}
      <div
        className="chat-header p-4 rounded-t-lg mb-4"
        style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white'
        }}
      >
        <h3 className="text-xl font-bold">{ui.title || 'AIチャット'}</h3>
        {ragConfig && (
          <div className="status text-sm mt-1 opacity-90">
            RAG: {ragConfig.vectorSearch?.enabled ? 'ON' : 'OFF'} |
            Web: {ragConfig.webSearch?.enabled ? 'ON' : 'OFF'}
          </div>
        )}
      </div>

      {/* クイック質問 */}
      {config.quickQuestions && config.quickQuestions.length > 0 && (
        <div className="quick-questions grid grid-cols-2 gap-2 mb-4">
          {config.quickQuestions.map((q: any, i: number) => (
            <button
              key={i}
              onClick={() => sendMessage(q.question)}
              disabled={loading}
              className="quick-button p-3 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50 transition"
            >
              <span className="mr-2">{q.icon}</span>
              {q.label}
            </button>
          ))}
        </div>
      )}

      {/* メッセージエリア */}
      <div className="messages space-y-4 mb-4 max-h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`message ${msg.role === 'user' ? 'text-right' : 'text-left'}`}
          >
            <div
              className={`inline-block p-3 rounded-lg ${
                msg.role === 'user'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
              }`}
            >
              <div className="content whitespace-pre-wrap">{msg.content}</div>

              {/* 情報源表示 */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="sources mt-2 pt-2 border-t border-gray-300 dark:border-gray-600 text-xs">
                  <h4 className="font-semibold mb-1">📚 情報源:</h4>
                  {msg.sources.map((src: any, j: number) => (
                    <div key={j} className="source mb-1">
                      {src.type === 'internal' ? '📄' : '🌐'}
                      {src.content}
                    </div>
                  ))}
                </div>
              )}

              {/* 信頼度表示 */}
              {msg.confidence !== undefined && (
                <div className="confidence text-xs mt-1">
                  信頼度: {Math.round(msg.confidence * 100)}%
                </div>
              )}

              {/* プロバイダー表示 */}
              {msg.provider && (
                <div className="provider text-xs mt-1">
                  AI: {msg.provider}
                </div>
              )}
            </div>
          </div>
        ))}

        {loading && (
          <div className="message text-left">
            <div className="inline-block p-3 rounded-lg bg-gray-200 dark:bg-gray-700">
              <Loader2 className="animate-spin inline mr-2" size={16} />
              考えています...
            </div>
          </div>
        )}
      </div>

      {/* 入力エリア */}
      <div className="input-area flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder={ui.placeholder || 'メッセージを入力...'}
          disabled={loading}
          className="flex-1 p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600 disabled:opacity-50"
        />
        <button
          onClick={() => sendMessage()}
          disabled={loading}
          className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}
