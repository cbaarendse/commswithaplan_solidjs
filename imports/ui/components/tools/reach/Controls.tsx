import {Show} from 'solid-js';
import {Meteor} from 'meteor/meteor';
import GenderButton from './GenderButton';
import AgeGroupsSelect from './AgeGroupsSelect';
import SourceRadioButton from './SourceRadioButton';
import MarketSelect from './MarketSelect';
import createReachTool from '../../../functions/reach';
import sort from '../../../procedures/sort';
import hide from '../../../procedures/hide';
import {language} from '../../../stores/utils';
import {marketData, deployment, sortedByName, useForResults} from '../../../stores/reach';
import {CWAPUser} from '../../../../both/typings/types';
import {
  faArrowRotateLeft,
  fa0,
  faArrowDownAZ,
  faArrowDownWideShort,
  faBars,
  faMinus,
  faFolderOpen,
  faDownload,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';

interface ControlsProps {
  onChangeDataSource: () => void;
  onChangeMarket: () => void;
  onChangeGender: () => void;
  onChangeAgeGroup: () => void;
  onReset: () => void;
}

export default function Controls(props: ControlsProps) {
  const currentUser = Meteor.user() as CWAPUser | null;
  const reachTool = createReachTool();

  return (
    <div class="container">
      <Show when={currentUser}>
        <form>
          <MarketSelect onChangeMarket={props.onChangeMarket} />
          <SourceRadioButton onChangeDataSource={props.onChangeDataSource} />
          <Show when={marketData() && useForResults() === 'data'}>
            <GenderButton onChangeGender={props.onChangeGender} />
            <AgeGroupsSelect onChangeAgeGroup={props.onChangeAgeGroup} />
          </Show>
        </form>
      </Show>
      <div class="operations__container">
        <menu>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.onReset();
            }}
          >
            {reachTool.areAllTouchPointsValueZero(deployment()) ? (
              <Fa icon={faArrowRotateLeft} />
            ) : (
              <Fa icon={fa0} />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              sort(language());
            }}
          >
            {sortedByName() ? (
              <Fa icon={faArrowDownWideShort} />
            ) : !sortedByName() &&
              reachTool.areAllTouchPointsValueZero(deployment()) &&
              reachTool.isShowAll(deployment()) ? (
              <Fa icon={faArrowDownAZ} />
            ) : (
              <Fa icon={faArrowDownAZ} />
            )}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              hide();
            }}
          >
            {reachTool.isShowAll(deployment()) ? <Fa icon={faMinus} /> : <Fa icon={faBars} />}
          </button>
          <button
            class="save"
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              props.onReset();
            }}
          >
            <Fa icon={faDownload} />
          </button>
        </menu>

        <nav class="files">
          <a href="/tools/reach/strategies" data-tinro-ignore>
            <Fa icon={faFolderOpen} />
          </a>
          <a href="/tools/reach/" data-tinro-ignore>
            <Fa icon={faPlus} />
          </a>
        </nav>
      </div>
      <style>{`
  div.container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }

  form {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto auto;
    justify-content: center;
    align-items: center;
  }
  div.operations__container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 0.7em;
  }

  menu {
    display: flex;
    gap: 2rem;
    justify-content: flex-start;
  }
  nav {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
  }

  button {
    font-size: 2.1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
  menu button {
    color: var(--ra-red);
  }
  menu button:last-of-type {
    color: var(--ra-blue);
  }
  menu button:hover {
    color: var(--ra-green);
  }
  nav.files a {
    font-size: 2.1rem;
    color: var(--ra-green);
  }
  nav.files a:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    button {
      font-size: 1em;
    }
  }

  @media screen and (min-width: 1024px) {
    button {
      font-size: 1em;
    }
  }
      `}</style>
    </div>
  );
}
