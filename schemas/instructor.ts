export default {
  name: 'instructor',
  title: '講師',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: '講師名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'bio',
      title: 'プロフィール',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'image',
      title: 'プロフィール画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'specialties',
      title: '専門分野',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'ピーチタッチ', value: 'peach-touch'},
          {title: 'チャクラキネシ', value: 'chakra-kinesi'},
          {title: 'ハッピーオーラ', value: 'happy-aura'},
        ],
      },
    },
    {
      name: 'email',
      title: 'メールアドレス',
      type: 'string',
    },
    {
      name: 'phone',
      title: '電話番号',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'specialties',
      media: 'image',
    },
  },
}
