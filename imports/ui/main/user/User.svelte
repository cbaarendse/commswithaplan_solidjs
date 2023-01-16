<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil} from '@fortawesome/free-solid-svg-icons';
  import {ReachAppUser} from '/imports/api/users/users';
  import Users from '../../../api/users/users';

  // variables
  let users: ReachAppUser[];
  let userSubscription = Meteor.subscribe('usersForAdmin');
  let subReady = false;
  let user: ReachAppUser;

  $m: {
    subReady = userSubscription.ready();
    users = Users.find().fetch();
    user = users[0];
  }

  $: {
    console.log('subReady in client', subReady);
    console.log('user in client', user);
  }
</script>

<section>
  <table>
    <caption>Constantijn Baarendse</caption>
    {#if subReady}
      <thead>
        <tr>
          <th>Company</th>
          <th>{user.profile?.companyId}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Email</td>
          <td>
            <address>
              {#if user.emails}{user.emails[0].address}{:else}---{/if}
            </address>
          </td>
        </tr>
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
          <td>Card</td>
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
