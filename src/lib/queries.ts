// Sanity GROQ queries

// メニューアイテムを取得
export const MENU_ITEMS_QUERY = `
  *[_type == "menuItem"] | order(category, order) {
    _id,
    name,
    nameEn,
    description,
    descriptionEn,
    price,
    category,
    image,
    available,
    featured
  }
`

// カテゴリーを取得
export const CATEGORIES_QUERY = `
  *[_type == "category"] | order(order) {
    _id,
    name,
    nameEn,
    slug,
    description,
    image
  }
`

// 店舗情報を取得
export const SHOP_INFO_QUERY = `
  *[_type == "shopInfo"][0] {
    _id,
    name,
    nameEn,
    description,
    descriptionEn,
    address,
    addressEn,
    phone,
    email,
    businessHours,
    holidays,
    socialMedia
  }
`

// お知らせを取得
export const NEWS_QUERY = `
  *[_type == "news"] | order(publishedAt desc) [0...10] {
    _id,
    title,
    titleEn,
    content,
    contentEn,
    publishedAt,
    category,
    image
  }
`

// イベント情報を取得
export const EVENTS_QUERY = `
  *[_type == "event" && endDate >= now()] | order(startDate) {
    _id,
    title,
    titleEn,
    description,
    descriptionEn,
    startDate,
    endDate,
    location,
    image,
    registrationUrl
  }
`

// ブログ記事を取得（最新9件）
export const BLOG_POSTS_QUERY = `
  *[_type == "blogPost"] | order(publishedAt desc) [0...9] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    mainImage,
    publishedAt,
    category,
    featured,
    "author": author->{
      name,
      image
    }
  }
`

// 特定のブログ記事を取得
export const BLOG_POST_BY_SLUG_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    tldr,
    mainImage,
    content,
    keyPoint,
    summary,
    faq,
    contentOrder,
    publishedAt,
    category,
    tags,
    "author": author->{
      name,
      bio,
      image
    }
  }
`

// プレビュー用：下書きも含めて取得
export const BLOG_POST_PREVIEW_QUERY = `
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _rev,
    title,
    "slug": slug.current,
    excerpt,
    tldr,
    mainImage,
    content,
    keyPoint,
    summary,
    faq,
    contentOrder,
    publishedAt,
    category,
    tags,
    "author": author->{
      name,
      bio,
      image
    }
  }
`