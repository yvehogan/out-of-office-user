"use client";

import { COUNTRIES, Country, PhoneInputProps } from "@/lib/data/countries-data";
import { useEffect, useRef, useState } from "react";

function PhoneInput({
  value,
  onChange,
  defaultCountry = "NG",
}: PhoneInputProps) {
  const [selected, setSelected] = useState<Country>(
    () =>
      COUNTRIES.find((c) => c.code === defaultCountry) ??
      COUNTRIES.find((c) => c.code === "NG")!,
  );
  const [open, setOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = COUNTRIES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.dialCode.includes(search),
  );

  useEffect(() => {
    if (open && searchRef.current) searchRef.current.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: globalThis.MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (country: Country) => {
    setSelected(country);
    setOpen(false);
    setSearch("");
  };

  return (
    <div
      className="w-full flex items-center  h-12.5 p-4 cursor-pointer rounded-[40px] border border-[#667085] bg-white text-sm text-[#1A1A1A] placeholder-[#9CA3AF] focus:outline-none focus:border-brand-purple focus:ring-2 focus:ring-brand-purple  hover:border-brand-purple hover:ring-2 hover:ring-brand-purple  transition-all"
      //   className="relative flex items-center w-full rounded-full border border-gray-200 bg-white focus-within:border-indigo-400 focus-within:ring-2 focus-within:ring-indigo-100 transition-all"
    >
      {/* Country selector trigger */}
      <div ref={dropdownRef} className="relative shrink-0">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex items-center cursor-pointer bg-[#F2F4F7] pl-1.5 gap-1 p-1 rounded-lg focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={open}
        >
          <span className="text-xl leading-none ">{selected.flag}</span>
          <svg
            className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        {/* Dropdown */}
        {open && (
          <div className="absolute z-50 left-0 top-full mt-2 w-64 rounded-2xl bg-white border border-gray-100 shadow-xl overflow-hidden">
            {/* Search */}
            <div className="p-2 border-b border-gray-100">
              <input
                ref={searchRef}
                type="text"
                placeholder="Search country…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-sm px-3 py-2 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-indigo-400 placeholder-gray-400"
              />
            </div>
            {/* List */}
            <ul
              role="listbox"
              className="max-h-52 overflow-y-auto divide-y divide-gray-50"
            >
              {filtered.length === 0 ? (
                <li className="px-4 py-3 text-sm text-gray-400 text-center">
                  No results
                </li>
              ) : (
                filtered.map((country) => (
                  <li
                    key={country.code}
                    role="option"
                    aria-selected={selected.code === country.code}
                    onClick={() => select(country)}
                    className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer text-sm transition-colors ${
                      selected.code === country.code
                        ? "bg-indigo-50 text-indigo-700 font-medium"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-lg leading-none">{country.flag}</span>
                    <span className="flex-1 truncate">{country.name}</span>
                    <span className="text-gray-400 text-xs">
                      {country.dialCode}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>

      {/* Divider */}
      {/* <span className="w-px h-5 bg-gray-200 shrink-0" /> */}

      {/* Dial code + number */}
      <div className="flex items-center flex-1 min-w-0">
        <span className="pl-3 pr-1   text-gray-500 text-sm font-medium whitespace-nowrap">
          {selected.dialCode}
        </span>
        <input
          type="tel"
          inputMode="numeric"
          //   placeholder="Phone number"
          value={value}
          onChange={(e) => {
            // Only allow numeric characters
            const numericValue = e.target.value.replace(/\D/g, "");
            onChange(numericValue);
          }}
          onKeyPress={(e) => {
            // Prevent non-numeric key presses
            if (!/[0-9]/.test(e.key)) {
              e.preventDefault();
            }
          }}
          className="flex-1 min-w-0 bg-transparent pr-4 py-4 text-sm text-gray-800 placeholder-gray-400 focus:outline-none"
        />
      </div>
    </div>
  );
}

export default PhoneInput;
