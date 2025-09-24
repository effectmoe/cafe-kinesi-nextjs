const SocialLinks = () => {
  // スクリーンショットに基づいた縦書きのサイドバーメニュー
  const verticalMenuItems = [
    "FACEBOOK",
    "INSTAGRAM",
    "TWITTER",
    "YOUTUBE",
    "BANDCAMP",
    "CONTACT"
  ];

  return (
    <>
      {/* 縦書き日本語サイドバー（スクリーンショット通り） */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-10 hidden lg:block">
        <div className="writing-mode-vertical-rl text-orientation-mixed">
          <div className="flex flex-col-reverse gap-8 text-sm font-light text-gray-700">
            {verticalMenuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-gray-900 transition-colors cursor-pointer"
                style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile用ホリゾンタルメニュー */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-200">
        <div className="max-w-screen-2xl mx-auto px-6 py-4">
          <div className="flex justify-center gap-6 flex-wrap">
            {verticalMenuItems.map((item) => (
              <a
                key={item}
                href="#"
                className="text-xs font-medium tracking-wide uppercase text-gray-600 hover:opacity-70 transition-opacity"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SocialLinks;