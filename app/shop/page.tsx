"use client";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

export default function ShopPage() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(25000000); // 25M IDR scale bar cap
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

  // Compute clean non-duplicating dynamic arrays for unique filter categories
  const categories = ["All", ...Array.from(new Set(products.map((p: any) => p.category?.name).filter(Boolean)))];

  const filteredProducts = products.filter((p: any) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "All" ? true : p.category?.name === selectedCategory;
    const matchesPrice = p.price <= maxPrice;
    const matchesRating = (p.rating || 0) >= minRating;
    return matchesSearch && matchesCat && matchesPrice && matchesRating;
  });

  return (
    <Container className="py-8 space-y-6">
      {/* Search Header Controls */}
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

      {/* Main Workspace Column Split Layout */}
      <div className="flex gap-8 items-start">
        {/* Left Side: Product Display Output */}
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

        {/* Right Side Filter Panel: Automatically hidden on hidden/sm/mobile, becomes blocks at md breakpoint */}
        <aside className="hidden md:block w-64 bg-white border p-5 rounded-xl space-y-6 sticky top-4 shrink-0 shadow-sm">
          <h2 className="font-bold text-gray-900 text-sm border-b pb-2">Refine Search</h2>

          {/* Categories Option List */}
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

          {/* Price Range Controls Slider */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-gray-500 uppercase">
              <span>Max Price</span>
            </div>
            <input
              type="range"
              min="0"
              max="25000000"
              step="500000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
            <p className="text-xs font-semibold text-gray-700">
              Under {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(maxPrice)}
            </p>
          </div>

          {/* Minimum Rating Controls Toggle */}
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
};