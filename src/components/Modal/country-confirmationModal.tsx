"use client";

import { useRouter } from "next/navigation";

interface CountryConfirmationModalProps {
  isOpen: boolean;
  onDone: () => void;
}

export default function CountryConfirmationModal({
  isOpen,
  onDone,
}: CountryConfirmationModalProps) {
  if (!isOpen) return null;
  const navigate = useRouter();

  return (
    <div className="fixed  inset-0 z-1000 flex items-center justify-center bg-black/30 px-4 backdrop-blur-xs">
      <div className="w-full shadow-[#0000001A] max-w-sm md:max-w-lg bg-white rounded-[40px] p-6 space-y-10  text-center">
        <div className="w-full flex justify-end items-end">
          <button className="cursor-pointer" onClick={onDone}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="40" height="40" rx="20" fill="#EDEEF1" />
              <path
                d="M14.1667 14.167L25.8334 25.8337M14.1667 25.8337L20 20.0003L25.8334 14.167"
                stroke="#21015F"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <h2 className="font-cormorant text-xl md:text-2xl font-bold text-brand-purple2 ">
          Do you currently live in Nigeria?
        </h2>

        <div className="w-full flex items-center mb-5 justify-center gap-5">
          <button
            onClick={() => navigate.push("/waitlist")}
            className="relative sm:w-55 border border-[#00CC8D]  w-full  overflow-hidden  cursor-pointer font-sans text-base text-brand-navy h-16.25 font-medium px-11 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              No
            </span>
          </button>

          <button
            onClick={() => {
              navigate.push("/shop");
              onDone();
            }}
            className="relative sm:w-55 border border-[#00CC8D] bg-[#00CC8D]  w-full  overflow-hidden  cursor-pointer font-sans text-base text-brand-navy h-16.25 font-medium px-11 py-5 rounded-[47px] active:scale-95 transition-all  flex items-center justify-center group"
          >
            <span className="absolute inset-0 bg-brand-purple translate-y-full group-hover:translate-y-0 transition-transform duration-200 ease-out rounded-[47px]"></span>
            <span className="relative font-medium z-10 group-hover:text-white transition-colors duration-300">
              Yes
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
