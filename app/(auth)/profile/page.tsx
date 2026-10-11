'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Button, Card, Input, Label, TextField } from '@heroui/react';
import { useSession, updateUser, signOut } from '@/lib/auth-client';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { Router } from 'next/router';
import { useRouter } from 'next/navigation';

const ProfilePage = () => {
  const { data: session, isPending } = useSession();
  const router = useRouter();
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [hasEditedName, setHasEditedName] = useState(false);

  const user = session?.user;

  // Use the current user's name unless they have edited the field.
  const displayedName = hasEditedName ? name : user?.name || '';

  const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!displayedName.trim()) {
      toast.error('নাম লিখুন।');
      return;
    }

    setIsSaving(true);

    try {
      const { error } = await updateUser({
        name: displayedName.trim(),
      });

      if (error) {
        toast.error(error.message || 'নাম আপডেট করা যায়নি।');
        return;
      }

      setName(displayedName.trim());
      setHasEditedName(false);
      toast.success('প্রোফাইল সফলভাবে আপডেট হয়েছে!');
    } catch (error) {
      console.error('Profile update failed:', error);
      toast.error('কিছু একটা সমস্যা হয়েছে। আবার চেষ্টা করুন।');
    } finally {
      setIsSaving(false);
    }
  };

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f0f5f0]">
        <p className="text-sm text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f0f5f0] px-4">
        <h1 className="text-xl font-bold text-[#253027]">
          আপনাকে সাইন ইন করতে হবে
        </h1>

        <p className="text-sm text-gray-600">
          আপনার প্রোফাইল দেখতে প্রথমে সাইন ইন করুন।
        </p>

        <Link href="/sign-in">
          <Button className="bg-green-700 text-white">সাইন ইন করুন</Button>
        </Link>
      </main>
    );
  }
  const handleSignOut = async () => {
    try {
      await signOut();
      //setIsMenuOpen(false);
      router.push('/');
      router.refresh();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10 md:py-16">
      <div className="mx-auto max-w-2xl">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#253027]">আমার প্রোফাইল</h1>

          <p className="mt-1 text-sm text-[#69756c]">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User information card */}
        <Card className="mb-4 border border-[#e1e9e1] bg-white shadow-none">
          <Card.Content>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex min-w-0 items-center gap-3">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt={user.name || 'Profile picture'}
                    width={64}
                    height={64}
                    unoptimized
                    className="h-16 w-16 shrink-0 rounded-xl object-cover"
                  />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-green-100 text-2xl font-bold text-green-800">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                )}

                <div className="min-w-0">
                  <h2 className="truncate text-base font-semibold text-[#253027]">
                    {user.name}
                  </h2>

                  <p className="break-all text-sm text-[#69756c]">
                    {user.email}
                  </p>
                </div>
              </div>

              <Link href="/">
                <Button
                  type="button"
                  variant="outline"
                  className="shrink-0 border-red-300 text-red-600"
                  onClick={handleSignOut}
                >
                  সাইন আউট
                </Button>
              </Link>
            </div>
          </Card.Content>
        </Card>

        {/* Edit profile form */}
        <Card className="border border-[#e1e9e1] bg-white shadow-none">
          <Card.Content>
            <h2 className="mb-5 text-lg font-semibold text-[#253027]">তথ্য</h2>

            <form
              onSubmit={handleUpdateProfile}
              className="flex flex-col gap-4"
            >
              <TextField name="name">
                <Label className="mb-1 text-sm text-[#253027]">নাম</Label>

                <Input
                  value={displayedName}
                  onChange={(e) => {
                    setName(e.target.value);
                    setHasEditedName(true);
                  }}
                  placeholder="আপনার নাম লিখুন"
                  className="w-full"
                  required
                />
              </TextField>

              <Button
                type="submit"
                isDisabled={isSaving}
                className="w-full bg-green-700 font-semibold text-white"
              >
                {isSaving ? 'আপডেট হচ্ছে...' : 'আপডেট'}
              </Button>
            </form>
          </Card.Content>
        </Card>
      </div>
    </main>
  );
};

export default ProfilePage;
