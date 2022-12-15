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
  meter,
  meter::-webkit-meter-bar {
    display: block;
    /*to remove the default background property */
    background: none;
    height: 1.5em;
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
    background-color: whiteSmoke;
    box-shadow: 0 5px 5px -5px rgba(0, 0, 0, 0.4) inset;
  }
  /* background-image: linear-gradient(90deg, var(--ra-blue) 0%, var(--ra-blue) 100%);
    background-size: 100% 100%;
    text-indent: -9999px; */
  /*for meter bar*/
  meter::-webkit-meter-optimum-value,
  meter::-webkit-meter-suboptimum-value,
  meter::-webkit-meter-even-less-good-value {
    background: none;
    background-image: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }
  meter:-moz-meter-optimum::-moz-meter-bar,
  meter:-moz-meter-sub-optimum::-moz-meter-bar,
  meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
    background: none;
    background-image: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }
</style>
