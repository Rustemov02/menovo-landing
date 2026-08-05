"use client";

import { useState } from "react";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-black flex items-center justify-center">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Menovo</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Xüsusiyyətlər
            </a>
            <a href="#pricing" className="text-sm font-medium text-gray-700 hover:text-black transition-colors">
              Qiymətlər
            </a>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://admin.menovo.rest/login"
              className="text-sm font-medium text-gray-700 hover:text-black transition-colors"
            >
              Daxil ol
            </a>
            <a
              href="https://admin.menovo.rest/register"
              className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800 transition-colors"
            >
              Qeydiyyat
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileOpen && (
          <div className="md:hidden py-4 space-y-3 border-t border-gray-200">
            <a
              href="#features"
              className="block text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              Xüsusiyyətlər
            </a>
            <a
              href="#pricing"
              className="block text-sm font-medium text-gray-700 hover:text-black"
              onClick={() => setMobileOpen(false)}
            >
              Qiymətlər
            </a>
            <div className="flex flex-col gap-3 pt-3 border-t border-gray-200">
              <a
                href="https://admin.menovo.rest/login"
                className="text-center text-sm font-medium text-gray-700 hover:text-black"
                onClick={() => setMobileOpen(false)}
              >
                Daxil ol
              </a>
              <a
                href="https://admin.menovo.rest/register"
                className="inline-flex items-center justify-center rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
                onClick={() => setMobileOpen(false)}
              >
                Qeydiyyat
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}