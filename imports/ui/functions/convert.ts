import {Content, Translation, Language} from '../../both/typings/types';

// Convert
export default function createConverter() {
  // function translateOld(
  //   input: string | undefined | null,
  //   items: Omit<Definition, 'description'>[],
  //   language: Language
  // ): string {
  //   return items.filter(
  //     (item: Omit<Definition, 'description'>) => item.name === input && item.language === language
  //   )[0].displayName;
  // }

  function translate(input: string | undefined | null, list: Translation[], language: Language): string {
    const translation = list.filter((item: Translation) => item.name === input)[0];
    return translation.definitions.filter((item) => item.language === language)[0].displayName;
  }

  function displayContent(input: string, list: Content[], language: Language): string {
    const content = list.filter((item) => item.name === input)[0];
    return content.definitions.filter((item) => item.language === language)[0].description;
  }

  // function describeContent(page: string, items: Content[], language: Language): string {
  //   return items.filter((item: Content) => {
  //     item.name === page && item.language === language;
  //   })[0].description;
  // }

  function describeContent(input: string, list: Content[], language: Language): string {
    const translation = list.filter((item) => item.name === input)[0];
    return translation.definitions.filter((item) => item.language === language)[0].description;
  }
  return {translate, displayContent, describeContent};
}
