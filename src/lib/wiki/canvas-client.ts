/**
 * Renderiza archivos .canvas de Obsidian como mapa visual de nodos.
 */
interface CanvasNode {
  id: string;
  type: string;
  file?: string;
  text?: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
}

interface CanvasEdge {
  id: string;
  fromNode: string;
  toNode: string;
  label?: string;
}

interface CanvasData {
  nodes: CanvasNode[];
  edges: CanvasEdge[];
}

const COLOR_MAP: Record<string, string> = {
  "1": "#2496ed",
  "2": "#1d63ed",
  "3": "#a0c1f7",
  "4": "#5a6578",
  "5": "#17191e",
  "6": "#2496ed",
};

function fileToWikiUrl(file: string): string {
  const base = import.meta.env.BASE_URL;
  const slug = file.replace(/\.md$/, "");
  return `${base}wiki/${slug}`;
}

function fileToLabel(file: string): string {
  return file
    .replace(/\.md$/, "")
    .replace(/^MOC_/, "")
    .replace(/_/g, " ");
}

export async function initCanvasViewers() {
  const viewers = document.querySelectorAll<HTMLElement>(
    ".canvas-viewer[data-canvas]",
  );
  if (viewers.length === 0) return;

  for (const viewer of viewers) {
    const canvasPath = viewer.dataset.canvas;
    if (!canvasPath) continue;

    try {
      const res = await fetch(`${import.meta.env.BASE_URL}${canvasPath.replace(/^\//, "")}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data: CanvasData = await res.json();
      renderCanvas(viewer, data);
    } catch (err) {
      viewer.innerHTML = `<p class="p-4 text-muted-foreground text-sm">No se pudo cargar el canvas.</p>`;
      console.warn("Canvas load error:", err);
    }
  }
}

function renderCanvas(container: HTMLElement, data: CanvasData) {
  if (!data.nodes?.length) {
    container.innerHTML = `<p class="p-4 text-muted-foreground text-sm">Canvas vacío.</p>`;
    return;
  }

  const xs = data.nodes.map((n) => n.x);
  const ys = data.nodes.map((n) => n.y);
  const minX = Math.min(...xs) - 40;
  const minY = Math.min(...ys) - 40;
  const maxX = Math.max(...data.nodes.map((n) => n.x + n.width)) + 40;
  const maxY = Math.max(...data.nodes.map((n) => n.y + n.height)) + 40;
  const width = maxX - minX;
  const height = maxY - minY;

  container.style.height = `${Math.min(Math.max(height, 420), 800)}px`;

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `${minX} ${minY} ${width} ${height}`);
  svg.style.position = "absolute";
  svg.style.inset = "0";
  svg.style.pointerEvents = "none";

  for (const edge of data.edges || []) {
    const from = data.nodes.find((n) => n.id === edge.fromNode);
    const to = data.nodes.find((n) => n.id === edge.toNode);
    if (!from || !to) continue;

    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", String(from.x + from.width / 2));
    line.setAttribute("y1", String(from.y + from.height / 2));
    line.setAttribute("x2", String(to.x + to.width / 2));
    line.setAttribute("y2", String(to.y + to.height / 2));
    line.setAttribute("stroke", "#a0c1f7");
    line.setAttribute("stroke-width", "2");
    line.setAttribute("marker-end", "url(#arrow)");
    svg.appendChild(line);
  }

  const defs = document.createElementNS("http://www.w3.org/2000/svg", "defs");
  defs.innerHTML = `<marker id="arrow" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#a0c1f7"/></marker>`;
  svg.prepend(defs);
  container.appendChild(svg);

  for (const node of data.nodes) {
    const el = document.createElement("div");
    el.className = "canvas-node";
    el.style.left = `${node.x - minX}px`;
    el.style.top = `${node.y - minY}px`;
    el.style.width = `${node.width}px`;
    el.style.minHeight = `${node.height}px`;
    if (node.color) {
      el.style.borderColor = COLOR_MAP[node.color] || "#2496ed";
    }

    if (node.type === "file" && node.file) {
      const a = document.createElement("a");
      a.href = fileToWikiUrl(node.file);
      a.textContent = fileToLabel(node.file);
      el.appendChild(a);
    } else if (node.text) {
      el.textContent = node.text;
    }

    container.appendChild(el);
  }
}
