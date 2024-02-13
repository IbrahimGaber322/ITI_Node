import http from "http";
import url from "url";
import { home, download, page404, astronomy } from "./routes.js";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const routes = {
    "/": home,
    "/astronomy": astronomy,
    "/astronomy/download": download,
  };
  if (routes[pathname]) {
    routes[pathname](req, res);
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
