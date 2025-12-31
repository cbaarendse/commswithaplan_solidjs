import {For, createMemo} from 'solid-js';
import {translations, language} from '../../../stores/utils';
import {ageGroupIndexStart, ageGroupIndexEnd, ageGroups} from '../../../stores/reach';
import createConverter from '../../../functions/convert';
import {faSort} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';

interface AgeGroupsSelectProps {
  onChangeAgeGroup: () => void;
}

export default function AgeGroupsSelect(props: AgeGroupsSelectProps) {
  const converter = createConverter();

  const adaptAgeGroupIndexEnd = () => {
    const start = ageGroupIndexStart();
    const end = ageGroupIndexEnd();
    if (end !== undefined && start !== undefined && end - start < 1) {
      ageGroupIndexEnd.set(start ? start + 1 : 1);
    }
  };

  const handleChange = () => {
    adaptAgeGroupIndexEnd();
    props.onChangeAgeGroup();
  };

  return (
    <fieldset>
      {ageGroups() && (
        <>
          <select
            class="agegroup__select"
            id="agegroup__select_start"
            value={ageGroupIndexStart()}
            onChange={(e) => {
              ageGroupIndexStart.set(Number(e.currentTarget.value));
              handleChange();
            }}
          >
            <For each={ageGroups()}>
              {(ageGroup, index) => (
                <option value={index()} disabled={false}>
                  {ageGroup[0]} - {ageGroup[1]} {converter.translate('year', translations(), language())}
                </option>
              )}
            </For>
          </select>
          <label for="agegroup__select_start">
            <Fa icon={faSort} color="var(--ra-teal)" />
          </label>
          <select
            class="agegroup__select"
            id="agegroup__select_end"
            value={ageGroupIndexEnd()}
            onChange={(e) => {
              ageGroupIndexEnd.set(Number(e.currentTarget.value));
              props.onChangeAgeGroup();
            }}
          >
            <For each={ageGroups()}>
              {(ageGroup, index) => (
                <option value={index()} disabled={index() < (ageGroupIndexStart() ?? 0) + 1}>
                  {ageGroup[0]} - {ageGroup[1]} {converter.translate('year', translations(), language())}
                </option>
              )}
            </For>
          </select>
          <label for="agegroup__select_end">
            <Fa icon={faSort} color="var(--ra-teal)" />
          </label>
        </>
      )}
      <style>{`
  fieldset {
    display: grid;
    grid-template-columns: 1fr auto 1fr auto;
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
