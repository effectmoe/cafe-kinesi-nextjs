export default {
  name: 'booking',
  title: '予約',
  type: 'document',
  fields: [
    {
      name: 'bookingNumber',
      title: '予約番号',
      type: 'string',
      readOnly: true,
      description: '自動生成されます',
    },
    {
      name: 'course',
      title: '講座',
      type: 'reference',
      to: [{type: 'course'}],
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'startTime',
      title: '開始日時',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'endTime',
      title: '終了日時',
      type: 'datetime',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'customerName',
      title: 'お客様名',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'customerEmail',
      title: 'メールアドレス',
      type: 'string',
      validation: (Rule: any) => Rule.required().email(),
    },
    {
      name: 'customerPhone',
      title: '電話番号',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'participants',
      title: '参加人数',
      type: 'number',
      initialValue: 1,
      validation: (Rule: any) => Rule.required().min(1),
    },
    {
      name: 'status',
      title: 'ステータス',
      type: 'string',
      options: {
        list: [
          {title: '予約確定', value: 'confirmed'},
          {title: '仮予約', value: 'pending'},
          {title: 'キャンセル待ち', value: 'waitlist'},
          {title: 'キャンセル', value: 'cancelled'},
          {title: '完了', value: 'completed'},
        ],
      },
      initialValue: 'confirmed',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'totalPrice',
      title: '合計金額',
      type: 'number',
    },
    {
      name: 'paymentStatus',
      title: '支払いステータス',
      type: 'string',
      options: {
        list: [
          {title: '未払い', value: 'unpaid'},
          {title: '支払い済み', value: 'paid'},
          {title: '返金済み', value: 'refunded'},
        ],
      },
      initialValue: 'unpaid',
    },
    {
      name: 'notes',
      title: '備考・質問',
      type: 'text',
      rows: 3,
    },
    {
      name: 'staffNotes',
      title: 'スタッフメモ',
      type: 'text',
      rows: 3,
      description: 'お客様には表示されません',
    },
    {
      name: 'createdAt',
      title: '予約日時',
      type: 'datetime',
      readOnly: true,
    },
    {
      name: 'updatedAt',
      title: '更新日時',
      type: 'datetime',
      readOnly: true,
    },
    // 将来のGoogle Calendar連携用フィールド
    {
      name: 'googleEventId',
      title: 'Google Event ID',
      type: 'string',
      description: '将来のGoogle Calendar連携用（現在は空でOK）',
      hidden: true,
    },
    {
      name: 'syncStatus',
      title: '同期ステータス',
      type: 'string',
      options: {
        list: [
          {title: '同期なし', value: 'none'},
          {title: '同期済み', value: 'synced'},
          {title: '同期待ち', value: 'pending'},
          {title: 'エラー', value: 'error'},
        ],
      },
      initialValue: 'none',
      hidden: true,
    },
  ],
  preview: {
    select: {
      customerName: 'customerName',
      courseName: 'course.title',
      startTime: 'startTime',
      status: 'status',
    },
    prepare(selection: any) {
      const {customerName, courseName, startTime, status} = selection
      const date = startTime ? new Date(startTime).toLocaleDateString('ja-JP') : ''

      return {
        title: `${customerName} - ${courseName}`,
        subtitle: `${date} | ${status}`,
      }
    },
  },
  orderings: [
    {
      title: '開始日時（近い順）',
      name: 'startTimeAsc',
      by: [{field: 'startTime', direction: 'asc'}],
    },
    {
      title: '予約日時（新しい順）',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
  ],
}
