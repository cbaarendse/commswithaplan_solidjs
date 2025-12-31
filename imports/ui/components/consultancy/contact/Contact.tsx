import {For, createMemo, Show} from 'solid-js';
import BreadCrumbs from '../../reusable/BreadCrumbs';
import Card from '../../reusable/Card';
import {language} from '../../../stores/utils';
import {contactItems} from '../../../stores/consultancy';
import createConverter from '/imports/ui/functions/convert';

export default function Contact() {
  const converter = createConverter();

  const expandedContactItems = createMemo(() =>
    converter.expandItems(contactItems(), language())
  );

  return (
    <>
      <BreadCrumbs />
      <section>
        <div class="contact__flex">
          <For each={expandedContactItems()}>
            {(item) => (
              <Card
                card={{
                  color: item.color,
                  title: item.displayName,
                  fontSize: '0.9em'
                }}
              >
                <address innerHTML={item.description?.split(', ').join('<br>')} />
              </Card>
            )}
          </For>
          <Card
            card={{
              title: 'LinkedIn',
              color: 'blue',
              fontSize: '1em',
              link: 'https://www.linkedin.com/in/cbaarendse/',
              action: 'Constantijn Baarendse'
            }}
          />
        </div>
        <h5>
          {language() === 'nl-NL'
            ? 'E-mail, bel, schrijf of stuur een bericht via LinkedIn.'
            : 'E-mail, call, write or send a message through LinkedIn.'}
        </h5>
        <style>{`
  h5 {
    color: var(--ra-red);
  }
  .contact__flex {
    display: flex;
    flex-wrap: wrap;
    gap: 2em;
  }

  .contact__flex .card {
    flex: 1 1 30rem;
  }
        `}</style>
      </section>
    </>
  );
}
