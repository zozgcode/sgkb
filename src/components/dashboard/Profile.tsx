'use client';

import { Account } from '@/utils/types';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { GoCheckCircleFill } from 'react-icons/go';
import { IoIosArrowBack } from 'react-icons/io';
import Loader from '../Loader';

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<Account | null>(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    } else {
      router.push('/');
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    router.push('/');
  };

  if (!user) {
    return <Loader />;
  }
  return (
    <div className="w-full h-screen bg-[#FAFAF8]">
      <div className="bg-white sticky top-0 z-10 p-3 py-5 flex items-center justify-between gap-1">
        <Link href="/dashboard" className="flex items-center gap-2">
          <IoIosArrowBack />
          <span className="text-[#252525] font-semibold">My Profile</span>
        </Link>
        <button onClick={handleLogout} className="p-3 py-2 rounded-lg border-none outline-none font-medium border bg-[#008751] text-white text-sm">
          Sign out
        </button>
      </div>
      <div className="p-4">
        <div className="bg-white text-sm rounded-lg p-5 py-7 flex flex-col items-center justify-center gap-8 mb-4">
          {user.holder.jointNames && <p>Joint Account</p>}

          {user.holder.jointNames ? (
            <div className="flex w-full justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Full Name</span>
              <span className="uppercase text-[#252525] text-right font-medium w-[200px]">
                {user.holder.firstName}&nbsp;{user.holder.jointNames}
              </span>
            </div>
          ) : (
            <div className="flex w-full justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Full Name</span>
              <span className="uppercase text-[#252525] font-medium truncate max-w-[200px] sm:max-w-full">
                {user.holder.firstName}&nbsp;{user.holder.lastName}
              </span>
            </div>
          )}

          {user.holder.mobileNumber && (
            <div className="flex w-full justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Phone</span>
              <span className="text-[#252525] font-medium flex items-center gap-1">{user.holder.mobileNumber}</span>
            </div>
          )}
          {user.holder.email && (
            <div className="flex w-full justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Email</span>
              <span className="text-[#252525] font-medium flex items-center gap-1">
                <span className="bg-[#008751]/30 text-black text-xs p-2 py-1 rounded-lg flex items-center gap-1">
                  Verified <GoCheckCircleFill />
                </span>
                <span>{user.holder.email}</span>
              </span>
            </div>
          )}
          {user.bank_details.account_number && (
            <div className="w-full flex justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Account Number</span>
              <span className="text-[#252525] font-medium flex items-center gap-1">{user.bank_details.account_number_text}</span>
            </div>
          )}
          {/* {user.bank_details.routing_number && (
            <div className="w-full flex justify-between items-center">
              <span className="text-[#3f3f3f] font-normal">Routing Number</span>
              <span className="text-[#252525] font-medium flex items-center gap-1">{user.bank_details.routing_number}</span>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
