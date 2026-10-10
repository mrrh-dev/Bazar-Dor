//import Link from 'next/link';
//import { usePathname } from 'next/navigation';
import React from 'react';

import NavLinksClient from './NavLinksClient';
/* interface Product {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
} */
const navlinks = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/categories',
  );
  if (!res.ok) throw new Error('fetching is not successful');
  return res.json();
};

const NavLinks = async () => {
  const catergory = await navlinks();
  return <NavLinksClient catergory={catergory}></NavLinksClient>;
};

export default NavLinks;
//container mx-25 flex justify-start gap-4 p-4
