import { Button } from '@heroui/react';
import Image from 'next/image';
import Link from 'next/link';

const date = new Date().toLocaleString('bn-BD', {
  dateStyle: 'full',
});

const Banner = () => {
  return (
    <div className="container mx-auto px-4 py-10 md:py-16">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-10 lg:p-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-10 md:gap-6">
          <div className="w-full lg:w-1/2 text-center lg:text-left -mt-4">
            <p className="text-green-400 text-xs mb-3 sm:text-sm font-bold ">
              {date}
            </p>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold leading-tight">
              আজকের বাজারের দাম এক নজরে
            </h1>
            <p className="mt-4 sm:mt-5 text-gray-500 text-sm sm:text-base leading-relaxed max-w-[500px] mx-auto lg:mx-0">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-8">
              <Link href="/">
                {/* <button className="px-6 py-3 text-sm font-semibold text-black rounded-2xl bg-green-700 hover:opacity-95 shadow-sm">
                  BROWSE WORKOUTS
                </button> */}
                <Button className="bg-green-700">সব পণ্য দেখুন</Button>
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
            <div className="relative w-full -mt-6 max-w-[320px] sm:max-w-[380px] lg:max-w-[420px] h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px]">
              <Image
                src="/bazar-hero.png"
                alt="banner img"
                fill
                className="object-contain"
              ></Image>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
/* 
<div className='container mx-auto px-4 py-10 md:py-16'>
      <div>
        <h1>{date}</h1>
        <h1>আজকের বাজারের দাম এক নজরে</h1>
        <p>
          চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
          বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
        </p>
        <Button className="bg-green-700">সব পণ্য দেখুন</Button>
      </div>
      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
        <div>
        <Image
          src="/bazar-hero.png"
          alt="hero image"
          width={100}
          height={100}
        ></Image>
      </div>
      </div>
    </div>

*/
