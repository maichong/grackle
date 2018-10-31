
interface Lang {
  [key: string]: string;
}

interface LangGroup {
  [locale: string]: Lang
}

declare interface Translate {
  /**
   * translate message
   * @param {string|string[]} message
   * @param {string} [namespace]
   * @param {Object} [values]
   * @param {Object} [formats]
   */
  (message: string | string[], namespace?: string, values?: Object, formats?: any): string;
  (message: string | string[], values?: Object, formats?: any): string;
}

declare interface Grackle extends Translate {

  /**
   * learn (set) languages
   * @param {Object} langs languages group
   * @param {string} [namespace]
   */
  learn(langs: LangGroup, namespace?: string): void;

  /**
   * Set current locale
   * @param {string} locale locale name
   */
  setLocale(locale: string): void;

  /**
   * Get current locale
   * @returns {string}
   */
  getLocale(): string;

  /**
   * translate message with locale
   * @param {string} locale 
   */
  locale(locale: string): Translate;

  /**
   * Create a new grackle instance
   */
  create(): Grackle;
}

declare var t: Grackle;

export = t;
