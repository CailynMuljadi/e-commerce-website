// app/products/[slug]/page.tsx
"use client";

import React, { use, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, ShoppingBag, Heart, Award, Sparkles } from "lucide-react";
import { fetchFromAPI } from "@/lib/api";
import Container from "@/components/Container";
import { useMarketStore } from "@/lib/store";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export default function ProductDetailPage({ params }: DetailPageProps) {
  const { slug } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
    <Container className="py-8 space-y-6">
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Left Side: Product Image Display */}
        <div className="relative aspect-square w-full bg-gray-50 border rounded-2xl overflow-hidden shadow-sm">
          <Image src={product.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500"} alt={product.name} fill className="object-contain p-6" unoptimized />
          
          {/* ✅ DISCOUNT PERCENTAGE */}
          {product.discountPercentage > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm animate-pulse">
              {product.discountPercentage}% OFF Promo
            </span>
          )}
        </div>

        {/* Right Side: Information Block */}
        <div className="space-y-6">
          <div className="space-y-2">
            {/* ✅ DYNAMIC FEATURED, NEW ARRIVAL, & CONDITION TAGS */}
            <div className="flex flex-wrap items-center gap-2 text-[11px]">
              {product.isFeatured && (
                <span className="bg-amber-500 text-white px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                  <Award className="w-3 h-3" /> Featured Pick
                </span>
              )}
              {product.isNewArrival && (
                <span className="bg-blue-600 text-white px-2 py-0.5 rounded flex items-center gap-1 font-bold">
                  <Sparkles className="w-3 h-3" /> New Arrival
                </span>
              )}
              {product.condition && (
                <span className={`px-2 py-0.5 rounded font-bold uppercase tracking-wider ${
                  product.condition === 'New' ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'
                }`}>
                  Condition: {product.condition}
                </span>
              )}
            </div>
            
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">{product.name}</h1>
          </div>

          {/* ✅ RATING SUMMARY & STOCK METRICS */}
          <div className="flex items-center gap-4 border-y py-3 text-sm">
            {product.rating ? (
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                <span>{product.rating.toFixed(1)} / 5.0</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
            ) : (
              <span className="text-gray-400 text-xs">No ratings yet</span>
            )}
            <span className="text-gray-300">|</span>
            <p className="text-gray-600 font-medium">
              Stock Level:{" "}
              <span className={product.stock > 0 ? "text-gray-900 font-bold" : "text-red-500 font-bold"}>
                {product.stock > 0 ? `${product.stock} units left` : "Out of Stock"}
              </span>
            </p>
          </div>

          <span className="text-2xl md:text-4xl font-extrabold text-emerald-600 block">{formattedPrice}</span>

          {/* ✅ STORE DATA ROUTE INTERACTION BOX LINK */}
          {product.store && (
            <Link 
              href={`/store/${product.store.slug || product.store.id}`}
              className="border p-4 rounded-xl bg-gray-50/50 flex items-center justify-between gap-4 group hover:border-emerald-500 hover:bg-emerald-50/10 transition-all block"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  {product.store.isOfficial && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                  )}
                  <h4 className="font-bold text-sm text-gray-900 group-hover:text-emerald-600 transition-colors">
                    {product.store.name} ↗
                  </h4>
                </div>
                <p className="text-xs text-gray-500">Merchant branch located in {product.store.city || "Indonesia"}</p>
              </div>
              {product.store.rating && (
                <div className="text-right text-xs bg-white border px-3 py-1.5 rounded-lg shadow-2xs font-bold text-amber-600 flex items-center gap-1">
                  ⭐ {product.store.rating.toFixed(1)}
                </div>
              )}
            </Link>
          )}

          {/* Interactive Actions */}
          <div className="flex gap-4 pt-2">
            <button 
              onClick={() => addToCart(product.id)}
              disabled={product.stock <= 0}
              className={`flex-1 font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2 ${
                product.stock <= 0 ? "bg-gray-200 text-gray-400 cursor-not-allowed" :
                isInCart ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-emerald-600 hover:bg-emerald-700 text-white"
              }`}
            >
              <ShoppingBag className="w-4 h-4" /> 
              {product.stock <= 0 ? "Sold Out" : isInCart ? "Added to Cart" : "Add to Cart Basket"}
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