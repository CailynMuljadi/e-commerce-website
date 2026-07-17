"use client";

import { useState, useEffect } from 'react';
import HomeTabBar from './HomeTabBar';
import { productType } from '@/constants/data';
import { fetchFromAPI } from "@/lib/api";
import ProductCard from './ProductCard';
import ProductSlider from './SliderLoop';

const ProductGrid = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
    
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const response = await fetchFromAPI("/products");
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

    // 1. Separate featured and new arrival entries for upper sliders
    const featuredProducts = products.filter((p: any) => p.isFeatured === true);
    const newArrivals = products.filter((p: any) => p.isNewArrival === true);

    // 2. --- UPDATED FILTERING LOGIC FOR OTHERS CATEGORY ---
    const filteredProducts = products.filter((product: any) => {
        const productCategoryName = product.category?.name || "";
        const formattedCategory = productCategoryName.trim().toLowerCase();
        const formattedTab = selectedTab.trim().toLowerCase();

        // If the user clicks the "Others" tab
        if (formattedTab === "others") {
            // Include everything that is NOT beauty, electronics, or fashion
            return (
                formattedCategory !== "beauty" &&
                formattedCategory !== "electronics" &&
                formattedCategory !== "fashion"
            );
        }

        // Otherwise, perform the normal explicit category match
        return formattedCategory === formattedTab;
    });

    return ( 
        <div className="space-y-12">
            {/* PART 1: TOP SECTION - The Sliders (Featured & Arrivals) */}
            <div>
                {loading ? (
                    <div className="flex items-center justify-center py-10">
                        <p className="text-sm font-semibold animate-pulse text-gray-500">
                            Loading marketplace streams...
                        </p>
                    </div>
                ) : (
                    <div className="space-y-12">
                        <ProductSlider 
                            title="Featured Collections" 
                            subtitle="Top picks handpicked for your marketplace layout" 
                            products={featuredProducts} 
                        />

                        <ProductSlider 
                            title="New Arrivals" 
                            subtitle="The latest arrivals dropped hot from our storefronts" 
                            products={newArrivals} 
                        />
                    </div>
                )}
            </div>

            {/* PART 2: BOTTOM SECTION - Filters & Matching Category Grid */}
            <div className="space-y-8 pt-6 border-t border-gray-100">
                <HomeTabBar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
                
                {loading ? (
                    <div className="flex items-center justify-center py-12">
                        <p className="text-sm font-medium animate-pulse text-gray-400">Loading collection grid...</p>
                    </div>
                ) : filteredProducts.length === 0 ? (
                    <div className="text-center py-16 border border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                        <p className="text-sm font-medium text-gray-500">
                            No products found in the "{selectedTab}" category right now.
                        </p>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                        {filteredProducts.map((product: any) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductGrid;