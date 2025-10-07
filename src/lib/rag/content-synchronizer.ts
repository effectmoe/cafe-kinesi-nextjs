import { config } from 'dotenv';
import { sanityClient } from '@/lib/sanity';
import { VercelVectorStore } from '@/lib/vector/vercel-vector-store';

// 環境変数を読み込む
config({ path: '.env.local' });

export class ContentSynchronizer {
  private vectorStore: VercelVectorStore;

  constructor() {
    this.vectorStore = new VercelVectorStore();
  }

  async initialize() {
    await this.vectorStore.initialize();
  }

  // Sanityコンテンツ同期
  async syncSanityContent() {
    console.log('🔄 Sanityコンテンツ同期開始...');

    const contentTypes = [
      { type: 'shopInfo', query: '*[_type == "shopInfo"]' },
      { type: 'menuItem', query: '*[_type == "menuItem"]' },
      { type: 'blogPost', query: '*[_type == "blogPost"]' },
      { type: 'event', query: '*[_type == "event"]' },
      { type: 'news', query: '*[_type == "news"]' }
    ];

    for (const contentType of contentTypes) {
      try {
        console.log(`  📚 ${contentType.type}を取得中...`);
        const items = await sanityClient.fetch(contentType.query);

        if (!items || items.length === 0) {
          console.log(`  ⚠️  ${contentType.type}: データなし`);
          continue;
        }

        const documents = items.map((item: any) => ({
          content: this.formatContent(item, contentType.type),
          metadata: {
            id: item._id,
            type: contentType.type,
            title: item.title || item.name || 'Untitled'
          },
          source: 'sanity'
        }));

        await this.vectorStore.addDocuments(documents);
        console.log(`  ✅ ${contentType.type}: ${documents.length}件処理完了`);
      } catch (error) {
        console.error(`  ❌ ${contentType.type}のエラー:`, error);
      }
    }

    console.log('✅ Sanity同期完了');
  }

  // コンテンツフォーマット
  private formatContent(item: any, type: string): string {
    switch (type) {
      case 'shopInfo':
        return `店舗情報: ${item.name || ''}
          説明: ${item.description || ''}
          営業時間: ${item.hours || ''}
          場所: ${item.location || ''}
          電話: ${item.phone || ''}`;

      case 'menuItem':
        return `メニュー: ${item.name || ''}
          カテゴリ: ${item.category || ''}
          価格: ¥${item.price || ''}
          説明: ${item.description || ''}`;

      case 'blogPost':
        return `ブログ: ${item.title || ''}
          内容: ${item.excerpt || item.content || ''}`;

      case 'event':
        return `イベント: ${item.title || ''}
          日時: ${item.date || ''}
          内容: ${item.description || ''}`;

      case 'news':
        return `ニュース: ${item.title || ''}
          日付: ${item.publishedAt || ''}
          内容: ${item.excerpt || item.content || ''}`;

      default:
        return JSON.stringify(item);
    }
  }
}
