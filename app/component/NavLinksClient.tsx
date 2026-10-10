'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
interface Product {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
interface NavLinksClientProps {
  category: Product[];
}
const NavLinksClient = ({ category }: NavLinksClientProps) => {
  const pathname = usePathname();
  return (
    <nav className="w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-none snap-x snap-mandatory mask-image">
          {category.map((category) => {
            const targetHref = `/productbycategory/${category.slug}`;
            const isActive = pathname === targetHref;

            return (
              <Link
                key={category.id}
                href={targetHref}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium 
                  whitespace-nowrap transition-all duration-200 snap-center
                  ${
                    isActive
                      ? 'bg-green-800 text-white shadow-sm shadow-green-800/20'
                      : 'text-gray-600 dark:text-zinc-400 hover:bg-gray-50 dark:hover:bg-zinc-900 hover:text-gray-900 dark:hover:text-zinc-100'
                  }
                `}
              >
                <span className="text-base flex-shrink-0" aria-hidden="true">
                  {category.icon}
                </span>
                <span>{category.nameBn}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default NavLinksClient;
