'use client';
import React, { useState } from 'react';
//import type { Product } from '@/types/product';

type SortOption = 'default' | 'low' | 'high';

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

interface Props {
  products: Product[];
  categoryId: string;
}

const ProductList = ({ products, categoryId }: Props) => {
  // Sorting
  const [sortBy, setSortBy] = useState<SortOption>('default');

  // Sort products (copy first so the original order is kept for "default")
  const sortedList = [...products].sort((a, b) => {
    if (sortBy === 'low') {
      return a.today - b.today;
    }

    if (sortBy === 'high') {
      return b.today - a.today;
    }

    return 0;
  });

  const first = products[0];
  const categoryName = first?.categoryNameBn ?? categoryId;
  const icon = first?.categoryIcon ?? first?.image;

  return (
    <main className="container mx-auto py-2">
      <div className=" space-y-4">
        {/* Category Header */}
        <section className=" flex items-center gap-3 rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] px-4 py-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f0f3ee] text-2xl">
            {icon}
          </div>

          <div>
            <h1 className="text-lg font-bold text-[#253027]">{categoryName}</h1>
            <p className="text-xs text-[#788179]">
              {products.length}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </section>

        {/* Sorting Bar */}
        <section className="flex min-h-[42px] items-center justify-end rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] px-3">
          <label htmlFor="sort" className="mr-2 text-xs text-[#788179]">
            সাজান
          </label>

          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="rounded-md border border-[#dce3dc] bg-transparent px-2 py-1 text-xs text-[#354037] outline-none"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">কম দাম</option>
            <option value="high">বেশি দাম</option>
          </select>
        </section>

        {/* Product Count */}
        <p className="text-xs text-[#788179]">
          মোট {products.length}টি পণ্য দেখানো হচ্ছে
        </p>

        {/* Product Cards (uses sortedList) */}
        {sortedList.length > 0 ? (
          <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {sortedList.map((item) => {
              const isUp = item.change?.dir === 'up';
              const isDown = item.change?.dir === 'down';

              return (
                <article
                  key={item.id}
                  className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-3 transition-shadow hover:shadow-sm"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#f0f3ee] text-xl">
                      {item.image}
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-sm font-bold text-[#29342b]">
                        {item.nameBn}
                      </h2>
                      <p className="text-[10px] text-[#788179]">
                        প্রতি {item.unit}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-end justify-between gap-2">
                    <div>
                      <p className="mb-1 text-[10px] text-[#788179]">
                        আজকের দাম
                      </p>
                      <p className="text-sm font-bold text-[#202b23]">
                        {item.today} টাকা
                      </p>
                    </div>

                    <span
                      className={`rounded-full px-2 py-1 text-[10px] font-semibold ${
                        isUp
                          ? 'bg-[#fff0ed] text-[#e34f40]'
                          : isDown
                            ? 'bg-[#e8f7ed] text-[#159653]'
                            : 'bg-[#eef1ed] text-[#69736b]'
                      }`}
                    >
                      {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
                      {Math.abs(item.change?.pct ?? 0).toLocaleString('en-US', {
                        maximumFractionDigits: 1,
                      })}
                      %
                    </span>
                  </div>
                </article>
              );
            })}
          </section>
        ) : (
          <p className="rounded-xl border border-[#e0e8e0] bg-[#fbfdfb] p-6 text-center text-sm text-[#788179]">
            এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
};

export default ProductList;
