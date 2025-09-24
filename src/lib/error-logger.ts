interface ErrorLog {
  message: string;
  stack?: string;
  digest?: string;
  timestamp: string;
  url: string;
  userAgent: string;
  severity: 'error' | 'warning' | 'info';
}

class ErrorLogger {
  private static instance: ErrorLogger;

  private constructor() {}

  static getInstance(): ErrorLogger {
    if (!ErrorLogger.instance) {
      ErrorLogger.instance = new ErrorLogger();
    }
    return ErrorLogger.instance;
  }

  logError(error: Error & { digest?: string }, severity: 'error' | 'warning' | 'info' = 'error') {
    const errorLog: ErrorLog = {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : '',
      severity,
    };

    // コンソールログ
    if (process.env.NODE_ENV === 'development') {
      console.error('Error logged:', errorLog);
    }

    // Google Analyticsにエラーを送信
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'exception', {
        description: error.message,
        fatal: severity === 'error',
        error_category: severity,
      });
    }

    // Vercel Analyticsにエラーを送信
    if (typeof window !== 'undefined' && window.vercelAnalytics) {
      window.vercelAnalytics.track('error', {
        message: error.message,
        severity,
        digest: error.digest,
      });
    }

    // 本番環境では外部エラー監視サービスに送信
    if (process.env.NODE_ENV === 'production') {
      this.sendToErrorService(errorLog);
    }
  }

  private async sendToErrorService(errorLog: ErrorLog) {
    // 将来的にSentryなどのエラー監視サービスと連携
    try {
      // Example: Send to error monitoring service
      // await fetch('/api/log-error', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorLog),
      // });
    } catch (err) {
      console.error('Failed to send error to monitoring service:', err);
    }
  }

  logWarning(message: string, details?: any) {
    this.logError(new Error(message), 'warning');
  }

  logInfo(message: string, details?: any) {
    if (process.env.NODE_ENV === 'development') {
      console.info(message, details);
    }
  }
}

export const errorLogger = ErrorLogger.getInstance();

// グローバルエラーハンドラー
if (typeof window !== 'undefined') {
  window.addEventListener('error', (event) => {
    errorLogger.logError(new Error(event.message));
  });

  window.addEventListener('unhandledrejection', (event) => {
    errorLogger.logError(new Error(event.reason));
  });
}

// 型定義の拡張
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    vercelAnalytics?: {
      track: (event: string, data: any) => void;
    };
  }
}