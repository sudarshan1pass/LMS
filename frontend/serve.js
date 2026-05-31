import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const distDir = join(__dirname, "dist");
const port = process.env.PORT || 4173;

const contentTypes = {
  ".css": "text/css",
  ".html": "text/html",
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".js": "text/javascript",
  ".json": "application/json",
  ".mp4": "video/mp4",
  ".png": "image/png",
  ".svg": "image/svg+xml",
};

createServer((req, res) => {
  const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
  const requestedPath = normalize(join(distDir, urlPath));
  const hasFile = existsSync(requestedPath) && statSync(requestedPath).isFile();
  const filePath =
    requestedPath.startsWith(distDir) && hasFile
      ? requestedPath
      : join(distDir, "index.html");

  res.setHeader("Content-Type", contentTypes[extname(filePath)] || "application/octet-stream");
  createReadStream(filePath)
    .on("error", () => {
      res.writeHead(500);
      res.end("Unable to read file");
    })
    .pipe(res);
}).listen(port, () => {
  console.log(`Frontend listening on port ${port}`);
});
