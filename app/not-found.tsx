import Link from 'next/link';
import React from 'react';

const Not_found = () => {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div>
        <h1 className="text-5xl">Pages Not Found</h1>
      </div>
      <div>
        <Link href="/">
          {' '}
          <p>হোম পেজে ফিরে যান</p>
        </Link>
      </div>
    </div>
  );
};

export default Not_found;
