import { config } from 'dotenv';
import { sql } from '@vercel/postgres';

// 環境変数を読み込む
config({ path: '.env.local' });

async function initializeVectorDatabase() {
  console.log('🔧 Vercel Postgres pgvector初期化開始...');

  try {
    // pgvector拡張を有効化
    await sql`CREATE EXTENSION IF NOT EXISTS vector`;
    console.log('✅ pgvector拡張を有効化');

    // 埋め込みテーブル作成
    await sql`
      CREATE TABLE IF NOT EXISTS embeddings (
        id SERIAL PRIMARY KEY,
        content TEXT NOT NULL,
        metadata JSONB DEFAULT '{}',
        embedding vector(384),
        source VARCHAR(50) DEFAULT 'sanity',
        content_hash VARCHAR(64) UNIQUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ embeddingsテーブル作成');

    // インデックス作成
    await sql`
      CREATE INDEX IF NOT EXISTS embeddings_vector_idx
      ON embeddings
      USING ivfflat (embedding vector_cosine_ops)
      WITH (lists = 50)
    `;
    console.log('✅ ベクトルインデックス作成');

    // メタデータ用インデックス
    await sql`CREATE INDEX IF NOT EXISTS idx_metadata ON embeddings USING GIN (metadata)`;
    await sql`CREATE INDEX IF NOT EXISTS idx_source ON embeddings (source)`;
    console.log('✅ メタデータインデックス作成');

    // 全文検索用カラムとインデックス
    await sql`ALTER TABLE embeddings ADD COLUMN IF NOT EXISTS search_text tsvector`;
    await sql`CREATE INDEX IF NOT EXISTS idx_search_text ON embeddings USING GIN (search_text)`;
    console.log('✅ 全文検索インデックス作成');

    // RAG設定テーブル
    await sql`
      CREATE TABLE IF NOT EXISTS rag_config (
        id SERIAL PRIMARY KEY,
        config_name VARCHAR(100) UNIQUE NOT NULL,
        config_value JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      )
    `;
    console.log('✅ RAG設定テーブル作成');

    console.log('🎉 データベース初期化完了！');

  } catch (error) {
    console.error('❌ エラー:', error);
    throw error;
  }
}

// 実行
initializeVectorDatabase()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
