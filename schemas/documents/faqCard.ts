import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'faqCard',
  title: 'FAQ質問カード',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      description: '質問カードに表示されるタイトル（例: 営業時間を教えて）',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'icon',
      title: 'アイコン',
      type: 'string',
      description: 'Lucide Reactアイコン名',
      options: {
        list: [
          {title: '⏰ 時計 (Clock)', value: 'Clock'},
          {title: '🧭 ナビゲーション (Navigation)', value: 'Navigation'},
          {title: '☕ コーヒー (Coffee)', value: 'Coffee'},
          {title: '📅 カレンダー (CalendarCheck)', value: 'CalendarCheck'},
          {title: '📍 マップピン (MapPin)', value: 'MapPin'},
          {title: '📞 電話 (Phone)', value: 'Phone'},
          {title: '✉️ メール (Mail)', value: 'Mail'},
          {title: 'ℹ️ 情報 (Info)', value: 'Info'},
          {title: '❓ ヘルプ (HelpCircle)', value: 'HelpCircle'},
          {title: '🏠 ホーム (Home)', value: 'Home'}
        ]
      },
      initialValue: 'Clock',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'bgColor',
      title: '背景色',
      type: 'string',
      description: 'Tailwindクラス（例: bg-[hsl(35,22%,91%)]）',
      options: {
        list: [
          {title: '🟤 ベージュ', value: 'bg-[hsl(35,22%,91%)]'},
          {title: '🔵 ブルー', value: 'bg-[hsl(210,20%,88%)]'},
          {title: '🟣 パープル', value: 'bg-[hsl(260,15%,88%)]'},
          {title: '⚪ グレー', value: 'bg-[hsl(0,0%,91%)]'},
          {title: '🟢 グリーン', value: 'bg-[hsl(120,15%,88%)]'},
          {title: '🟡 イエロー', value: 'bg-[hsl(45,25%,88%)]'}
        ]
      },
      initialValue: 'bg-[hsl(35,22%,91%)]',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'iconColor',
      title: 'アイコン色',
      type: 'string',
      description: 'Tailwindクラス（例: text-[hsl(35,45%,45%)]）',
      options: {
        list: [
          {title: '🟤 ブラウン（デフォルト）', value: 'text-[hsl(35,45%,45%)]'},
          {title: '🔵 ブルー', value: 'text-[hsl(210,50%,45%)]'},
          {title: '🟣 パープル', value: 'text-[hsl(260,45%,45%)]'},
          {title: '⚫ グレー', value: 'text-[hsl(0,0%,45%)]'},
          {title: '🟢 グリーン', value: 'text-[hsl(120,45%,45%)]'},
          {title: '🟠 オレンジ', value: 'text-[hsl(30,60%,45%)]'}
        ]
      },
      initialValue: 'text-[hsl(35,45%,45%)]',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: '表示順',
      type: 'number',
      description: '小さい数字ほど先に表示されます',
      initialValue: 0,
      validation: Rule => Rule.required().min(0)
    }),
    defineField({
      name: 'isActive',
      title: '有効',
      type: 'boolean',
      description: 'このカードを表示するかどうか',
      initialValue: true
    })
  ],
  orderings: [
    {
      title: '表示順',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}]
    }
  ],
  preview: {
    select: {
      title: 'title',
      icon: 'icon',
      order: 'order',
      isActive: 'isActive'
    },
    prepare({title, icon, order, isActive}) {
      return {
        title: `${order}. ${title}`,
        subtitle: `アイコン: ${icon} ${isActive ? '✅' : '❌'}`,
      }
    }
  }
})
