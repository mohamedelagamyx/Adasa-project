import { ArrowLeft, Aperture, Camera, Image, Sparkles } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";
import { getPosts } from "../utils/posts.js";

export default function HomePage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    getPosts().then(setPosts).catch(() => setPosts([]));
  }, []);

  const featuredPosts = useMemo(() => posts.filter((post) => post.featured).slice(0, 3), [posts]);
  const heroPost = featuredPosts[0] ?? posts[0];

  return (
    <>
      <section className="relative isolate overflow-hidden bg-ink text-paper">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroPost?.image ?? "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=1600&h=900&fit=crop"}
            alt=""
            className="h-full w-full object-cover opacity-45"
          />
          <div className="absolute inset-0 bg-gradient-to-l from-black/80 via-black/50 to-black/20" />
        </div>

        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 md:grid-cols-[1.05fr_0.95fr]">
          <div className="max-w-3xl">
            <span className="mb-5 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-paper/90 backdrop-blur">
              <Sparkles size={16} />
              عالم التصوير يبدأ من لقطة واعية
            </span>
            <h1 className="text-5xl font-extrabold leading-tight sm:text-6xl lg:text-7xl">عدسة</h1>
            <p className="mt-6 max-w-2xl text-lg leading-9 text-paper/80">
              مدونة عربية للتصوير الفوتوغرافي تعرض مقالات عملية عن الإضاءة، البورتريه، المناظر الطبيعية، المعدات، وصناعة الصورة من الفكرة للنشر.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/blog"
                className="focus-ring inline-flex items-center gap-2 rounded-md bg-brass px-5 py-3 font-extrabold text-ink transition hover:bg-paper"
              >
                اقرأ المقالات
                <ArrowLeft size={18} />
              </Link>
              <a
                href="#featured"
                className="focus-ring inline-flex items-center gap-2 rounded-md border border-white/25 px-5 py-3 font-extrabold text-paper transition hover:bg-white/10"
              >
                أحدث الاختيارات
              </a>
            </div>
          </div>

          <div className="hidden md:block">
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Camera, label: "تقنيات كاميرا", value: "12+" },
                { icon: Aperture, label: "تصوير وإضاءة", value: "5" },
                { icon: Image, label: "تصنيفات", value: "4" },
              ].map((item, index) => (
                <div
                  key={item.label}
                  className={`rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur ${index === 2 ? "col-span-2" : ""}`}
                >
                  <item.icon className="mb-6 text-brass" size={27} />
                  <p className="text-3xl font-extrabold">{item.value}</p>
                  <p className="mt-1 text-paper/70">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="featured" className="section-pad bg-paper">
        <div className="container-page">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="mb-2 font-bold text-clay">مختارات المحرر</p>
              <h2 className="text-3xl font-extrabold sm:text-4xl">ابدأ من المقالات الأبرز</h2>
            </div>
            <Link to="/blog" className="focus-ring inline-flex items-center gap-2 rounded-md border border-black/10 px-4 py-3 font-bold hover:bg-white">
              كل المقالات
              <ArrowLeft size={18} />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredPosts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
