//import ProductList from '@/components/ProductList';
//import type { Product } from '';

import ProductList from '@/app/component/ProductList';

interface Paramsprops {
  params: Promise<{ id: string }>;
}
interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon?: string;
  image: string;
  unit: string;
  today: number;
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: string;
    pct: number;
  };
}

const Categorypage = async ({ params }: Paramsprops) => {
  const { id } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${id}`,
    { cache: 'no-store' },
  );

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  const products: Product[] = await res.json();

  return (
    <div className="bg-gray-100">
      <ProductList products={products} categoryId={id} />
    </div>
  );
};

export default Categorypage;
//encodeURIComponent(id)
