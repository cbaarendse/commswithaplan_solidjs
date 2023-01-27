import {Content, Translation, Language} from '../typings/types';

// Convert
export default function createConverter() {
  function translate(input: string | undefined | null, items: Translation[], language: Language): string {
    return items.filter((element: Translation) => element.name === input && element.language === language)[0]
      .displayName;
  }

  function displayContent(page: string, items: Content[], language: Language): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].displayName;
  }

  function describeContent(page: string, items: Content[], language: Language): string {
    return items.filter((element: Content) => {
      element.name === page && element.language === language;
    })[0].description;
  }
  return {translate, displayContent, describeContent};
}
