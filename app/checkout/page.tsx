"use client";
import React, { useState, useEffect, use } from "react";
import { fetchFromAPI } from "@/lib/api";
import Image from "next/image";
import Container from "@/components/Container";
import { useMarketStore } from "@/lib/store";


interface CheckoutProps {
  searchParams: Promise<{ items?: string }>;
}

export default function CheckoutPage({ searchParams }: CheckoutProps) {
  const { items } = use(searchParams);
  const [checkoutProducts, setCheckoutProducts] = useState([]);
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (!items) return;
    const targetIds = items.split(",");
    
    const loadCheckoutData = async () => {
      try {
        const res = await fetchFromAPI("/products");
        const list = res.data || res;
        setCheckoutProducts(list.filter((p: any) => targetIds.includes(p.id)));
      } catch (err) {
        console.error(err);
      }
    };
    loadCheckoutData();
  }, [items]);

  const totalCost = checkoutProducts.reduce((sum, item: any) => sum + item.price, 0);
  
  const { clearItems } = useMarketStore();
  
  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment gateway delay networks
    setTimeout(() => {
      const idsToClear = checkoutProducts.map((p: any) => p.id);
      clearItems(idsToClear);

      setProcessing(false);
      setSuccess(true);
    }, 2000);
  };

  if (success) {
    return (
      <Container className="py-20 text-center space-y-4 max-w-md">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center text-2xl mx-auto font-bold">✓</div>
        <h1 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h1>
        <p className="text-sm text-gray-500">Your mock transaction has cleared successfully. Invoices have been prepared for verification.</p>
      </Container>
    );
  }

  return (
    <Container className="py-8 max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Shipment & Customer detail forms */}
      <form onSubmit={handleOrderSubmit} className="space-y-4 border p-6 rounded-xl bg-white shadow-sm">
        <h2 className="text-lg font-bold text-gray-900 border-b pb-2">Delivery Information</h2>
        <div className="space-y-3 text-sm">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Full Name</label>
            <input required type="text" placeholder="John Doe" className="w-full p-2 border rounded-lg focus:outline-emerald-600" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1">Destination Address</label>
            <input required type="text" placeholder="Sudirman Street No. 12" className="w-full p-2 border rounded-lg focus:outline-emerald-600" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">City</label>
              <input required type="text" placeholder="Jakarta" className="w-full p-2 border rounded-lg focus:outline-emerald-600" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 mb-1">Postal Code</label>
              <input required type="text" placeholder="10110" className="w-full p-2 border rounded-lg focus:outline-emerald-600" />
            </div>
          </div>
        </div>
        
        <button 
          type="submit" 
          disabled={processing || checkoutProducts.length === 0}
          className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-lg mt-6 hover:bg-emerald-700 transition-colors text-sm disabled:bg-gray-300"
        >
          {processing ? "Authorizing Security Protocols..." : `Pay Rp ${totalCost.toLocaleString("id-ID")}`}
        </button>
      </form>

      {/* Targeted Summary Line item reviews */}
      <div className="bg-gray-50 p-6 border rounded-xl h-fit space-y-4">
        <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Review Basket Items</h2>
        <div className="divide-y max-h-64 overflow-y-auto pr-2">
          {checkoutProducts.map((p: any) => (
            <div key={p.id} className="flex items-center gap-3 py-3 text-xs">
              <div className="relative w-12 h-12 rounded overflow-hidden bg-white border shrink-0">
                <Image src={p.imageUrl || "/placeholder.png"} alt={p.name} fill className="object-cover" unoptimized />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">{p.name}</p>
                <p className="text-gray-500">Rp {p.price.toLocaleString("id-ID")}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="border-t pt-3 flex justify-between font-bold text-sm text-gray-900">
          <span>Grand Total</span>
          <span className="text-emerald-600 text-base">Rp {totalCost.toLocaleString("id-ID")}</span>
        </div>
      </div>
    </Container>
  );
}