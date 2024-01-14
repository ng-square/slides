import {
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { DeckGeneratorSchema } from './schema';

export async function deckGenerator(tree: Tree, options: DeckGeneratorSchema) {
  const projectRoot = `packages/${options.name}`;
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default deckGenerator;
