import {createSignal, createMemo, Show, onCleanup} from 'solid-js';
import OutputMeter from './OutputMeter';
import Modal from '../../reusable/Modal';
import createConverter from '../../../functions/convert';
import createFormatter from '../../../functions/format';
import {language, translations} from '../../../stores/utils';
import {definitions} from '../../../stores/tools';
import {
  marketName,
  overlap,
  populationCountForMarket,
  populationCountForStrategy,
  respondentsCountForMarket,
  respondentsCountForStrategy,
  totalReach,
  useForResults
} from '../../../stores/reach';

export default function Output() {
  const converter = createConverter();
  const formatter = createFormatter();
  const [displayOutputDescription, setDisplayOutputDescription] = createSignal(false);
  const [outputName, setOutputName] = createSignal<'total_reach' | 'overlap'>('total_reach');

  const title = createMemo(() => converter.displayContent(outputName(), definitions(), language()));
  const description = createMemo(() => converter.describeContent(outputName(), definitions(), language()));

  const dismiss = (event: MouseEvent | KeyboardEvent) => {
    if ((event instanceof KeyboardEvent && event.key === 'Escape') || event instanceof MouseEvent) {
      setDisplayOutputDescription(false);
    }
  };

  return (
    <div class="container">
      <Show when={useForResults() === 'data'}>
        <div class="amounts__container">
          <span>respondents in range:</span>
          <output>{formatter.toNumberFormat(respondentsCountForStrategy(), 0)}</output>
          <span>respondents:</span>
          <output>{formatter.toNumberFormat(respondentsCountForMarket(), 0)}</output>
          <span>population in range:</span>
          <output>{formatter.toMillionsFormat(populationCountForStrategy(), 2)}</output>
          <span>population for {marketName()}:</span>
          <output>{formatter.toMillionsFormat(populationCountForMarket(), 1)}</output>
        </div>
      </Show>
      <div class="meter__container">
        <label
          for="reach"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplayOutputDescription(true);
            setOutputName('total_reach');
          }}
        >
          <span>
            {converter.translate('total', translations(), language())}&nbsp;
            {converter.translate('reach', translations(), language())}:&nbsp;
          </span>
          <output>{formatter.toPercentFormat(totalReach(), 0)}</output>
        </label>
        <OutputMeter id="reach" value={totalReach()} min={0} max={1} />

        <label
          for="overlap"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDisplayOutputDescription(true);
            setOutputName('overlap');
          }}
        >
          <span>{converter.translate('overlap', translations(), language())}:&nbsp;</span>
          <output>{formatter.toPercentFormat(overlap(), 1)}</output>
        </label>
        <OutputMeter id="overlap" value={overlap()} min={0} max={1} />
      </div>

      <Modal title={title()} display={displayOutputDescription()} onClick={dismiss}>
        {description()}
      </Modal>

      <style>{`
  div.amounts__container {
    display: grid;
    grid-template-columns: auto auto;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
    font-size: 0.8em;
    color: var(--ra-grey-light);
  }
  div.meter__container {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.4em;
    padding: 1em;
    border-radius: 0.2em;
    background-color: var(--ra-teal-off-white);
  }
  label {
    display: flex;
    justify-content: start;
    gap: 1em;
    font-size: 1.1em;
    cursor: pointer;
  }
  label:hover {
    opacity: 0.7;
  }

  @media screen and (min-width: 768px) {
    div.amounts__container {
      grid-template-columns: repeat(3, auto auto);
    }
    div.meter__container {
      grid-template-columns: auto 1fr;
    }
    label {
      justify-content: space-between;
    }
  }
  @media screen and (min-width: 1024px) {
    div.amounts__container {
      grid-template-columns: repeat(3, auto auto);
    }

    div.meter__container {
      grid-template-columns: auto 1fr;
    }
    label {
      justify-content: space-between;
    }
  }
      `}</style>
    </div>
  );
}
