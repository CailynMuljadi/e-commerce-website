// app/hot-deals/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import ProductSlider from "@/components/SliderLoop";
import Container from "@/components/Container";

export default function HotDealsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [minDiscount, setMinDiscount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDeals = async () => {
      try {
        const res = await fetchFromAPI("/products");
        setProducts(res.data || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadDeals();
  }, []);

  // 1. Slider content matches the main dashboard flags
  const sliderItems = products.filter((p: any) => p.isFeatured || p.isNewArrival);

  // 2. Grid contents map strictly out of products possessing markdown discounts
  const discountedGridProducts = products.filter((p: any) => {
    const hasDiscount = p.discountPercentage && p.discountPercentage > 0;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiscountThreshold = (p.discountPercentage || 0) >= minDiscount;
    
    return hasDiscount && matchesSearch && matchesDiscountThreshold;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* PART 1: Top of screen horizontal loops */}
      <div className="bg-gray-50/60 border-b py-4">
        <Container>
          {loading ? (
            <div className="h-48 flex items-center justify-center text-sm text-gray-400">Loading sales loops...</div>
          ) : (
            <ProductSlider 
              title="Trending Promotional Deals" 
              subtitle="Top picked flash items moving hot from storefront positions" 
              products={sliderItems} 
            />
          )}
        </Container>
      </div>

      {/* PART 2: Controls Panel Section */}
      <Container className="space-y-6">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">% Discount Supermarket</h2>
            <p className="text-xs text-gray-500">Filter down and claim your precise rate selections below</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            {/* Search Input Box */}
            <input
              type="text"
              placeholder="Search discounted items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border p-2 rounded-lg text-sm flex-1 md:w-64 focus:outline-emerald-600"
            />
            
            {/* Value Selector Slider Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-xs font-bold text-gray-500 uppercase whitespace-nowrap">Min Discount:</label>
              <select
                value={minDiscount}
                onChange={(e) => setMinDiscount(Number(e.target.value))}
                className="border p-2 rounded-lg text-sm bg-white focus:outline-emerald-600"
              >
                <option value="0">All Discounts</option>
                <option value="5">≥ 5% OFF</option>
                <option value="10">≥ 10% OFF</option>
                <option value="15">≥ 15% OFF</option>
                <option value="20">≥ 20% OFF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Dynamic Catalog Grids */}
        {loading ? (
          <p className="text-center text-gray-400">Reindexing items...</p>
        ) : discountedGridProducts.length === 0 ? (
          <div className="text-center py-12 border border-dashed rounded-xl text-gray-400">
            No active discounted products match your exact targeting search rules.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {discountedGridProducts.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}