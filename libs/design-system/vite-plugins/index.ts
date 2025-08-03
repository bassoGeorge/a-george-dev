import { compose, head, includes, last, split } from 'ramda';
import { Plugin } from 'vite';

const languagesToAllow = [
  'typescript',
  'tsx',
  'javascript',
  'jsx',
  'css',
  'sass',
];

const getLang = compose(head, split('.'), last, split('/')) as (
  path: string
) => string;

const allowLang = (lang: string) =>
  includes(lang, languagesToAllow) ? null : false;

export function removeFilesPlugin(): Plugin {
  return {
    name: 'vite-remove-files-plugin',

    resolveDynamicImport: {
      order: 'pre',
      handler(specifier) {
        if (
          typeof specifier == 'string' &&
          specifier.includes('refractor/lang')
        ) {
          const lang = getLang(specifier);
          return allowLang(lang) ? specifier : null;
        } else {
          return null;
        }
      },
    },
  };
}
