'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

interface ImageSlideshowProps {
  images: string[];
  interval?: number;
}

export const ImageSlideshow: React.FC<ImageSlideshowProps> = ({ images, interval = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images.length, interval]);

  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-lg shadow-lg bg-gray-800" style={{ height: '100%', width: '100%' }} aria-label="Social life gallery slideshow">
        {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          loading="eager"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          alt={`Social life gallery image ${index + 1}`}
          fill={true}
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={index !== currentIndex}
          priority={index === 0}
        />
      ))}
      <div className="absolute inset-0 bg-black/20 pointer-events-none"></div>
    </div>
  );
};

export default ImageSlideshow;
