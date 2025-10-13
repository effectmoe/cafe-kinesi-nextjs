export default {
  name: 'course',
  title: '講座',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: '講座名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: [
          {title: 'ピーチタッチ', value: 'peach-touch'},
          {title: 'チャクラキネシ', value: 'chakra-kinesi'},
          {title: 'ハッピーオーラ', value: 'happy-aura'},
        ],
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'description',
      title: '講座説明',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
        },
      ],
    },
    {
      name: 'instructor',
      title: '講師',
      type: 'reference',
      to: [{type: 'instructor'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'duration',
      title: '所要時間（分）',
      type: 'number',
      initialValue: 120,
      validation: (Rule: any) => Rule.required().min(15),
    },
    {
      name: 'price',
      title: '料金',
      type: 'number',
      validation: (Rule: any) => Rule.required().min(0),
    },
    {
      name: 'capacity',
      title: '定員',
      type: 'number',
      initialValue: 8,
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'color',
      title: 'カレンダー表示色',
      type: 'string',
      description: 'カレンダーで表示する色（例: #FF6B6B）',
      initialValue: '#FF6B6B',
    },
    {
      name: 'image',
      title: '講座画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'location',
      title: '開催場所',
      type: 'string',
      initialValue: 'Cafe Kinesi 本店',
    },
    {
      name: 'isActive',
      title: '公開状態',
      type: 'boolean',
      initialValue: true,
      description: '非公開にすると予約画面に表示されなくなります',
    },
    // 将来のGoogle連携用フィールド
    {
      name: 'googleCalendarId',
      title: 'Google Calendar ID',
      type: 'string',
      description: '将来のGoogle Calendar連携用（現在は空でOK）',
      hidden: true,
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'image',
    },
  },
  orderings: [
    {
      title: '講座名（昇順）',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
}
