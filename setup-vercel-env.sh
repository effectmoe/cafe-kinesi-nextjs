#!/bin/bash

# Vercel環境変数を設定
echo "Setting up Vercel environment variables..."

# 環境変数を設定
echo "e4aqw590" | vercel env add NEXT_PUBLIC_SANITY_PROJECT_ID production
echo "production" | vercel env add NEXT_PUBLIC_SANITY_DATASET production
echo "2024-01-01" | vercel env add NEXT_PUBLIC_SANITY_API_VERSION production
echo "false" | vercel env add NEXT_PUBLIC_SANITY_USE_CDN production
echo "skmH5807aTZkc80e9wXtUGh6YGxvS9fmTcsxwG0vDPy9XPJ3lTpX7wYmAXl5SKy1HEOllZf3NDEg1ULmn" | vercel env add SANITY_API_TOKEN production
echo "https://cafekinesi-nextjs.vercel.app" | vercel env add NEXT_PUBLIC_SITE_URL production
echo "Cafe Kinesi" | vercel env add NEXT_PUBLIC_SITE_NAME production

echo "Environment variables setup complete!"