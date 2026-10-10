import { Button, Card, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import React from 'react';

const SignInPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-12">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#253027]">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-xs text-[#69756c]">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      {/* Form card */}
      <Card className="w-full max-w-md">
        <Card.Content className="flex flex-col gap-4 p-5">
          <TextField name="email" type="email">
            <Label>ইমেইল</Label>
            <Input placeholder="you@example.com" className="w-full" />
          </TextField>

          <TextField name="password" type="password">
            <Label>পাসওয়ার্ড</Label>
            <Input placeholder="কমপক্ষে ৮ অক্ষর" className="w-full" />
          </TextField>

          <Button className="w-full bg-green-700 font-semibold text-white">
            সাইন ইন
          </Button>

          <p className="text-center text-xs text-[#69756c]">অথবা</p>

          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline" size="sm" className="gap-2">
              <FcGoogle />
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button variant="outline" size="sm" className="gap-2">
              <FaGithub />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="text-center text-xs text-[#69756c]">
            অ্যাকাউন্ট নেই?{' '}
            <Link href="/sign-up" className="font-medium text-green-700">
              সাইন আপ করুন
            </Link>
          </p>
        </Card.Content>
      </Card>
      <Link className="mt-6" href="/">
        <p className="text-sm text-gray-500">← হোম পেজে ফিরে যান</p>
      </Link>
    </main>
  );
};

export default SignInPage;
