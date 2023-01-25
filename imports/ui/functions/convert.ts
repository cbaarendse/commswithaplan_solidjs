import {Content, Translation} from './types';

// Convert
export default class Convert {
  static translate(input: string | undefined | null, items: Translation[], language: string): string {
    return items.filter((element: Translation) => element.name === input && element.language === language)[0]
      .displayName;
  }

  static displayContent(page: string, items: Content[], language: string): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].displayName;
  }

  static describeContent(page: string, items: Content[], language: string): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].description;
  }
}
