// import the original type declarations
import 'i18next';
// import all namespaces (for the default language, only)
import type en from './en';

type Translation<Key> = Record<Key, string>;

declare module 'i18next' {
  // Extend CustomTypeOptions
  export interface CustomTypeOptions {
    // custom namespace type, if you changed it
    defaultNS: 'common';
    // custom resources type
    resources: {
      common: Translation<CommonKey>;
    };
  }
}

type CommonKey = keyof typeof en.common;
