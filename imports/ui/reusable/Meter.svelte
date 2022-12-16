<script lang="ts">
  // imports
  import type {Meter} from '../types/types';

  // variables
  export let meter: Meter;

  // functions
</script>

<meter
  id={meter.id}
  value={meter.value}
  min={meter.min}
  max={meter.max}
  high={meter.high}
  low={meter.low}
  optimum={meter.optimum}
  form={meter.form}
/>

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
</style>
