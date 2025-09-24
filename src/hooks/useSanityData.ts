'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanity';

export const useSanityData = (query: string, key: string, params?: Record<string, any>) => {
  return useQuery({
    queryKey: [key, params],
    queryFn: async () => {
      const data = await client.fetch(query, params || {});
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5分
  });
};