export default {
  name: 'codeBlock',
  type: 'object',
  title: 'コードブロック',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'タイトル',
      description: 'コードブロックの説明（オプション）'
    },
    {
      name: 'language',
      type: 'string',
      title: 'プログラミング言語',
      options: {
        list: [
          { title: 'JavaScript', value: 'javascript' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'HTML', value: 'html' },
          { title: 'CSS', value: 'css' },
          { title: 'Python', value: 'python' },
          { title: 'Java', value: 'java' },
          { title: 'C#', value: 'csharp' },
          { title: 'PHP', value: 'php' },
          { title: 'Ruby', value: 'ruby' },
          { title: 'Go', value: 'go' },
          { title: 'Rust', value: 'rust' },
          { title: 'SQL', value: 'sql' },
          { title: 'JSON', value: 'json' },
          { title: 'YAML', value: 'yaml' },
          { title: 'Markdown', value: 'markdown' },
          { title: 'Bash', value: 'bash' },
          { title: 'その他', value: 'text' }
        ]
      },
      initialValue: 'javascript'
    },
    {
      name: 'code',
      type: 'text',
      title: 'コード',
      rows: 10,
      validation: (Rule: any) => Rule.required()
    },
    {
      name: 'filename',
      type: 'string',
      title: 'ファイル名',
      description: 'ファイル名を表示する場合（オプション）'
    },
    {
      name: 'showLineNumbers',
      type: 'boolean',
      title: '行番号を表示',
      initialValue: true
    },
    {
      name: 'highlightLines',
      type: 'array',
      title: 'ハイライト行',
      description: 'ハイライトしたい行番号（例: 1,3,5-8）',
      of: [{ type: 'number' }]
    }
  ],
  preview: {
    select: {
      title: 'title',
      language: 'language',
      code: 'code'
    },
    prepare(selection: any) {
      const { title, language, code } = selection;
      const codePreview = code ? code.substring(0, 50) + '...' : '';
      return {
        title: title || `${language} コード`,
        subtitle: codePreview
      };
    }
  }
}