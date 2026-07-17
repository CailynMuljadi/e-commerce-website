// app/shop/page.tsx
"use client";
import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

function ShopContent() {
  const searchParams = useSearchParams();
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sync the search field with the URL header parameters instantly
  useEffect(() => {
    const urlQuery = searchParams.get("search") || "";
    setSearch(urlQuery);
  }, [searchParams]);

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
    // The query search filter checks names structural descriptions
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === "All" ? true : p.category?.name === selectedCategory;
    const matchesRating = (p.rating || 0) >= minRating;
    
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

        {/* Right Side Filter Panel */}
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

          {/* Pricing bounds input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase block">Price Range (Rp)</label>
            <div className="flex flex-col gap-2">
              <input 
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-1.5 border rounded-lg text-xs focus:outline-emerald-600"
              />
              <input 
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                className="w-full p-1.5 border rounded-lg text-xs focus:outline-emerald-600"
              />
            </div>
          </div>

          {/* Rating */}
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
            </select>
          </div>
        </aside>
      </div>
    </Container>
  );
}

// Next.js requires useSearchParams to be wrapped inside Suspense bounds
export default function ShopPage() {
  return (
    <Suspense fallback={<p className="text-center py-12 text-gray-400">Loading catalog frameworks...</p>}>
      <ShopContent />
    </Suspense>
  );
}