import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Star, ShieldCheck, ShoppingBag, Heart } from "lucide-react";
import { fetchFromAPI } from "@/lib/api";
import Container from "@/components/Container";

interface DetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: DetailPageProps) {
  const { slug } = await params;
  
  let product: any = null;
  
  try {
    const response = await fetchFromAPI("/products");
    const productsList = response.data || response;
    
    // Find the single product matching this dynamic URL segment slug
    product = productsList.find((p: any) => p.slug === slug);
  } catch (error) {
    console.error("Error retrieving product details:", error);
  }

  // Handle 'Not Found' State beautifully
  if (!product) {
    return (
      <Container className="py-20 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-900">Product Not Found</h1>
        <p className="text-gray-500">The product you are looking for might have been removed or renamed.</p>
        <Link href="/shop" className="inline-block bg-emerald-600 text-white px-6 py-2 rounded-xl text-sm font-medium">
          Back to Catalog
        </Link>
      </Container>
    );
  }

  // Format currency directly to Indonesian Rupiah style (e.g., Rp11.999.000)
  const formattedPrice = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(product.price);

  const displayImage = product.imageUrl || "https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=500&q=80";

  return (
    <Container className="py-8 space-y-8">
      {/* Back Button Link */}
      <Link href="/shop" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Catalog
      </Link>

      {/* Main Grid View */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-start">
        
        {/* Left Side: Product Image Display */}
        <div className="relative aspect-square w-full bg-gray-50 border rounded-2xl overflow-hidden shadow-sm">
          <Image
            src={displayImage}
            alt={product.name}
            fill
            priority // Prioritizes loading the high-resolution dynamic main page banner image
            className="object-contain p-6"
            unoptimized
          />
          {product.discountPercentage > 0 && (
            <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm">
              {product.discountPercentage}% OFF promo
            </span>
          )}
        </div>

        {/* Right Side: Information Block */}
        <div className="space-y-6">
          {/* Brand and Metadata Tags */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {product.brand && (
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md font-semibold uppercase tracking-wider">
                  {product.brand.name}
                </span>
              )}
              {product.category && (
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md font-medium">
                  {product.category.name}
                </span>
              )}
              <span className={`px-2 py-1 rounded-md font-medium ${product.condition === 'New' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>
                {product.condition} Condition
              </span>
            </div>
            
            <h1 className="text-xl md:text-3xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
          </div>

          {/* Rating Summary Row */}
          {product.rating && (
            <div className="flex items-center gap-4 border-y py-3 text-sm">
              <div className="flex items-center gap-1 text-amber-500 font-bold bg-amber-50 px-2.5 py-1 rounded-lg">
                <span>{product.rating.toFixed(1)}</span>
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              </div>
              <span className="text-gray-400">|</span>
              <p className="text-gray-600 font-medium">
                Stock Level: <span className={product.stock > 0 ? "text-gray-900 font-bold" : "text-red-500 font-bold"}>{product.stock} units left</span>
              </p>
            </div>
          )}

          {/* Big Green Extra Bold Price segment */}
          <div className="space-y-1">
            <span className="text-2xl md:text-4xl font-extrabold text-emerald-600 tracking-tight block">
              {formattedPrice}
            </span>
            <p className="text-xs text-gray-400">Price listed includes official local merchant value tariffs.</p>
          </div>

          {/* Store Verification Section Component Box */}
          {product.store && (
            <div className="border p-4 rounded-xl bg-gray-50/50 flex items-center justify-between gap-4">
              <div className="space-y-0.5">
                <div className="flex items-center gap-1.5">
                  {product.store.isOfficial && (
                    <ShieldCheck className="w-4 h-4 text-emerald-600 fill-emerald-50" />
                  )}
                  <h4 className="font-bold text-sm text-gray-900">{product.store.name}</h4>
                </div>
                <p className="text-xs text-gray-500">Located in {product.store.city}</p>
              </div>
              <div className="text-right text-xs bg-white border px-3 py-1.5 rounded-lg shadow-2xs font-semibold">
                Store Rating: ⭐ {product.store.rating || "N/A"}
              </div>
            </div>
          )}

          {/* Interactive Call-To-Action buttons tray */}
          {/* Note: In a full client implementation, you could import your Zustand buttons here */}
          <div className="flex gap-4 pt-2">
            <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 px-6 rounded-xl transition-colors shadow-sm text-sm flex items-center justify-center gap-2">
              <ShoppingBag className="w-4 h-4" /> Add to Cart Basket
            </button>
            <button className="p-3.5 border border-gray-200 hover:bg-red-50 hover:text-red-500 rounded-xl transition-colors text-gray-500 shadow-2xs">
              <Heart className="w-5 h-5" />
            </button>
          </div>

          {/* Complete Full Description Paragraph Container */}
          <div className="space-y-2 border-t pt-6">
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wider">Product Information</h3>
            <p className="text-sm text-gray-600 font-normal leading-relaxed whitespace-pre-line">
              {product.description}
            </p>
          </div>
          
        </div>

      </div>
    </Container>
  );
}