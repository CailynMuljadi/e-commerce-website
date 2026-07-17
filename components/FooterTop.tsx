import React from 'react';
import { Clock, Mail, MapPin, Phone} from "lucide-react";

interface ContactItemData {
    title: string;
    subtitle: string;
    icon: React.ReactNode;
}

const data: ContactItemData[] =[
    {
        title:"Visit Us",
        subtitle: "Hanoi, Vietnam",
        icon: (
            <MapPin className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors"/>
        ),
    },
    {
        title: "Call Us",
        subtitle:"+67 123 456 789",
        icon: (
            <Phone className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors"/>
        ),
    },   
    {
        title: "Working Hours",
        subtitle:"Mon-Fri: 10.00 AM-7.00 PM",
        icon: (
            <Clock className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors"/>
        ),
    },
    {
        title: "Contact Us",
        subtitle:"ShopCentre@gmail.com",
        icon: (
            <Mail className="h-6 w-6 text-gray-600 group-hover:text-primary transition-colors"/>
        ),
    },
]
const FooterTop = () => {
  return <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 border-b">
    {data?.map((item,index)=>(
        <div key={index} className="flex items-center gap-3 group hover:bg-gray-50 p-4 transition-colors">
            {item?.icon}
        <div>
            <h3 className="font-semibold text-gray-900 group-hover:text-black">{item?.title}</h3>
            <p className="text-gray-600 text-sm mt-1 group-hover:text-gray-900">{item?.subtitle}</p>
        </div>
        
        </div>
    ))}
    </div>;
  
};

export default FooterTop;
