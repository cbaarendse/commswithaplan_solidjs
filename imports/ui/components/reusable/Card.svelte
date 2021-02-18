<script>
  export let backgroundColor = 'var(--ra-grey-off-white)';
  export let color = 'var(--ra-grey)';
  export let cardTitle;
  export let imgUrls;
  export let cardFooter;
  export let cardLink_1;
  export let cardLinkText_1;
  export let cardLink_2;
  export let cardLinkText_2;
</script>

<div class="card" style="background-color:{backgroundColor};color:{color};">
  {#if cardTitle}
    <div class="card-title">
      <h5>{cardTitle}</h5>
    </div>
  {/if}
  {#if $$slots.cardContent}
    <div class="card-content">
      <slot name="cardContent" />
    </div>
  {/if}
  {#if imgUrls}
    {#each imgUrls as imgUrl, index}
      <img src={imgUrl} alt="{cardTitle}_{index}" />
      <hr />
    {/each}
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
    min-width: 370px;
    padding: 21px;
    margin: 7px 7px 0px 7px;
    border: 1px solid rgba(0, 0, 0, 0.1);
  }
  @media only screen and (max-width: 768px) {
    div.card {
      margin: auto;
      min-width: 270px;
    }
  }

  div.card-title {
    color: var(--ra-blue);
    text-align: center;
  }
  div.card-content {
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
