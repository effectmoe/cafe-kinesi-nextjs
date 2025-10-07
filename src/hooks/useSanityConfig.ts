'use client';

import { useState, useEffect } from 'react';
import { sanityClient } from '@/lib/sanity';

export function useChatConfiguration() {
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "chatConfiguration" && active == true][0] {
            name,
            chatUI,
            quickQuestions[] {
              icon,
              label,
              question
            }
          }
        `);
        setConfig(data);
      } catch (error) {
        console.error('設定取得エラー:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();

    // リアルタイム購読
    const subscription = sanityClient
      .listen('*[_type == "chatConfiguration"]')
      .subscribe(() => fetchConfig());

    return () => subscription.unsubscribe();
  }, []);

  return { config, loading };
}

export function useAIGuardrails() {
  const [guardrails, setGuardrails] = useState<any>(null);

  useEffect(() => {
    const fetchGuardrails = async () => {
      const data = await sanityClient.fetch(`
        *[_type == "aiGuardrails" && active == true][0]
      `);
      setGuardrails(data);
    };

    fetchGuardrails();
  }, []);

  return guardrails;
}

export function useRAGConfiguration() {
  const [ragConfig, setRAGConfig] = useState<any>(null);

  useEffect(() => {
    const fetchConfig = async () => {
      const data = await sanityClient.fetch(`
        *[_type == "ragConfiguration" && active == true][0]
      `);
      setRAGConfig(data);
    };

    fetchConfig();
  }, []);

  return ragConfig;
}
