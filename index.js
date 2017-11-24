const fs = require("fs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");

const App = require("./app");

const getDirectories = (path, ignore = []) =>
  fs
    .readdirSync(path)
    .filter(a => fs.statSync(`${path}${a}`).isDirectory())
    .filter(a => !ignore.includes(a));

const getFiles = (path, extension, ignore = []) =>
  fs
    .readdirSync(path)
    .filter(a => fs.statSync(`${path}${a}`).isFile())
    .filter(a => a.endsWith(extension))
    .filter(a => !ignore.includes(a))
    .map(a => ({
      name: a,
      content: fs.readFileSync(`${path}${a}`).toString()
    }));

const markdownFiles = getDirectories("./", [".git", "node_modules"]).reduce(
  (acc, s) =>
    Object.assign({}, acc, {
      [s]: getFiles(`./${s}/`, ".md")
    }),
  {}
);

const html = ReactDOMServer.renderToStaticMarkup(<App files={markdownFiles} />);

fs.writeFileSync(
  "./index.html",
  `<html>
    <head>
      <title>Learning!</title>

      <meta name="viewport" content="width=device-width, initial-scale=1">

      <link rel="stylesheet" href="./style.css" />
      <link rel="stylesheet" href="https://fonts.timesdev.tools/fonts/TimesModern-Bold.css" />
      <link rel="stylesheet" href="https://fonts.timesdev.tools/fonts/TimesModern-Regular.css" />
    </head>
      <body>${html}

      <script async defer src="https://buttons.github.io/buttons.js"></script>
      <script src="node_modules/stickyfilljs/dist/stickyfill.min.js"></script>
      <script type="text/javascript">
        Stickyfill.add(document.querySelectorAll('.sticky'));
      </script>
    </body>
  </html>`
);

process.exit();
