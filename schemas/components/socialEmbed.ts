export default {
  name: 'socialEmbed',
  type: 'object',
  title: 'SNS埋め込み',
  fields: [
    {
      name: 'platform',
      type: 'string',
      title: 'プラットフォーム',
      options: {
        list: [
          { title: 'Twitter', value: 'twitter' },
          { title: 'Instagram', value: 'instagram' },
          { title: 'Facebook', value: 'facebook' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'TikTok', value: 'tiktok' },
          { title: 'LinkedIn', value: 'linkedin' }
        ]
      },
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'url',
      type: 'url',
      title: 'URL',
      description: '投稿またはプロフィールのURL',
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'embedCode',
      type: 'text',
      title: '埋め込みコード',
      description: 'プラットフォームから提供される埋め込みコード（オプション）',
      rows: 5
    },
    {
      name: 'caption',
      type: 'string',
      title: 'キャプション',
      description: '埋め込みの説明文（オプション）'
    }
  ],
  preview: {
    select: {
      title: 'platform',
      subtitle: 'caption',
      url: 'url'
    },
    prepare(selection: any) {
      const { title, subtitle, url } = selection;
      return {
        title: `${title} 埋め込み`,
        subtitle: subtitle || url
      };
    }
  }
}