"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }
  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "bg-ivory/95 backdrop-blur-md border-b border-charcoal/8 shadow-[0_1px_0_rgba(37,42,41,0.04)]"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className={cn(
            "font-serif text-2xl tracking-tight focus-ring rounded-sm",
            solid ? "text-lake" : "text-ivory",
          )}
        >
          {site.name}
        </Link>

        <nav className="hidden lg:flex items-center gap-4 xl:gap-6" aria-label="Primary">
          {navLinks.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-[0.8125rem] tracking-wide transition-colors focus-ring rounded-sm py-1",
                  solid
                    ? active
                      ? "text-lake"
                      : "text-charcoal/70 hover:text-lake"
                    : active
                      ? "text-ivory"
                      : "text-ivory/75 hover:text-ivory",
                )}
              >
                {link.label}
                <span
                  className={cn(
                    "absolute -bottom-0.5 left-0 h-px bg-terra transition-all duration-300",
                    active ? "w-full" : "w-0",
                  )}
                  aria-hidden
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button
            href="/booking"
            variant={solid ? "primary" : "onDark"}
            className="!py-2.5 !px-5 text-[0.8125rem]"
          >
            Book Your Stay
          </Button>
        </div>

        <button
          type="button"
          className={cn(
            "lg:hidden p-2 focus-ring rounded-sm",
            solid ? "text-lake" : "text-ivory",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden overflow-hidden transition-[max-height,opacity] duration-400 bg-ivory border-b border-charcoal/8",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="py-3 text-lg font-serif text-lake border-b border-charcoal/8 focus-ring"
            >
              {link.label}
            </Link>
          ))}
          <Button href="/booking" className="mt-5 w-full">
            Book Your Stay
          </Button>
        </nav>
      </div>
    </header>
  );
}
