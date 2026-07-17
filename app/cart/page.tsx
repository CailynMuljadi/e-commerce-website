"use client";
import React, { useState, useEffect } from "react";
import { useMarketStore } from "@/lib/store";
import { fetchFromAPI } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import Container from "@/components/Container";

export default function CartPage() {
  const { cart, toggleFavorite } = useMarketStore(); // Use global state actions
  const [products, setProducts] = useState([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const res = await fetchFromAPI("/products");
        const list = res.data || res;
        const cartItems = list.filter((p: any) => cart.includes(p.id));
        setProducts(cartItems);
        // Default checking every item inside array when loaded initially
        setCheckedIds(cartItems.map((item: any) => item.id));
      } catch (err) {
        console.error(err);
      }
    };
    if (cart.length > 0) loadCartItems();
  }, [cart]);

  const toggleCheck = (id: string) => {
    setCheckedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  // Compute subtotal metrics strictly based on checked selection boxes
  const checkedProducts = products.filter((p: any) => checkedIds.includes(p.id));
  const subtotal = checkedProducts.reduce((sum, item: any) => sum + item.price, 0);

  if (cart.length === 0) {
    return <Container className="py-16 text-center text-gray-500">Your shopping bag is completely empty.</Container>;
  }

  return (
    <Container className="py-8 grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Item List Flow Column */}
      <div className="lg:col-span-2 space-y-4">
        <h1 className="text-xl font-bold text-gray-900">Shopping Bag ({products.length})</h1>
        <div className="border rounded-xl divide-y bg-white overflow-hidden px-4">
          {products.map((p: any) => (
            <div key={p.id} className="flex items-center gap-4 py-4">
              <input 
                type="checkbox" 
                checked={checkedIds.includes(p.id)}
                onChange={() => toggleCheck(p.id)}
                className="w-4 h-4 accent-emerald-600 cursor-pointer"
              />
              <div className="relative w-20 h-20 rounded bg-gray-50 overflow-hidden shrink-0">
                <Image src={p.imageUrl || "/placeholder.png"} alt={p.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{p.name}</h3>
                <p className="text-xs text-gray-400 font-medium">{p.store?.name || "Market Store"}</p>
                <p className="text-sm font-bold text-gray-900 pt-2">Rp {p.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Checkout Sidebar Summary panel */}
      <div className="bg-gray-50 border p-6 rounded-xl space-y-4 sticky top-4">
        <h2 className="font-bold text-sm text-gray-900 uppercase tracking-wider">Order Summary</h2>
        <div className="flex justify-between border-b pb-3 text-sm text-gray-600">
          <span>Selected Items ({checkedIds.length})</span>
          <span className="font-semibold text-gray-900">Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        <div className="flex justify-between items-center text-base font-bold text-gray-900">
          <span>Estimated Total</span>
          <span className="text-emerald-600">Rp {subtotal.toLocaleString("id-ID")}</span>
        </div>
        
        <Link 
          href={checkedIds.length > 0 ? `/checkout?items=${checkedIds.join(",")}` : "#"}
          className={`w-full block text-center font-medium text-sm py-3 rounded-xl transition-all ${checkedIds.length > 0 ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
        >
          Proceed to Purchase
        </Link>
      </div>
    </Container>
  );
}