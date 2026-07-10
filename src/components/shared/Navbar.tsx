"use client";

import { Train, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Trains", href: "/trains" },
  { label: "Stations", href: "/stations" },
  { label: "Fare", href: "/fare" },
  { label: "Schedule", href: "/schedule" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-[#006A4E]/95 py-1.5 shadow backdrop-blur-xl"
            : "bg-[#006A4E]/80 py-2 lg:py-4 backdrop-blur-md"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between  ">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 lg:p-3 border-4 border-white rounded-full bg-red-600">
              <Train className="h-6 w-6 text-white" />
            </div>

            <div>
              <h1 className="text-lg font-bold text-white">
                Bangladesh Railway
              </h1>

              <p className="text-xs text-green-200">
                Safe • Reliable • Connected
              </p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="
                relative
                text-sm
                font-medium
                text-white/90
                transition-all
                duration-300
                hover:text-white
                after:absolute
                after:left-0
                after:-bottom-1
                after:h-[2px]
                after:w-0
                after:bg-red-500
                after:transition-all
                after:duration-300
                hover:after:w-full
                "
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Right */}
          <div className="hidden items-center gap-3 md:flex">
            <Link
              href="/login"
              className="
              rounded-lg
              border
              border-white/20
              px-5
              py-2
              text-sm
              font-medium
              text-white
              hover:bg-white/10
              "
            >
              Login
            </Link>

            <Link
              href="/tickets"
              className="
              rounded-lg
              bg-red-600
              px-2
              py-2
              border-2 border-white/30
              font-semibold
              text-white
              transition
              hover:bg-red-700
              "
            >
              Book Ticket
            </Link>
          </div>

          {/* Mobile Button */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden text-white"
          >
            <Menu size={30} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0
          z-[60]
          bg-black/40
          md:hidden
          "
        />
      )}

      {/* Mobile Drawer */}

      <div
        className={`
        fixed
        top-0
        right-0
        z-[70]
        h-full
        w-[80%]
        max-w-sm
        bg-[#006A4E]
        p-6
        shadow-xl
        transition-transform
        duration-300
        md:hidden
        ${open ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Close */}

        <div className="flex justify-end">
          <button onClick={() => setOpen(false)} className="text-white">
            <X size={30} />
          </button>
        </div>

        {/* Menu */}

        <div className="mt-10 flex flex-col gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="
              text-lg
              font-medium
              text-white
              "
            >
              {item.label}
            </Link>
          ))}

          <hr className="border-white/20" />

          <Link
            href="/login"
            onClick={() => setOpen(false)}
            className="
            rounded-lg
            border
            border-white/30
            px-5
            py-3
            text-center
            text-white
            "
          >
            Login
          </Link>

          <Link
            href="/tickets"
            onClick={() => setOpen(false)}
            className="
             
              bg-red-600
              px-8
              py-3
              border-2 border-white/30
              font-semibold
              text-white
              transition
              hover:bg-red-700
              "
          >
            Book Ticket
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
