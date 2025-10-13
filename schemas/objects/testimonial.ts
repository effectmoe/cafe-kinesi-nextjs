export default {
  name: 'testimonial',
  type: 'object',
  title: 'お客様の声',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'セクションタイトル',
      initialValue: 'お客様の声'
    },
    {
      name: 'subtitle',
      type: 'string',
      title: 'サブタイトル'
    },
    {
      name: 'testimonials',
      type: 'array',
      title: 'お客様の声一覧',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'quote',
              type: 'text',
              title: 'お客様の声',
              rows: 4,
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'author',
              type: 'string',
              title: 'お客様名',
              validation: (Rule: any) => Rule.required()
            },
            {
              name: 'position',
              type: 'string',
              title: '肩書き・職業'
            },
            {
              name: 'company',
              type: 'string',
              title: '会社名・所属'
            },
            {
              name: 'avatar',
              type: 'customImage',
              title: 'プロフィール画像'
            },
            {
              name: 'rating',
              type: 'number',
              title: '評価（星の数）',
              description: '1-5の範囲で設定',
              validation: (Rule: any) => Rule.min(1).max(5).integer(),
              initialValue: 5
            },
            {
              name: 'featured',
              type: 'boolean',
              title: '注目の声',
              description: 'チェックすると目立つ表示になります',
              initialValue: false
            }
          ],
          preview: {
            select: {
              title: 'author',
              subtitle: 'position',
              media: 'avatar'
            },
            prepare(selection: any) {
              const { title, subtitle } = selection;
              return {
                title: title,
                subtitle: subtitle || '顧客'
              };
            }
          }
        }
      ]
    },
    {
      name: 'layout',
      type: 'string',
      title: 'レイアウト',
      options: {
        list: [
          { title: 'スライダー', value: 'slider' },
          { title: 'グリッド（3列）', value: 'grid-3' },
          { title: 'グリッド（2列）', value: 'grid-2' },
          { title: '縦一列', value: 'vertical' }
        ]
      },
      initialValue: 'slider'
    },
    {
      name: 'showRating',
      type: 'boolean',
      title: '星評価を表示',
      initialValue: true
    },
    {
      name: 'backgroundColor',
      type: 'string',
      title: '背景色',
      options: {
        list: [
          { title: '白', value: 'white' },
          { title: 'グレー', value: 'gray' },
          { title: 'プライマリー', value: 'primary' },
          { title: '透明', value: 'transparent' }
        ]
      },
      initialValue: 'gray'
    }
  ],
  preview: {
    select: {
      title: 'title',
      testimonials: 'testimonials'
    },
    prepare(selection: any) {
      const { title, testimonials } = selection;
      const count = testimonials ? testimonials.length : 0;
      return {
        title: title || 'お客様の声',
        subtitle: `${count}件の声`
      };
    }
  }
}