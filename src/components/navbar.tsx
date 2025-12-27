"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  return (
    <nav className={`sticky top-0 z-50 bg-white backdrop-blur-sm bg-white/95 transition-shadow duration-300 ${isScrolled ? "shadow-md" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo + Name */}
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            {/* Logo */}
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">TC</span>
            </div>
            <span className="text-xl font-semibold text-gray-900">TU Codes</span>
          </Link>

          {/* Right: Navigation Links + Join Us Button */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              About
            </Link>
            <Link
              href="/events"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Events
            </Link>
            <Link
              href="/projects"
              className="text-gray-700 hover:text-blue-600 font-semibold transition-colors"
            >
              Projects
            </Link>
            {/* Join Us Button */}
            <Link
              href="/signin"
              className="bg-gradient-to-r from-blue-400 to-blue-700 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-blue-700 transition-all hover:shadow-lg hover:scale-105"
            >
              Join Us
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
