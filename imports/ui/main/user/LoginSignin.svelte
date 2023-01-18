<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {Accounts} from 'meteor/accounts-base';
  import {CWAPUser} from '/imports/api/users/users';
  import {language} from '../../stores/utils';

  // variables
  export let signin = false;
  let username: CWAPUser['username'];
  let email: Meteor.UserEmail['address'];
  let password: CWAPUser['username'];
  let login: CWAPUser['username'];

  // functions
  const handleSubmit = function () {
    if (!signin && login && password) {
      Meteor.loginWithPassword(login, password, (error) => {
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

<div class="container">
  <form>
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
        <label for="email">Username</label>
        <input
          type="email"
          name="email"
          placeholder={$language == 'dutch' ? 'e-mail adres' : 'e-mail address'}
          bind:value={email}
        />{/if}
      {#if !signin}<label for="login">Username</label>
        <input
          type="text"
          name="login"
          placeholder={$language == 'dutch' ? 'e-mail adres of gebrukersnaam' : 'e-mail address or username'}
          bind:value={login}
        />{/if}
      <label for="password">Username</label>
      <input
        type="password"
        name="password"
        placeholder={$language == 'dutch' ? 'wachtwoord' : 'password'}
        bind:value={password}
      />
    </fieldset>
    <input type="submit" class="submit__button" on:click={handleSubmit} />
    <input type="reset" class="reset__button" />
  </form>
</div>

<style>
  form {
    padding: 1rem;
  }
  label {
    grid-area: label;
  }
  input.input__field {
    grid-area: input;
    border: 1px solid var(--ra-grey);
    border-radius: 0.2em;
    background-color: var(--ra-blue-off-white);
    padding: 0.8rem;
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
