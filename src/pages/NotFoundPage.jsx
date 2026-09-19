import { Home, Search } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section-pad min-h-[65vh]">
      <div className="container-page grid items-center gap-10 md:grid-cols-[0.8fr_1.2fr]">
        <div className="rounded-lg bg-ink p-8 text-paper">
          <p className="text-8xl font-extrabold text-brass">404</p>
          <h1 className="mt-4 text-3xl font-extrabold">الصفحة غير موجودة</h1>
          <p className="mt-4 leading-8 text-paper/70">
            الرابط الذي تحاول فتحه لا يطابق أي صفحة داخل موقع عدسة.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/" className="focus-ring inline-flex items-center gap-2 rounded-md bg-paper px-4 py-3 font-bold text-ink">
              <Home size={18} />
              الرئيسية
            </Link>
            <Link to="/blog" className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-3 font-bold text-paper">
              <Search size={18} />
              المدونة
            </Link>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=900&h=650&fit=crop"
          alt="كاميرا تصوير"
          className="h-[420px] w-full rounded-lg object-cover shadow-soft"
        />
      </div>
    </section>
  );
}
