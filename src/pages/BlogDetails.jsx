import { ArrowRight, CalendarDays, Clock, Tag } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import LoadingState from "../components/LoadingState.jsx";
import PostCard from "../components/PostCard.jsx";
import { formatArabicDate, getPosts, splitContent } from "../utils/posts.js";

export default function BlogDetails() {
  const { slug } = useParams();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPosts()
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, []);

  const post = posts.find((item) => item.slug === slug);
  const relatedPosts = useMemo(
    () => posts.filter((item) => item.category === post?.category && item.slug !== slug).slice(0, 3),
    [post?.category, posts, slug]
  );

  if (loading) {
    return <LoadingState />;
  }

  if (!post) {
    return (
      <section className="section-pad">
        <div className="container-page text-center">
          <h1 className="text-4xl font-extrabold">المقال غير موجود</h1>
          <Link to="/blog" className="focus-ring mt-6 inline-flex rounded-md bg-ink px-5 py-3 font-bold text-paper">
            الرجوع للمدونة
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <article>
        <header className="relative isolate overflow-hidden bg-ink text-paper">
          <div className="absolute inset-0 -z-10">
            <img src={post.image} alt="" className="h-full w-full object-cover opacity-35" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/55 to-black/35" />
          </div>

          <div className="container-page py-16 sm:py-24">
            <Link to="/blog" className="focus-ring mb-8 inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 font-bold text-paper/85 hover:bg-white/10">
              <ArrowRight size={18} />
              العودة للمدونة
            </Link>

            <div className="max-w-4xl">
              <span className="mb-4 inline-flex rounded-md bg-brass px-3 py-1 text-sm font-extrabold text-ink">{post.category}</span>
              <h1 className="text-4xl font-extrabold leading-tight sm:text-6xl">{post.title}</h1>
              <p className="mt-5 max-w-3xl text-lg leading-9 text-paper/78">{post.excerpt}</p>

              <div className="mt-7 flex flex-wrap items-center gap-4 text-sm font-bold text-paper/78">
                <span className="inline-flex items-center gap-2">
                  <CalendarDays size={17} />
                  {formatArabicDate(post.date)}
                </span>
                <span className="inline-flex items-center gap-2">
                  <Clock size={17} />
                  {post.readTime}
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="container-page grid gap-10 py-12 lg:grid-cols-[1fr_300px]">
          <div className="rounded-lg bg-white p-6 shadow-sm sm:p-9">
            <div className="mb-8 flex items-center gap-3 border-b border-black/10 pb-6">
              <img src={post.author.avatar} alt={post.author.name} className="h-14 w-14 rounded-full object-cover" />
              <div>
                <p className="text-lg font-extrabold">{post.author.name}</p>
                <p className="text-sm text-ink/55">{post.author.role}</p>
              </div>
            </div>

            <div className="space-y-6 text-lg leading-9 text-ink/78">
              {splitContent(post.content).map((block) =>
                block.startsWith("## ") ? (
                  <h2 key={block} className="pt-4 text-2xl font-extrabold leading-10 text-ink">
                    {block.replace("## ", "")}
                  </h2>
                ) : (
                  <p key={block}>{block}</p>
                )
              )}
            </div>
          </div>

          <aside className="space-y-5">
            <div className="rounded-lg border border-black/10 bg-white p-5">
              <h2 className="mb-4 text-lg font-extrabold">وسوم المقال</h2>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-md bg-paper px-3 py-2 text-sm font-bold text-ink/70">
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </article>

      {relatedPosts.length > 0 && (
        <section className="pb-14">
          <div className="container-page">
            <h2 className="mb-6 text-3xl font-extrabold">مقالات مرتبطة</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((item) => (
                <PostCard key={item.id} post={item} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
