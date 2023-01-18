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
  let login: true;

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

<div class="container">
  {#if login}<Input{:else}{/if}
</div>

<style>
</style>
