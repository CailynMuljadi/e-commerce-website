import React from 'react';
import Link from 'next/link';
import { productType } from '@/constants/data';

interface Props {
  selectedTab: string;
  onTabSelect: (tab:string) => void;
}

const HomeTabBar = ({selectedTab,onTabSelect}:Props) => {
  return (
    <div className="flex items-center justify-between flex-wrap gap-5">
      <div className="flex items-center gap-3 text-sm font-semibold">
        {productType?.map((item)=>(
          <button 
          onClick={()=> onTabSelect(item?.title)}
          key={item?.title} 
          className={`border border-shop-light-green/30  px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop-light-green hover:border-shop-light-green
          ${selectedTab === item?.title ? "bg-shop-light-green text-white border-shop-light-green" : "bg-shop-light-gree/20"}`}>
            {item?.title}</button>
        ))}
      </div>
      <Link href={"/shop"} className={`border border-shop-light-green/30  px-4 py-1.5 md:px-6 md:py-2 rounded-full hover:bg-shop-light-green hover:border-shop-light-green`}>
      See all</Link>
    </div>
  );
};

export default HomeTabBar;
