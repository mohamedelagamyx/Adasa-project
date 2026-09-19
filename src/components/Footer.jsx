import { Camera, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-ink text-paper">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-paper text-ink">
              <Camera size={20} />
            </span>
            <span className="text-2xl font-extrabold">عدسة</span>
          </div>
          <p className="max-w-md leading-8 text-paper/70">
            مدونة فوتوغرافية عربية تجمع بين التقنية والذوق البصري، من أول إعدادات الكاميرا لحد صناعة قصة كاملة داخل الإطار.
          </p>
        </div>

        <div>
          <h2 className="mb-4 text-base font-bold">روابط</h2>
          <div className="flex flex-col gap-3 text-paper/70">
            <Link className="hover:text-paper" to="/">
              الرئيسية
            </Link>
            <Link className="hover:text-paper" to="/blog">
              المدونة
            </Link>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-base font-bold">تواصل</h2>
          <div className="flex gap-3">
            <a className="focus-ring rounded-md border border-white/20 p-2 hover:bg-white/10" href="mailto:hello@adasah.com" aria-label="البريد">
              <Mail size={19} />
            </a>
            <a className="focus-ring rounded-md border border-white/20 p-2 hover:bg-white/10" href="https://instagram.com" aria-label="إنستجرام">
              <Instagram size={19} />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-sm text-paper/55">
        © 2026 عدسة. كل الحقوق محفوظة.
      </div>
    </footer>
  );
}
