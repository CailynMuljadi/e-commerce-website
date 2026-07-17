// app/shop/page.tsx
"use client";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // FIX: Separate explicit manual numeric limits inputs state
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShopData = async () => {
      try {
        const res = await fetchFromAPI("/products");
        setProducts(res.data || res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadShopData();
  }, []);

  const categories = ["All", ...Array.from(new Set(products.map((p: any) => p.category?.name).filter(Boolean)))];

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "All" ? true : p.category?.name === selectedCategory;
    const matchesRating = (p.rating || 0) >= minRating;
    
    // Evaluate input bounds safely falling back to standard limits if empty string
    const bottomLimit = minPrice === "" ? 0 : minPrice;
    const upperLimit = maxPrice === "" ? Infinity : maxPrice;
    const matchesPriceBounds = p.price >= bottomLimit && p.price <= upperLimit;

    return matchesSearch && matchesCat && matchesRating && matchesPriceBounds;
  });

  return (
    <Container className="py-8 space-y-6">
      <div className="w-full space-y-4">
        <h1 className="text-2xl font-bold">Marketplace Catalog</h1>
        <input
          type="text"
          placeholder="Search all market items across collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 border rounded-xl shadow-sm focus:outline-emerald-600 text-sm"
        />
      </div>

      <div className="flex gap-8 items-start">
        <div className="flex-1">
          {loading ? (
            <p className="text-gray-500">Reindexing warehouse inventory...</p>
          ) : filteredProducts.length === 0 ? (
            <p className="text-gray-400 py-10">No catalog products match your exact filtering conditions.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredProducts.map((p: any) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>

        {/* Right Side Filter Panel - Hidden on Mobile, Displays at md viewports */}
        <aside className="hidden md:block w-64 bg-white border p-5 rounded-xl space-y-6 sticky top-20 shrink-0 shadow-sm">
          <h2 className="font-bold text-gray-900 text-sm border-b pb-2">Refine Search</h2>

          {/* Categories */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Categories</label>
            <div className="flex flex-col gap-1.5">
              {categories.map((cat: any) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-left text-xs py-1 px-2 rounded-md transition-colors ${selectedCategory === cat ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-gray-600 hover:bg-gray-50"}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FIX: Manual Pricing Inputs Fields Block */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase block">Price Range (Rp)</label>
            <div className="flex flex-col gap-2">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Min Price</span>
                <input 
                  type="number"
                  placeholder="e.g. 10000"
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-1.5 border rounded-lg text-xs focus:outline-emerald-600"
                />
              </div>
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-gray-400">Max Price</span>
                <input 
                  type="number"
                  placeholder="e.g. 5000000"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                  className="w-full p-1.5 border rounded-lg text-xs focus:outline-emerald-600"
                />
              </div>
            </div>
          </div>

          {/* Minimum Rating Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase">Minimum Rating</label>
            <select
              value={minRating}
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="w-full border p-1.5 rounded-lg text-xs bg-white focus:outline-emerald-600"
            >
              <option value="0">All Ratings</option>
              <option value="4.5">⭐ 4.5 & up</option>
              <option value="4.0">⭐ 4.0 & up</option>
              <option value="3.5">⭐ 3.5 & up</option>
            </select>
          </div>
        </aside>
      </div>
    </Container>
  );
}