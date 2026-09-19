import { Camera, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "الرئيسية" },
  { to: "/blog", label: "المدونة" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-paper/90 backdrop-blur">
      <nav className="container-page flex h-16 items-center justify-between">
        <NavLink to="/" className="focus-ring flex items-center gap-3 rounded-md" onClick={() => setOpen(false)}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-ink text-paper">
            <Camera size={21} />
          </span>
          <span className="text-2xl font-extrabold tracking-normal">عدسة</span>
        </NavLink>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `focus-ring rounded-md px-2 py-1 text-sm font-bold transition ${
                  isActive ? "text-clay" : "text-ink/70 hover:text-ink"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <NavLink
          to="/blog"
          className="focus-ring hidden items-center gap-2 rounded-md bg-ink px-4 py-2 text-sm font-bold text-paper transition hover:bg-graphite md:inline-flex"
        >
          <Search size={16} />
          استكشف المقالات
        </NavLink>

        <button
          type="button"
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-black/10 md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-black/10 bg-paper md:hidden">
          <div className="container-page flex flex-col gap-2 py-4">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-base font-bold ${
                    isActive ? "bg-ink text-paper" : "text-ink/75 hover:bg-black/5"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
