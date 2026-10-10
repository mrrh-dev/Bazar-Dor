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
  catergory: Product[];
}
const NavLinksClient = ({ catergory }: NavLinksClientProps) => {
  const pathname = usePathname();
  return (
    <div className="container mx-auto flex justify-start gap-6 px-4 py-3 overflow-x-auto scrollbar-none">
      {catergory.map((product: Product) => {
        return (
          <Link
            className={
              pathname === `/productbycategory/${product.slug}`
                ? 'bg-green-600 text-white font-semibold'
                : ''
            }
            key={product.id}
            href={`/productbycategory/${product.id}`}
          >
            <span className="mx-2">{product.icon}</span>
            <span>{product.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinksClient;
