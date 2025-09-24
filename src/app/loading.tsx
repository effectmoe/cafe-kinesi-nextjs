export default function Loading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-4 border-gray-200"></div>
          <div className="absolute top-0 h-12 w-12 rounded-full border-4 border-[hsl(var(--text-primary))] border-t-transparent animate-spin"></div>
        </div>
        <p className="mt-4 text-[hsl(var(--text-secondary))] text-sm">
          読み込み中...
        </p>
      </div>
    </div>
  );
}