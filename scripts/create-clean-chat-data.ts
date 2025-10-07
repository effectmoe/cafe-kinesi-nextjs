import { config } from 'dotenv';

// 環境変数を読み込む
config({ path: '.env.local' });

interface QuickQuestion {
  icon: string;
  label: string;
  question: string;
}

class CleanChatDataGenerator {

  // クリーンなサンプルFAQデータを作成
  generateSampleQuickQuestions(): QuickQuestion[] {
    return [
      {
        icon: '🧘',
        label: '瞑想の始め方を教えて',
        question: '瞑想を始めたいのですが、初心者でもできる簡単な方法はありますか？'
      },
      {
        icon: '🍃',
        label: '営業時間について',
        question: 'Cafe Kinesiの営業時間を教えてください。'
      },
      {
        icon: '🌸',
        label: 'アロマの効果について',
        question: 'アロマテラピーにはどのような効果がありますか？'
      },
      {
        icon: '🥗',
        label: 'おすすめのメニュー',
        question: '健康的でおすすめのメニューはありますか？'
      },
      {
        icon: '🧘‍♀️',
        label: 'ヨガクラスの情報',
        question: 'ヨガクラスの内容と料金を教えてください。'
      },
      {
        icon: '🌱',
        label: 'デトックス方法',
        question: '自然な方法でデトックスするにはどうしたらいいですか？'
      },
      {
        icon: '✨',
        label: 'スキンケアアドバイス',
        question: '自然派のスキンケア方法を教えてください。'
      },
      {
        icon: '🕯️',
        label: 'リラクゼーション方法',
        question: 'ストレス解消とリラクゼーションの方法はありますか？'
      }
    ];
  }

  // 初期チャット設定データを生成
  generateChatConfiguration(quickQuestions: QuickQuestion[]) {
    return {
      _type: 'chatConfiguration',
      title: 'メインチャット設定',
      active: true,
      config: {
        chatUI: {
          title: 'Cafe Kinesiサポート',
          welcomeMessage: 'こんにちは！Cafe Kinesiのサポートチャットです。ウェルネス、瞑想、ヨガ、アロマテラピーなど、心と体の健康に関するご質問にお答えします。下のクイック質問をクリックするか、直接メッセージをお送りください。',
          placeholder: 'ご質問やご要望をお聞かせください...',
          primaryColor: '#8B5A3C'
        },
        quickQuestions: quickQuestions.slice(0, 8) // 最大8個のクイック質問
      }
    };
  }

  // AI ガードレール設定を生成
  generateAIGuardrails() {
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
   - リラクゼーションや自然療法の紹介

常にCafe Kinesiの価値観である「心と体の調和」を念頭に置いて対応してください。`,
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
          'イベント',
          'リラクゼーション',
          '自然療法',
          'デトックス',
          'スキンケア'
        ],
        blockedTopics: [
          '医療診断',
          '治療提案',
          '薬事',
          '政治',
          '宗教論争',
          '投資',
          'ギャンブル'
        ]
      }
    };
  }

  // RAG設定を生成
  generateRAGConfiguration() {
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

  // AIプロバイダー設定を生成
  generateAIProviderSettings() {
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

  // 全データを生成してJSONファイルに出力
  async generateCleanData() {
    console.log('🚀 クリーンなチャット設定データ生成開始...');

    try {
      // 1. サンプルクイック質問を生成
      const quickQuestions = this.generateSampleQuickQuestions();

      // 2. 各設定データを生成
      const migrationData = {
        chatConfiguration: this.generateChatConfiguration(quickQuestions),
        aiGuardrails: this.generateAIGuardrails(),
        ragConfiguration: this.generateRAGConfiguration(),
        aiProviderSettings: this.generateAIProviderSettings()
      };

      // 3. JSONファイルとして出力
      const fs = require('fs');
      const outputPath = './clean-chat-migration-data.json';
      fs.writeFileSync(outputPath, JSON.stringify(migrationData, null, 2));

      console.log('✅ クリーンなチャット設定データが生成されました！');
      console.log(`📁 データファイル: ${outputPath}`);
      console.log('📋 生成されたデータ:');
      console.log('  - チャット設定（8つのクイック質問付き）');
      console.log('  - AIガードレール設定');
      console.log('  - RAG設定');
      console.log('  - AIプロバイダー設定');
      console.log('');
      console.log('📝 次のステップ:');
      console.log('1. Sanity Studioにアクセス');
      console.log('2. 各設定タイプのドキュメントを手動作成');
      console.log('3. clean-chat-migration-data.jsonの内容をコピー＆ペースト');
      console.log('');
      console.log('🚀 クイック質問プレビュー:');
      quickQuestions.forEach((q, i) => {
        console.log(`  ${i + 1}. ${q.icon} ${q.label}: "${q.question}"`);
      });

      console.log('');
      console.log('🎯 特徴:');
      console.log('- Unicode文字化け問題を解決済み');
      console.log('- Cafe Kinesiのウェルネステーマに最適化');
      console.log('- 実用的なクイック質問を8つ用意');
      console.log('- 医療診断を避ける適切なガードレール設定');

    } catch (error) {
      console.error('❌ データ生成エラー:', error);
      throw error;
    }
  }
}

// スクリプト実行
async function runGeneration() {
  const generator = new CleanChatDataGenerator();
  await generator.generateCleanData();
}

runGeneration()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ スクリプトエラー:', error);
    process.exit(1);
  });