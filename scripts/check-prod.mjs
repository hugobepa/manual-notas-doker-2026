const html = await fetch("https://hugobepa.github.io/manual-notas-docker-2026/").then(
  (r) => r.text(),
);
const css = html.match(/href="([^"]*_astro_content[^"]*)"/);
console.log("css href:", css?.[1]);
console.log("has doker:", html.includes("doker"));
const cssUrl = css?.[1]?.startsWith("http")
  ? css[1]
  : `https://hugobepa.github.io${css?.[1]}`;
if (cssUrl) {
  const res = await fetch(cssUrl);
  const text = await res.text();
  console.log("css status:", res.status, res.headers.get("content-type"));
  console.log("css size:", text.length);
  console.log("css starts:", text.slice(0, 60));
}
