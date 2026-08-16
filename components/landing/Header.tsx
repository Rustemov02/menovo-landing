"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { DEMO_ROUTE } from "@/utils/site";
import Image from "next/image";

const navLinks = [
  { href: "#mahsul", label: "Məhsul" },
  { href: "#xususiyyatlar", label: "Xüsusiyyətlər" },
  { href: "#qiymat", label: "Qiymətləndirmə" },
  { href: "#faq", label: "FAQ" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-outline-variant/10 bg-surface/80 backdrop-blur-md shadow-md">
      <div className="flex justify-between items-center h-20 px-gutter max-w-container-max mx-auto">
        {/* Logo */}
        <div className="flex items-center gap-sm">
          <Image
            src="/icon.png"
            alt="Menovo Logo"
            width={40}
            height={40}
            className="object-contain rounded-md"
            // className="w-10 h-10 object-contain rounded-md bg-surface-container-low p-1 border border-outline-variant/20 shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
          />
          <span className="hidden md:block font-headline-lg text-headline-lg font-bold text-primary">
            Menovo
          </span>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-lg items-center">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-on-surface-variant hover:text-primary transition-colors font-body-md text-body-md"
            >
              {l.label}
            </a>
          ))}
        </div>

        {/* Desktop CTA + mobile toggle */}
        <div className="flex items-center gap-sm">
          <Link
            href={DEMO_ROUTE}
            className="hidden md:inline-flex bg-transparent border-[1.5px] border-outline-variant text-inverse-surface hover:border-primary hover:text-primary px-lg py-sm rounded-lg font-title-md text-title-md transition-all duration-300 ease-in-out shadow-[0_4px_12px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_20px_rgba(245,158,11,0.2)]"
          >
            Canlı Demoya Bax
          </Link>
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden inline-flex items-center justify-center p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Menyunu aç/bağla"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden bg-surface/95 backdrop-blur-md border-t border-outline-variant/10 px-gutter py-4 flex flex-col gap-3">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="text-on-surface-variant hover:text-primary font-body-md text-body-md transition-colors"
            >
              {l.label}
            </a>
          ))}
          <Link
            href={DEMO_ROUTE}
            onClick={() => setMobileOpen(false)}
            className="mt-2 text-center bg-transparent border-[1.5px] border-outline-variant text-inverse-surface hover:border-primary hover:text-primary px-lg py-sm rounded-lg font-title-md text-title-md transition-all duration-300 ease-in-out"
          >
            Canlı Demoya Bax
          </Link>
        </div>
      )}
    </nav>
  );
}
