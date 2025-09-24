import { DefaultDocumentNodeResolver } from 'sanity/structure'

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