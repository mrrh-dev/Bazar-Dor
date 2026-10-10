import { Button } from '@heroui/react';
import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import Link from 'next/link';

const Navbar = () => {
  const date = new Date().toLocaleString('bn-BD', {
    dateStyle: 'full',
  });

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200">
        <div className="container mx-auto flex justify-between items-center px-4 py-4 md:py-5">
          <Link href="/">
            <div className="flex justify-between items-center gap-4">
              <div>
                <Image
                  src="/logo-icon.png"
                  width={40}
                  height={40}
                  alt="logo image"
                  className="bg-green-700 rounded-xl p-2"
                ></Image>
              </div>
              <div>
                <h1>বাজার দর</h1>
                <p>{date}</p>
              </div>
            </div>
          </Link>
          <div className="flex justify-between">
            <Button className="bg-white text-black">সাইন ইন</Button>
            <Button className="bg-green-700">সাইন আপ</Button>
          </div>
        </div>
      </div>
      <NavLinks></NavLinks>
    </nav>
  );
};

export default Navbar;
