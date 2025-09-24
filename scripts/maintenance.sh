#!/bin/bash

# Cafe Kinesi メンテナンススクリプト
# 定期的なメンテナンスタスクを実行

set -e

echo "🔧 Cafe Kinesi メンテナンスを開始します..."
echo "=================================="

# 1. 依存関係の更新チェック
echo "📦 依存関係の更新をチェック中..."
npm outdated || true

# 2. セキュリティ監査
echo "🔒 セキュリティ監査を実行中..."
npm audit || true

# 3. 不要なファイルのクリーンアップ
echo "🧹 不要なファイルをクリーンアップ中..."
rm -rf .next/cache
rm -rf node_modules/.cache
find . -name "*.log" -type f -delete
find . -name ".DS_Store" -type f -delete

# 4. ビルドキャッシュのクリア
echo "🗑️ ビルドキャッシュをクリア中..."
rm -rf .next
npm run build

# 5. 型チェック
echo "✅ 型チェックを実行中..."
npm run type-check

# 6. リンター実行
echo "📝 リンターを実行中..."
npm run lint

# 7. パフォーマンステスト
echo "📊 パフォーマンステストを実行中..."
npm start &
SERVER_PID=$!
sleep 10

# Lighthouse実行（インストールされている場合）
if command -v lighthouse &> /dev/null; then
    lighthouse http://localhost:3000 \
        --output=json \
        --output-path=./maintenance-report.json \
        --chrome-flags="--headless" \
        --quiet

    # スコアの確認
    PERF_SCORE=$(cat maintenance-report.json | jq '.categories.performance.score * 100')
    echo "パフォーマンススコア: $PERF_SCORE"
    rm maintenance-report.json
fi

kill $SERVER_PID

# 8. データベース最適化（Sanityのキャッシュクリア）
echo "💾 Sanityキャッシュをクリア中..."
rm -rf .sanity

# 9. Git メンテナンス
echo "📝 Gitリポジトリを最適化中..."
git gc --auto
git prune

# 10. ディスク使用量の確認
echo "💿 ディスク使用量:"
du -sh node_modules
du -sh .next
du -sh public

echo ""
echo "=================================="
echo "✅ メンテナンスが完了しました！"
echo ""
echo "📊 推奨される次のアクション:"
echo "1. npm update を実行して依存関係を更新"
echo "2. npm audit fix を実行してセキュリティ問題を修正"
echo "3. 本番環境にデプロイする前にテストを実行"