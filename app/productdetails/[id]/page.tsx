import Link from 'next/link';
import React from 'react';
export interface Paramsprops {
  params: Promise<{ id: string }>;
}

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  nameBn: string;
  category: string;
  categoryNameBn: string;
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
  markets: Market[];
}

const ProductDetailsPage = async ({ params }: Paramsprops) => {
  const { id } = await params;
  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${id}`,
  );
  const product: Product = await res.json();
  console.log('product', product);
  const isUp = product.change?.dir === 'up';
  const isDown = product.change?.dir === 'down';

  const formatBn = (n: number) =>
    new Intl.NumberFormat('bn-BD', { maximumFractionDigits: 0 }).format(n);

  const markets = product.markets ?? [];
  const hasMarkets = markets.length > 0;

  // Lowest = smallest "min" across markets, highest = largest "max"
  const lowestPrice = hasMarkets
    ? Math.min(...markets.map((m) => m.min))
    : null;
  const highestPrice = hasMarkets
    ? Math.max(...markets.map((m) => m.max))
    : null;

  // Average = mean of each market's (min + max) / 2
  const averagePrice = hasMarkets
    ? markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
    : null;
  return (
    <main className=" bg-[#f0f5f0] py-4 px-4 ">
      <div className="container mx-auto space-y-4">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-xs text-[#68746b]">
          <Link href={'/'}>
            <span>হোম</span>
          </Link>
          <span>›</span>
          <span>{product.categoryNameBn}</span>
          <span>›</span>
          <span>{product.nameBn}</span>
        </nav>

        {/* Product Overview */}
        <section className="flex flex-col justify-between gap-4 rounded-xl border border-[#e1e9e1] bg-[#fbfdfb] p-3 sm:flex-row sm:items-center sm:p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#f0f4ef] text-3xl">
              {product.image || '🍚'}
            </div>

            <div>
              <h1 className="text-xl font-bold text-[#253027] sm:text-2xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-xs text-[#69756c]">
                {product.categoryNameBn} · {product.unit}
              </p>

              <p className="mt-2 text-xs text-[#69756c]">
                গতকালের তুলনায় আজকের দামের পরিবর্তন
              </p>
            </div>
          </div>

          {/* Today's Price */}
          <div className="flex flex-col items-center justify-center rounded-xl bg-[#f0f5f0] px-4 py-3">
            <p className="text-[10px] text-[#788179]">আজকের দাম</p>

            <p className="text-2xl font-bold text-[#253027]">{product.today}</p>

            <p className="text-xs text-[#69756c]">টাকা / {product.unit}</p>

            <p
              className={`mt-1 text-xs font-semibold ${
                isUp
                  ? 'text-red-600'
                  : isDown
                    ? 'text-green-600'
                    : 'text-gray-500'
              }`}
            >
              {isUp ? '▲' : isDown ? '▼' : '—'}{' '}
              {Math.abs(product.change?.pct ?? 0)}%
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <h2 className="mb-3 text-sm font-bold text-[#29352c]">
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 gap-2  sm:grid-cols-3">
          {/* Lowest */}
          <div className="rounded-xl border bg-white border-[#e4ebe4] p-3">
            <p className="text-[10px] text-[#6e796f]">সর্বনিম্ন দাম</p>
            <p className="mt-1 text-base font-bold text-green-600">
              {lowestPrice !== null ? `${formatBn(lowestPrice)} টাকা` : '—'}
            </p>
            <p className="text-[10px] text-[#7b857c]">সবচেয়ে কম দামের বাজার</p>
          </div>

          {/* Highest */}
          <div className="rounded-xl bg-white border border-[#e4ebe4] p-3">
            <p className="text-[10px] text-[#6e796f]">সর্বাধিক দাম</p>
            <p className="mt-1 text-base font-bold text-red-600">
              {highestPrice !== null ? `${formatBn(highestPrice)} টাকা` : '—'}
            </p>
            <p className="text-[10px] text-[#7b857c]">
              সবচেয়ে বেশি দামের বাজার
            </p>
          </div>

          {/* Average */}
          <div className="rounded-xl bg-white border border-[#e4ebe4] p-3">
            <p className="text-[10px] text-[#6e796f]">গড় দাম</p>
            <p className="mt-1 text-base font-bold text-green-700">
              {averagePrice !== null ? `${formatBn(averagePrice)} টাকা` : '—'}
            </p>
            <p className="text-[10px] text-[#7b857c]">
              প্রতি {product.unit}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Market Prices */}
        <h2 className="mb-3 mt-5 text-sm font-bold text-[#29352c]">
          বাজারভিত্তিক আজকের দাম
        </h2>

        {product.markets && product.markets.length > 0 ? (
          <div className="overflow-x-auto rounded-xl border border-[#e1e9e1]">
            <table className="w-full min-w-[600px] border-collapse text-left text-xs">
              <thead className="bg-[#f7faf7] text-[#68746b]">
                <tr>
                  <th className="px-3 py-3 font-medium">বাজার</th>
                  <th className="px-3 py-3 font-medium">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-medium">
                    সর্বনিম্ন
                  </th>
                  <th className="px-3 py-3 text-right font-medium">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-medium">গড়</th>
                </tr>
              </thead>

              <tbody>
                {product.markets.map((market, index) => (
                  <tr
                    key={`${market.market}-${index}`}
                    className="border-t border-[#e1e9e1] odd:bg-[#fbfdfb] even:bg-[#f0f5f0]"
                  >
                    <td className="px-3 py-3 font-medium text-[#303b32]">
                      {market.market}
                    </td>

                    <td className="px-3 py-3 text-[#566258]">
                      {market.division}
                    </td>

                    <td className="px-3 py-3 text-right text-[#566258]">
                      {market.min} টাকা
                    </td>

                    <td className="px-3 py-3 text-right text-[#566258]">
                      {market.max} টাকা
                    </td>

                    <td className="px-3 py-3 text-right font-semibold text-[#263229]">
                      {((market.min + market.max) / 2).toLocaleString('en-US', {
                        maximumFractionDigits: 2,
                      })}{' '}
                      টাকা
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="rounded-lg bg-[#f0f5f0] p-4 text-sm text-[#68746b]">
            এই পণ্যের বাজারভিত্তিক দাম পাওয়া যায়নি।
          </p>
        )}
      </div>
    </main>
  );
};

export default ProductDetailsPage;
