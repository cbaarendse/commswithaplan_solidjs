// imports
import { Show, For } from 'solid-js';
import { useLocation } from '@solidjs/router';
import LogoReach from './LogoReach';
import { language, translations } from '../../stores/utils';
import createConverter from '../../functions/convert';

// Note: This component needs to be adapted to work with SolidJS router
// The original uses tinro's meta() function which doesn't have a direct equivalent in @solidjs/router
// You may need to implement your own breadcrumb logic based on the current route

export default function BreadCrumbs() {
  const location = useLocation();
  const converter = createConverter();

  // Parse breadcrumbs from pathname
  const getBreadcrumbs = () => {
    const path = location.pathname;
    const parts = path.split('/').filter(Boolean);
    
    if (parts.length === 0) {
      return [{ name: '/', path: '/' }];
    }

    return parts.map((part, index) => ({
      name: part,
      path: '/' + parts.slice(0, index + 1).join('/')
    }));
  };

  const breadcrumbs = () => getBreadcrumbs();

  return (
    <Show when={breadcrumbs().length > 0}>
      <nav>
        <ol>
          <For each={breadcrumbs()}>
            {(breadcrumb, index) => (
              <>
                <Show when={index() === 0 && breadcrumbs().length === 1}>
                  <li>
                    <LogoReach
                      logo={{
                        fontSize: '1em',
                        width: '1.2em',
                        height: '1.2em',
                        colored: true
                      }}
                    />
                  </li>
                </Show>
                <Show when={index() === 0 && breadcrumbs().length > 1}>
                  <li>
                    <a href="/">
                      <LogoReach
                        logo={{
                          fontSize: '1em',
                          width: '1.2em',
                          height: '1.2em',
                          colored: true
                        }}
                      />
                    </a>
                  </li>
                </Show>
                <Show when={index() > 0}>
                  <li>
                    <span>&gt;</span>
                  </li>
                  <li>
                    <a href={breadcrumb.path}>
                      <span>{converter.translate(breadcrumb.name, translations(), language())}</span>
                    </a>
                  </li>
                </Show>
              </>
            )}
          </For>
        </ol>
        <style>{`
  nav {
    display: flex;
    margin-bottom: 1em;
    margin-inline: 0;
    padding: 0.8em 1.2em;
    font-size: 1em;
    background-color: var(--ra-teal-off-white);
    border-radius: 5px;
  }

  @media screen and (min-width: 768px) {
    nav {
      display: none;
    }
  }
  nav ol {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    gap: 1.2em;
  }

  nav ol li a:hover span {
    color: var(--ra-green);
  }
  nav ol li a.active span {
    color: var(--ra-red);
  }
        `}</style>
      </nav>
    </Show>
  );
}
