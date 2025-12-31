import {For, createMemo} from 'solid-js';
import PolicyArticle from '../PolicyArticle';
import {language} from '../../../stores/utils';
import {privacyPolicy} from '../../../stores/legal';

export default function Privacy() {
  const translatedPrivacyPolicy = createMemo(() => 
    privacyPolicy().filter((item) => item.language === language())
  );

  return (
    <>
      <For each={translatedPrivacyPolicy()}>
        {(item) => <PolicyArticle item={item} />}
      </For>
    </>
  );
}
