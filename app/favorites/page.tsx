"use client";
import React, { useState, useEffect } from "react";
import { useMarketStore } from "@/lib/store";
import { fetchFromAPI } from "@/lib/api";
import Image from "next/image";
import { Trash2, ShoppingBag } from "lucide-react";
import Container from "@/components/Container";

export default function FavoritesPage() {
  const { favorites, toggleFavorite, addToCart } = useMarketStore();
  const [products, setProducts] = useState([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const res = await fetchFromAPI("/products");
        const list = res.data || res;
        // Keep only items present inside user's favorite index array
        setProducts(list.filter((p: any) => favorites.includes(p.id)));
      } catch (err) {
        console.error(err);
      }
    };
    if (favorites.length > 0) loadItems();
  }, [favorites]);

  const handleSelectToggle = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleBatchDelete = () => {
    selectedIds.forEach(id => toggleFavorite(id));
    setSelectedIds([]);
  };

  const handleBatchMoveToCart = () => {
    selectedIds.forEach(id => {
      addToCart(id);
      toggleFavorite(id); // optional clean out of favorites list on shift
    });
    setSelectedIds([]);
  };

  if (favorites.length === 0) {
    return <Container className="py-16 text-center text-gray-500">Your saved wishlist bookshelf is empty.</Container>;
  }

  return (
    <Container className="py-8 space-y-4">
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-xl font-bold">Your Wishlist</h1>
        {selectedIds.length > 0 && (
          <div className="flex gap-2 animate-fadeIn">
            <button onClick={handleBatchMoveToCart} className="flex items-center gap-1.5 text-xs bg-emerald-600 text-white px-3 py-1.5 rounded-lg">
              <ShoppingBag className="w-3.5 h-3.5" /> Move to Bag ({selectedIds.length})
            </button>
            <button onClick={handleBatchDelete} className="flex items-center gap-1.5 text-xs bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 rounded-lg">
              <Trash2 className="w-3.5 h-3.5" /> Delete Selected
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 divide-y">
        {products.map((p: any) => (
          <div key={p.id} className="flex items-center gap-4 py-4">
            <input 
              type="checkbox" 
              checked={selectedIds.includes(p.id)} 
              onChange={() => handleSelectToggle(p.id)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer" 
            />
            <div className="relative w-16 h-16 bg-gray-50 rounded overflow-hidden shrink-0">
              <Image src={p.imageUrl || "/placeholder.png"} alt={p.name} fill className="object-cover" unoptimized />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold truncate text-gray-800">{p.name}</h3>
              <p className="text-xs text-emerald-600 font-bold">Rp {p.price.toLocaleString("id-ID")}</p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}