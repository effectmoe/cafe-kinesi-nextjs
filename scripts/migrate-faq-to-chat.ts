import { config } from 'dotenv';
import { sanityClient } from '../src/lib/sanity';

// 環境変数を読み込む
config({ path: '.env.local' });

interface FAQItem {
  question: string;
  answer: string;
}

interface BlogPost {
  _id: string;
  title: string;
  faq: FAQItem[];
  category: string;
}

interface QuickQuestion {
  icon: string;
  label: string;
  question: string;
}

class FAQMigrator {

  // 既存のブログ投稿からFAQデータを取得
  async extractFAQsFromBlogPosts(): Promise<QuickQuestion[]> {
    console.log('📚 既存ブログ投稿からFAQデータを取得中...');

    const blogPosts: BlogPost[] = await sanityClient.fetch(`
      *[_type == "blogPost" && defined(faq) && length(faq) > 0] {
        _id,
        title,
        faq,
        category
      }
    `);

    console.log(`📝 ${blogPosts.length}件のブログ投稿でFAQを発見`);

    const quickQuestions: QuickQuestion[] = [];
    const categoryIcons: { [key: string]: string } = {
      wellness: '🧘',
      food_health: '🥗',
      lifestyle: '🌿',
      meditation: '🕯️',
      yoga: '🧘‍♀️',
      aromatherapy: '🌸',
      skincare: '✨',
      nature: '🌱'
    };

    // 各ブログ投稿のFAQを処理
    for (const post of blogPosts) {
      const categoryIcon = categoryIcons[post.category] || '💭';

      for (const faq of post.faq) {
        // FAQ質問をクイック質問形式に変換
        const quickQuestion: QuickQuestion = {
          icon: categoryIcon,
          label: this.truncateText(faq.question, 30),
          question: faq.question
        };

        quickQuestions.push(quickQuestion);
      }
    }

    // 重複除去（同じ質問文があれば最初のもののみ残す）
    const uniqueQuestions = quickQuestions.filter((question, index, self) =>
      index === self.findIndex(q => q.question === question.question)
    );

    console.log(`✅ ${uniqueQuestions.length}個のユニークなクイック質問を生成`);
    return uniqueQuestions;
  }

  // テキスト切り詰めユーティリティ
  private truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }


  // 移行データの生成とJSONファイル出力
  async migrate() {
    console.log('🚀 FAQ → チャット設定 移行開始...');

    try {
      // 1. FAQデータを抽出してクイック質問に変換
      const quickQuestions = await this.extractFAQsFromBlogPosts();

      // 2. 各設定データを生成（APIコールではなくJSONとして）
      const migrationData = {
        chatConfiguration: this.generateChatConfiguration(quickQuestions),
        aiGuardrails: this.generateAIGuardrails(),
        ragConfiguration: this.generateRAGConfiguration(),
        aiProviderSettings: this.generateAIProviderSettings()
      };

      // 3. JSONファイルとして出力
      const fs = require('fs');
      const outputPath = './migration-data.json';
      fs.writeFileSync(outputPath, JSON.stringify(migrationData, null, 2));

      console.log('✅ すべての移行データが生成されました！');
      console.log(`📁 データファイル: ${outputPath}`);
      console.log('📋 生成されたデータ:');
      console.log('  - チャット設定（クイック質問付き）');
      console.log('  - AIガードレール設定');
      console.log('  - RAG設定');
      console.log('  - AIプロバイダー設定');
      console.log('');
      console.log('📝 次のステップ:');
      console.log('1. Sanity Studioにアクセス');
      console.log('2. 各設定タイプのドキュメントを手動作成');
      console.log('3. migration-data.jsonの内容をコピー＆ペースト');
      console.log('');
      console.log('🚀 クイック質問プレビュー:');
      quickQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. ${q.icon} ${q.label}: "${q.question}"`);
      });

    } catch (error) {
      console.error('❌ 移行エラー:', error);
      throw error;
    }
  }

  // データ生成メソッド（APIコールなし）
  private generateChatConfiguration(quickQuestions: QuickQuestion[]) {
    return {
      _type: 'chatConfiguration',
      title: 'メインチャット設定',
      active: true,
      config: {
        chatUI: {
          title: 'Cafe Kinesiサポート',
          welcomeMessage: 'こんにちは！Cafe Kinesiのサポートチャットです。何かご質問がございましたら、下のクイック質問をクリックするか、直接メッセージをお送りください。',
          placeholder: 'ご質問やご要望をお聞かせください...',
          primaryColor: '#8B5A3C'
        },
        quickQuestions: quickQuestions.slice(0, 8) // 最大8個のクイック質問
      }
    };
  }

  private generateAIGuardrails() {
    return {
      _type: 'aiGuardrails',
      title: 'メインガードレール設定',
      active: true,
      systemPrompt: `あなたはCafe Kinesiの親切で専門的なAIアシスタントです。

以下のガイドラインに従って対応してください：

1. **トーン**: 親しみやすく、丁寧で温かみのある対応
2. **専門分野**: ウェルネス、健康的な食事、ライフスタイル、瞑想、ヨガ、アロマテラピー
3. **回答スタイル**: 簡潔で分かりやすく、実用的なアドバイスを提供
4. **制限事項**:
   - 医療診断や治療の提案は行わない
   - 個人的な医療情報を求めない
   - 不適切な内容には丁寧に対応拒否
5. **促進事項**:
   - 店舗情報、メニュー、イベントについて積極的に案内
   - ウェルネスに関する一般的な情報提供
   - リラクゼーションや自然療法の紹介`,
      rules: {
        temperature: 0.7,
        maxResponseLength: 500,
        allowedTopics: [
          'ウェルネス',
          '健康的な食事',
          'ライフスタイル',
          '瞑想',
          'ヨガ',
          'アロマテラピー',
          '店舗情報',
          'メニュー',
          'イベント'
        ],
        blockedTopics: [
          '医療診断',
          '治療提案',
          '薬事',
          '政治',
          '宗教論争'
        ]
      }
    };
  }

  private generateRAGConfiguration() {
    return {
      _type: 'ragConfiguration',
      title: 'メインRAG設定',
      active: true,
      vectorSearch: {
        enabled: true,
        threshold: 0.7,
        maxResults: 5
      },
      webSearch: {
        enabled: false, // 初期は無効
        sources: []
      },
      contentSources: [
        {
          type: 'sanity',
          contentTypes: ['blogPost', 'menuItem', 'shopInfo', 'event', 'news'],
          enabled: true
        }
      ]
    };
  }

  private generateAIProviderSettings() {
    return {
      _type: 'aiProviderSettings',
      title: 'メインプロバイダー設定',
      active: true,
      provider: 'deepseek',
      config: {
        model: 'deepseek-chat',
        temperature: 0.7,
        maxTokens: 1000
      }
    };
  }
}

// スクリプト実行
async function runMigration() {
  const migrator = new FAQMigrator();
  await migrator.migrate();
}

runMigration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ スクリプトエラー:', error);
    process.exit(1);
  });