// imports
import { createSignal, createEffect, Show } from 'solid-js';
import { useLocation, A } from '@solidjs/router';
import { language, isSmallScreen, navigationVisible, useMediaQuery } from '../../stores/utils';

export default function Navigation() {
  const location = useLocation();

  // Setup media query subscription
  createEffect(() => {
    const mediaQuery = useMediaQuery('(max-width: 768px)');
    createEffect(() => {
      isSmallScreen.set(mediaQuery());
    });
  });

  createEffect(() => {
    navigationVisible.set(isSmallScreen() ? false : true);
  });

  const handleClick = () => {
    if (isSmallScreen()) {
      navigationVisible.set(false);
    } else {
      navigationVisible.set(true);
    }
  };

  return (
    <>
      <Show when={navigationVisible()}>
        <nav class="key" style="transition: all 0.3s ease-in-out">
          <ul>
            <li>
              <A
                href="/"
                end
                class="brand"
                onClick={handleClick}
              >
                <span class="blue">Comms</span>
                &nbsp;
                <span class="green">With&nbsp;A</span>
                &nbsp;
                <span class="red">Plan</span>
              </A>
            </li>
            <li>
              <A href="/consultancy">
                <span class="blue">{language() === 'nl-NL' ? 'Consultancy' : 'Consultancy'}</span>
              </A>
            </li>
            <li>
              <A href="/tools">
                <span class="blue">{language() === 'nl-NL' ? 'Tools' : 'Tools'}</span>
              </A>
            </li>
          </ul>
        </nav>
      </Show>

      <Show when={location.pathname === '/' && navigationVisible()}>
        <nav class="sub" style="transition: all 0.3s ease-in-out">
          <ul>
            <li>
              <A href="/" onClick={handleClick}>
                <span>Home</span>
              </A>
            </li>
          </ul>
        </nav>
      </Show>

      <Show when={location.pathname.startsWith('/consultancy') && navigationVisible()}>
        <nav class="sub" style="transition: all 0.3s ease-in-out">
          <ul>
            <li>
              <A href="/consultancy" end onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Home' : 'Home'}</span>
              </A>
            </li>
            <li>
              <A href="/consultancy/work" onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Werk' : 'Work'}</span>
              </A>
            </li>
            <li>
              <A href="/consultancy/about" onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Over' : 'About'}</span>
              </A>
            </li>
            <li>
              <A href="/consultancy/contact" onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Contact' : 'Contact'}</span>
              </A>
            </li>
          </ul>
        </nav>
      </Show>

      <Show when={location.pathname.startsWith('/tools') && navigationVisible()}>
        <nav class="sub" style="transition: all 0.3s ease-in-out">
          <ul>
            <li>
              <A href="/tools" end onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Home' : 'Home'}</span>
              </A>
            </li>
            <li>
              <A href="/tools/reach" onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Bereik' : 'Reach'}</span>
              </A>
            </li>
            <li>
              <A href="/tools/docs" onClick={handleClick}>
                <span>{language() === 'nl-NL' ? 'Documentatie' : 'Docs'}</span>
              </A>
            </li>
          </ul>
        </nav>
      </Show>

      <style>{`
  nav {
    display: grid;
    grid-template-columns: 1fr;
    grid-column: 1/3;
  }

  nav.key {
    padding: 1em 1.4em 1em 1.4em;
    background-color: var(--ra-teal-light);
  }

  nav.sub {
    padding: 1em 1.4em 1em 1.4em;
    background-color: var(--ra-black-off-white);
  }

  ul {
    grid-column: 1/1;
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;
  }

  .main-nav ul li:first-of-type {
    flex: 1 1 3rem;
    font-family: 'Trebuchet MS';
  }

  nav.key a.brand span.blue {
    color: var(--ra-white);
  }
  nav.key a span.green {
    color: var(--ra-white);
  }
  nav.key a span.red {
    color: var(--ra-white);
  }
  nav.key a,
  nav.key a:visited {
    color: var(--ra-grey-off-white);
  }
  nav.sub a,
  nav.sub a:visited {
    color: var(--ra-grey-light);
  }
  nav.key a:hover,
  nav.sub a:hover {
    color: var(--ra-blue);
  }
  nav.key a:hover span.blue {
    color: var(--ra-blue);
  }
  nav.key a:hover span.green {
    color: var(--ra-green);
  }
  nav.key a:hover span.red {
    color: var(--ra-red);
  }
  nav.key a.active span.blue {
    color: var(--ra-blue);
  }
  nav.key a.active span.green {
    color: var(--ra-green);
  }
  nav.key a.active span.red {
    color: var(--ra-red);
  }
  nav.sub a.active span {
    color: var(--ra-blue);
  }

  @media screen and (min-width: 760px) {
    nav {
      grid-template-columns: 1fr 4fr 1fr;
    }
    nav.key {
      padding: 2rem 1rem 2rem 1rem;
    }
    nav.sub {
      padding: 1rem 1rem 1rem 1rem;
    }
    ul {
      grid-column: 2/3;
      flex-direction: row;
      align-items: flex-start;
      gap: clamp(0.4em, 4vw, 9.6em);
    }
    nav.key ul {
      justify-content: space-evenly;
    }

    nav.key ul li:nth-of-type(1) {
      flex: 1 1 auto;
    }

    nav.sub ul {
      justify-content: center;
    }
  }
      `}</style>
    </>
  );
}
