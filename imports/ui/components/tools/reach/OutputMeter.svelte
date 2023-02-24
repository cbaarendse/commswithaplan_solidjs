<script lang="ts">
  // imports

  // variables
  export let id: string;
  export let value: number;
  export let min: number;
  export let max: number;

  // functions
</script>

<meter {id} {value} {min} {max}>
  <div class="meter">
    <span
      class="meter-value"
      style="width:{typeof value == 'number' && value > 0 && typeof max == 'number' && max > 0
        ? (value / max) * 100
        : 0}%"
    />
  </div>
</meter>

<style>
  /*for meter track*/
  meter {
    /* Reset the default appearance */
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;

    width: 100%;
    height: 1.5em;

    /* For Firefox */
    background: whitesmoke;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 5px;
  }
  /* WebKit */
  meter::-webkit-meter-bar {
    background: whitesmoke;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 5px;
  }

  meter::-webkit-meter-optimum-value,
  meter::-webkit-meter-suboptimum-value,
  meter::-webkit-meter-even-less-good-value {
    border-radius: 5px;
  }

  meter::-webkit-meter-optimum-value {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter::-webkit-meter-suboptimum-value {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter::-webkit-meter-even-less-good-value {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  /* Firefox */
  meter::-moz-meter-bar {
    border-radius: 5px;
  }

  meter:-moz-meter-optimum::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter:-moz-meter-sub-optimum::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  div.meter {
    height: 1.5em;
    background: whitesmoke;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.2) inset;
    border-radius: 5px;
    /* border: 1px solid #ccc; */
  }

  div.meter > span.meter-value {
    display: block;
    height: inherit;
    box-shadow: 0 5px 5px -5px #999 inset;
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    border-radius: 5px;
    text-indent: -9999px;
  }
</style>
