# Vercel環境変数設定ガイド

## 必要な環境変数

Vercelダッシュボードで以下の環境変数を設定してください：

### Sanity CMS設定
```
NEXT_PUBLIC_SANITY_PROJECT_ID=e4aqw590
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=false
SANITY_API_TOKEN=skmH5807aTZkc80e9wXtUGh6YGxvS9fmTcsxwG0vDPy9XPJ3lTpX7wYmAXl5SKy1HEOllZf3NDEg1ULmn
```

### Google Analytics設定（オプション）
```
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXX
```

## Vercelでの設定手順

1. Vercelダッシュボードにアクセス
2. プロジェクトを選択
3. Settings → Environment Variables
4. 各環境変数を追加：
   - Key: 環境変数名
   - Value: 値
   - Environment: Production, Preview, Development すべてにチェック
5. 「Save」をクリック

## デプロイ確認

環境変数設定後、自動的に再デプロイが実行されます。

### 確認項目
- ✅ ホームページの表示
- ✅ ブログ一覧ページ
- ✅ 個別ブログ記事
- ✅ Aboutページ
- ✅ 画像の表示

## トラブルシューティング

### Sanityデータが表示されない場合
1. SANITY_PROJECT_IDが正しいか確認
2. SANITY_DATASETが正しいか確認（通常は`production`）
3. Sanity Studioでコンテンツが公開されているか確認

### ビルドエラーの場合
1. Vercelのビルドログを確認
2. 環境変数の設定漏れがないか確認
3. GitHubリポジトリの最新コードが正しいか確認