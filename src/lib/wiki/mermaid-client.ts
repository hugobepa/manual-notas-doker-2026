/**
 * Renderiza bloques ```mermaid en el cliente.
 * Astro/Shiki emite <pre data-language="mermaid">, no code.language-mermaid.
 */
const MERMAID_SELECTOR =
  "article.custom-prose pre[data-language='mermaid']:not([data-mermaid-done]), " +
  "article.custom-prose pre > code.language-mermaid, " +
  "article.custom-prose pre > code[class*='mermaid']";

function getMermaidSource(block: Element): string | null {
  const pre =
    block instanceof HTMLPreElement
      ? block
      : block.closest("pre") ?? block.parentElement;
  if (!pre) return null;

  const code = pre.querySelector("code") ?? pre;
  const source = code.textContent?.trim();
  return source || null;
}

export async function initMermaid() {
  const blocks = document.querySelectorAll(MERMAID_SELECTOR);
  if (blocks.length === 0) return;

  const { default: mermaid } = await import("mermaid");
  mermaid.initialize({
    startOnLoad: false,
    theme: document.documentElement.classList.contains("dark")
      ? "dark"
      : "default",
    securityLevel: "loose",
  });

  for (const [index, block] of blocks.entries()) {
    const pre =
      block instanceof HTMLPreElement
        ? block
        : block.closest("pre") ?? block.parentElement;
    if (!pre || pre.hasAttribute("data-mermaid-done")) continue;

    const source = getMermaidSource(block);
    if (!source) continue;

    const container = document.createElement("div");
    container.className = "mermaid-diagram";
    container.id = `mermaid-${index}-${Date.now()}`;

    try {
      const { svg } = await mermaid.render(
        `mermaid-svg-${index}-${Date.now()}`,
        source,
      );
      container.innerHTML = svg;
      pre.replaceWith(container);
    } catch (err) {
      console.warn("Mermaid render error:", err);
      pre.setAttribute("data-mermaid-done", "error");
    }
  }
}
