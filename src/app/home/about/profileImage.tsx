"use client";
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { BACKGROUND_IMAGES } from '../constant';

export const ProfileImage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % BACKGROUND_IMAGES.length);
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(intervalId);
  }, []); // Run effect only once on mount

  return (
    <div className="relative w-full h-56 md:h-72 overflow-hidden bg-gray-800" aria-label="Profile banner with changing background images" role="img">
      {BACKGROUND_IMAGES.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Background scenery"
          fill
          className={`absolute top-0 left-0 w-full h-full object-cover transition-all duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
          }`}
          style={{ transition: 'opacity 1s ease-in-out, transform 5s linear' }}
          priority={index === 0}
        />
      ))}
      {/* Darkening overlay for better contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>
    </div>
  );
};