'use client';

import React from 'react';
import Link from 'next/link'; // ✅ Next.js Link

interface BlogCardProps {
  image: string;
  title: string;
  excerpt: string;
  date: string;
  slug?: string | { current: string };
  className?: string;
}

const BlogCard = ({ image, title, excerpt, date, slug, className }: BlogCardProps) => {
  // Sanitize image URL - prevent invalid paths
  const sanitizedImage = React.useMemo(() => {
    if (!image) return '/placeholder.svg';

    // If it's a relative path that's not placeholder, block it
    if (image.startsWith('/') && !image.startsWith('/placeholder')) {
      return '/placeholder.svg';
    }

    // If it doesn't start with http or /placeholder, block it
    if (!image.startsWith('http') && !image.startsWith('/placeholder')) {
      return '/placeholder.svg';
    }

    return image;
  }, [image]);
  const content = (
    <article className={`group cursor-pointer ${className}`}>
      <div className="aspect-[4/3] overflow-hidden mb-4">
        <img
          src={sanitizedImage}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/placeholder.svg';
            target.onerror = null;
          }}
        />
      </div>
      <div className="space-y-3">
        <h3 className="font-noto-serif text-lg font-medium text-[hsl(var(--text-primary))] leading-relaxed group-hover:text-[hsl(var(--primary))] transition-colors">
          {title}
        </h3>
        <p className="text-sm text-[hsl(var(--text-secondary))] leading-relaxed line-clamp-3">
          {excerpt}
        </p>
        <time className="text-xs text-[hsl(var(--text-muted))] font-light tracking-wider uppercase">
          {date}
        </time>
      </div>
    </article>
  );

  // Next.js Link の正しい使用方法
  if (slug) {
    const slugStr = typeof slug === 'string' ? slug : slug.current;
    return (
      <Link href={`/blog/${slugStr}`} className="block">
        {content}
      </Link>
    );
  }

  return content;
};

export default BlogCard;