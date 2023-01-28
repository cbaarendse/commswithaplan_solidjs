<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import UserInformation from './UserInformation.svelte';
  import LoginSignin from './LoginSignin.svelte';
  import {CWAPUser} from '/imports/api/users/users';

  // variables
  let subReady = false;
  let currentUser: CWAPUser | null;

  $m: {
    let userSubscription = Meteor.subscribe('userData');
    subReady = userSubscription.ready();
    currentUser = Meteor.user();
  }

  $: {
    console.log('subReady in client', subReady);
    console.log('Meteor.settings in client', Meteor.settings);
    console.log('currentUser in client', currentUser);
  }
</script>

<section>
  <div class="container">
    {#if subReady}
      {#if currentUser}
        <UserInformation user={currentUser} />
      {:else}
        <LoginSignin />
      {/if}
    {:else}
      <div>Loading..</div>
    {/if}
  </div>
</section>

<style>
  div.container {
    width: min(100% - 1em, 60ch);
    margin: 0 auto;
  }
</style>
