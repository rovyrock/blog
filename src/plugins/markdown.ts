import MarkdownIt from "markdown-it";
import type MarkdownItType from "markdown-it";

import type { KatexOptions } from "katex";
import Katex from "markdown-it-katex";
import Prism from "./markdown-it-prism";
import Flow from "./markdown-it-flow";

const KatexOptions: KatexOptions = { strict: false };
function getMarkdown(options: MarkdownItType.Options) {
  const defaultOptions = {
    // quotes: "\"\"''",
    html: true, // Enable HTML tags in source
    xhtmlOut: true, // Use '/' to close single tags (<br />).
    // This is only for full CommonMark compatibility.
    breaks: false, // Convert '\n' in paragraphs into <br>
    linkify: true, // Autoconvert URL-like text to links
    asciimath: true, // Convert AsciiMath to HTML.
    // Invalid when TeX is false.
    // tex: true, // Convert TeX to HTML using KaTeX.
    // prism: {
    //   // Options for Prism, the highlight renderer.
    //   theme: "default", // Syntax theme
    // },
  };

  // https://markdown-it.github.io/markdown-it/
  const markdown = new MarkdownIt(options || defaultOptions);

  markdown.use(Prism);
  markdown.use(Katex);
  markdown.use(Flow);

  return markdown;
}

export default getMarkdown;

export function getCodeBlocks(md: string) {
  const codeblocks = Array.from(md.matchAll(/^```[\s\S]*?^```/gm)).map((m) => {
    const start = m.index!;
    const end = m.index! + m[0].length;
    const startLine = md.slice(0, start).match(/\n/g)?.length || 0;
    const endLine = md.slice(0, end).match(/\n/g)?.length || 0;
    return [start, end, startLine, endLine];
  });

  return {
    codeblocks,
    isInsideCodeblocks(idx: number) {
      return codeblocks.some(([s, e]) => s <= idx && idx <= e);
    },
    isLineInsideCodeblocks(line: number) {
      return codeblocks.some(([, , s, e]) => s <= line && line <= e);
    },
  };
}

/**
 * Escape `{{}}` in code block to prevent Vue interpret it, #99
 */
export function escapeVueInCode(md: string) {
  return md.replace(/{{(.*?)}}/g, "&lbrace;&lbrace;$1&rbrace;&rbrace;");
}
