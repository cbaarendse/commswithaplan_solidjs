import {For, createMemo} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import Card from '../../reusable/Card';
import {language} from '../../../stores/utils';
import {toolsHomeItems} from '../../../stores/tools';
import createConverter from '/imports/ui/functions/convert';

export default function Tools() {
  const converter = createConverter();
  
  const expandedToolsHomeItems = createMemo(() =>
    converter.expandItems(toolsHomeItems(), language())
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="home__flex">
          <For each={expandedToolsHomeItems()}>
            {(item) => (
              <Card
                card={{
                  color: item.color,
                  title: item.displayName,
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

  .card {
    flex: 1 1 32rem;
  }
        `}</style>
      </section>
    </>
  );
}
