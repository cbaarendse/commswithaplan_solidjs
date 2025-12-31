import {For, createMemo} from 'solid-js';
import PolicyArticle from '../PolicyArticle';
import {language} from '../../../stores/utils';
import {termsAndConditions} from '../../../stores/legal';

export default function TermsAndConditions() {
  const translatedTermsAndConditions = createMemo(() => 
    termsAndConditions().filter((item) => item.language === language())
  );

  return (
    <>
      <For each={translatedTermsAndConditions()}>
        {(item) => <PolicyArticle item={item} />}
      </For>
    </>
  );
}
