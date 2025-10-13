import {defineField, defineType} from 'sanity'
import {DocumentTextIcon} from '@sanity/icons'

export const knowledgeBase = defineType({
  name: 'knowledgeBase',
  title: 'ナレッジベース（AI学習用ドキュメント）',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: Rule => Rule.required(),
      description: '管理用のタイトル（ユーザーには表示されません）'
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      description: 'このドキュメントの内容の概要'
    }),
    defineField({
      name: 'file',
      title: 'ファイル',
      type: 'file',
      validation: Rule => Rule.required(),
      description: 'PDF、Markdown(.md)、またはテキストファイル(.txt)をアップロード',
      options: {
        accept: '.pdf,.md,.txt'
      }
    }),
    defineField({
      name: 'category',
      title: 'カテゴリー',
      type: 'string',
      options: {
        list: [
          {title: '📋 社内マニュアル', value: 'manual'},
          {title: '📚 技術ドキュメント', value: 'technical'},
          {title: '❓ FAQ下書き', value: 'faq'},
          {title: '📝 ポリシー・規約', value: 'policy'},
          {title: '🔧 トラブルシューティング', value: 'troubleshooting'},
          {title: '📊 レポート・分析', value: 'report'},
          {title: '💰 料金情報', value: 'pricing'},
          {title: '📍 店舗・アクセス情報', value: 'location'},
          {title: '👥 スタッフ情報', value: 'staff'},
          {title: '🎓 講座情報', value: 'course'},
          {title: '🏷️ その他', value: 'other'}
        ]
      },
      initialValue: 'other'
    }),
    defineField({
      name: 'tags',
      title: 'タグ',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        layout: 'tags'
      },
      description: '検索用のタグ（例: 料金, 予約, アクセス）'
    }),
    defineField({
      name: 'isActive',
      title: 'AI学習に使用',
      type: 'boolean',
      initialValue: true,
      description: 'オフにすると、AIがこのドキュメントを参照しなくなります'
    }),
    defineField({
      name: 'priority',
      title: '優先度',
      type: 'number',
      initialValue: 5,
      validation: Rule => Rule.min(1).max(10),
      description: '1（低）〜 10（高）。高いほどAIの回答に影響しやすくなります'
    }),
    defineField({
      name: 'extractedText',
      title: '抽出されたテキスト',
      type: 'text',
      readOnly: true,
      description: '自動生成：ファイルから抽出されたテキスト（編集不可）'
    }),
    defineField({
      name: 'fileType',
      title: 'ファイルタイプ',
      type: 'string',
      readOnly: true,
      description: '自動判定：pdf, markdown, text'
    }),
    defineField({
      name: 'fileSize',
      title: 'ファイルサイズ',
      type: 'number',
      readOnly: true,
      description: '自動記録：バイト単位'
    }),
    defineField({
      name: 'lastProcessed',
      title: '最終処理日時',
      type: 'datetime',
      readOnly: true,
      description: '自動記録：最後にエンベディングが生成された日時'
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      description: 'description',
      isActive: 'isActive'
    },
    prepare({title, subtitle, description, isActive}) {
      return {
        title: `${isActive ? '✅' : '⏸️'} ${title}`,
        subtitle: subtitle ? subtitle.replace(/[^a-z]/gi, '') : 'その他',
        description: description
      }
    }
  },
  orderings: [
    {
      title: '優先度が高い順',
      name: 'priorityDesc',
      by: [
        {field: 'priority', direction: 'desc'},
        {field: 'title', direction: 'asc'}
      ]
    },
    {
      title: '最終更新日時',
      name: 'lastProcessedDesc',
      by: [{field: 'lastProcessed', direction: 'desc'}]
    }
  ]
})
