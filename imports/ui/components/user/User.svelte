<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import {CWAPUser} from '../../../both/typings/types';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil} from '@fortawesome/free-solid-svg-icons';

  // variables
  let subReady = false;
  let currentUser: CWAPUser | null;

  $m: {
    let userSubscription = Meteor.subscribe('userData');
    subReady = userSubscription.ready();
    currentUser = Meteor.user();
  }

  $: {
    console.log('subReady in User', subReady);
    console.log('Meteor.settings in User', Meteor.settings);
    console.log('currentUser in User', currentUser);
  }

  // functions
  const showValue = function (value: string | number | undefined | null) {
    if (value) {
      return value;
    } else {
      return '--';
    }
  };
</script>

<section>
  <div class="container">
    <menu>
      <button><Fa icon={faPencil} /></button>
    </menu>
    <table>
      <caption>
        {#if currentUser?.profile}{currentUser?.profile.firstname}&nbsp;{currentUser?.profile.surname}{/if}
      </caption>
      <thead>
        <tr>
          <th>Company</th>
          <th>{currentUser?.profile?.companyId}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Username</td>
          <td><address>{currentUser?.username}</address></td>
        </tr>
        {#if currentUser?.emails}
          {#each currentUser?.emails as email, index}
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
          <td><address>{showValue(currentUser?.profile?.street)}</address></td>
        </tr>
        <tr>
          <td>Zip Code</td>
          <td><address>{showValue(currentUser?.profile?.zipcode)}</address></td>
        </tr>
        <tr>
          <td>City</td>
          <td><address>{showValue(currentUser?.profile?.city)}</address></td>
        </tr>
        <tr>
          <td>Phone</td>
          <td><address>{showValue(currentUser?.profile?.phone)}</address></td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Payment through</td>
          <td>{showValue(currentUser?.profile?.stripeId)}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</section>

<style>
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
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
