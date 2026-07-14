import React, { FC } from 'react';
import { X } from 'lucide-react';
import Logo from './Logo';
interface SidebarPops{
    isOpen: boolean;
    onClose: () => void;
}

const SideMenu:FC<SidebarPops> = ({ isOpen, onClose }) => {
  return (
    <div
    className={`fixed inset-y-0 h-screen left-0 z-50 w-full bg-black/50 shadow-xl ${
        isOpen ? "translate-x-0" : "-translate-x-full"
    } hoverEffect`}
    >
      <div className="min-w-72 max-w-96 bg-black h-screen p-10 berder-r border-r-shop-light-green flex flex-col gap-6">
        <div className="flex items-center justify-between gap-5">
            <Logo className="text-white"/>
            <button 
                onClick={onClose}
                className="hover:text-shop-light-green hoverEffect"
            >
            <X />
            </button>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default SideMenu
