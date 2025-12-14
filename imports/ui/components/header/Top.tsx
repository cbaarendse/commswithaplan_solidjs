// imports
import { Meteor } from 'meteor/meteor';
import { createSignal, createEffect, Show } from 'solid-js';
import { A } from '@solidjs/router';
import ToggleButton from './ToggleButton';
import { language, navigationVisible } from '../../stores/utils';
import { faSignIn, faSignOut, faUser } from '@fortawesome/free-solid-svg-icons';
import Fa from 'solid-fa';
import type { CWAPUser } from '../../../both/typings/types';

// Top has room for functionality used from all over the site. Eventual cookies and/or marketing messages.
export default function Top() {
  const [currentUser, setCurrentUser] = createSignal<CWAPUser | null>(null);

  createEffect(() => {
    setCurrentUser(Meteor.user() as CWAPUser);
  });

  const logout = () => {
    Meteor.logout((error: any) => {
      const user = currentUser();
      console.log('logging out == ', Meteor.loggingOut, 'for ', user?.username);
      console.error('error at logout: ', error);
    });
  };

  return (
    <div class="container">
      <menu>
        <li>
          <ToggleButton />
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class={language() === 'nl-NL' ? 'active' : ''}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              language.set('nl-NL');
            }}
          >
            <span>NL</span>
          </a>
        </li>
        <li>
          <span class="divider">|</span>
        </li>
        <li>
          <a
            href="javascript:void(0)"
            class={language() === 'en-GB' ? 'active' : ''}
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              language.set('en-GB');
            }}
          >
            <span>EN</span>
          </a>
        </li>
      </menu>
      <nav>
        <ul>
          <li>
            <Show
              when={currentUser()}
              fallback={
                <A href="/user/loginsignin" class={currentUser() ? 'active' : ''}>
                  <Fa icon={faUser} />
                </A>
              }
            >
              <A href={`/user/${currentUser()?.username}`} class={currentUser() ? 'active' : ''}>
                <Fa icon={faUser} />
              </A>
            </Show>
          </li>
          <li>
            <Show
              when={currentUser()}
              fallback={
                <A href="/user/loginsignin" class={currentUser() ? 'active' : ''}>
                  <Fa icon={faSignIn} />
                </A>
              }
            >
              <a
                href="/"
                class={currentUser() ? 'active' : ''}
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  logout();
                }}
              >
                <Fa icon={faSignOut} />
              </a>
            </Show>
          </li>
        </ul>
      </nav>
      <style>{`
  div.container {
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    align-items: center;
    gap: 1.4rem;
    padding: 0.6rem 0.8rem;
    background-color: var(--ra-grey-off-white);
  }

  ul,
  menu {
    flex-basis: 100%;
    display: flex;
    flex-wrap: nowrap;
    justify-content: flex-end;
    gap: 1.4rem;
  }

  menu li {
    display: flex;
    align-items: center;
  }

  menu li:first-of-type {
    flex: 1 1 0;
  }

  @media screen and (min-width: 768px) {
    menu li:first-of-type {
      display: none;
    }
  }
  menu li:after {
    content: '|';
    color: var(--ra-grey-light);
    position: absolute;
    right: 0;
    top: 34%;
  }

  menu li:first-of-type:after,
  menu li:last-of-type:after {
    content: none;
  }

  menu a {
    display: flex;
    justify-content: center;
    align-items: baseline;
  }
  menu a,
  menu a:visited {
    color: var(--ra-grey-light);
  }

  menu a:hover {
    color: var(--ra-blue-bright);
  }

  menu a.active span {
    color: var(--ra-blue);
  }
  nav {
    display: flex;
    gap: 1.4rem;
  }
  nav a {
    color: var(--ra-grey-light);
  }
  nav a:hover {
    color: var(--ra-green);
  }
  nav a:first-of-type.active {
    color: var(--ra-red);
  }
  nav a.active {
    color: var(--ra-blue);
  }
      `}</style>
    </div>
  );
}
