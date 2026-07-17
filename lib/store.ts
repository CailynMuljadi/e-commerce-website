// lib/store.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface StoreState {
  cart: string[]; // Stores product IDs
  favorites: string[]; // Stores product IDs
  addToCart: (id: string) => void;
  toggleFavorite: (id: string) => void;
}

// Persist automatically saves the lists to localStorage so counts survive page refreshes!
export const useMarketStore = create<StoreState>()(
  persist(
    (set) => ({
      cart: [],
      favorites: [],
      
      addToCart: (id) =>
        set((state) => ({
          cart: state.cart.includes(id) ? state.cart : [...state.cart, id],
        })),

      toggleFavorite: (id) =>
        set((state) => ({
          favorites: state.favorites.includes(id)
            ? state.favorites.filter((favId) => favId !== id)
            : [...state.favorites, id],
        })),
    }),
    { name: "market-storage" }
  )
);