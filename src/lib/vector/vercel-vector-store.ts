import { config } from 'dotenv';
import { sql } from '@vercel/postgres';
import { createHash } from 'crypto';
import { pipeline } from '@xenova/transformers';

// 環境変数を読み込む
config({ path: '.env.local' });

export class VercelVectorStore {
  private embedder: any;

  async initialize() {
    // 軽量埋め込みモデルをロード
    this.embedder = await pipeline(
      'feature-extraction',
      'Xenova/all-MiniLM-L6-v2'
    );
    console.log('✅ 埋め込みモデル初期化完了');
  }

  // コンテンツハッシュ生成
  private hashContent(content: string): string {
    return createHash('sha256').update(content).digest('hex');
  }

  // ドキュメント追加
  async addDocuments(documents: any[]) {
    console.log(`📝 ${documents.length}件のドキュメントを追加中...`);

    for (const doc of documents) {
      try {
        // 埋め込み生成
        const output = await this.embedder(doc.content, {
          pooling: 'mean',
          normalize: true
        });
        const embedding = Array.from(output.data);

        // ハッシュ生成
        const contentHash = this.hashContent(doc.content);

        // UPSERT処理
        await sql`
          INSERT INTO embeddings (
            content,
            metadata,
            embedding,
            source,
            content_hash,
            search_text
          ) VALUES (
            ${doc.content},
            ${JSON.stringify(doc.metadata || {})},
            ${JSON.stringify(embedding)},
            ${doc.source || 'sanity'},
            ${contentHash},
            to_tsvector('simple', ${doc.content})
          )
          ON CONFLICT (content_hash)
          DO UPDATE SET
            embedding = EXCLUDED.embedding,
            metadata = EXCLUDED.metadata,
            updated_at = NOW()
        `;

      } catch (error) {
        console.error('❌ ドキュメント追加エラー:', error);
      }
    }

    console.log('✅ ドキュメント追加完了');
  }

  // ハイブリッド検索
  async hybridSearch(query: string, options: any = {}) {
    const { topK = 5, threshold = 0.7 } = options;

    // クエリ埋め込み生成
    const output = await this.embedder(query, {
      pooling: 'mean',
      normalize: true
    });
    const queryEmbedding = Array.from(output.data);

    // ハイブリッド検索実行
    const results = await sql`
      WITH vector_search AS (
        SELECT
          id,
          content,
          metadata,
          1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) as vector_score
        FROM embeddings
        WHERE 1 - (embedding <=> ${JSON.stringify(queryEmbedding)}::vector) > ${threshold}
        ORDER BY vector_score DESC
        LIMIT ${topK}
      ),
      text_search AS (
        SELECT
          id,
          ts_rank(search_text, plainto_tsquery('simple', ${query})) as text_score
        FROM embeddings
        WHERE search_text @@ plainto_tsquery('simple', ${query})
      )
      SELECT
        v.content,
        v.metadata,
        v.vector_score,
        COALESCE(t.text_score, 0) as text_score,
        (v.vector_score * 0.7 + COALESCE(t.text_score, 0) * 0.3) as combined_score
      FROM vector_search v
      LEFT JOIN text_search t ON v.id = t.id
      ORDER BY combined_score DESC
    `;

    return results.rows;
  }

  // 統計情報取得
  async getStats() {
    const stats = await sql`
      SELECT
        COUNT(*) as total_documents,
        COUNT(DISTINCT source) as sources,
        MAX(updated_at) as last_update
      FROM embeddings
    `;

    return stats.rows[0];
  }
}
