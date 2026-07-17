import React from "react";
import ProductCard, { Product } from "./ProductCard";

interface SliderProps {
  title: string;
  subtitle?: string;
  products: Product[];
}

const ProductSlider = ({ title, subtitle, products }: SliderProps) => {
  if (products.length === 0) return null;

  return (
    <section className="py-8 space-y-4">
      <div>
        <h2 className="text-xl md:text-2xl font-bold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
      </div>

      {/* Clean horizontal scroll loop section */}
      <div className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gray-200">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="w-[240px] md:w-[280px] shrink-0 snap-start"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductSlider;