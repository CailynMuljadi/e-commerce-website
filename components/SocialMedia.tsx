import React from 'react';
import { cn } from '@/lib/utils';
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Facebook",
    link: "https://www.facebook.com",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M9 8H7v3h2v9h4v-9h3l.5-3H13V6c0-.5.5-1 1-1h2V2h-3a4 4 0 00-4 4v2z" />
      </svg>
    ),
  },
  {
    title: "Instagram",
    link: "https://www.instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01" />
      </svg>
    ),
  },
  {
    title: "Twitter",
    link: "https://www.twitter.com",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.2 2.4h3.3L14.3 11l8.5 11.3h-6.7l-5.2-6.8-6 6.8H1l7.6-8.7L1.5 2.4h6.9l4.7 6.3zm-1.2 17.5h1.8L7.1 4.3H5.1z" />
      </svg>
    ),
  },
  {
    title: "Linkedin",
    link: "https://www.linkedin.com",
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 12.3h-3v-5.6c0-1.3-.1-3-1.8-3-1.9 0-2.2 1.5-2.2 2.9v5.7h-3v-11h2.9v1.5h.1c.4-.7 1.4-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.4v6.6z" />
      </svg>
    ),
  },
];


const SocialMedia = ({className, iconClassName, tooltipClassName}:Props) => {
    return <TooltipProvider>
        <div className={cn("flex items-center gap-3.5", className)}>
            {socialLink?.map((item) => (
                <Tooltip key={item?.title}>
                    <TooltipTrigger asChild>
                        <Link
                        key={item?.title} 
                        target="_blank"
                        rel="noopener noreferrer"
                        href={item?.link}
                        className={cn("p-2 border rounded-full hover:text-white hover:border-shop-light-green hoverEffect", iconClassName)}
                        >
                            {item?.icon} 
                        </Link>
                    
                    </TooltipTrigger>
                    <TooltipContent className={cn("bg-white text-darkColor font-semibold border border-shop-light-green", tooltipClassName)}>
                        {item?.title}
                    </TooltipContent>
                </Tooltip>
            ))}
        </div>
    </TooltipProvider>
};

export default SocialMedia;
