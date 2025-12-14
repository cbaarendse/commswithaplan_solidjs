// imports
import { createMemo } from 'solid-js';
import { For } from 'solid-js';
import BreadCrumbs from '../reusable/BreadCrumbs';
import Card from '../reusable/Card';
import { language } from '../../stores/utils';
import { homeItems } from '../../stores/home';
import createConverter from '../../functions/convert';

export default function Home() {
  const converter = createConverter();

  const expandedHomeItems = createMemo(() =>
    converter.expandItems<typeof homeItems()[number], typeof homeItems()[number]['definitions'][0]>(
      homeItems(),
      language()
    )
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="home__flex">
          <For each={expandedHomeItems()}>
            {(item) => (
              <Card
                card={{
                  title: item.displayName,
                  color: 'blue',
                  imgFiles: item.imgFiles,
                  link: item.link,
                  action: item.action,
                  fontSize: '0.9em'
                }}
              >
                {item.description}
              </Card>
            )}
          </For>
        </div>
        <style>{`
  .home__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .home__flex :global(.card) {
    flex: 1 1 32rem;
  }
        `}</style>
      </section>
    </>
  );
}
