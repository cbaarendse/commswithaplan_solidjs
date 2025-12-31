interface OutputMeterProps {
  id: string;
  value: number;
  min: number;
  max: number;
}

export default function OutputMeter(props: OutputMeterProps) {
  const widthPercent = () => {
    if (typeof props.value === 'number' && props.value > 0 && typeof props.max === 'number' && props.max > 0) {
      return (props.value / props.max) * 100;
    }
    return 0;
  };

  return (
    <meter id={props.id} value={props.value} min={props.min} max={props.max}>
      <div class="meter">
        <span class="meter-value" style={{width: `${widthPercent()}%`}} />
      </div>
      <style>{`
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
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
    border-radius: 5px;
  }

  meter[value='1']::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter[value='0.5']::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }

  meter[value='0.1']::-moz-meter-bar {
    background: linear-gradient(180deg, var(--ra-blue-light) 0%, var(--ra-blue) 100%);
  }
      `}</style>
    </meter>
  );
}
