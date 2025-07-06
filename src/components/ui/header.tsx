'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { Button } from "@/components/ui/button";
import { Moon, Sun } from "lucide-react";
import { useState, useEffect } from 'react';

export function Header() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const logoSrc =
    mounted && resolvedTheme === 'dark'
      ? "/logo/verus-icon-white.svg"
      : "/logo/verus-icon-blue.svg";

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-[#171923] backdrop-blur supports-[backdrop-filter]:bg-white/90 dark:supports-[backdrop-filter]:bg-[#171923]/90 border-b border-border">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
  {/* Leading: Logo + App Name + Nav */}
  <div className="flex items-center gap-10">
    <Link href="/" className="flex items-center gap-2 group">
      <Image
        src={logoSrc}
        alt="Verus Logo"
        width={36}
        height={36}
        priority
        className="transition-all duration-200 group-hover:scale-110"
      />
      <span className="font-bold text-2xl tracking-tight text-[#3165D4] dark:text-white ml-1">
        VerusIDX Lite
      </span>
    </Link>
    {/* Navigation moved here */}
    <nav className="flex gap-8 ml-8">
  <Link
    href="/identities"
    className="font-medium text-lg text-gray-700 dark:text-gray-100 hover:text-[#3165D4] dark:hover:text-[#3165D4] transition-colors"
  >
    ID Lookup
  </Link>
  <Link
    href="/currencies"
    className="font-medium text-lg text-gray-700 dark:text-gray-100 hover:text-[#3165D4] dark:hover:text-[#3165D4] transition-colors"
  >
    Currency List
  </Link>
  <Link
    href="/currency"
    className="font-medium text-lg text-gray-700 dark:text-gray-100 hover:text-[#3165D4] dark:hover:text-[#3165D4] transition-colors"
  >
    Currency Lookup
  </Link>
  <Link
    href="/addressviewer"
    className="font-medium text-lg text-gray-700 dark:text-gray-100 hover:text-[#3165D4] dark:hover:text-[#3165D4] transition-colors"
  >
    Address Viewer
  </Link>
</nav>
  </div>
  {/* Theme Switch */}
  <Button
    size="icon"
    variant="ghost"
    aria-label="Toggle theme"
    onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
  >
    {mounted &&
      (resolvedTheme === 'dark'
        ? <Sun className="h-6 w-6 text-white" />
        : <Moon className="h-6 w-6 text-[#3165D4]" />)}
  </Button>
</div>
    </header>
  );
}
