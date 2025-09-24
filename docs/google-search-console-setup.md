# Google Search Console 設定ガイド

## 1. Google Search Console への登録

### Step 1: Google Search Console にアクセス
1. https://search.google.com/search-console にアクセス
2. Googleアカウントでログイン

### Step 2: プロパティの追加
1. 「プロパティを追加」をクリック
2. URLプレフィックスを選択
3. サイトのURL入力: `https://cafekinesi-nextjs.vercel.app/`

### Step 3: 所有権の確認

#### 方法1: HTMLファイル（推奨）
1. 提供されたHTMLファイルをダウンロード
2. `public/` フォルダに配置
3. GitHubにプッシュして自動デプロイ
4. Search Consoleで「確認」をクリック

#### 方法2: HTMLタグ
すでに実装済み - `src/app/layout.tsx` に以下を追加:
```tsx
<meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" />
```

### Step 4: サイトマップの送信
1. Search Console > サイトマップ
2. 以下のURLを追加:
   - `/sitemap.xml`
   - `/robots.txt`

## 2. 重要な設定

### パフォーマンスレポート
- ページの表示回数
- クリック数
- CTR（クリック率）
- 平均掲載順位

### カバレッジレポート
- インデックスされたページ数
- エラーや警告の確認
- 除外されたページの理由

### ウェブに関する主な指標
- Core Web Vitals のスコア
- モバイルユーザビリティ
- ページエクスペリエンス

## 3. 設定後のチェックリスト

- [ ] 所有権の確認完了
- [ ] サイトマップ送信済み
- [ ] robots.txt の確認
- [ ] インデックス登録のリクエスト
- [ ] Core Web Vitals の確認
- [ ] モバイルユーザビリティの確認
- [ ] 検索パフォーマンスレポートの有効化

## 4. 定期的な確認項目

### 週次チェック
- パフォーマンスレポートの確認
- 新しいエラーや警告の確認

### 月次チェック
- インデックスカバレッジの確認
- Core Web Vitals の改善状況
- 検索クエリの分析

## 5. トラブルシューティング

### インデックスされない場合
1. robots.txt で制限されていないか確認
2. noindex タグがないか確認
3. URL検査ツールで確認
4. 手動でインデックス登録をリクエスト

### Core Web Vitals が悪い場合
1. Lighthouse レポートを確認
2. 画像の最適化
3. JavaScriptの最適化
4. CDNの活用

## 6. 実装済みの機能

### 自動生成されるファイル
- ✅ `/sitemap.xml` - 動的生成
- ✅ `/robots.txt` - 静的ファイル
- ✅ 構造化データ（JSON-LD）

### SEO対策
- ✅ メタタグの自動生成
- ✅ Open Graph タグ
- ✅ Twitter Cards
- ✅ canonical URL

## 参考リンク

- [Google Search Console ヘルプ](https://support.google.com/webmasters)
- [Search Console API](https://developers.google.com/webmaster-tools)
- [構造化データテストツール](https://search.google.com/structured-data/testing-tool)