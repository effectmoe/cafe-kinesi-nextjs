'use client';

import { useQuery } from '@tanstack/react-query';
import { client } from '@/lib/sanity';

export const useSanityData = (query: string, key: string) => {
  return useQuery({
    queryKey: [key],
    queryFn: async () => {
      const data = await client.fetch(query);
      return data;
    },
    staleTime: 5 * 60 * 1000, // 5分
  });
};