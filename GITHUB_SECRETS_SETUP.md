# GitHub Secrets 設定ガイド

## 必要なシークレット

GitHubリポジトリで以下のシークレットを設定してください。

### 1. Vercel関連
```
VERCEL_TOKEN=<Vercelトークン>
VERCEL_ORG_ID=team_MAGwFE7LFZ3i9FAMQdYkmSm2
VERCEL_PROJECT_ID=prj_jrvZqAC5DFzHWjo17uHQREH7OjGw
```

### 2. Sanity CMS関連
```
NEXT_PUBLIC_SANITY_PROJECT_ID=e4aqw590
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=false
SANITY_API_TOKEN=<あなたのSanityトークン>
```

### 3. サイト設定
```
NEXT_PUBLIC_SITE_URL=https://cafe-kinesi-nextjs.vercel.app
NEXT_PUBLIC_SITE_NAME=Cafe Kinesi
```

## 設定手順

1. GitHubリポジトリページを開く
2. Settings → Secrets and variables → Actions
3. 「New repository secret」をクリック
4. 各シークレットを追加

## Vercelトークンの取得方法

1. [Vercel Dashboard](https://vercel.com)にアクセス
2. Account Settings → Tokens
3. 「Create Token」をクリック
4. トークン名を入力（例：`github-actions`）
5. Scopeを選択（`Full Account`推奨）
6. 「Create」をクリック
7. 生成されたトークンをコピー

## 確認済みのプロジェクト情報

- **Organization ID**: `team_MAGwFE7LFZ3i9FAMQdYkmSm2`
- **Project ID**: `prj_jrvZqAC5DFzHWjo17uHQREH7OjGw`
- **Project Name**: `cafe-kinesi-nextjs`

## GitHub Actions ワークフローの動作

1. `master`ブランチへのプッシュ時に自動実行
2. 以下のステップを実行：
   - 依存関係のインストール
   - ESLintによるコード検証
   - TypeScriptの型チェック
   - ビルドテスト
   - Vercelへの自動デプロイ（masterブランチのみ）

## トラブルシューティング

### ワークフローが失敗する場合
1. すべてのシークレットが正しく設定されているか確認
2. Vercelトークンの権限が適切か確認
3. Actions タブでエラーログを確認

### デプロイが反映されない場合
1. Vercelダッシュボードでデプロイステータスを確認
2. 環境変数が正しく設定されているか確認