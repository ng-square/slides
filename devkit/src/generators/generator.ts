import {
  formatFiles,
  generateFiles,
  Tree,
  addDependenciesToPackageJson,
  installPackagesTask
} from '@nx/devkit';
import { join } from 'path';
import { Basic00SetupGeneratorSchema } from './schema';

export async function basic00SetupGenerator(
  tree: Tree,
  options: Basic00SetupGeneratorSchema
) {
  await tree.delete('src')
  generateFiles(tree, join(__dirname, 'files'), '', options);
  addDependenciesToPackageJson(tree, {
    "@baloise/ds-angular": "16.2.1",
  }, {
    "@baloise/ds-devkit": "16.2.1",
  })
  await formatFiles(tree);
  installPackagesTask(tree)
}

export default basic00SetupGenerator;
