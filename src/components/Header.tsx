"use client";
import { useState } from "react";
import Link from "next/link";
import ProtectedRouteLink from "./ProtectedRouteLink";
import { User } from "@supabase/supabase-js";

interface HeaderProps {
  user: User | null;
}

function Header({ user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className="bg-zinc-900 w-32 h-full flex flex-col items-center fixed right-0 top-0"
      data-disableselect="true"
    >
      <button
        className="text-white mt-4 mb-2 focus:outline-none"
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        )}
      </button>
      <nav
        className={`flex flex-col gap-4 overflow-hidden transition-max-height duration-300 ease-out ${
          isMenuOpen ? "max-h-60" : "max-h-0"
        }`}
      >
        <Link href="/" className="hover:text-emerald-600">
          Home
        </Link>
        <ProtectedRouteLink href="/protected-route" user={user}>
          Protected Route
        </ProtectedRouteLink>
        <ProtectedRouteLink href="/SyllabusPage" user={user}>
          SyllabusPage
        </ProtectedRouteLink>
        <Link href="/login" className="hover:text-emerald-600">
          Login
        </Link>
      </nav>
    </header>
  );
}

export default Header;
