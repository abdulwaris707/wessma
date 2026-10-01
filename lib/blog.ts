import "server-only";
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

/**
 * Minimal MDX content layer for the blog.
 * Posts live in /content/blog/*.mdx with YAML front-matter.
 */

export type Author = { id: string; name: string; role: string; avatar: string; bio: string };

export const authors: Record<string, Author> = {
  "abdul-waris": {
    id: "abdul-waris",
    name: "Abdul Waris",
    role: "Founder & CEO",
    avatar: "/images/team/team-1.webp",
    bio: "Founder of Wessmaa. Writes about product strategy, MVPs and building companies.",
  },
  "elena-marsh": {
    id: "elena-marsh",
    name: "Elena Marsh",
    role: "Head of Product Design",
    avatar: "/images/team/team-2.webp",
    bio: "Leads product design at Wessmaa. Writes about UX, brand and content.",
  },
  "daniel-okafor": {
    id: "daniel-okafor",
    name: "Daniel Okafor",
    role: "CTO",
    avatar: "/images/team/team-3.webp",
    bio: "CTO at Wessmaa. Writes about architecture, performance and engineering culture.",
  },
  "hira-khan": {
    id: "hira-khan",
    name: "Hira Khan",
    role: "Director of Growth Marketing",
    avatar: "/images/team/team-4.webp",
    bio: "Runs SEO, social and paid media at Wessmaa.",
  },
  "bilal-ahmed": {
    id: "bilal-ahmed",
    name: "Bilal Ahmed",
    role: "Head of Engineering",
    avatar: "/images/team/team-5.webp",
    bio: "Leads engineering and the Wessmaa AI & automation lab.",
  },
};

export type PostMeta = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  author: Author;
  cover: string;
  featured: boolean;
  readingTime: number;
};

export type Post = PostMeta & {
  content: string;
  headings: { id: string; text: string; level: 2 | 3 }[];
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function readingTime(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 220));
}

function parse(file: string): Post {
  const slug = file.replace(/\.mdx$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slugger = new GithubSlugger();
  const headings = Array.from(content.matchAll(/^(##|###)\s+(.+)$/gm)).map((m) => {
    const text = m[2].trim().replace(/[*_`]/g, "");
    return { level: m[1].length as 2 | 3, text, id: slugger.slug(text) };
  });
  return {
    slug,
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category,
    author: authors[data.author] ?? authors["abdul-waris"],
    cover: data.cover,
    featured: Boolean(data.featured),
    readingTime: readingTime(content),
    content,
    headings,
  };
}

export function getAllPosts(): Post[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith(".mdx"))
    .map(parse)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostMetas(): PostMeta[] {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return getAllPosts().map(({ content, headings, ...meta }) => meta);
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

export function getCategories() {
  return Array.from(new Set(getAllPosts().map((p) => p.category)));
}
