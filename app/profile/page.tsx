'use client';

import { FiEdit } from 'react-icons/fi';
import React, { useState } from 'react';
import { getLoggedUser } from '@/lib/firebase/firebaseActions';
import { User } from 'firebase/auth';
import { usePathname, useRouter } from 'next/navigation';
import { useCheckUserValidity } from '@/lib/hooks';

export default function Profile() {
  const [user] = useState<User | null>(getLoggedUser());
  const router = useRouter();
  const pathname = usePathname();

  useCheckUserValidity();

  const handleEditProfile = () => {
    router.push(`${pathname}/edit`);
  };

  return (
    <div>
      <h1 className="text-3xl font-medium">Profile</h1>
      <div className="mt-8 flex w-full flex-col items-start">
        <p>Username: {user?.displayName}</p>
        <p>Email: {user?.email}</p>
        <p>UID: {user?.uid}</p>
        <button
          onClick={handleEditProfile}
          className="mt-8 flex items-center self-end text-blue-500 transition-colors duration-300 hover:text-blue-600"
        >
          <FiEdit className="mr-2" />
          Edit Profile
        </button>
      </div>
    </div>
  );
}
