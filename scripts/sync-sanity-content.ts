import { ContentSynchronizer } from '../src/lib/rag/content-synchronizer';

async function syncContent() {
  console.log('🚀 コンテンツ同期開始...');

  const synchronizer = new ContentSynchronizer();
  await synchronizer.initialize();
  await synchronizer.syncSanityContent();

  console.log('✅ 同期完了！');
}

syncContent()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('❌ エラー:', error);
    process.exit(1);
  });
