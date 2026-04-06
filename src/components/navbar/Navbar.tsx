"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full bg-[#F5F2EB] border-b border-[#D6D2C8]">
      <div className="max-w-6xl mx-auto h-[80px] flex items-center justify-between px-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 select-none group"
        >
          {/* Logo mark */}
          <div className="w-9 h-9 rounded-[10px] bg-[#1a72e8] flex items-center justify-center shadow-sm">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="10" cy="10" r="7" stroke="white" strokeWidth="2" />
              <path
                d="M10 6v4l3 3"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <span className="text-[22px] font-bold tracking-tight text-gray-900 group-hover:text-[#1a72e8] transition-colors duration-150">
            Logo
          </span>
        </Link>

        {/* Right side nav items */}
        <div className="flex items-center gap-1">
          {/* History */}
          <Link
            href="/history"
            className={`relative flex items-center gap-1.5 px-4 py-2 rounded-[8px] text-[16px] font-medium transition-all duration-150 ${
              pathname === "/history"
                ? "text-[#1a72e8] bg-blue-50"
                : "text-[#444] hover:text-gray-900 hover:bg-[#EAE7DF]"
            }`}
          >
            {/* History icon */}
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="flex-shrink-0"
            >
              <path
                d="M8 1.5A6.5 6.5 0 1 1 1.5 8H1"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <path
                d="M1 5.5L1.5 8L4 6.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 4.5V8l2.5 2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            History
            {/* Active underline */}
            {pathname === "/history" && (
              <span className="absolute bottom-1 left-4 right-4 h-[2px] rounded-full bg-[#1a72e8]" />
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;