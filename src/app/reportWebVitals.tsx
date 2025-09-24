'use client';

import { useEffect } from 'react';
import { onCLS, onFCP, onFID, onLCP, onTTFB, onINP } from 'web-vitals';
import { reportWebVitals as sendToAnalytics } from '@/lib/gtag';

export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onFCP((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'FCP',
        label: 'web-vital',
        value: metric.value,
      });
    });

    onLCP((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'LCP',
        label: 'web-vital',
        value: metric.value,
      });
    });

    onCLS((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'CLS',
        label: 'web-vital',
        value: metric.value,
      });
    });

    onFID((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'FID',
        label: 'web-vital',
        value: metric.value,
      });
    });

    onTTFB((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'TTFB',
        label: 'web-vital',
        value: metric.value,
      });
    });

    onINP((metric) => {
      sendToAnalytics({
        id: metric.id,
        name: 'INP',
        label: 'web-vital',
        value: metric.value,
      });
    });
  }, []);

  return null;
}