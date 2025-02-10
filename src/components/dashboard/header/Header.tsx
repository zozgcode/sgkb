'use client';

import Image from 'next/image';
import React, { useState } from 'react';
import { RiLogoutCircleLine } from 'react-icons/ri';

const getFormattedDate = () => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric'
  };
  const today = new Date();
  return today.toLocaleDateString('en-US', options);
};

export default function Header({ handleLogout, user }: any) {
  const [open, setOpen] = useState(false);

  const toggleNav = () => {
    setOpen(!open);
  };

  const formattedDate = getFormattedDate();

  return (
    <div className="w-full min-h-[210px] bg-[#008751] p-[20px] py-[15px]">
      <div className="w-full relative flex items-center justify-between">
        <Image src="https://i.imgur.com/cGheTbj.png" width={230} height={28} className="w-[170px]" alt="logo" />
        <div className="relative">
          <RiLogoutCircleLine className="text-2xl text-white" onClick={toggleNav} />
          {open && (
            <div className="absolute mt-1 z-50 shadow bg-white border py-2 rounded-md right-0 flex flex-col justify-center gap-[5px]">
              {/* <p className="text-[14px] px-[15px] py-[5px] whitespace-nowrap font-medium text-[#008751]">
                {user.holder.firstName}&nbsp;{user.holder.lastName}
              </p> */}
              <p className="text-[14px] m-1 px-[15px] text-center rounded-md py-[5px] bg-[#008751] border whitespace-nowrap text-white" onClick={handleLogout}>
                Sign out
              </p>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-8 text-white">
        <span>{formattedDate}</span>
        {user.holder.jointNames ? (
          <span className="font-medium text-lg">
            Welcome, <br /> {user.holder.jointNames}
          </span>
        ) : (
          <span className="font-medium text-lg">Welcome, {user.holder.firstName}</span>
        )}
      </div>
    </div>
  );
}
