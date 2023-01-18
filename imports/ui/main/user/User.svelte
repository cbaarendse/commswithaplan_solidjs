<script lang="ts">
  // imports
  import {Meteor} from 'meteor/meteor';
  import UserInformation from './UserInformation.svelte';
  import LoginSignin from './LoginSignin.svelte';

  // variables
  let userSubscription = Meteor.subscribe('userData');
  let subReady = false;
  let signin = false;

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
    <nav>
      <ul>
        <li>
          <a
            href="#"
            role="button"
            on:click={() => {
              signin = false;
            }}
          >
            Login
          </a>
        </li>
        <li>
          <a
            href="#"
            role="button"
            on:click={() => {
              signin = true;
            }}
          >
            Login
          </a>
        </li>
      </ul>
    </nav>
    {#if subReady}
      {#if Meteor.user()}
        <UserInformation user={Meteor.user()} />
      {:else}
        <LoginSignin {signin} />
      {/if}
    {:else}
      <div>Loading..</div>
    {/if}
  </div>
</section>

<style>
  button {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--button-size-phone);
    width: var(--button-size-phone);
  }
</style>
