export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Google Analytics イベント送信
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Web Vitals 測定結果送信
export const reportWebVitals = ({ id, name, label, value }: any) => {
  // Google Analytics が利用可能な場合のみ送信
  if (GA_TRACKING_ID) {
    gtag('event', name, {
      event_category: label === 'web-vital' ? 'Web Vitals' : 'Next.js custom metric',
      event_label: id,
      value: Math.round(name === 'CLS' ? value * 1000 : value),
      non_interaction: true,
    });
  }

  // コンソールにも出力（開発環境）
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Web Vitals] ${name}: ${value}`);
  }
};

// ページビューイベント送信
export const pageview = (url: string) => {
  gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};