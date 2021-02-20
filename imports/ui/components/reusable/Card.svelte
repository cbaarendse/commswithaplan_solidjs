<script>
  import {compute_slots} from 'svelte/internal';

  export let backgroundColor = 'var(--ra-grey-off-white)';
  export let color = 'var(--ra-grey)';
  export let cardTitle;
  export let imgUrl;
  export let cardFooter;
  export let cardLink_1;
  export let cardLinkText_1;
  export let cardLink_2;
  export let cardLinkText_2;
</script>

<div class="card" style="background-color:{backgroundColor};color:{color};">
  {#if cardTitle}
    <div class="card-title">
      <h4>{cardTitle}</h4>
    </div>
  {/if}
  {#if $$slots.cardContent}
    <div class="card-content">
      <slot name="cardContent" />
    </div>
  {/if}
  {#if $$slots.cardImage}
    <img src={imgUrl} alt={cardTitle} />
    <hr />
  {/if}
  {#if cardFooter}
    <div class="card-footer">
      {cardFooter}
      <slot name="footerLinks">
        {#if cardLink_1}
          <a href={cardLink_1}>{cardLinkText_1}</a>
        {/if}
        {#if cardLink_2}
          <a href={cardLink_2}>{cardLinkText_2}</a>
        {/if}
      </slot>
    </div>
  {/if}
</div>

<style>
  div.card {
    flex-basis: 320px;
    flex-grow: 1;
    flex-shrink: 1;
    min-width: 25em;
    min-height: 20em;
    padding: 2em;
    margin: 0.5em 0.5em 0 0.5em;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-width: 768px) {
    div.card {
      margin: auto;
      min-width: 15em;
    }
  }

  div.card-title {
    color: var(--ra-blue);
    text-align: center;
  }
  div.card-content {
    margin: 2em 0;
    font-size: 2rem;
    text-align: left;
  }
  img {
    display: block;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
  hr {
    border-top: 0.5px solid rgba(0, 0, 0, 0.1);
    width: 86%;
  }

  div.card-footer {
    padding: 7px;
    text-align: center;
    color: var(--ra-grey-light);
  }
</style>
