'use client';
import { Button, Card, Input, Label, TextField } from '@heroui/react';
import Link from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import React from 'react';
import { signIn } from '@/lib/auth-client';
import { toast } from 'react-toastify';

const SignInPage = () => {
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const { data: resdata, error } = await signIn.email({
        email: String(data.email),
        password: String(data.password),
        rememberMe: true,
        callbackURL: '/',
      });

      if (error) {
        console.error('Sign-in failed:', error);
        toast(error.message || 'সাইন ইন করা যায়নি।');
        return;
      }

      console.log('Sign-in successful:', resdata);
      // Better Auth handles the callback URL after successful sign-in.
    } catch (error) {
      console.error('Unexpected sign-in error:', error);
      toast('কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: 'google',
        callbackURL: '/',
      });

      if (error) {
        console.error('Google sign-in failed:', error);
        toast(error.message || 'Google দিয়ে সাইন ইন করা যায়নি।');
      }
    } catch (error) {
      console.error('Google sign-in error:', error);
    }
  };

  const handleGitHubSignIn = async () => {
    try {
      const { error } = await signIn.social({
        provider: 'github',
        callbackURL: '/',
      });

      if (error) {
        console.error('GitHub sign-in failed:', error);
        toast(error.message || 'GitHub দিয়ে সাইন ইন করা যায়নি।');
      }
    } catch (error) {
      console.error('GitHub sign-in error:', error);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center bg-[#f0f5f0] px-4 py-12">
      {/* Heading */}
      <h1 className="text-2xl font-bold text-[#253027]">সাইন ইন</h1>
      <p className="mb-6 mt-1 text-xs text-[#69756c]">
        বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
      </p>

      {/* Form card */}
      <Card className="w-full max-w-md">
        <Card.Content>
          <form onSubmit={onSubmit} className="flex flex-col gap-4">
            <TextField name="email" type="email">
              <Label>ইমেইল</Label>
              <Input
                type="email"
                placeholder="you@example.com"
                className="w-full"
                required
              />
            </TextField>

            <TextField name="password" type="password">
              <Label>পাসওয়ার্ড</Label>
              <Input
                type="password"
                placeholder="আপনার পাসওয়ার্ড লিখুন"
                className="w-full"
                required
              />
            </TextField>

            <Button
              type="submit"
              className="w-full bg-green-700 font-semibold text-white"
            >
              সাইন ইন
            </Button>
          </form>

          <p className="text-center text-xs text-[#69756c]">অথবা</p>

          <div className="grid grid-cols-2 gap-6">
            <Button
              type="button"
              onClick={handleGoogleSignIn}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <FcGoogle />
              Google দিয়ে চালিয়ে যান
            </Button>

            <Button
              type="button"
              onClick={handleGitHubSignIn}
              variant="outline"
              size="sm"
              className="gap-2"
            >
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
