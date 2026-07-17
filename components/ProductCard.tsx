"use client";
import { Heart, ShoppingBag } from "lucide-react";
import { useMarketStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// Define the shape based on your backend data example
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  imageUrl?: string | null;
  discountPercentage?: number;
  store?: {
    name: string;
    isOfficial?: boolean;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  // Format price directly to Indonesian Rupiah style (e.g., Rp11.999.000)
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  // Automatic placeholder generator if imageUrl is missing or broken
  const displayImage = product.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80";


  const { cart, favorites, addToCart, toggleFavorite } = useMarketStore();
  
  const isFavorited = favorites.includes(product.id);
  const isInCart = cart.includes(product.id);

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col h-full group">
      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-gray-50 overflow-hidden">
        <Image
          src={displayImage}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Discount Badge */}
        {product.discountPercentage && product.discountPercentage > 0 && (
          <span className="absolute top-2.5 left-2.5 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
            {product.discountPercentage}% OFF
          </span>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-2">
        <div className="space-y-1">
          {/* Store Info Banner */}
          {product.store && (
            <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
              {product.store.isOfficial && (
                <span className="bg-shop-light-green text-white px-1 rounded text-[10px] font-bold uppercase tracking-wider">
                  Official
                </span>
              )}
              <span className="truncate">{product.store.name}</span>
            </div>
          )}

          {/* Product Name Title */}
          <Link href={`/products/${product.slug}`} className="block">
            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 hover:text-shop-light-green transition-colors">
              {product.name}
            </h3>
          </Link>
          
          {/* Full description display as requested */}
          <p className="text-xs text-gray-500 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>

      <div className="pt-2 border-t border-gray-100 flex items-center justify-between gap-2">
      <div className="flex items-center gap-1.5">
        
        {/* FAVORITE ACTION BUTTON */}
        <button 
          onClick={() => toggleFavorite(product.id)}
          className={`p-2 rounded-lg transition-colors group/btn ${isFavorited ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-500"}`}
        >
          <Heart className={`w-4 h-4 transition-transform group-hover/btn:scale-110 ${isFavorited ? "fill-red-500" : ""}`} />
        </button>

        {/* SHOPPING CART ACTION BUTTON */}
        <button 
          onClick={() => addToCart(product.id)}
          className={`p-2 rounded-lg transition-colors group/btn ${isInCart ? "bg-emerald-50 text-emerald-600" : "bg-gray-50 text-gray-600 hover:bg-emerald-50 hover:text-emerald-600"}`}
        >
          <ShoppingBag className="w-4 h-4 transition-transform group-hover/btn:scale-110" />
        </button>
        
      </div>
      </div>
        
        {/* Price Tag Details */}
        <div className="pt-2">
          <span className="text-base font-bold text-gray-900">{formattedPrice}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;