import { Grid2X2, List, RotateCcw, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import LoadingState from "../components/LoadingState.jsx";
import PostCard from "../components/PostCard.jsx";
import { getPosts } from "../utils/posts.js";

const pageSize = 6;

export default function BlogPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [view, setView] = useState("grid");
  const [page, setPage] = useState(1);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const categories = useMemo(() => ["all", ...new Set(posts.map((post) => post.category))], [posts]);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    return posts.filter((post) => {
      const matchesSearch =
        !normalizedSearch ||
        [post.title, post.excerpt, post.author.name, post.category, ...(post.tags ?? [])]
          .join(" ")
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesCategory = category === "all" || post.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [category, posts, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pagePosts = filteredPosts.slice((safePage - 1) * pageSize, safePage * pageSize);

  useEffect(() => {
    setPage(1);
  }, [searchTerm, category]);

  function resetFilters() {
    setSearchTerm("");
    setCategory("all");
    setPage(1);
  }

  if (loading) {
    return <LoadingState />;
  }

  return (
    <section className="section-pad">
      <div className="container-page">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="mb-2 font-bold text-clay">المدونة</p>
            <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl">مقالات التصوير</h1>
            <p className="mt-4 max-w-2xl leading-8 text-ink/65">
              ابحث باسم المقال أو الكاتب، صفّي حسب التصنيف، وغيّر طريقة العرض حسب راحتك.
            </p>
          </div>

          <div className="rounded-lg border border-black/10 bg-white p-4 shadow-sm">
            <div className="grid gap-3 md:grid-cols-[1fr_180px_auto]">
              <label className="relative block">
                <span className="sr-only">بحث</span>
                <Search className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink/45" size={18} />
                <input
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="ابحث عن تدوينة..."
                  className="focus-ring h-12 w-full rounded-md border border-black/10 bg-paper pr-10 pl-3 text-sm"
                />
              </label>

              <label>
                <span className="sr-only">التصنيف</span>
                <select
                  value={category}
                  onChange={(event) => setCategory(event.target.value)}
                  className="focus-ring h-12 w-full rounded-md border border-black/10 bg-paper px-3 text-sm font-bold"
                >
                  {categories.map((item) => (
                    <option key={item} value={item}>
                      {item === "all" ? "كل التصنيفات" : item}
                    </option>
                  ))}
                </select>
              </label>

              <button
                type="button"
                onClick={resetFilters}
                className="focus-ring inline-flex h-12 items-center justify-center gap-2 rounded-md border border-black/10 px-3 font-bold hover:bg-paper"
              >
                <RotateCcw size={17} />
                إعادة
              </button>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 pt-4">
              <p className="text-sm font-bold text-ink/60">
                {filteredPosts.length} نتيجة
                {filteredPosts.length !== posts.length && <span> من أصل {posts.length}</span>}
              </p>

              <div className="inline-flex rounded-md border border-black/10 bg-paper p-1">
                <button
                  type="button"
                  onClick={() => setView("grid")}
                  aria-label="عرض شبكي"
                  className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md transition ${
                    view === "grid" ? "bg-ink text-paper" : "text-ink/65 hover:bg-white"
                  }`}
                >
                  <Grid2X2 size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => setView("list")}
                  aria-label="عرض قائمة"
                  className={`focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md transition ${
                    view === "list" ? "bg-ink text-paper" : "text-ink/65 hover:bg-white"
                  }`}
                >
                  <List size={19} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {pagePosts.length > 0 ? (
          <div className={view === "grid" ? "grid gap-6 md:grid-cols-2 xl:grid-cols-3" : "grid gap-5"}>
            {pagePosts.map((post) => (
              <PostCard key={post.id} post={post} view={view} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-black/20 bg-white p-10 text-center">
            <h2 className="text-2xl font-extrabold">لا توجد مقالات مطابقة</h2>
            <p className="mt-3 text-ink/60">جرّب كلمة بحث مختلفة أو اختر تصنيف آخر.</p>
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
            {Array.from({ length: totalPages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                className={`focus-ring h-11 min-w-11 rounded-md border px-4 font-extrabold transition ${
                  safePage === number ? "border-ink bg-ink text-paper" : "border-black/10 bg-white text-ink hover:bg-paper"
                }`}
              >
                {number}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
