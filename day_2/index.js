import http from "http";
import url from "url";
import { home, download, page404, astronomy } from "./routes.js";

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  switch (pathname) {
    case "/":
      home(req, res);
      break;

    case "/astronomy":
      astronomy(req, res);
      break;

    case "/astronomy/download":
      download(req, res);
      break;

    default:
      page404(req, res);
      break;
  }
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
