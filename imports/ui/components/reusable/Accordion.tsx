// imports
import { createSignal, Show, JSX } from 'solid-js';
import type { Accordion as AccordionType } from '../../../both/typings/types';

type AccordionProps = {
  acc: AccordionType;
  children?: JSX.Element;
  title?: JSX.Element;
  footer?: JSX.Element;
};

export default function Accordion(props: AccordionProps) {
  const [disabled] = createSignal(false);
  const [visible, setVisible] = createSignal(props.acc.visible || false);

  return (
    <article class="accordion">
      <header>
        <button
          type="button"
          aria-roledescription="button"
          id="toggle__accordion"
          class="accordion__button"
          disabled={disabled()}
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            setVisible(!visible());
          }}
        >
          {visible() ? <b>-</b> : <b>+</b>}
        </button>
        {props.title}
      </header>
      <Show when={visible()}>
        <div class="accordion-main" style="transition: all 1s cubic-bezier(0.68, -0.6, 0.32, 1.6)">
          {props.children}
        </div>
      </Show>
      <footer>{props.footer}</footer>
      <style>{`
  header {
    min-height: 4em;
    border: none;
    border-top-left-radius: 0.2em;
    border-top-right-radius: 0.2em;
    padding: 0.5em 1em;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: var(--ra-teal-off-white);
    cursor: pointer;
  }
  button {
    height: 4rem;
    margin: 0 0.4em;
    color: var(--ra-white);
    cursor: pointer;
    background-color: var(--ra-green);
    padding: 0rem 1rem;
    border-radius: 5%;
    border: none;
  }
  button:hover {
    opacity: 0.7;
  }
  div.accordion-main {
    background-color: var(--ra-white);
    padding: 1em 2em;
  }
  footer {
    min-height: 3em;
    background-color: var(--ra-grey-off-white);
    border: none;
    border-bottom-left-radius: 0.2em;
    border-bottom-right-radius: 0.2em;
    padding: 0.5em 1em;
  }
      `}</style>
    </article>
  );
}
