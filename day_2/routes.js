import { readTodos, readImage, readImage64 } from "./filesHelpers.js";
import homePage from "./home.js";
import astronomyPage from "./astronomy.js";
import homeStyle from "./homeCss.js";
const home = async (req, res) => {
  const todos = await readTodos();
  console.log(todos);
  const todosList = todos
    .map((todo) => `<li class="todo-item">Title: ${todo.title} Status: ${todo.status}</li>`)
    .join("");
  //styles.css

  res.writeHead(200, { "Content-Type": "text/html" });
  console.log(homePage)
  res.end(homePage.replace("listitem", todosList).replace("homeStyle", homeStyle));
};

const astronomy = async (req, res) => {
  const image = await readImage64();
  res.writeHead(200, { "Content-Type": "image/jpeg" });
  console.log(image)
  res.end(image);
};
//description

const page404 = (req, res) => {
  res.writeHead(404, { "Content-Type": "text/html" });
  res.end(
    `<html>
    <body>
    <h1>404 - Page Not Found</h1>
    </body>
    </html>`
  );
};

const download = (req, res) => {
  const imageStream = readImage();

  res.setHeader("Content-Disposition", 'attachment; filename="astronomy.jpg"');
  res.setHeader("Content-Type", "image/jpeg");

  imageStream.pipe(res);
};

export { home, page404, astronomy, download };
