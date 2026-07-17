"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();
  
  // Create a reference to bind directly to the input field element
  const inputRef = useRef<HTMLInputElement>(null);

  // Programmatically trigger focus whenever isOpen switches to true
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
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
          isOpen ? "w-48 md:w-64 px-3 opacity-100 mr-2 border-gray-300" : "w-0 px-0 opacity-0 border-transparent pointer-events-none"
        }`}
      >
        <input
          ref={inputRef} // Bound reference tag
          type="text"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full bg-transparent py-1 text-xs text-gray-800 focus:outline-none"
        />
        {query && (
          <button 
            type="button" 
            onClick={() => setQuery("")}
            className="text-gray-400 hover:text-gray-600 transition-colors shrink-0"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </form>

      {/* The Search Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle search bar"
        className={`p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center ${
          isOpen ? "text-emerald-600 bg-emerald-50/50" : "text-gray-700"
        }`}
      >
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;