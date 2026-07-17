// app/category/[slug]/page.tsx
import React from "react";
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import Container from "@/components/Container";

// ✅ FIXED: Renamed our local interface to avoid conflicting with generic Next.js page type systems
interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

// ✅ FIXED: Using the newly updated type structure name here
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  
  // Keep this for the visible page title at the top of the screen
  const displayTitle = decodeURIComponent(slug)
    .replace(/-/g, " ")
    .replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    .replace("And", "&"); 

  let products = [];
  try {
    const res = await fetchFromAPI("/products");
    products = res.data || res;
  } catch (err) {
    console.error("Error loading category view:", err);
  }

  // The slug-based grid filter logic
  const filteredProducts = products.filter((p: any) => {
    const productSlug = p.category?.slug || "others";
    
    if (slug.toLowerCase() === "others") {
      const coreSlugs = [
        "beauty", 
        "beverages", 
        "books-and-stationery", 
        "electronics", 
        "fashion", 
        "groceries", 
        "home-appliances", 
        "muslim-wear", 
        "snacks", 
        "sports"
      ];
      return !coreSlugs.includes(productSlug.toLowerCase());
    }

    return productSlug.toLowerCase() === slug.toLowerCase();
  });

  return (
    <Container className="py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{displayTitle}</h1>
        <p className="text-sm text-gray-500">Showing {filteredProducts.length} items found under this shelf section.</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 border border-dashed rounded-xl text-gray-400">
          No warehouse stock listed under {displayTitle} right now.
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