import { getProjects, Tree } from '@nx/devkit';

export default async function (tree: Tree) {
  const projects = getProjects(tree);
  console.log(projects);
}
