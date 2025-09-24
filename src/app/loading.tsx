export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        {/* メインローダー */}
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 h-16 w-16 rounded-full border-4 border-green-600 border-t-transparent animate-spin"></div>
        </div>

        {/* ローディングテキスト */}
        <div className="text-center">
          <p className="text-gray-900 font-medium">読み込み中</p>
          <p className="text-gray-500 text-sm mt-1">しばらくお待ちください</p>
        </div>

        {/* プログレスインジケーター */}
        <div className="flex space-x-1">
          <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="h-2 w-2 bg-green-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}