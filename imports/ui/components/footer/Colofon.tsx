// imports
import { createSignal } from 'solid-js';
import { language, translations } from '../../stores/utils';
import createConverter from '../../functions/convert';
import { faCookie, faCookieBite } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';

type ColofontProps = {
  onClick?: (e: MouseEvent) => void;
};

export default function Colofon(props: ColofontProps) {
  const [disabled] = createSignal(false);
  const [wholeCookie, setWholeCookie] = createSignal(true);
  const buttonFontSize = '1.2em';
  const converter = createConverter();

  const biteCookie = () => {
    setWholeCookie(false);
  };

  const repairCookie = () => {
    setWholeCookie(true);
  };

  return (
    <section>
      <span>© 2013-2023 Comms With A Plan</span>
      <nav>
        <a href="/consultancy/contact">Contact</a>
        <a href="/legal/termsandconditions">{converter.translate('legal', translations(), language())}</a>
      </nav>
      <menu>
        <button
          class="consent__visibility"
          type="button"
          aria-roledescription="button"
          disabled={disabled()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            props.onClick?.(e);
          }}
          onMouseEnter={(e) => {
            e.stopPropagation();
            e.preventDefault();
            biteCookie();
          }}
          onMouseLeave={(e) => {
            e.stopPropagation();
            e.preventDefault();
            repairCookie();
          }}
        >
          <span class="button__text" style={`--buttonFontSize: ${buttonFontSize};`}>
            {wholeCookie() ? (
              <Fa icon={faCookie} color="goldenrod" />
            ) : (
              <Fa icon={faCookieBite} color="goldenrod" />
            )}
          </span>
        </button>
      </menu>
      <style>{`
  section {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: 1em;
  }
  button {
    height: fit-content;
    background-color: transparent;
    margin: 0 0.4em;
    cursor: pointer;
    border-radius: 5%;
    border: none;
  }
  a {
    margin: 0 1em;
  }

  span.button__text {
    font-size: var(--buttonFontSize);
  }
      `}</style>
    </section>
  );
}
