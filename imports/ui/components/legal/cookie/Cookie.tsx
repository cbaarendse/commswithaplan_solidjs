import {For, createMemo} from 'solid-js';
import PolicyArticle from '../PolicyArticle';
import {language} from '../../../stores/utils';
import {cookiePolicy} from '../../../stores/legal';

export default function Cookie() {
  const translatedCookiePolicy = createMemo(() => 
    cookiePolicy().filter((item) => item.language === language())
  );

  return (
    <>
      <For each={translatedCookiePolicy()}>
        {(item) => <PolicyArticle item={item} />}
      </For>
    </>
  );
}
