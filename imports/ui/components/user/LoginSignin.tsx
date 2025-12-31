import {createSignal, createEffect, createMemo, Show} from 'solid-js';
import {Meteor} from 'meteor/meteor';
import {CWAPUser} from '../../../both/typings/types';
import {Accounts} from 'meteor/accounts-base';
import {language, signin} from '../../stores/utils';
import {useNavigate} from '@solidjs/router';
import {emailRegExp} from '../../../api/users/users';

export default function LoginSignin() {
  const navigate = useNavigate();
  
  const [subReady, setSubReady] = createSignal(false);
  const [currentUser, setCurrentUser] = createSignal<CWAPUser | null>(null);
  const [username, setUsername] = createSignal<string>('');
  const [email, setEmail] = createSignal<string>('');
  const [password, setPassword] = createSignal<string>('');
  const [login, setLogin] = createSignal<string>('');

  // Subscribe to user data
  const userSubscription = Meteor.subscribe('userData');
  setSubReady(userSubscription.ready());
  setCurrentUser(Meteor.user() as CWAPUser);

  // Redirect if logged in
  createEffect(() => {
    if (subReady() && currentUser()) {
      navigate(`/user/${currentUser()!.username}`);
    }
  });

  const isValid = (
    s: boolean | null,
    u?: string,
    e?: string,
    p?: string,
    l?: string
  ): boolean => {
    if (s) {
      if (typeof u === 'string' && typeof e === 'string' && emailRegExp.test(e) && typeof p === 'string') {
        return true;
      }
    }
    if (!s) {
      if (typeof l === 'string' && l.includes('@') && emailRegExp.test(l) && typeof p === 'string') {
        return true;
      }
      if (typeof l === 'string' && typeof p === 'string') {
        return true;
      }
    }
    return false;
  };

  const disabled = createMemo(() => 
    !isValid(signin(), username(), email(), password(), login())
  );

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!signin() && login() && password()) {
      Meteor.loginWithPassword(login(), password(), (error) => {
        if (error) {
          console.error('error in login: ', error);
        }
      });
    }
    if (signin() && username() && email() && password()) {
      Accounts.createUser(
        {username: username(), email: email(), password: password()},
        (error) => {
          if (error) {
            console.error('error in signin: ', error);
          }
        }
      );
    }
  };

  return (
    <section>
      <div class="container">
        <nav>
          <ul>
            <li>
              <a
                href="javascript:void(0)"
                role="button"
                style={{color: !signin() ? 'var(--ra-red)' : ''}}
                onClick={() => signin.set(false)}
              >
                Login
              </a>
            </li>
            <li>
              <a
                href="javascript:void(0)"
                role="button"
                style={{color: signin() ? 'var(--ra-red)' : ''}}
                onClick={() => signin.set(true)}
              >
                Signin
              </a>
            </li>
          </ul>
        </nav>
        <form autocomplete="on">
          <fieldset>
            <Show when={signin()}>
              <label for="username">Username</label>
              <input
                type="text"
                name="username"
                class="input__field"
                placeholder={language() === 'nl-NL' ? 'gebruikersnaam (1 woord)' : 'username (1 word)'}
                value={username()}
                onInput={(e) => setUsername(e.currentTarget.value)}
              />
              <label for="email">E-mail</label>
              <input
                type="email"
                name="email"
                class="input__field"
                placeholder={language() === 'nl-NL' ? 'e-mail adres' : 'e-mail address'}
                value={email()}
                onInput={(e) => setEmail(e.currentTarget.value)}
              />
            </Show>
            <Show when={!signin()}>
              <label for="login">Login</label>
              <input
                type="text"
                name="login"
                class="input__field"
                placeholder={
                  language() === 'nl-NL' ? 'e-mail adres of gebruikersnaam' : 'e-mail address or username'
                }
                value={login()}
                onInput={(e) => setLogin(e.currentTarget.value)}
              />
            </Show>
            <label for="password">Password</label>
            <input
              type="password"
              name="password"
              class="input__field"
              placeholder={language() === 'nl-NL' ? 'wachtwoord' : 'password'}
              value={password()}
              onInput={(e) => setPassword(e.currentTarget.value)}
            />
          </fieldset>
          <input
            type="submit"
            class="submit__button"
            disabled={disabled()}
            onClick={handleSubmit}
          />
          <input type="reset" class="reset__button" />
        </form>
        <style>{`
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
  nav {
    margin-bottom: 4rem;
  }
  ul {
    display: flex;
    gap: 3rem;
  }
  a {
    color: var(--ra-grey-light);
  }
  a:hover {
    color: var(--ra-green);
  }

  form {
    padding-block: 1rem;
  }
  fieldset {
    padding: 0rem;
    border: none;
    border-radius: 2px;
  }
  input.input__field {
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.8rem;
    margin-top: 1rem;
    margin-bottom: 3rem;
    width: 100%;
    min-height: 4rem;
  }
  input.submit__button {
    background: var(--ra-blue);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
  input.submit__button:disabled {
    background: var(--ra-grey-light);
  }
  input.reset__button {
    background: var(--ra-red);
    color: var(--ra-white);
    border: none;
    padding: 0.8rem;
    min-height: 4.8rem;
  }
        `}</style>
      </div>
    </section>
  );
}
