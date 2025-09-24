'use client';

import { useEffect } from 'react';
import { errorLogger } from '@/lib/error-logger';

export function ErrorLoggerInit() {
  useEffect(() => {
    // エラーロガーを初期化
    errorLogger.logInfo('Error logger initialized');
  }, []);

  return null;
}