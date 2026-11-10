import fs from 'fs';
import path from 'path';
import { z } from 'zod';

export const BlogPostFrontmatterSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  author: z.string().min(1),
  image: z.string().min(1),
  targetKeyword: z.string().min(1),
  tags: z.array(z.string()).min(1),
  readingTime: z.number().optional(),
});

export type BlogPostFrontmatter = z.infer<typeof BlogPostFrontmatterSchema>;

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  readingTime: number;
  content: string;
  headings: HeadingItem[];
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

/**
 * Robust YAML Frontmatter & MDX Content Parser for Blog Posts
 */
function parseFrontmatterAndContent(fileContent: string): { frontmatter: Record<string, any>; content: string } {
  const match = fileContent.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) {
    return { frontmatter: {}, content: fileContent.trim() };
  }

  const rawYaml = match[1];
  const content = match[2].trim();
  const frontmatter: Record<string, any> = {};

  const lines = rawYaml.split(/\r?\n/);
  let currentKey: string | null = null;
  let currentArray: string[] | null = null;

  for (let line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // YAML Array item (- item)
    if (trimmed.startsWith('- ')) {
      let itemStr = trimmed.slice(2).trim();
      if ((itemStr.startsWith('"') && itemStr.endsWith('"')) || (itemStr.startsWith("'") && itemStr.endsWith("'"))) {
        itemStr = itemStr.slice(1, -1);
      }
      if (currentArray) {
        currentArray.push(itemStr);
      }
      continue;
    }

    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      let value = line.slice(colonIdx + 1).trim();

      if (!value) {
        // Multi-line list follows
        currentKey = key;
        currentArray = [];
        frontmatter[key] = currentArray;
      } else if (value.startsWith('[') && value.endsWith(']')) {
        // Inline JSON-like array: ["Item 1", "Item 2"]
        const rawItems = value.slice(1, -1).split(',');
        frontmatter[key] = rawItems
          .map((item) => {
            let s = item.trim();
            if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
              s = s.slice(1, -1);
            }
            return s;
          })
          .filter(Boolean);
        currentKey = null;
        currentArray = null;
      } else {
        // Scalar string or number
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }
        frontmatter[key] = value;
        currentKey = null;
        currentArray = null;
      }
    }
  }

  return { frontmatter, content };
}

/**
 * Extracts H2 and H3 headings from markdown text for table of contents
 */
function extractHeadings(content: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const lines = content.split(/\r?\n/);

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (match) {
      const level = match[1].length;
      // Strip markdown bold or link syntax for cleaner text
      const text = match[2]
        .trim()
        .replace(/\*\*/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');

      const id = text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      headings.push({ id, text, level });
    }
  }

  return headings;
}

/**
 * Calculates estimated reading time in minutes based on 200 words per minute
 */
function calculateReadingTime(content: string): number {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Returns all blog posts sorted by publish date descending
 */
export async function getAllPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.mdx'));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const slug = file.replace(/\.mdx$/, '');
    const filePath = path.join(BLOG_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { frontmatter, content } = parseFrontmatterAndContent(raw);

    const parsed = BlogPostFrontmatterSchema.safeParse(frontmatter);
    if (parsed.success) {
      const readingTime = parsed.data.readingTime || calculateReadingTime(content);
      const headings = extractHeadings(content);

      posts.push({
        slug,
        frontmatter: {
          ...parsed.data,
          readingTime,
        },
        readingTime,
        content,
        headings,
      });
    } else {
      console.error(`[Blog MDX Validation Error in ${file}]`, parsed.error.format());
    }
  }

  return posts.sort((a, b) => {
    return new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime();
  });
}

/**
 * Returns a single blog post by slug
 */
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) {
    return null;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const { frontmatter, content } = parseFrontmatterAndContent(raw);
  const parsed = BlogPostFrontmatterSchema.safeParse(frontmatter);

  if (!parsed.success) {
    console.error(`[Blog MDX Validation Error in ${slug}.mdx]`, parsed.error.format());
    return null;
  }

  const readingTime = parsed.data.readingTime || calculateReadingTime(content);
  const headings = extractHeadings(content);

  return {
    slug,
    frontmatter: {
      ...parsed.data,
      readingTime,
    },
    readingTime,
    content,
    headings,
  };
}

/**
 * Returns related blog posts matching shared tags, excluding the current post
 */
export async function getRelatedPosts(slug: string, limit = 3): Promise<BlogPost[]> {
  const allPosts = await getAllPosts();
  const currentPost = allPosts.find((p) => p.slug === slug);

  if (!currentPost) {
    return allPosts.filter((p) => p.slug !== slug).slice(0, limit);
  }

  const currentTags = new Set(currentPost.frontmatter.tags.map((t) => t.toLowerCase()));

  const scored = allPosts
    .filter((p) => p.slug !== slug)
    .map((p) => {
      const shared = p.frontmatter.tags.filter((t) => currentTags.has(t.toLowerCase())).length;
      return { post: p, shared };
    })
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return new Date(b.post.frontmatter.date).getTime() - new Date(a.post.frontmatter.date).getTime();
    });

  return scored.slice(0, limit).map((s) => s.post);
}

