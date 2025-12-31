import {For} from 'solid-js';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import {marketName, useForResults} from '../../../stores/reach';
import createConverter from '/imports/ui/functions/convert';
import {allMarkets} from '../../../../both/constants/constants';
import {language, translations} from '/imports/ui/stores/utils';

interface MarketSelectProps {
  onChangeMarket: () => void;
}

export default function MarketSelect(props: MarketSelectProps) {
  const converter = createConverter();

  const handleChange = (e: Event) => {
    const target = e.currentTarget as HTMLSelectElement;
    marketName.set(target.value);
    useForResults.set('formula');
    props.onChangeMarket();
  };

  return (
    <fieldset>
      <legend>{converter.translate('choose_market', translations(), language())}</legend>
      <select
        class="market"
        name="market"
        id="market__select"
        value={marketName()}
        onChange={handleChange}
      >
        <For each={allMarkets()}>
          {(thisMarket) => <option value={thisMarket.name}>{thisMarket.flag || thisMarket.name}</option>}
        </For>
      </select>
      <label for="market__select">
        <Fa icon={faSort} color="var(--ra-teal)" />
      </label>
      <style>{`
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    height: 100%;
    padding: 0.4rem 0.6rem;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  select {
    appearance: none;
    border: none;
    background-color: transparent;
    padding: 0.4em 0.6em 0.4em 0.4em;
  }
  select:focus {
    outline: solid 1px var(--ra-green);
  }
  label {
    background-color: transparent;
    padding: 0.2em 0.4em;
  }
      `}</style>
    </fieldset>
  );
}
