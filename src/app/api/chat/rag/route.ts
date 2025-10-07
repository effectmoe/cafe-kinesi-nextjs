import { NextRequest, NextResponse } from 'next/server';
import { RAGEngine } from '@/lib/rag/rag-engine';
import { sanityClient } from '@/lib/sanity';
import { AIProviderFactory } from '@/lib/ai/factory';

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();

    // Sanityから設定取得
    const [ragConfig, guardrails, providerSettings] = await Promise.all([
      sanityClient.fetch('*[_type == "ragConfiguration" && active == true][0]'),
      sanityClient.fetch('*[_type == "aiGuardrails" && active == true][0]'),
      sanityClient.fetch('*[_type == "aiProviderSettings" && active == true][0]')
    ]);

    // RAGエンジン初期化
    const ragEngine = new RAGEngine();
    await ragEngine.initialize();

    // RAG処理
    const augmentedData = await ragEngine.generateAugmentedResponse(
      message,
      ragConfig || {}
    );

    // AIプロバイダー取得（Sanity設定から）
    const aiProvider = AIProviderFactory.create(
      providerSettings?.provider || 'deepseek'
    );

    // システムプロンプト構築
    const systemPrompt = guardrails?.systemPrompt ||
      'あなたはCafe Kinesiの親切なAIアシスタントです。';

    // AI応答生成
    const response = await aiProvider.generateResponse(
      augmentedData.prompt,
      {
        systemPrompt,
        temperature: guardrails?.rules?.temperature || 0.7,
        maxTokens: guardrails?.rules?.maxResponseLength || 500
      }
    );

    return NextResponse.json({
      response,
      sources: augmentedData.sources,
      confidence: augmentedData.confidence,
      provider: providerSettings?.provider
    });

  } catch (error) {
    console.error('RAG API Error:', error);
    return NextResponse.json(
      { error: 'エラーが発生しました', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
