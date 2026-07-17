import React from "react";
import { Title } from "./ui/text";
import banner from "@/Images/banner.png";
import Link from "next/link";
import Image from "next/image";


const HomeBanner = () => {
return (
    <div className= "py-16 md:py-0 bg-shop-light-pink rounded-lg px-10 lg:px-24 flex items-center justify-between">
        <div className="space-y-5">
            <Title>Grab Up to<span className="text-shop-orange"> 50%</span> off on<br />
            Our Mid-Year Sale 
            </Title>
            <Link href={"/shop"} className="bg-shop-orange/90 text-white/90 px-5 py-2 rounded-md text-sm font-semibold hover:text-white hover:bg-shop-orange hoverEffect">
            Buy Now
            </Link>
        </div>


        <div>
            <Image src={banner} alt="banner_1" className="hidden md:inline-flex w-96"/>
        </div>
        
    </div>
)

};

export default HomeBanner