import { DefaultDocumentNodeResolver } from 'sanity/structure'
import Iframe from 'sanity-plugin-iframe-pane'

export const defaultDocumentNode: DefaultDocumentNodeResolver = (S, {schemaType}) => {
  switch (schemaType) {
    case 'blogPost':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: any) => doc?.slug?.current
              ? `https://cafe-kinesi-nextjs.vercel.app/api/preview?slug=${doc.slug.current}&type=blogPost`
              : 'https://cafe-kinesi-nextjs.vercel.app',
            reload: {
              button: true,
            },
          })
          .title('プレビュー'),
      ])
    case 'news':
      return S.document().views([
        S.view.form(),
        S.view
          .component(Iframe)
          .options({
            url: (doc: any) => doc?.slug?.current
              ? `https://cafe-kinesi-nextjs.vercel.app/api/preview?slug=${doc.slug.current}&type=news`
              : 'https://cafe-kinesi-nextjs.vercel.app',
            reload: {
              button: true,
            },
          })
          .title('プレビュー'),
      ])
    default:
      return S.document().views([S.view.form()])
  }
}