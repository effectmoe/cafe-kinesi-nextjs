import { DefaultDocumentNodeResolver, StructureResolver } from 'sanity/structure'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case 'blogPost':
      return S.document().views([
        S.view.form(),
      ])
    case 'news':
      return S.document().views([
        S.view.form(),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}

// カスタム構造ビルダー（講座の階層表示用）
export const structure: StructureResolver = (S) =>
  S.list()
    .title('コンテンツ')
    .items([
      // 講座を階層的に表示
      S.listItem()
        .title('講座')
        .icon(() => '📚')
        .child(
          S.list()
            .title('講座一覧')
            .items([
              // 主要講座のみを表示し、各主要講座の下に補助講座を表示
              S.documentTypeListItem('course')
                .title('すべての講座')
                .icon(() => '📖'),

              S.divider(),

              // 主要講座と補助講座を階層的に表示
              S.listItem()
                .title('主要講座')
                .icon(() => '⭐')
                .child(
                  S.documentList()
                    .title('主要講座')
                    .filter('_type == "course" && courseType == "main"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),

              S.listItem()
                .title('補助講座')
                .icon(() => '📎')
                .child(
                  S.documentList()
                    .title('補助講座')
                    .filter('_type == "course" && courseType == "auxiliary"')
                    .defaultOrdering([{ field: 'order', direction: 'asc' }])
                ),
            ])
        ),

      S.divider(),

      // その他のドキュメントタイプ
      S.documentTypeListItem('siteSettings').title('サイト設定').icon(() => '⚙️'),
      S.documentTypeListItem('homepage').title('ホームページ').icon(() => '🏠'),
      S.documentTypeListItem('schoolPage').title('スクールページ設定').icon(() => '🎓'),

      S.divider(),

      S.documentTypeListItem('blogPost').title('ブログ記事').icon(() => '📝'),
      S.documentTypeListItem('news').title('ニュース').icon(() => '📰'),
      S.documentTypeListItem('event').title('イベント').icon(() => '📅'),

      S.divider(),

      S.documentTypeListItem('instructor').title('インストラクター').icon(() => '👨‍🏫'),
      S.documentTypeListItem('page').title('ページ').icon(() => '📄'),

      S.divider(),

      // AI関連
      S.listItem()
        .title('AI context')
        .icon(() => '🤖')
        .child(
          S.list()
            .title('AI最適化コンテンツ')
            .items([
              S.documentTypeListItem('aiContent').title('AI最適化コンテンツ'),
              S.documentTypeListItem('chatConfiguration').title('チャット設定'),
              S.documentTypeListItem('chatModal').title('チャットモーダル設定'),
              S.documentTypeListItem('faqCard').title('FAQカード'),
              S.documentTypeListItem('ragConfiguration').title('RAG設定'),
              S.documentTypeListItem('knowledgeBase').title('ナレッジベース'),
              S.documentTypeListItem('aiGuardrails').title('AIガードレール'),
              S.documentTypeListItem('aiProviderSettings').title('AIプロバイダー設定'),
            ])
        ),

      S.divider(),

      // その他の設定
      S.documentTypeListItem('author').title('著者').icon(() => '✍️'),
      S.documentTypeListItem('category').title('カテゴリー').icon(() => '🏷️'),
      S.documentTypeListItem('menuItem').title('メニューアイテム').icon(() => '🍽️'),
      S.documentTypeListItem('shopInfo').title('店舗情報').icon(() => '🏪'),
    ])