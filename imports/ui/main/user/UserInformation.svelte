<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {CWAPUser} from '/imports/api/users/users';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil, faSignOut} from '@fortawesome/free-solid-svg-icons';

  // variables
  export let user: CWAPUser;

  // functions
  const showValue = function (value: string | number | undefined | null) {
    console.log('value', value);

    if (value) {
      return value;
    } else {
      return '--';
    }
  };
  const logout = function () {
    Meteor.logout((error) => {
      console.log('logging out == ', Meteor.loggingOut, 'for ', user.username);
      console.error('error at logout: ', error);
    });
  };
</script>

<section>
  <menu>
    <button><Fa icon={faPencil} /></button>
    <button on:click|stopPropagation|preventDefault={logout}><Fa icon={faSignOut} /></button>
  </menu>
  <table>
    <caption>
      {#if user?.profile}{user.profile.firstname}&nbsp;{user.profile.surname}{/if}
    </caption>
    <thead>
      <tr>
        <th>Company</th>
        <th>{user.profile?.companyId}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Username</td>
        <td><address>{user.username}</address></td>
      </tr>
      {#if user.emails}
        {#each user.emails as email, index}
          <tr>
            <td>Email {index + 1}</td>
            <td>
              <address>
                {email.address}
              </address>
            </td>
          </tr>
        {/each}
      {/if}
      <tr>
        <td>Street</td>
        <td><address>{showValue(user.profile?.street)}</address></td>
      </tr>
      <tr>
        <td>Zip Code</td>
        <td><address>{showValue(user.profile?.zipcode)}</address></td>
      </tr>
      <tr>
        <td>City</td>
        <td><address>{showValue(user.profile?.city)}</address></td>
      </tr>
      <tr>
        <td>Phone</td>
        <td><address>{showValue(user.profile?.phone)}</address></td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Payment through</td>
        <td>{showValue(user.profile?.stripeId)}</td>
      </tr>
    </tfoot>
  </table>
</section>

<style>
  table {
    margin: 2rem auto;
    width: 100%;
  }
  table,
  caption,
  th,
  td {
    padding: 1em;
    background: var(--ra-white);
    border: 0.8rem solid var(--ra-grey-off-white);
    border-collapse: collapse;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    border: none;
    cursor: pointer;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
  menu {
    display: flex;
    gap: 2rem;
    justify-content: flex-end;
    background: var(--ra-white);
  }
</style>
