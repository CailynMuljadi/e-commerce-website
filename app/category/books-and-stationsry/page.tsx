// app/category/[slug]/page.tsx
import React from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

interface PageProps {
  params: Promise<{ books-and-stationary : string }>;
}

export default async function CategoryPage({ params }: PageProps) {
  const { books-and-stationary } = await params;
  
  // Convert URL slugs back into printable category text (e.g., "home-appliances" -> "Home Appliances")
  const decodedCategory = decodeURIComponent(books-and-stationary)
    .replace(/-/g, " ")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase());

  let products = [];
  try {
    const res = await fetchFromAPI("/products");
    products = res.data || res;
  } catch (err) {
    console.error("Error loading category view:", err);
  }

  // Filter products by testing structural names
  const filteredProducts = products.filter((p: any) => {
    const categoryName = p.category?.name || "Others";
    
    // Check if the current category falls into your "Others" catch-all rule
    if (decodedCategory.toLowerCase() === "others") {
      const coreCategories = ["beauty", "beverages", "books & stationary", "electronics", "fashion", "groceries", "home appliances", "muslim wear", "snacks", "sports"];
      return !coreCategories.includes(categoryName.toLowerCase());
    }

    return categoryName.toLowerCase() === decodedCategory.toLowerCase();
  });

  return (
    <Container className="py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{decodedCategory}</h1>
        <p className="text-sm text-gray-500">Showing {filteredProducts.length} items found under this shelf section.</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-xl text-gray-400">
          No warehouse stock listed under {decodedCategory} right now.
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredProducts.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </Container>
  );
}