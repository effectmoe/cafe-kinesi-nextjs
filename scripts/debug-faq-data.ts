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

// Unicode制御文字とInvisibleテキストをクリーンアップ
function cleanText(text: string): string {
  if (!text) return '';

  return text
    // Unicode制御文字を削除 (C0, C1 controls)
    .replace(/[\u0000-\u001F\u007F-\u009F]/g, '')
    // Invisible文字を削除 (Zero Width characters)
    .replace(/[\u200B-\u200D\u2060\uFEFF]/g, '')
    // その他の不可視文字
    .replace(/[\u180E\u061C]/g, '')
    // 重複する空白を正規化
    .replace(/\s+/g, ' ')
    // 前後の空白を削除
    .trim();
}

async function debugFAQData() {
  console.log('🔍 FAQ データの詳細分析開始...');

  try {
    // 詳細なブログ投稿データを取得
    const blogPosts: BlogPost[] = await sanityClient.fetch(`
      *[_type == "blogPost" && defined(faq) && length(faq) > 0] {
        _id,
        title,
        faq,
        category
      }
    `);

    console.log(`📊 FAQ付きブログ投稿: ${blogPosts.length}件`);

    blogPosts.forEach((post, index) => {
      console.log(`\n📄 ブログ投稿 ${index + 1}:`);
      console.log(`  ID: ${post._id}`);
      console.log(`  タイトル: ${post.title}`);
      console.log(`  カテゴリ: ${post.category}`);
      console.log(`  FAQ数: ${post.faq?.length || 0}`);

      if (post.faq && post.faq.length > 0) {
        post.faq.forEach((faq, faqIndex) => {
          console.log(`\n  FAQ ${faqIndex + 1}:`);

          // 元の質問を表示
          console.log(`    元の質問: "${faq.question}"`);
          console.log(`    質問の長さ: ${faq.question.length} 文字`);

          // 文字コードを分析
          const questionCodes = faq.question.split('').slice(0, 20).map(char =>
            `${char}(U+${char.charCodeAt(0).toString(16).toUpperCase().padStart(4, '0')})`
          ).join(' ');
          console.log(`    最初の20文字のUnicode: ${questionCodes}`);

          // クリーンアップした質問
          const cleanQuestion = cleanText(faq.question);
          console.log(`    クリーン質問: "${cleanQuestion}"`);
          console.log(`    クリーン後の長さ: ${cleanQuestion.length} 文字`);

          // 回答も表示
          const cleanAnswer = cleanText(faq.answer);
          console.log(`    クリーン回答: "${cleanAnswer}"`);
        });
      }
    });

    // クリーンアップしたデータでクイック質問を生成
    console.log('\n🧹 クリーンアップ後のクイック質問:');
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

    const cleanQuickQuestions: any[] = [];

    blogPosts.forEach(post => {
      const categoryIcon = categoryIcons[post.category] || '💭';

      if (post.faq && post.faq.length > 0) {
        post.faq.forEach(faq => {
          const cleanQuestion = cleanText(faq.question);

          if (cleanQuestion.length > 0) {
            const quickQuestion = {
              icon: categoryIcon,
              label: cleanQuestion.length > 30 ? cleanQuestion.slice(0, 30) + '...' : cleanQuestion,
              question: cleanQuestion
            };

            cleanQuickQuestions.push(quickQuestion);
          }
        });
      }
    });

    // 重複除去
    const uniqueQuestions = cleanQuickQuestions.filter((question, index, self) =>
      index === self.findIndex(q => q.question === question.question)
    );

    uniqueQuestions.forEach((q, i) => {
      console.log(`  ${i + 1}. ${q.icon} ${q.label}: "${q.question}"`);
    });

    console.log(`\n✅ 解析完了: ${uniqueQuestions.length}個のクリーンなクイック質問を生成`);

  } catch (error) {
    console.error('❌ エラー:', error);
  }
}

debugFAQData()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ スクリプトエラー:', error);
    process.exit(1);
  });