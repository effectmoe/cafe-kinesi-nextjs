import { enableOverlays, HistoryAdapter } from '@sanity/overlays';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function VisualEditing() {
  const router = useRouter();

  useEffect(() => {
    const disable = enableOverlays({
      history: {
        subscribe: (navigate) => {
          const handler = (event: PopStateEvent) => {
            navigate({
              type: 'push',
              url: event.state?.url || window.location.pathname,
            });
          };
          window.addEventListener('popstate', handler);
          return () => window.removeEventListener('popstate', handler);
        },
        update: (update) => {
          if (update.type === 'push' || update.type === 'replace') {
            const method = update.type === 'push' ? 'pushState' : 'replaceState';
            window.history[method]({ url: update.url }, '', update.url);
          } else if (update.type === 'pop') {
            window.history.back();
          }
        },
      } as HistoryAdapter,
    });

    return () => disable();
  }, [router]);

  return null;
}