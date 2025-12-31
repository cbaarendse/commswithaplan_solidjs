import {For, createMemo} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import CardCopy from '../../reusable/CardCopy';
import {language} from '../../../stores/utils';
import {consultancyHomeItems} from '../../../stores/consultancy';
import createConverter from '/imports/ui/functions/convert';

export default function Consultancy() {
  const converter = createConverter();
  
  const expandedConsultancyHomeItems = createMemo(() =>
    converter.expandItems(consultancyHomeItems(), language())
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="home__flex">
          <For each={expandedConsultancyHomeItems()}>
            {(item) => (
              <CardCopy backgroundColor={'--var'} color={'blue'} fontSize={'0.9em'}>
                {(C) => (
                  <>
                    <C.Title>{item.displayName}</C.Title>
                    <C.Body innerHTML={item.description} />
                    <C.Action link={item.link}>{item.action}</C.Action>
                  </>
                )}
              </CardCopy>
            )}
          </For>
        </div>
        <style>{`
  .home__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .home__flex .card {
    flex: 1 1 32rem;
  }
        `}</style>
      </section>
    </>
  );
}
