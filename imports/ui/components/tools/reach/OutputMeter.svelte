<script lang="ts">
  // imports
  import type {Meter} from '../../../typings/types';

  // variables
  export let outputMeter: Meter;

  // functions
</script>

<meter
  id={outputMeter.id}
  value={outputMeter.value}
  min={outputMeter.min}
  max={outputMeter.max}
  high={outputMeter.high}
  low={outputMeter.low}
  optimum={outputMeter.optimum}
  form={outputMeter.form}
>
  <div class="meter">
    <span
      class="meter-value"
      style="width:{typeof outputMeter.value == 'number' &&
      outputMeter.value > 0 &&
      typeof outputMeter.max == 'number' &&
      outputMeter.max > 0
        ? (outputMeter.value / outputMeter.max) * 100
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
