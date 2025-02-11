'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { mockAccounts } from '../mockData/MockData';
import Header from '../header/Header';
import { AiOutlineLogout } from 'react-icons/ai';
import Image from 'next/image';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const userAccount = mockAccounts.find(account => account.holder.username === username);
    if (!userAccount) {
      setError('User not found');
      return;
    }
    if (userAccount.holder.password !== password) {
      setError('Invalid password');
      return;
    }
    // Store user data in localStorage
    localStorage.setItem('loggedInUser', JSON.stringify(userAccount));
    router.push('/dashboard');
  };

  const date = new Date();
  const hour = date.getHours();

  return (
    <div className="h-screen bg-[white]">
      <Header />
      <div className="pl-5 py-3 bg-[#f6f6f6] text-[#008751] flex items-center gap-2 border-t border-b">
        <AiOutlineLogout className="-rotate-90" />
        <p>Login</p>
      </div>
      <div className="p-4">
        <div className="my-4 mt-2">{error && <p className="text-[20px] text-center w-full rounded-md flex items-center justify-center text-red-600">{error}</p>}</div>

        <div className="bg-white rounded-xl w-full py-7 pt-0">
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="Username" className="text-[#5c5c5c] text-[16px]">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  className="p-4 py-3 rounded-[8px] text-[#5c5c5c] bg-transparent border border-gray-300 outline-none"
                  onChange={e => setUsername(e.target.value)}
                  placeholder="Contract number"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[#5c5c5c] text-[16px]">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="p-4 py-3 rounded-[8px] text-[#5c5c5c] bg-transparent border border-gray-300 outline-none"
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
              <div className="flex flex-col w-full items-center justify-between gap-2 mt-4">
                <button type="submit" className="p-4 py-3 bg-[#008751] w-full text-white font-semibold rounded-md">
                  Login
                </button>
              </div>
            </div>
          </form>
          <div className="mt-8" />
          <Image src="https://i.imgur.com/oN4vxpN.png" width={5000} height={5000} className="w-full" alt="logo" />
        </div>
      </div>
      <div className="w-full min-h-[70px] absolute bottom-0 z-50 flex px-[10px] p-[20px]">
        <p className="text-sm text-[#CCCCCC] text-center">© St.Galler Kantonalbank AG Legal notes, Limited access, Imprint (DE)</p>
      </div>
    </div>
  );
}
