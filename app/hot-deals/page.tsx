"use client";
import React, { useState, useEffect } from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

export default function HotDealsPage() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [onlyDiscounts, setOnlyDiscounts] = useState(false);
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

  const dealProducts = products.filter((p: any) => {
    const matchesTargetGroup = p.isFeatured || p.isNewArrival;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiscount = onlyDiscounts ? (p.discountPercentage && p.discountPercentage > 0) : true;
    return matchesTargetGroup && matchesSearch && matchesDiscount;
  });

  return (
    <Container className="py-8 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">🔥 Hot Deals</h1>
          <p className="text-sm text-gray-500">The absolute best trending selections and fresh dynamic arrivals</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Search deals..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded-lg text-sm w-full sm:w-64 focus:outline-emerald-600"
          />
          <button
            onClick={() => setOnlyDiscounts(!onlyDiscounts)}
            className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${onlyDiscounts ? "bg-red-500 text-white border-red-500" : "bg-white text-gray-700 hover:bg-gray-50"}`}
          >
            {onlyDiscounts ? "Showing Discounted Only" : "Filter by Discounts"}
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-10 text-gray-500">Loading hot sales updates...</p>
      ) : dealProducts.length === 0 ? (
        <div className="text-center py-16 text-gray-500">No hot promotional items match your active parameters.</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {dealProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
  </Container>
  );
};
