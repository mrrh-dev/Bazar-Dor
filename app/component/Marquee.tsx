import React from 'react';
import MarqueeText from 'react-marquee-text';
import 'react-marquee-text/dist/styles.css';
interface Product {
  id: number;
  image: string;
  nameBn: string;
  today: number;
  //unit: string;
  change: {
    dir: string;
    pct: number;
  };
}

const formatBengaliNumber = (amount: number) => {
  return new Intl.NumberFormat('bn-BD').format(amount);
};
const marquee = async () => {
  const res = await fetch('https://api.abcz.workers.dev/api/bazardor/products');
  if (!res.ok) throw new Error('fetching is not successful');
  return res.json();
};
const Marquee = async () => {
  const productini = await marquee();
  const product = productini.slice(0, 15);
  return (
    <div className="w-full border-b border-gray-200 bg-gray-50 py-2 dark:border-gray-800 dark:bg-gray-800">
      <MarqueeText direction="right" duration={10}>
        {product.map((item: Product) => (
          <span key={item.id} className="mx-6 inline-flex items-center gap-2">
            <span>{item.image}</span>
            <span>{item.nameBn}</span>
            <span>{formatBengaliNumber(item.today)} টাকা / কেজি</span>
            <span>
              <span
                className={
                  item.change.dir === 'up' ? 'text-green-600' : 'text-red-600'
                }
              >
                {item.change.dir === 'up' ? '▲' : '▼'} {item.change.pct}
              </span>
            </span>
          </span>
        ))}
      </MarqueeText>
    </div>
  );
};

export default Marquee;
// sticky top-0 z-50 border-b border-gray-200 p-2
