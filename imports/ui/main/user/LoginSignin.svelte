<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {Accounts} from 'meteor/accounts-base';
  import {CWAPUser} from '/imports/api/users/users';
  import {language} from '../../stores/utils';
  import {router, active} from 'tinro';
  import {Match} from 'meteor/check';
  import {emailRegExp} from '../../../api/users/users';

  // variables
  let signin = false;
  let username: CWAPUser['username'];
  let email: Meteor.UserEmail['address'];
  let password: string | undefined;
  let login: CWAPUser['username'] | Meteor.UserEmail['address'];
  $: disabled = isValid(signin, username, email, password, login) ? false : true;

  // functions
  function isValid(s: boolean, u?: string, e?: string, p?: string, l?: string): boolean {
    if (s) {
      if (typeof u == 'string' && typeof e == 'string' && emailRegExp.test(e) && typeof p == 'string') {
        return true;
      }
    }
    if (!s) {
      if (typeof l == 'string' && l.includes('@') && emailRegExp.test(l) && typeof p == 'string') {
        return true;
      }
      if (typeof l == 'string' && typeof p == 'string') {
        return true;
      }
    }
    console.log('isValid = ', false);
    return false;
  }

  // functions
  const handleSubmit = function () {
    console.log('handle submit with', login, password);
    if (!signin && login && password) {
      console.log('login started', Meteor.loggingIn);

      Meteor.loginWithPassword(login, password, (error) => {
        console.error('error in login: ', error);
        return error?.message;
      });
    }
    if (signin && username && email && password) {
      Accounts.createUser({username, email, password}, (error) => {
        return error?.message;
      });
    }
  };
</script>

<nav>
  <ul>
    <li>
      <a
        href={'javascript:void(0)'}
        role="button"
        style="color:{!signin ? 'var(--ra-red)' : ''}"
        on:click={() => {
          signin = false;
        }}
      >
        Login
      </a>
    </li>
    <li>
      <a
        href={'javascript:void(0)'}
        role="button"
        style="color:{signin ? 'var(--ra-red)' : ''}"
        on:click={() => {
          signin = true;
        }}
      >
        Signin
      </a>
    </li>
  </ul>
</nav>
<form autocomplete="on">
  <fieldset>
    {#if signin}
      <label for="username">Username</label>
      <input
        type="text"
        name="username"
        class="input__field"
        placeholder={$language == 'dutch' ? 'gebruikersnaam (1 woord)' : 'username (1 word)'}
        bind:value={username}
      />
      <label for="email">E-mail</label>
      <input
        type="email"
        name="email"
        class="input__field"
        placeholder={$language == 'dutch' ? 'e-mail adres' : 'e-mail address'}
        bind:value={email}
      />{/if}
    {#if !signin}<label for="login">Login</label>
      <input
        type="text"
        name="login"
        class="input__field"
        placeholder={$language == 'dutch' ? 'e-mail adres of gebruikersnaam' : 'e-mail address or username'}
        bind:value={login}
      />{/if}
    <label for="password">Password</label>
    <input
      type="password"
      name="password"
      class="input__field"
      placeholder={$language == 'dutch' ? 'wachtwoord' : 'password'}
      bind:value={password}
    />
  </fieldset>
  <input type="submit" class="submit__button" {disabled} on:click|stopPropagation|preventDefault={handleSubmit} />
  <input type="reset" class="reset__button" />
</form>

<style>
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
  label {
    /* margin: 4rem; */
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
</style>
