<script lang="ts">
  export let direction: "left" | "right" = "left";
  export let borderColor: string | undefined = undefined;
  export let bg: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let className = "";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\" viewBox=\"0 0 8 8\"><path d=\"M3 1 h1 v1 h-1 z M4 1 h1 v1 h-1 z M2 2 h1 v1 h-1 z M5 2 h1 v1 h-1 z M1 3 h1 v1 h-1 z M6 3 h1 v1 h-1 z M1 4 h1 v1 h-1 z M6 4 h1 v1 h-1 z M2 5 h1 v1 h-1 z M5 5 h1 v1 h-1 z M3 6 h1 v1 h-1 z M4 6 h1 v1 h-1 z\" fill=\"${borderColor ?? "#000000"}\" /></svg>`;
  const borderImage = `url(\"data:image/svg+xml,${encodeURIComponent(svg)}\")`;

  const handleClick = (event: MouseEvent) => {
    dispatch("click", event);
  };
</script>

<div
  class={`bubble relative inline-block px-6 py-4 mx-2 mb-8 cursor-pointer font-minecraft text-base border-[4px] border-solid rounded-sm text-[color:var(--bubble-text)] bg-[color:var(--bubble-bg)] ${direction === "right" ? "from-right" : "from-left"} ${className}`}
  style={`--bubble-border:${borderColor ?? "#000000"};--bubble-bg:${bg ?? "#ffffff"};--bubble-text:${textColor ?? "#000000"};--bubble-border-image:${borderImage};border-image-slice:3;border-image-width:3;border-image-repeat:stretch;border-image-outset:2;border-image-source:var(--bubble-border-image);`}
  on:click={handleClick}
>
  <slot />
</div>

<style>
  .bubble::before,
  .bubble::after {
    position: absolute;
    content: "";
  }

  .from-left::before,
  .from-left::after {
    left: 2rem;
  }

  .from-right::before,
  .from-right::after {
    right: 2rem;
  }

  .bubble::before {
    bottom: -14px;
    width: 26px;
    height: 10px;
    background-color: var(--bubble-bg, #ffffff);
    border-right: 4px solid var(--bubble-border, #000000);
    border-left: 4px solid var(--bubble-border, #000000);
  }

  .bubble::after {
    bottom: -18px;
    width: 18px;
    height: 4px;
    background-color: var(--bubble-bg, #ffffff);
  }

  .from-left::after {
    margin-right: 8px;
    box-shadow: -4px 0 var(--bubble-border, #000000), 4px 0 var(--bubble-border, #000000),
      -4px 4px var(--bubble-bg, #ffffff), 0 4px var(--bubble-border, #000000),
      -8px 4px var(--bubble-border, #000000), -4px 8px var(--bubble-border, #000000),
      -8px 8px var(--bubble-border, #000000);
  }

  .from-right::after {
    margin-left: 8px;
    box-shadow: -4px 0 var(--bubble-border, #000000), 4px 0 var(--bubble-border, #000000),
      4px 4px var(--bubble-bg, #ffffff), 0 4px var(--bubble-border, #000000),
      8px 4px var(--bubble-border, #000000), 4px 8px var(--bubble-border, #000000),
      8px 8px var(--bubble-border, #000000);
  }
</style>
