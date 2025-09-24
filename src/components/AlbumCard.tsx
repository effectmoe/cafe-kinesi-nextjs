import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface AlbumCardProps {
  image: string | StaticImageData;
  title: string;
  description: string;
  className?: string;
}

const AlbumCard = ({ image, title, description, className = '' }: AlbumCardProps) => {
  return (
    <div className={`group cursor-pointer ${className}`}>
      <div className="aspect-square overflow-hidden rounded-xl mb-6 bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={400}
          height={400}
          quality={85}
          placeholder="blur"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        />
      </div>

      <div className="space-y-3">
        <h3 className="font-noto-serif text-xl font-semibold text-cafe-brown group-hover:text-accent-gold transition-colors duration-300">
          {title}
        </h3>
        <p className="text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AlbumCard;