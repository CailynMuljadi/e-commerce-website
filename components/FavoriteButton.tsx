"use client"; // Required for Zustand state updates
import { Heart } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useMarketStore } from '@/lib/store';

const FavoriteButton = () => {
  // Read the favorites array from global store
  const favorites = useMarketStore((state) => state.favorites);

  return (
     <Link href={"/favorites"} className="group relative">
      <Heart className={`w-5 h-5 hover:text-shop-light-green hoverEffect ${favorites.length > 0 ? "fill-red-500 text-red-500" : ""}`}/>
      
      {/* Dynamic Badge Counter */}
      {favorites.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-shop-btn-dark-green text-white h-3.5 w-3.5 rounded-full text-[10px] font-semibold flex items-center justify-center animate-scaleIn">
          {favorites.length}
        </span>
      )}
    </Link>
  );
};

export default FavoriteButton;