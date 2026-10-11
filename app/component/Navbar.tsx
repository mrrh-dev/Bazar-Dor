'use client';

import { Button, Spinner } from '@heroui/react';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import NavLinks from './NavLinks';
import { signOut, useSession } from '@/lib/auth-client';

const Navbar = ({ navLinks }: { navLinks: React.ReactNode }) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const date = new Date().toLocaleString('bn-BD', {
    dateStyle: 'full',
  });

  const user = session?.user;

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white dark:bg-gray-900">
      <div className="border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between px-4 py-4 md:py-5">
          {/* Website logo and name */}
          <Link href="/" className="flex items-center gap-4">
            <div className="rounded-xl bg-green-700 p-2">
              <p>🛒</p>
            </div>

            <div>
              <h1 className="font-semibold">বাজার দর</h1>
              <p>{date}</p>
            </div>
          </Link>

          {/* Authentication section */}
          <div className="relative flex items-center gap-2">
            {isPending ? (
              <Spinner size="sm" />
            ) : user ? (
              <>
                {/* Signed-in user's name and picture */}
                <button
                  type="button"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                  aria-expanded={isMenuOpen}
                  aria-label="Open user menu"
                >
                  {user.image ? (
                    <img
                      src={user.image}
                      alt={user.name || 'User'}
                      className="h-9 w-9 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700 font-semibold text-white">
                      {user.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                  )}

                  <span className="max-w-28 truncate text-sm">
                    {user.name || 'User'}
                  </span>

                  <span className="text-xs">⌄</span>
                </button>

                {/* Dropdown menu */}
                {isMenuOpen && (
                  <div className="absolute right-0 top-full z-50 mt-3 w-64 rounded-xl border border-gray-200 bg-white p-3 text-gray-800 shadow-lg dark:border-gray-700 dark:bg-white dark:text-white">
                    <div className="border-b border-gray-200 px-3 py-3 dark:border-gray-700">
                      <p className="truncate text-sm font-semibold">
                        {user.name}
                      </p>
                      <p className="truncate text-xs text-gray-500">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/profile"
                      onClick={() => setIsMenuOpen(false)}
                      className="mt-2 block rounded-lg px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      👤 আমার প্রোফাইল
                    </Link>

                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="mt-1 w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-gray-800"
                    >
                      ↩ সাইন আউট
                    </button>
                  </div>
                )}
              </>
            ) : (
              <>
                <Link href="/sign-in">
                  <Button className="bg-white text-black">সাইন ইন</Button>
                </Link>

                <Link href="/sign-up">
                  <Button className="bg-green-700 text-white">সাইন আপ</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {navLinks}
    </nav>
  );
};

export default Navbar;
