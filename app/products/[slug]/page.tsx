// app/products/[slug]/page.tsx
"use client"; // 💡 Add this at the absolute top of the file to enable interactive click actions

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, ShoppingBag, Heart } from "lucide-react";
import { fetchFromAPI } from "@/lib/api";
import Container from "@/components/Container";
import { useMarketStore } from "@/lib/store"; // 1. Import the global marketplace tracking store

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: DetailPageProps) {
  const { slug } = use(params); // Safely unpack the param values
  
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // 2. Fetch global actions and check active matching states
  const { cart, favorites, addToCart, toggleFavorite } = useMarketStore();

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await fetchFromAPI("/products");
        const productsList = response.data || response;
        const foundProduct = productsList.find((p: any) => p.slug === slug);
        setProduct(foundProduct);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [slug]);

  if (loading) return <Container className="py-20 text-center text-gray-400">Loading details...</Container>;
  if (!product) return <Container className="py-20 text-center font-semibold text-gray-500">Product not found.</Container>;

  const isInCart = cart.includes(product.id);
  const isFavorited = favorites.includes(product.id);
  const formattedPrice = new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(product.price);

  return (
    <Container className="py-8 space-y-8">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        <div className="relative aspect-square w-full bg-gray-50 border rounded-2xl overflow-hidden shadow-sm">
          <Image src={product.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"} alt={product.name} fill className="object-contain p-6" unoptimized />
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          </div>

          <span className="text-2xl md:text-4xl font-extrabold text-emerald-600 block">{formattedPrice}</span>

          {/* ✅ FIXED BUTTONS TRAY WITH DYNAMIC STATE AND CLICK INTERACTION CONTROLS */}
          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => addToCart(product.id)}
              className={`flex-1 font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2 ${
                isInCart ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> 
              {isInCart ? "Added to Cart" : "Add to Cart Basket"}
            </button>
            
            <button 
              onClick={() => toggleFavorite(product.id)}
              className={`p-3.5 border rounded-xl transition-colors shadow-2xs ${
                isFavorited ? "bg-red-50 text-red-500 border-red-200" : "border-gray-200 text-gray-500 hover:bg-red-50 hover:text-red-500"
              }`}
            >
              <Heart className={`w-5 h-5 ${isFavorited ? "fill-red-500" : ""}`} />
            </button>
          </div>

          <div className="space-y-2 border-t pt-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Product Information</h3>
            <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}