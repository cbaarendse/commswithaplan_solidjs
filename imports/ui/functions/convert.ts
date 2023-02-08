import {Content, Translation, Language} from '../../both/typings/types';

// Convert
export default function createConverter() {
  function translate(input: string | undefined | null, list: Translation[], language: Language): string {
    const translation = list.filter((item: Translation) => item.name === input)[0];
    if (translation.definitions) {
      return translation.definitions.filter((item) => item.language === language)[0].displayName;
    } else {
      return '';
    }
  }

  function displayContent(input: string, list: Content[], language: Language): string {
    const content = list.filter((item) => item.name === input)[0];
    if (content.definitions) {
      return content.definitions.filter((item) => item.language === language)[0].description;
    } else {
      return '';
    }
  }

  function describeContent(input: string, list: Content[], language: Language): string {
    const translation = list.filter((item) => item.name === input)[0];
    if (translation.definitions) {
      return translation.definitions.filter((item) => item.language === language)[0].description;
    } else {
      return '';
    }
  }

  function contentItem<C>(list: C[], key: keyof C): C {
    return list.filter((item: C) => item[key] == key)[0];
  }

  function contentDefinition<D>(definitions: D[], language: Language) {
    return definitions.filter((item) => {
      if (typeof item === 'object' && item && 'language' in item) {
        return item.language == language;
      }
    })[0];
  }

  function expandItems<I, D>(list: I[], language: Language) {
    const result: (I & Partial<D>)[] = [];
    list.forEach((item) => {
      if (typeof item === 'object' && item && 'definitions' in item && Array.isArray(item.definitions)) {
        const itemExpansion = contentDefinition(item.definitions, language);
        if (itemExpansion) {
          result.push({...item, ...itemExpansion});
        } else {
          result.push({...item});
        }
      }
    });
    return result;
  }

  return {
    translate,
    displayContent,
    describeContent,
    contentItem,
    expandItems
  };
}
