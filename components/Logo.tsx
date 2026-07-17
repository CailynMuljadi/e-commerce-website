import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Logo = ({className, spanDesign}: {className?: string, spanDesign?: string}) => {
  return <Link href={"/"} className="text-2xl font-bold text-gray-800">
    <h2 className={cn("text-exl text-shop-dark-green font-black tracking-wider uppercase hover:text-shop-light-green hoverEffect group font-sans"
        ,className)}>

        Shop<span className={cn("text-shop-light-green group-hover:text-shop-dark-green hoverEffect", spanDesign)}>centre</span>
    </h2>
  </Link>;
};

export default Logo;
