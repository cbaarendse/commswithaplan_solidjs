<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil} from '@fortawesome/free-solid-svg-icons';
  import {CWAPUser} from '/imports/api/users/users';

  // variables
  let users: CWAPUser[];
  let userSubscription = Meteor.subscribe('usersForAdmin');
  let subReady = false;
  let user: CWAPUser;

  $m: {
    subReady = userSubscription.ready();
    users = Meteor.users.find().fetch();
    user = users.find((user) => user.username === 'harry');
  }

  $: {
    console.log('subReady in client', subReady);
    console.log('user in client', user);
    console.log('users in client', users);
    console.log('Meteor.settings in client', Meteor.settings);
  }
</script>

<section>
  <table>
    {#if subReady}
      <caption>
        {#if user.profile}{user.profile.firstname}&nbsp;{user.profile.surname}{/if}
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
          <td><address>{user.profile?.street}</address></td>
        </tr>
        <tr>
          <td>Zip Code</td>
          <td><address>{user.profile?.zipcode}</address></td>
        </tr>
        <tr><td>City</td></tr>
        <tr><td><address>{user.profile?.city}</address></td></tr>

        <tr>
          <td>Phone</td>
          <td><address>{user.profile?.phone}</address></td>
          <td />
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td>Payment through</td>
          <td>{user.stripeId}</td>
        </tr>
      </tfoot>
    {/if}
  </table>
  <menu><button><Fa icon={faPencil} /></button></menu>
</section>

<style>
  table {
    margin: 2rem auto;
  }
  th,
  td {
    padding: 1em;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
</style>
