"use client"; // Required for Zustand state updates
import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { useMarketStore } from '@/lib/store';

const CartIcon = () => {
  const shoppingbag = useMarketStore ((state) => state.cart);
  return (
    <Link href={"/cart"} className="group relative">
      <ShoppingBag className="w-5 h-5 hover:text-shop-light-green hoverEffect"/>

      {/* Dynamic Badge Counter */}
      {shoppingbag.length > 0 && (
        <span className="absolute -top-1 -right-1 bg-shop-btn-dark-green text-white h-3.5 w-3.5 rounded-full text-[10px] font-semibold flex items-center justify-center animate-scaleIn">
          {shoppingbag.length}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
