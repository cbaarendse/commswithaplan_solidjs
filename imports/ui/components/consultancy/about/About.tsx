import {For, createMemo} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import Card from '../../reusable/Card';
import {language} from '../../../stores/utils';
import {aboutItems} from '../../../stores/consultancy';
import createConverter from '/imports/ui/functions/convert';

export default function About() {
  const converter = createConverter();

  const expandedAboutItems = createMemo(() =>
    converter.expandItems(aboutItems(), language())
  );

  return (
    <>
      <header>
        <BreadCrumbs />
      </header>
      <section>
        <div class="about__flex">
          <For each={expandedAboutItems()}>
            {(item) => (
              <Card card={{fontSize: '0.9em'}}>{item.description}</Card>
            )}
          </For>
          <Card card={{fontSize: '0.9em'}}>
            <a href="https://www.linkedin.com/in/cbaarendse/">https://www.linkedin.com/in/cbaarendse/</a>
          </Card>
        </div>
        <style>{`
  .about__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .about__flex .card {
    flex: 1 1 32rem;
  }
        `}</style>
      </section>
    </>
  );
}
