import { Tree } from '@nx/devkit';
import * as path from 'path';
import { readdir } from 'fs/promises';

type Courses = {
  path: string;
  title: string;
};

type Level = {
  title: string;
  courses: Courses[];
};

type CourseTree = Level[];

const camelize = (s: string) =>
  s.replace(/-./g, (x) => ` ${x[1].toUpperCase()}`);

export async function indexGenerator(tree: Tree) {
  const packagesPath = path.join(tree.root, 'packages');

  const packages = (await readdir(packagesPath, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const levels: CourseTree = Array.from(
    new Set(packages.map((p) => p.split('_')[0]))
  ).map((l) => ({
    title: camelize(l).substring(2).trim(),
    courses: packages
      .filter((p) => p.startsWith(l))
      .map((p) => ({
        path: p,
        title: camelize(p.replace(`${l}_`, ''))
          .substring(2)
          .trim(),
      })),
  }));

  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Courses - ngSquare</title>
    <style>
    html {
      background: #121212;
      padding: 1rem;
    }

    h1,
    h2,
    a {
      font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI',
        Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans',
        'Helvetica Neue', sans-serif;
      font-weight: 600;
      color: white;
      -webkit-font-smoothing: antialiased;
      text-rendering: optimizeLegibility;
    }

    h1 {
      font-weight: 900;
      background: -webkit-linear-gradient(315deg, #d9304c 15%, #be82fa);
      background-position-x: initial;
      background-position-y: initial;
      background-size: initial;
      background-repeat-x: initial;
      background-repeat-y: initial;
      background-attachment: initial;
      background-origin: initial;
      background-color: initial;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    h2 {
      margin-top: 2rem;
    }

    ul {
      list-style: square;
    }

    ul li {
      margin-bottom: 0.6rem;
      font-size: 1.2rem;
    }

    li::marker {
      color: white;
      font-size: 1.2rem;
    }

    a[href] {
      color: #b8b2ff;
      border: none;
      border-bottom-width: 1px;
      border-bottom-color: currentColor;
      border-bottom-style: dashed;
      text-decoration: none;
    }

    a[href]:hover {
      border-bottom-style: solid;
    }
  </style>
  </head>
  <body>
    <h1>Welcome to ngSquare</h1>
${levels
  .map((l) => {
    return `    <h2>${l.title}</h2>
    <ul>
${l.courses
  .map((c) => {
    return `        <li><a href="/${c.path}">${c.title}</a></li>`;
  })
  .join('\n')}              
    </ul>`;
  })
  .join('\n')}
  </body>
</html>
`;

  tree.write(path.join('public', 'index.html'), html);
}

export default indexGenerator;
