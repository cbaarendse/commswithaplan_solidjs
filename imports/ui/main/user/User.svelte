<script lang="ts">
  import Meteor from 'meteor/meteor';
  import Mongo from 'meteor/mongo';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {faPencil} from '@fortawesome/free-solid-svg-icons';

  const Users = new Mongo.Collection('usersForAdmin');
  let subReady = false;
  let users: Meteor.Subscription;
  $m: {
    let userSubscription: Meteor.Subscription = Meteor.subscribe('usersForAdmin');
    subReady = userSubscription.ready();
  }
  $m: {
    users = Users.find().fetch();
  }

  $: user = users[0];
</script>

<section>
  <table>
    <caption>Constantijn Baarendse</caption>
    <thead>
      <tr>
        <th>Company</th>
        <th>{user.company}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Street</td>
        <td><address>{user.profile.street}</address></td>
      </tr>
      <tr>
        <td>Zip Code</td>
        <td><address>{user.profile.zipcode}</address></td>
      </tr>
      <tr><td>City</td></tr>
      <tr><td><address>{user.profile.city}</address></td></tr>

      <tr>
        <td>Phone</td>
        <td><address>{user.phone}</address></td>
        <td />
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td>Payment through</td>
        <td>Card</td>
      </tr>
    </tfoot>
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
