'use client';
import { Button, Card, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import React from 'react';
import { signIn, signUp } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const SignUpPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    // Check whether passwords match
    if (data.password !== data.confirmPassword) {
      toast('পাসওয়ার্ড দুটি মিলছে না!');
      return;
    }

    try {
      const { data: resData, error } = await signUp.email({
        name: String(data.name),
        email: String(data.email),
        password: String(data.password),
      });

      if (error) {
        console.error('Sign-up failed:', error);
        toast(error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি।');
        return;
      }

      console.log('Account created successfully:', resData);
      toast('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
    } catch (error) {
      console.error('Unexpected sign-up error:', error);
      toast('কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };
  const handlegooglesignin = async () => {
    const resData = await signIn.social({
      provider: 'google',
    });
    console.log('after sign in', resData);
  };
  const handlegithubsignin = async () => {
    const resData1 = await signIn.social({
      provider: 'github',
    });
    console.log('after sign in', resData1);
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-12">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#253027]">
        অ্যাকাউন্ট তৈরি করুন
      </h1>
      <p className="mb-6 mt-1 text-xs text-[#69756c]">
        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
      </p>

      {/* Form card */}
      <Card className="w-full max-w-md">
        <Card.Content>
          <form onSubmit={onSubmit} className="flex flex-col gap-4 p-5">
            <TextField name="name">
              <Label>নাম</Label>
              <Input
                placeholder="যেমন: রহিম উদ্দিন"
                className="w-full"
                required
              />
            </TextField>

            <TextField name="email" type="email">
              <Label>ইমেইল</Label>
              <Input
                placeholder="you@example.com"
                className="w-full"
                required
              />
            </TextField>

            <TextField name="password" type="password">
              <Label>পাসওয়ার্ড</Label>
              <Input
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full"
                required
              />
            </TextField>

            <TextField name="confirmPassword" type="password">
              <Label>পাসওয়ার্ড নিশ্চিত করুন</Label>
              <Input placeholder="আবার লিখুন" className="w-full" required />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-green-700 font-semibold text-white"
            >
              অ্যাকাউন্ট তৈরি করুন
            </Button>
          </form>

          <p className="text-center text-xs text-[#69756c]">অথবা</p>

          <div className="grid grid-cols-2 gap-6">
            <Button
              onClick={handlegooglesignin}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FcGoogle />
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              onClick={handlegithubsignin}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FaGithub />
              GitHub দিয়ে চালিয়ে যান
            </Button>
          </div>

          <p className="text-center text-xs text-[#69756c]">
            অ্যাকাউন্ট আছে?{' '}
            <Link href="/sign-in" className="font-medium text-green-700">
              সাইন ইন করুন
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

export default SignUpPage;
