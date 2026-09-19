import { ArrowUpLeft, CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { formatArabicDate } from "../utils/posts.js";

export default function PostCard({ post, view = "grid" }) {
  const isList = view === "list";

  return (
    <article
      className={`group overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
        isList ? "grid md:grid-cols-[260px_1fr]" : "flex h-full flex-col"
      }`}
    >
      <Link to={`/blog/${post.slug}`} className="block overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className={`w-full object-cover transition duration-500 group-hover:scale-105 ${isList ? "h-64 md:h-full" : "h-56"}`}
          loading="lazy"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-bold text-ink/60">
          <span className="rounded-md bg-brass/15 px-2.5 py-1 text-brass">{post.category}</span>
          <span className="inline-flex items-center gap-1">
            <Clock size={14} />
            {post.readTime}
          </span>
          <span className="inline-flex items-center gap-1">
            <CalendarDays size={14} />
            {formatArabicDate(post.date)}
          </span>
        </div>

        <Link to={`/blog/${post.slug}`} className="focus-ring rounded-md">
          <h2 className="line-clamp-2 text-xl font-extrabold leading-8 transition group-hover:text-clay">
            {post.title}
          </h2>
        </Link>

        <p className="mt-3 line-clamp-3 leading-7 text-ink/65">{post.excerpt}</p>

        <div className="mt-5 flex items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img src={post.author.avatar} alt={post.author.name} className="h-10 w-10 rounded-full object-cover" loading="lazy" />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold">{post.author.name}</p>
              <p className="truncate text-xs text-ink/55">{post.author.role}</p>
            </div>
          </div>

          <Link
            to={`/blog/${post.slug}`}
            className="focus-ring inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-ink text-paper transition hover:bg-clay"
            aria-label={`قراءة ${post.title}`}
          >
            <ArrowUpLeft size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
}
