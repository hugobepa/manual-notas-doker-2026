/**
 * Renderiza bloques ```mermaid en el cliente.
 */
export async function initMermaid() {
  const blocks = document.querySelectorAll(
    "article.custom-prose pre > code.language-mermaid, article.custom-prose pre > code[class*='mermaid']",
  );
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
    const pre = block.parentElement;
    if (!pre) continue;

    const source = block.textContent?.trim();
    if (!source) continue;

    const container = document.createElement("div");
    container.className = "mermaid-diagram";
    container.id = `mermaid-${index}`;

    try {
      const { svg } = await mermaid.render(
        `mermaid-svg-${index}-${Date.now()}`,
        source,
      );
      container.innerHTML = svg;
      pre.replaceWith(container);
    } catch (err) {
      console.warn("Mermaid render error:", err);
    }
  }
}
