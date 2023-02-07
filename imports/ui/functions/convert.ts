import {Content, Translation, Language} from '../../both/typings/types';

// Convert
export default function createConverter() {
  function translate(input: string | undefined | null, list: Translation[], language: Language): string {
    const translation = list.filter((item: Translation) => item.name === input)[0];
    return translation.definitions.filter((item) => item.language === language)[0].displayName;
  }

  function displayContent(input: string, list: Content[], language: Language): string {
    const content = list.filter((item) => item.name === input)[0];
    return content.definitions.filter((item) => item.language === language)[0].description;
  }

  function describeContent(input: string, list: Content[], language: Language): string {
    const translation = list.filter((item) => item.name === input)[0];
    return translation.definitions.filter((item) => item.language === language)[0].description;
  }

  function findContentItem<C>(name: string, list: C[]): C {
    return list.filter((item) => item.name == name)[0];
  }

  function findContentDefinitionInItemDefinitions<T>(definitions: T[], language: Language) {
    return definitions.filter((item) => item.language == language);
  }

  return {translate, displayContent, describeContent, findContentItem, findContentDefinitionInItemDefinitions};
}
