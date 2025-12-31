import {createMemo} from 'solid-js';
import {faPerson, faPersonDress} from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import {genders, marketData, useForResults} from '../../../stores/reach';

interface GenderButtonProps {
  onChangeGender: () => void;
}

export default function GenderButton(props: GenderButtonProps) {
  const gendersToWorkWith = createMemo(() => new Set(genders() ?? ['f', 'm', 'x']));
  const disabled = createMemo(() => !marketData() || useForResults() === 'formula');

  const toggleGenders = () => {
    let newGenders = new Set(gendersToWorkWith());
    
    if (newGenders.has('f') && newGenders.has('m') && newGenders.has('x')) {
      newGenders.delete('m');
      newGenders.delete('x');
    } else if (newGenders.has('f') && !newGenders.has('m') && !newGenders.has('x')) {
      newGenders.delete('f');
      newGenders.add('m');
    } else if (!newGenders.has('f') && newGenders.has('m') && !newGenders.has('x')) {
      newGenders.add('f');
    } else if (newGenders.has('f') && newGenders.has('m') && !newGenders.has('x')) {
      newGenders = new Set(['f', 'm', 'x']);
    } else if (!newGenders.has('f') && !newGenders.has('m') && !newGenders.has('x')) {
      newGenders = new Set(['f', 'm', 'x']);
    }
    
    genders.set(Array.from(newGenders));
    props.onChangeGender();
  };

  return (
    <fieldset>
      <button
        class="genders__toggle"
        type="button"
        aria-roledescription="button"
        disabled={disabled()}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleGenders();
        }}
      >
        <Fa
          icon={faPersonDress}
          color={gendersToWorkWith().has('f') && !gendersToWorkWith().has('x') ? 'var(--ra-red)' : 'var(--ra-grey-light)'}
        />
        <Fa
          icon={faPerson}
          color={gendersToWorkWith().has('m') && !gendersToWorkWith().has('x') ? 'var(--ra-red)' : 'var(--ra-grey-light)'}
        />
      </button>
      <style>{`
  fieldset {
    display: grid;
    grid-template-columns: 1fr;
    gap: 0.8rem;
    padding: 0.1rem 0.6rem;
    border: solid 1px var(--ra-teal-light);
    background-color: transparent;
    border-radius: 3px;
    height: 100%;
  }
  button {
    display: flex;
    gap: 1.6rem;
    justify-content: center;
    align-items: center;
    font-size: 2.1rem;
    background: transparent;
    border: none;
    cursor: pointer;
  }
  button:hover {
    opacity: 0.7;
  }
      `}</style>
    </fieldset>
  );
}
