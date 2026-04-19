import { promises as fs } from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

import { mdxComponents } from "@/components/mdx/mdx-components";
import type { JournalFrontmatter } from "@/lib/types";

const journalDirectory = path.join(process.cwd(), "content", "journal");

export async function getJournalEntries() {
  const files = await fs.readdir(journalDirectory);
  const entries = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const filePath = path.join(journalDirectory, file);
        const source = await fs.readFile(filePath, "utf8");
        const { data } = matter(source);

        return data as JournalFrontmatter;
      })
  );

  return entries.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getJournalEntry(slug: string) {
  const filePath = path.join(journalDirectory, `${slug}.mdx`);
  const source = await fs.readFile(filePath, "utf8");
  const { content, data } = matter(source);

  const compiled = await compileMDX({
    source: content,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm]
      }
    }
  });

  return {
    frontmatter: data as JournalFrontmatter,
    content: compiled.content
  };
}

