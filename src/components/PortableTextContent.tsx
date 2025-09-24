'use client';

import { PortableText, PortableTextComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';

// カスタムコンポーネントの定義
const components: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      if (!value?.asset?._ref) {
        return null;
      }

      try {
        const imageUrl = urlFor(value).width(800).height(400).url();
        return (
          <div className="my-8">
            <Image
              src={imageUrl}
              alt={value.alt || ' '}
              width={800}
              height={400}
              className="w-full rounded-lg"
            />
            {value.caption && (
              <p className="text-center text-gray-600 text-sm mt-2">
                {value.caption}
              </p>
            )}
          </div>
        );
      } catch (error) {
        console.error('Error rendering image:', error);
        return null;
      }
    },
  },

  block: {
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-800">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-800">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-lg font-semibold mt-3 mb-2 text-gray-700">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="mb-4 text-gray-700 leading-relaxed">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 my-4 italic text-gray-600">
        {children}
      </blockquote>
    ),
  },

  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => (
      <em className="italic">{children}</em>
    ),
    code: ({ children }) => (
      <code className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ value, children }) => {
      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      );
    },
  },

  list: {
    bullet: ({ children }) => (
      <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal pl-5 mb-4 space-y-1">{children}</ol>
    ),
  },

  listItem: {
    bullet: ({ children }) => (
      <li className="text-gray-700">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-gray-700">{children}</li>
    ),
  },
};

interface PortableTextContentProps {
  value: any;
  className?: string;
}

const PortableTextContent = ({ value, className = '' }: PortableTextContentProps) => {
  if (!value) {
    return (
      <div className="text-gray-500 italic">
        本文コンテンツがありません
      </div>
    );
  }

  try {
    return (
      <div className={`prose prose-lg max-w-none ${className}`}>
        <PortableText value={value} components={components} />
      </div>
    );
  } catch (error) {
    console.error('PortableText rendering error:', error);
    return (
      <div className="text-red-500">
        コンテンツの表示中にエラーが発生しました
      </div>
    );
  }
};

export default PortableTextContent;