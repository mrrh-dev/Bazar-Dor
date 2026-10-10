import Image from 'next/image';

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
const productitem = async () => {
  const res = await fetch(
    'https://openapi.programming-hero.com/api/bazardor/products',
  );
  if (!res.ok) throw new Error('fetching is not successful');
  return res.json();
};
const AllProducts = async () => {
  const product = await productitem();

  return (
    <div className="container mx-auto p-4">
      {/* Header */}
      <div className="mb-6 flex items-center gap-2 text-xl font-bold text-gray-800 border-b pb-2">
        <div>
          <p>সব পণ্য</p>
          <p className="text-sm text-gray-500 font-normal">
            মোট {product.length}টি পণ্য দেখানো হচ্ছে
          </p>
        </div>
      </div>

      {/* 1. Responsive Grid System for Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {product.map((item: Product) => (
          <div
            key={item.id}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
          >
            {/* Top Row: Product Image & Name */}
            <div className="flex items-start gap-4">
              <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center">
                <p>{item.image}</p>
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900 line-clamp-1">
                  {item.nameBn}
                </h3>
                <p className="text-xs font-medium text-gray-400 mt-0.5">
                  প্রতি কেজি
                </p>
              </div>
            </div>

            {/* Bottom Row: Price & Badge Indicators */}
            <div className="mt-6 flex items-end justify-between">
              <div>
                <p className="text-[11px] font-medium tracking-wider text-gray-400 uppercase">
                  আজকের দাম
                </p>
                <p className="text-xl font-extrabold text-gray-900 mt-0.5">
                  ৳{formatBengaliNumber(item.today)}
                </p>
              </div>

              {/* Price hike indicator badge */}
              <div
                className={`flex items-center gap-1 rounded-full ${item.change.dir === 'up' ? 'bg-red-50' : 'bg-green-50'} px-2.5 py-1 text-xs font-bold text-red-600`}
              >
                <span
                  className={
                    item.change.dir === 'up' ? 'text-red-600' : 'text-green-600'
                  }
                >
                  {item.change.dir === 'up' ? '▲' : '▼'}{' '}
                  {formatBengaliNumber(item.change.pct)} %
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
