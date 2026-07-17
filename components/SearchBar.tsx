"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Directs to shop page with URL parameter
      router.push(`/shop?search=${encodeURIComponent(query.trim())}`);
      setQuery("");
      setIsOpen(false);
    }
  };

  return (
    <div className="flex items-center relative h-9">
      {/* Dynamic Slide-out Input Rectangle */}
      <form 
        onSubmit={handleSearchSubmit} 
        className={`flex items-center bg-gray-50 border rounded-lg transition-all duration-300 overflow-hidden ${
          isOpen ? "w-48 md:w-64 px-3 opacity-100 mr-2" : "w-0 px-0 opacity-0 pointer-events-none"
        }`}
      >
        <input
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent py-1 text-xs text-gray-800 focus:outline-none"
          // Automatically focus the input box when it slides open
          autoFocus={isOpen}
        />
        {query && (
          <button 
            type="button" 
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* The Search Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle search bar"
        className="p-2 rounded-full hover:bg-gray-100 text-gray-700 transition-colors flex items-center justify-center"
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;