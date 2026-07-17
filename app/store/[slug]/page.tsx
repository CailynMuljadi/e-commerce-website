// app/store/[slug]/page.tsx
"use client";

import React, { use, useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";
import { ShieldCheck, MapPin, Star, Package } from "lucide-react";

interface StorePageProps {
  params: Promise<{ slug: string }>;
}

export default function StoreProfilePage({ params }: StorePageProps) {
  const { slug } = use(params);
  const [products, setProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoreInventory = async () => {
      try {
        const res = await fetchFromAPI("/products");
        const list = res.data || res;

        // Filter all inventory entries belonging specifically to this store
        const storeProducts = list.filter((p: any) => p.store && (p.store.slug === slug || p.store.id === slug));
        setProducts(storeProducts);

        if (storeProducts.length > 0) {
          // Extract structural profile fields from the first item found matching
          setStoreInfo(storeProducts[0].store);
        }
      } catch (err) {
        console.error("Error building merchant directory streams:", err);
      } finally {
        setLoading(false);
      }
    };
    loadStoreInventory();
  }, [slug]);

  if (loading) return <Container className="py-20 text-center text-gray-400">Loading storefront details...</Container>;
  
  if (!storeInfo) {
    return (
      <Container className="py-16 text-center text-gray-500">
        Store profile empty or currently unindexed inside database networks.
      </Container>
    );
  }

  return (
    <Container className="py-8 space-y-8">
      {/* Merchant Profile Showcase Header Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            {storeInfo.isOfficial && (
              <span className="bg-emerald-600 text-white text-[10px] font-extrabold uppercase px-2 py-0.5 rounded flex items-center gap-0.5">
                <ShieldCheck className="w-3 h-3" /> Official Store
              </span>
            )}
            <h1 className="text-xl md:text-3xl font-bold text-gray-900">{storeInfo.name}</h1>
          </div>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-gray-500 font-medium">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400" /> {storeInfo.city || "Merchant Location"}
            </span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {storeInfo.rating ? storeInfo.rating.toFixed(1) : "N/A"} Store Rating
            </span>
            <span className="flex items-center gap-1">
              <Package className="w-3.5 h-3.5 text-gray-400" /> {products.length} Active Listings
            </span>
          </div>
        </div>
      </div>

      {/* Grid Displaying Exclusively Items Offered By This Store */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">Products Offered By Store</h2>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Container>
  );
}