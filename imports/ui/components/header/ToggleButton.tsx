// imports
import { createSignal, createEffect } from 'solid-js';
import { navigationVisible, isSmallScreen } from '../../stores/utils';

// This button animates when used for toggling navigation, but also if screen size is changed beyond threshold.
export default function ToggleButton() {
  const [disabled] = createSignal(false);
  const [coefficient, setCoefficient] = createSignal(0);

  createEffect(() => {
    if (!navigationVisible()) {
      setCoefficient(0);
    }
  });

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigationVisible.set(!navigationVisible());
    if (navigationVisible()) {
      // Animate to open state
      animateCoefficient(1);
    } else {
      // Animate to closed state
      animateCoefficient(0);
    }
  };

  const animateCoefficient = (target: number) => {
    const start = coefficient();
    const duration = 300;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Cubic in-out easing
      const eased = progress < 0.5
        ? 4 * progress * progress * progress
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;

      setCoefficient(start + (target - start) * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  };

  return (
    <button
      class="navigation__toggle"
      type="button"
      aria-roledescription="button"
      disabled={disabled()}
      onClick={handleClick}
    >
      {isSmallScreen() && (
        <div class="bars" style="transition: opacity 0.9s cubic-bezier(0.5, 0, 0.5, 1)">
          <div
            class="bar-1"
            style={`transform: translateY(${coefficient() * 200}%) rotate(${coefficient() * 45}deg)`}
          />
          <div
            class="bar-2"
            style={`transform: translateX(${coefficient() * 50}%) scale(${1 - coefficient()})`}
          />
          <div
            class="bar-3"
            style={`transform: translateY(${coefficient() * -200}%) rotate(${coefficient() * -45}deg)`}
          />
        </div>
      )}
      <style>{`
  button {
    width: 3.7rem;
    height: 3.7rem;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0.4em;
    cursor: pointer;
    background-color: transparent;
    border-radius: 5%;
    border: none;
  }
  .bars {
    position: relative;
    width: 90%;
    height: 90%;
    background-color: var(--ra-grey-off-white);
  }
  .bar-1,
  .bar-2,
  .bar-3 {
    position: absolute;
    height: 16%;
    width: 100%;
    border-radius: 3px;
    transition: transform 0.3s cubic-bezier(0.5, 0, 0.5, 1);
  }

  .bar-1 {
    top: 10%;
    background-color: var(--ra-blue);
  }

  .bar-2 {
    top: 42%;
    background-color: var(--ra-green);
  }

  .bar-3 {
    bottom: 10%;
    background-color: var(--ra-red);
  }
      `}</style>
    </button>
  );
}
