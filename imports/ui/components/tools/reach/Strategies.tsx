import {For, Show, createSignal} from 'solid-js';
import Strategies from '../../../../api/strategies/strategies';
import {Meteor} from 'meteor/meteor';
import createConverter from '/imports/ui/functions/convert';
import {translations, language} from '../../../stores/utils';
import {faEdit, faXmark, faTableList} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import {CWAPUser, Strategy} from '/imports/both/typings/types';
import {DateTime} from 'luxon';

export default function StrategiesComponent() {
  const [subReady, setSubReady] = createSignal(false);
  const [strategies, setStrategies] = createSignal<Strategy[]>([]);
  const currentUser = Meteor.user() as CWAPUser | null;
  const converter = createConverter();

  // Subscribe to strategies
  const strategiesSub = Meteor.subscribe('strategies');
  setSubReady(strategiesSub.ready());
  
  // Fetch strategies
  setStrategies(Strategies.find({}).fetch());

  return (
    <>
      <h3>{converter.translate('strategies', translations(), language())}</h3>

      <Show
        when={currentUser}
        fallback={<div class="wait">Log in to work with saved strategies.</div>}
      >
        <Show when={subReady()} fallback={<div class="wait">Loading...</div>}>
          <ul>
            <For each={strategies()}>
              {(strategy) => (
                <li>
                  <time class="date" datetime={strategy.lastChanged.toISOString()}>
                    {DateTime.fromJSDate(strategy.lastChanged).toLocaleString(DateTime.DATETIME_MED)}
                  </time>
                  <h4>{strategy.title}</h4>
                  <span>
                    {currentUser?.profile?.firstname}&nbsp;{currentUser?.profile?.surname}
                  </span>
                  <nav>
                    <a class="list" href="/tools/reach/" data-tinro-ignore>
                      <Fa icon={faTableList} />
                    </a>
                  </nav>
                  <menu>
                    <button class="edit">
                      <Fa icon={faEdit} />
                    </button>
                    <button class="delete">
                      <Fa icon={faXmark} />
                    </button>
                  </menu>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </Show>

      <style>{`
  ul {
    display: grid;
    grid-template-columns: 1fr;
    justify-content: space-between;
    gap: 1.4em;
  }

  li {
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: space-between;
    gap: 1.4em;
    border: 1px solid var(--ra-grey-bright);
    border-radius: 0.3rem;
    padding: 0.7rem;
  }
  h4 {
    grid-column: span 2;
  }
  time.date {
    font-size: 0.8em;
    grid-column: span 2;
    color: var(--ra-grey-light);
  }
  button {
    background: none;
    border: none;
    width: fit-content;
    height: fit-content;
    font-size: 2.1rem;
    color: grey;
    cursor: pointer;
  }
  a:hover {
    color: var(ra-green);
  }
  button:hover {
    color: var(--ra-red);
  }
      `}</style>
    </>
  );
}
