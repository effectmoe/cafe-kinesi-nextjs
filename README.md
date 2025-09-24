# Cafe Kinesi - Next.js Website

![Next.js](https://img.shields.io/badge/Next.js-15.5.3-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4-06B6D4)
![License](https://img.shields.io/badge/license-MIT-green)

心と身体を整えるカフェキネシのWebサイト。Next.js App Router、TypeScript、Tailwind CSSで構築。

## 🌟 特徴

- ⚡ **高速パフォーマンス** - Next.js 15の最適化機能を活用
- 🎨 **レスポンシブデザイン** - モバイルファーストのUI/UX
- 🔍 **SEO最適化** - 構造化データ、メタタグ、サイトマップ自動生成
- 📊 **分析統合** - Google Analytics、Vercel Analytics
- 🛡️ **セキュリティ** - CSPヘッダー、HTTPS強制、定期監査
- ♿ **アクセシビリティ** - WCAG準拠、Lighthouse 100点

## 🚀 デプロイ状況

- **本番環境**: https://cafekinesi-nextjs.vercel.app/
- **ステータス**: ✅ 稼働中
- **最終デプロイ**: 自動デプロイ有効

## 📋 前提条件

- Node.js 18.x 以上
- npm 9.x 以上
- Sanity アカウント
- Vercel アカウント（デプロイ用）

## 🔧 セットアップ

### 1. リポジトリのクローン

```bash
git clone https://github.com/effectmoe/cafekinesi-nextjs.git
cd cafekinesi-nextjs
```

### 2. 依存関係のインストール

```bash
npm install
```

### 3. 環境変数の設定

`.env.local` ファイルを作成:

```env
# Sanity CMS
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
NEXT_PUBLIC_SANITY_USE_CDN=false
SANITY_API_TOKEN=your_api_token

# Google Analytics
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Monitoring
HEALTH_CHECK_TOKEN=your_secret_token
```

### 4. 開発サーバーの起動

```bash
npm run dev
```

http://localhost:3000 でアクセス可能

## 📦 スクリプト

```bash
# 開発
npm run dev           # 開発サーバー起動
npm run build        # プロダクションビルド
npm start           # プロダクションサーバー起動

# 品質チェック
npm run lint        # ESLint実行
npm run type-check  # TypeScript型チェック
npm run lighthouse  # Lighthouseパフォーマンステスト

# メンテナンス
npm run maintenance     # メンテナンススクリプト実行
npm run update:deps    # 依存関係更新
npm run check:security # セキュリティ監査
npm run clean         # キャッシュクリア
```

## 🏗️ プロジェクト構成

```
cafe-kinesi-nextjs/
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── layout.tsx   # ルートレイアウト
│   │   ├── page.tsx     # ホームページ
│   │   ├── blog/        # ブログセクション
│   │   ├── about/       # アバウトページ
│   │   └── api/         # APIルート
│   ├── components/      # Reactコンポーネント
│   ├── lib/            # ユーティリティ関数
│   └── hooks/          # カスタムフック
├── public/             # 静的ファイル
├── schemas/            # Sanityスキーマ定義
├── scripts/            # メンテナンススクリプト
├── .github/workflows/  # GitHub Actions
└── docs/              # ドキュメント
```

## 🔐 セキュリティ

### 実装済みのセキュリティ対策

- ✅ CSPヘッダー
- ✅ X-Frame-Options: DENY
- ✅ X-Content-Type-Options: nosniff
- ✅ HTTPS強制
- ✅ 環境変数による秘密情報管理
- ✅ 定期的なセキュリティ監査
- ✅ 依存関係の自動更新

## 📊 パフォーマンス

### Lighthouse スコア

- **Performance**: 89/100
- **Accessibility**: 100/100
- **Best Practices**: 96/100
- **SEO**: 100/100

### Core Web Vitals

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1

## 🚀 デプロイ

### Vercel へのデプロイ

1. Vercel にログイン
2. GitHubリポジトリをインポート
3. 環境変数を設定
4. デプロイ

### 自動デプロイ

- `main` ブランチへのプッシュで自動デプロイ
- プルリクエストでプレビューデプロイ

## 📈 モニタリング

### 実装済みの監視機能

- **Vercel Analytics** - パフォーマンス分析
- **Google Analytics** - ユーザー行動分析
- **ヘルスチェック** - `/api/health` エンドポイント
- **アップタイム監視** - 15分ごとの自動チェック
- **エラーロギング** - 自動エラー収集

## 🔄 CI/CD

### GitHub Actions ワークフロー

- **deploy.yml** - 自動デプロイ
- **update-dependencies.yml** - 依存関係の自動更新
- **security-audit.yml** - セキュリティ監査
- **performance-monitoring.yml** - パフォーマンス監視
- **backup.yml** - 定期バックアップ
- **monitoring.yml** - アップタイム監視

## 📚 ドキュメント

- [Google Search Console 設定ガイド](docs/google-search-console-setup.md)
- [メンテナンスガイド](docs/maintenance.md)
- [トラブルシューティング](docs/troubleshooting.md)

## 🤝 コントリビューション

1. このリポジトリをフォーク
2. 機能ブランチを作成 (`git checkout -b feature/AmazingFeature`)
3. 変更をコミット (`git commit -m 'Add some AmazingFeature'`)
4. ブランチにプッシュ (`git push origin feature/AmazingFeature`)
5. プルリクエストを作成

## 📝 ライセンス

MIT License - 詳細は [LICENSE](LICENSE) ファイルを参照

## 📞 お問い合わせ

- **Website**: https://cafekinesi-nextjs.vercel.app/
- **Email**: info@cafekinesi.com
- **GitHub**: https://github.com/effectmoe/cafekinesi-nextjs

## 🙏 謝辞

- Next.js チーム
- Vercel
- Sanity CMS
- すべてのコントリビューター

---

Built with ❤️ using Next.js and TypeScript