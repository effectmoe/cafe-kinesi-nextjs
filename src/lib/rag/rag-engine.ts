import { config } from 'dotenv';
import { VercelVectorStore } from '@/lib/vector/vercel-vector-store';

// 環境変数を読み込む
config({ path: '.env.local' });

export class RAGEngine {
  private vectorStore: VercelVectorStore;

  constructor() {
    this.vectorStore = new VercelVectorStore();
  }

  async initialize() {
    await this.vectorStore.initialize();
  }

  // RAG応答生成
  async generateAugmentedResponse(query: string, config: any) {
    console.log('🤖 RAG応答生成中...');

    // 1. ベクトル検索
    const searchResults = await this.vectorStore.hybridSearch(query, {
      topK: config?.vectorSearch?.topK || 5,
      threshold: config?.vectorSearch?.threshold || 0.7
    });

    // 2. Web検索（有効な場合）
    let webResults: any[] = [];
    if (config?.webSearch?.enabled) {
      webResults = await this.searchWeb(query, config.webSearch);
    }

    // 3. コンテキスト構築
    const context = this.buildContext(searchResults, webResults, config);

    // 4. プロンプト構築
    const augmentedPrompt = `
以下のコンテキスト情報を基に質問に答えてください。

【コンテキスト】
${context}

【質問】
${query}

正確で親切な回答をお願いします。
    `;

    return {
      prompt: augmentedPrompt,
      sources: this.extractSources(searchResults, webResults),
      confidence: this.calculateConfidence(searchResults)
    };
  }

  // Web検索（簡易版）
  private async searchWeb(query: string, config: any): Promise<any[]> {
    // DuckDuckGo APIを使用（無料）
    console.log('🌐 Web検索実行中...');
    // 実装は簡略化（将来的に追加可能）
    return [];
  }

  // コンテキスト構築
  private buildContext(vectorResults: any[], webResults: any[], config: any): string {
    const internalWeight = config?.integration?.internalWeight || 0.7;
    const externalWeight = config?.integration?.externalWeight || 0.3;

    let context = '';

    // 内部情報
    if (vectorResults.length > 0) {
      context += '【サイト内情報】\n';
      vectorResults.forEach((r: any) => {
        context += `- ${r.content}\n`;
      });
    }

    // 外部情報
    if (webResults.length > 0) {
      context += '\n【Web情報】\n';
      webResults.forEach((r: any) => {
        context += `- ${r.content}\n`;
      });
    }

    return context;
  }

  // ソース抽出
  private extractSources(vectorResults: any[], webResults: any[]): any[] {
    return [
      ...vectorResults.map((r: any) => ({
        type: 'internal',
        content: r.content.substring(0, 100) + '...',
        metadata: r.metadata
      })),
      ...webResults.map((r: any) => ({
        type: 'external',
        content: r.content?.substring(0, 100) + '...'
      }))
    ];
  }

  // 信頼度計算
  private calculateConfidence(results: any[]): number {
    if (results.length === 0) return 0;

    const avgScore = results.reduce((acc: number, r: any) =>
      acc + (r.vector_score || 0), 0) / results.length;

    return Math.min(avgScore, 1);
  }
}
