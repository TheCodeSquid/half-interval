<script lang="ts">
  import {onMount} from "svelte";
  import {tweened} from "svelte/motion";
  import {cubicOut} from "svelte/easing";
  import {
    IconPlayerPlayFilled,
    IconPlayerPauseFilled,
    IconPlayerStopFilled,
    IconRefresh
  } from "@tabler/icons-svelte";

  import {background, toggleBg} from "./state";

  const targetCap = 0.05;
  const timeLimit = 5;

  let time = 0;
  let targetOffset: number | undefined;

  let active = false;

  $: target = timeLimit - targetOffset;

  $: left = timeLimit - time;

  $: minutes = `${Math.floor(left / 60)}`.padStart(2, "0");
  $: seconds = `${Math.floor(left % 60)}`.padStart(2, "0");

  const toggle = () => {
    active = !active;
  };

  const stop = () => {
    active = false;
    time = 0;

    $background = "default";
  };

  let start: number | undefined;
  let prev: number | undefined;
  const tick = (timestampMs: number) => {
    requestAnimationFrame(tick);

    if (!active) {
      start = undefined;
      prev = undefined;
      return;
    }

    const timestamp = timestampMs / 1000;
    start = timestamp;
    if (prev === undefined)
      prev = timestamp;

    const delta = start - prev;
    prev = start;
    if (time + delta >= timeLimit) {
      time = timeLimit;
      targetOffset = undefined;
      active = false;
      return;
    }
    
    time += delta;
    
    if (targetOffset === undefined)
      targetOffset = timeLimit / 2;
    if (time > target) {
      if (targetOffset > targetCap)
        targetOffset /= 2;
      else
        // J**** wanted to see what it would be like if it went to infinity.
        while (true) {  }

      $background = toggleBg($background);
    }
  };

  const progress = tweened(0, {
    duration: 500,
    easing: cubicOut
  });
  $: {
    const p = (target - time) / (targetOffset !== 0 ? targetOffset : targetCap);
    if (!isNaN(p)) $progress = p;
  }

  onMount(() => {
    requestAnimationFrame(tick);
  });
</script>

<div class="clock">  
  <div class="display">
    {minutes}:{seconds}
  </div>
  
  <div class="progress" class:shown={time > 0}>
    <div class="bar" style="--width: {100 - $progress * 100}%;"></div>
  </div>

  <div class="controls">
    <button on:click={toggle} disabled={!active && time >= timeLimit}>
      {#if active}
        <IconPlayerPauseFilled stroke={0} size={36}/>
      {:else}
        <IconPlayerPlayFilled stroke={0} size={36}/>
      {/if}
    </button>

    <button on:click={stop} disabled={!active && time === 0}>
      {#if active}
        <IconPlayerStopFilled stroke={0} size={36}/>
      {:else}
        <IconRefresh stroke={2} size={36}/>
      {/if}
    </button>
  </div>
</div>

<style lang="scss">
  .clock {
    text-align: center;
  }

  .display {
    font-family: "Roboto Mono", monospace;
    margin: 0 auto;
    position: relative;
    font-weight: 300;
    font-size: 100px;
  }

  .controls {
    text-align: center;
    color: var(--dim);
    margin-top: 10px;
  
    button {
      border: none;
      background: none;
      cursor: pointer;
      color: inherit;

      transition: color 0.2s ease-out;

      &[disabled] {
        cursor: default;
        color: var(--disabled);
      }
    }
  }

  .progress {
    width: 12rem;
    margin: 0 auto;
    border-left: 2px solid var(--dim);
    border-right: 2px solid var(--dim);

    opacity: 0;
    transition: opacity 2s ease-in-out;
    &.shown { opacity: 1; }

    display: flex;
    justify-content: center;
  
    .bar {
      --width: 10px;
      --maxed: max(var(--width), 10px);
      width: var(--maxed);
      height: 10px;

      background-color: var(--dim);
    }
  }
</style>