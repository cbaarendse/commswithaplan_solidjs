import {createMemo} from 'solid-js';
import createConverter from '../../../functions/convert';
import {translations, language} from '../../../stores/utils';
import {marketData, useForResults} from '../../../stores/reach';

interface SourceRadioButtonProps {
  onChangeDataSource: () => void;
}

export default function SourceRadioButton(props: SourceRadioButtonProps) {
  const converter = createConverter();
  const disabled = createMemo(() => marketData() === false);
  const message = createMemo(() => converter.translate('use', translations(), language()));

  return (
    <fieldset>
      <legend>{message()}</legend>
      <input
        class="radio__button"
        id="useformula_radio"
        type="radio"
        name="use_market_data"
        value="formula"
        checked={useForResults() === 'formula'}
        disabled={disabled()}
        onChange={(e) => {
          if (e.currentTarget.checked) {
            useForResults.set('formula');
            props.onChangeDataSource();
          }
        }}
      />
      <label for="useformula__radio">{converter.translate('formula', translations(), language())}</label>
      <input
        class="radio__button"
        id="usedata__radio"
        type="radio"
        name="use_market_data"
        value="data"
        checked={useForResults() === 'data'}
        disabled={disabled()}
        onChange={(e) => {
          if (e.currentTarget.checked) {
            useForResults.set('data');
            props.onChangeDataSource();
          }
        }}
      />
      <label for="usedata__radio">{converter.translate('data', translations(), language())}</label>
      <style>{`
  fieldset {
    display: grid;
    gap: 0.8rem;
    grid-template-columns: auto 1fr;
    height: 100%;
    padding: 0.4rem 0.6rem;
    align-items: center;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
  }
  label {
    text-align: left;
  }
  legend {
    grid-column: span 2;
    font-size: 1em;
    text-align: center;
    padding: 0rem 0rem;
  }
      `}</style>
    </fieldset>
  );
}
