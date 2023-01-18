<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import UserInformation from './UserInformation.svelte';
  import LoginSignin from './LoginSignin.svelte';

  // variables
  let userSubscription = Meteor.subscribe('userData');
  let subReady = false;

  $m: {
    subReady = userSubscription.ready();
  }

  $: {
    console.log('subReady in client', subReady);
    console.log('Meteor.settings in client', Meteor.settings);
  }
</script>

<section>
  <div class="container">
    {#if subReady}
      {#if Meteor.user()}
        <UserInformation />
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
    display: flex;
    justify-content: center;
    align-items: center;
  }
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
</style>
