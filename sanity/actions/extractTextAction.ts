import { DocumentActionComponent } from 'sanity'
import { DocumentTextIcon } from '@sanity/icons'

export const extractTextAction: DocumentActionComponent = (props) => {
  const { draft, published, type, id } = props

  // Only show this action for knowledgeBase documents
  if (type !== 'knowledgeBase') {
    return null
  }

  const doc = draft || published

  return {
    label: 'テキストを抽出',
    icon: DocumentTextIcon,
    disabled: !doc?.file,
    tone: 'primary',
    onHandle: async () => {
      if (!doc?.file) {
        alert('ファイルがアップロードされていません')
        return
      }

      try {
        // Get the file URL from Sanity
        const fileAsset = doc.file.asset
        if (!fileAsset || !fileAsset._ref) {
          alert('ファイルアセットが見つかりません')
          return
        }

        // Extract file details
        const assetId = fileAsset._ref.replace('file-', '').replace('-txt', '.txt').replace('-md', '.md').replace('-pdf', '.pdf')
        const fileUrl = `https://cdn.sanity.io/files/${props.client.config().projectId}/${props.client.config().dataset}/${assetId}`

        // Fetch file content
        const response = await fetch(fileUrl)
        if (!response.ok) {
          throw new Error('ファイルの取得に失敗しました')
        }

        let extractedText = ''
        const contentType = response.headers.get('content-type') || ''

        if (contentType.includes('text') || assetId.endsWith('.txt') || assetId.endsWith('.md')) {
          // Text file
          extractedText = await response.text()
        } else if (contentType.includes('pdf') || assetId.endsWith('.pdf')) {
          // PDF file - for now, show a message
          alert('PDF からのテキスト抽出は現在サポートされていません。.txt または .md ファイルをご使用ください。')
          return
        } else {
          alert('サポートされていないファイル形式です')
          return
        }

        // Get file size
        const fileSize = extractedText.length

        // Determine file type
        let fileType = 'text'
        if (assetId.endsWith('.md')) {
          fileType = 'markdown'
        } else if (assetId.endsWith('.pdf')) {
          fileType = 'pdf'
        }

        // Update the document with extracted text
        await props.client
          .patch(id)
          .set({
            extractedText,
            fileType,
            fileSize,
            lastProcessed: new Date().toISOString()
          })
          .commit()

        alert('テキストの抽出が完了しました')

        // Refresh the document
        props.onComplete()
      } catch (error) {
        console.error('Text extraction error:', error)
        alert(`エラーが発生しました: ${error instanceof Error ? error.message : '不明なエラー'}`)
      }
    }
  }
}
