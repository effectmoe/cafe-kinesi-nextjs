export default {
  name: 'customImage',
  type: 'image',
  title: '画像',
  options: {
    hotspot: true
  },
  fields: [
    {
      name: 'alt',
      type: 'string',
      title: '代替テキスト',
      description: 'アクセシビリティのため必須です。画像の内容を簡潔に説明してください。',
      validation: (Rule: any) => Rule.required().error('代替テキストは必須です')
    },
    {
      name: 'caption',
      type: 'string',
      title: 'キャプション',
      description: '画像の下に表示される説明文（オプション）'
    }
  ],
  validation: (Rule: any) => Rule.required(),
  preview: {
    select: {
      imageUrl: 'asset.url',
      title: 'alt'
    }
  }
}