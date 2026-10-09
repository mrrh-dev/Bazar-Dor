import Link from 'next/link';
import React from 'react';
interface Product {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}
const navlinks = async () => {
  const res = await fetch(
    'https://api.abcz.workers.dev/api/bazardor/categories',
  );
  if (!res.ok) throw new Error('fetching is not successful');
  return res.json();
};
const NavLinks = async () => {
  const catergory = await navlinks();
  //console.log(catergory);

  return (
    <div className="container mx-auto flex justify-start gap-6 px-4 py-3 overflow-x-auto scrollbar-none">
      {catergory.map((product: Product) => {
        return (
          <Link key={product.id} href={product.slug}>
            <span className="mx-2">{product.icon}</span>
            <span>{product.nameBn}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
//container mx-25 flex justify-start gap-4 p-4
