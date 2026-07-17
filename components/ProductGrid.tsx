"use client";

import {useState, useEffect} from 'react';
import HomeTabBar from './HomeTabBar';
import { productType } from '@/constants/data';
import { fetchFromAPI } from "@/lib/api";
import ProductCard from "./Productcard";
import ProductSlider from './SliderLoop';

const ProductGrid = () => {
    const [products, setProducts] = useState ([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState (productType[0]?.title||"" );
    
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetchFromAPI("/products");
                // Check if your utility returns a wrapped object or raw list array
                const dataList = response.data || response;
                setProducts(dataList);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setLoading(false);
            }
        };

        getProducts();
    }, []);

    const featuredProducts = products.filter((p: any) => p.isFeatured === true);
    const newArrivals = products.filter((p: any) => p.isNewArrival === true);

  return ( <div className="space-y-10">
    <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
    {loading ? (
    <div className="flex items-center justify-center py-10">
                    <p className="text-sm font-semibold animate-pulse text-gray-500">
                        Loading marketplace streams...
                    </p>
                </div>
            ) : (
                <div className="space-y-12">
                    {/* Featured slider display block embedded inside the grid ecosystem */}
                    <ProductSlider 
                        title="Featured Collections" 
                        subtitle="Top picks handpicked for your marketplace layout" 
                        products={featuredProducts} 
                    />

                    {/* New Arrivals slider display block embedded inside the grid ecosystem */}
                    <ProductSlider 
                        title="New Arrivals" 
                        subtitle="The latest arrivals dropped hot from our storefronts" 
                        products={newArrivals} 
                    />
                </div>
            )}
    </div>
  );
};

export default ProductGrid;
