import { Tree } from '@nx/devkit';
import * as path from 'path';
import { readdir } from 'fs/promises';

interface VercelRoute {
  source: string;
  destination: string;
}

interface VercelConfig {
  rewrites: VercelRoute[];
}

export async function vercelGenerator(tree: Tree) {
  const packagesPath = path.join(tree.root, 'packages');

  const packages = (await readdir(packagesPath, { withFileTypes: true }))
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);

  const vercelConfig: VercelConfig = { rewrites: [] };

  vercelConfig.rewrites = packages.map((p) => ({
    source: `/${p}/(.*)`,
    destination: `/${p}/index.html`,
  }));

  const jsonContent = JSON.stringify(vercelConfig, undefined, 2);
  tree.write(path.join('vercel.json'), jsonContent);
  tree.write(path.join('public', 'vercel.json'), jsonContent);
}

export default vercelGenerator;
