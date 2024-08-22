"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

function DesktopNavLinks() {
  return (
    <ul className="absolute flex flex-row items-center justify-between container">
      <ul className="flex space-x-6 ms-5">
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/">Home</Link>
        </li>
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/wrestlers">Wrestlers</Link>
        </li>
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/catalogs">Catalogs</Link>
        </li>
      </ul>
      <ul className="flex flex-grow justify-center">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="logo"
            width={192}
            height={52}
            className=""
          />
        </Link>
      </ul>
      <ul className="flex space-x-6 me-5">
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/custom-order">Custom Order</Link>
        </li>
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="text-xl md:text-lg sm:text-sm text-gray-400 hover:text-gray-700">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </ul>
  );
}

function HamburgerMenu({ onClick }) {
  return (
    <button
      className="absolute right-2 top-2 p-2 text-4xl text-white bg-primary rounded-md my-4 z-30"
      onClick={onClick}
    >
      <svg
        className="w-5 h-5"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 17 14"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
}

function MobileDrawer({ isOpen, onClose }) {
  return (
    <div
      className={`fixed flex flex-col justify-center items-center z-10 top-0 right-0 h-full w-full bg-black text-gray-500 transition-transform duration-300 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        className="absolute right-7 top-4 p-3 text-black"
        onClick={onClose}
      >
        <svg
          width={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 384 512"
        >
          {/* !Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc. */}
          <path d="M376.6 84.5c11.3-13.6 9.5-33.8-4.1-45.1s-33.8-9.5-45.1 4.1L192 206 56.6 43.5C45.3 29.9 25.1 28.1 11.5 39.4S-3.9 70.9 7.4 84.5L150.3 256 7.4 427.5c-11.3 13.6-9.5 33.8 4.1 45.1s33.8 9.5 45.1-4.1L192 306 327.4 468.5c11.3 13.6 31.5 15.4 45.1 4.1s15.4-31.5 4.1-45.1L233.7 256 376.6 84.5z" />
        </svg>
      </button>
      <ul className="flex flex-col items-center space-y-4 h-full pt-24 justify-around">
        <li className="text-3xl hover:text-gray-400">
          <Link href="/">Home</Link>
        </li>
        <li className="text-3xl hover:text-gray-400">
          <Link href="/wrestlers">Wrestlers</Link>
        </li>
        <li className="text-3xl hover:text-gray-400">
          <Link href="/catalog">Catalogs</Link>
        </li>
        <li className="text-3xl hover:text-gray-400">
          <Link href="/custom-order">Custom Order</Link>
        </li>
        <li className="text-3xl hover:text-gray-400">
          <Link href="/contact">Contact</Link>
        </li>
        <li className="text-3xl hover:text-gray-400">
          <Link href="/cart">Cart</Link>
        </li>
      </ul>
    </div>
  );
}

export default function Header() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const pathname = usePathname();

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    setIsDrawerOpen(false);
  }, [pathname]);

  return (
    <div className="bg-black uppercase fixed top-0 w-full shadow-md z-10">
      <div className="hidden relative py-10 sm:flex flex-col justify-center  container mx-auto">
        <DesktopNavLinks />
      </div>
      <div className="sm:hidden relative py-4 px-2 flex flex-row h-full justify-center">
        <Link href="/" className="z-30">
          <Image src="/logo.png" alt="logo" width={192} height={52}/>
        </Link>
        <HamburgerMenu onClick={handleDrawerToggle} />
        <MobileDrawer isOpen={isDrawerOpen} onClose={handleDrawerToggle} />
      </div>
    </div>
  );
}
