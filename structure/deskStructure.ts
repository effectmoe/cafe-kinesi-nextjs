import {StructureBuilder} from 'sanity/structure'

export const structure = (S: StructureBuilder) =>
  S.list()
    .title('コンテンツ')
    .items([
      S.listItem()
        .title('ブログ記事')
        .id('blogPosts')
        .child(
          S.documentTypeList('blogPost')
            .title('ブログ記事')
        ),
      ...S.documentTypeListItems().filter(
        (listItem) => !['blogPost'].includes(listItem.getId() ?? '')
      )
    ])