import {For, createMemo} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import Card from '../../reusable/Card';
import {language} from '../../../stores/utils';
import {workItems} from '../../../stores/consultancy';
import createConverter from '/imports/ui/functions/convert';

export default function Work() {
  const converter = createConverter();
  
  const expandedWorkItems = createMemo(() =>
    converter.expandItems(workItems(), language())
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <p>
          {language() === 'nl-NL'
            ? 'Zaken die ik manage gedurende het reclameproces (je kan kiezen en mixen):'
            : "Things I'll manage along the advertising process (you can pick and mix):"}
        </p>
        <div class="work__flex">
          <For each={expandedWorkItems()}>
            {(item) => (
              <Card
                card={{
                  color: item.color,
                  title: item.displayName,
                  fontSize: '0.9em',
                  imgFiles: [`/consultancy/${item.name}.jpg`]
                }}
              >
                {item.description}
              </Card>
            )}
          </For>
        </div>
        <style>{`
  .work__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .work__flex .card {
    flex: 1 1 32rem;
  }
        `}</style>
      </section>
    </>
  );
}
