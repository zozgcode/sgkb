'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Account, Transaction } from '@/utils/types';
import Link from 'next/link';
import TransactionHistory from './TransactionHistory';
import Header from './header/Header';
import { formatCurrency } from '../formatCurrency';
import { IoIosArrowForward } from 'react-icons/io';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import Loader from '../Loader';
import { BillIcon, CardIcon } from '../svgIcons';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<Account | null>(null);
  const [hideBalance, setSideBalance] = useState(false);

  const toggleHideBalance = () => {
    setSideBalance(true);
  };

  const toggleShowBalance = () => {
    setSideBalance(false);
  };

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

  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="relative">
      <Header handleLogout={handleLogout} user={user} />
      <div className="flex flex-col relative -top-[20px] rounded-3xl pt-5 bg-white">
        {/* <div className="absolute w-full min-h-[50px] -top-[20%] bg-white rounded-t-3xl"></div> */}
        <div className="px-[16px] mb-4 relative z-10">
          {user.bank_details.account_type2 == 'saving_account' ? (
            <div className="flex flex-col justify-between gap-4 bg-white text-white p-4 rounded-lg">
              <div className="flex justify-between gap-6">
                <div className="flex flex-col">
                  <span className="text-[14px] flex items-center gap-1">
                    Current Balance
                    {hideBalance ? <FiEyeOff onClick={toggleShowBalance} /> : <FiEye onClick={toggleHideBalance} />}
                  </span>

                  <span className="font-[400] text-[20px] mt-1">{hideBalance ? '******' : `${formatCurrency(user.bank_details.balance_usd)}`}</span>
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="/dashboard/transactions" className="text-[14px] flex items-center gap-1">
                    <span>Transaction History</span> <IoIosArrowForward className="relative top-[2px]" />
                  </Link>
                </div>
              </div>
              <hr className="border border-[#f3525a]" />
              <div className="flex justify-between gap-6">
                <div className="">
                  <span className="text-[14px] flex items-center gap-1">Saving Balance</span>
                  <span className="font-[400] text-[20px] mt-1">{hideBalance ? '******' : formatCurrency(user.bank_details.saving_balance_usd ?? 0)}</span>{' '}
                </div>
                <div className="flex flex-col gap-5">
                  <Link href="/dashboard/transfer" className="p-[5px_20px] flex rounded-full bg-white text-[#008751] text-[14px]">
                    Send money
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="border flex flex-col gap-6 bg-[#ffffff] text-black p-4 rounded-xl">
              <div className="flex items-start justify-between">
                <div className="">
                  <span className="text-[14px] flex items-center gap-1">
                    Available balance
                    {hideBalance ? <FiEyeOff onClick={toggleShowBalance} /> : <FiEye onClick={toggleHideBalance} />}
                  </span>
                  <span className="font-[400] text-[20px]">{hideBalance ? '******' : `${formatCurrency(user.bank_details.balance_usd)}`}</span>
                </div>

                <Link href="/dashboard/transactions" className="text-[14px] flex items-center gap-1">
                  <span>Transaction History</span> <IoIosArrowForward className="relative top-[2px]" />
                </Link>
              </div>
              <div className="flex items-center justify-between">
                <div className="">
                  <span className="text-[14px] flex items-center gap-1">Ledger balance</span>
                  <span className="font-[400] text-[20px]">{hideBalance ? '******' : `${formatCurrency(user.bank_details.ledger_bal ?? 0)}`}</span>
                </div>
                <Link href="/dashboard/transfer" className="p-[5px_20px] border border-[#008751]/20 rounded-full bg-white text-[#008751] text-[14px]">
                  Send money
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="p-[16px] hidden border py-8">
          <div className="flex items-center justify-center gap-3">
            <Link href="/dashboard/cards" className="border flex items-center gap-1 p-4 py-2 text-[13px] max-w-max bg-white text-[#008751] rounded-full">
              <CardIcon className="w-5 h-5" /> <span>Cards</span>
            </Link>
            <Link href="/dashboard/bill-payment" className="border flex items-center gap-1 p-4 py-2 text-[13px] max-w-max bg-white text-[#008751] rounded-full">
              <BillIcon className="w-5 h-5" />
              <span>Pay Bills</span>
            </Link>
          </div>
        </div>
        <TransactionHistory user={user} hideBalance={hideBalance} />
      </div>
    </div>
  );
}
