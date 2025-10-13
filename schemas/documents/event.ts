export default {
  name: 'event',
  title: 'イベント',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'イベント名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'titleEn',
      title: 'イベント名（英語）',
      type: 'string',
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
      name: 'description',
      title: '説明',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'descriptionEn',
      title: '説明（英語）',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: {
            hotspot: true,
          },
        },
      ],
    },
    {
      name: 'startDate',
      title: '開始日時',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endDate',
      title: '終了日時',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'location',
      title: '開催場所',
      type: 'string',
    },
    {
      name: 'image',
      title: 'イベント画像',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'registrationUrl',
      title: '申込みURL',
      type: 'url',
    },
    {
      name: 'capacity',
      title: '定員',
      type: 'number',
    },
    {
      name: 'fee',
      title: '参加費',
      type: 'number',
    },
    {
      name: 'status',
      title: 'ステータス',
      type: 'string',
      options: {
        list: [
          {title: '受付中', value: 'open'},
          {title: '満席', value: 'full'},
          {title: '終了', value: 'closed'},
          {title: 'キャンセル', value: 'cancelled'},
        ],
      },
      initialValue: 'open',
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'startDate',
      media: 'image',
    },
  },
  orderings: [
    {
      title: '開始日（近い順）',
      name: 'startDateAsc',
      by: [
        {field: 'startDate', direction: 'asc'}
      ]
    }
  ],
}