<script lang="ts">
  export let bg: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let shadowColor: string | undefined = undefined;
  export let className = "";
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\"><path d=\"M3 1h1v1h-1zM4 1h1v1h-1zM2 2h1v1h-1zM5 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM6 4h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1z\" fill=\"${borderColor ?? "currentColor"}\"/></svg>`;
  const borderImage = `url(\"data:image/svg+xml,${encodeURIComponent(svg)}\")`;

  const handleClick = (event: MouseEvent) => {
    dispatch("click", event);
  };
</script>

<div
  class={`relative m-2 border-[5px] border-solid font-minecraft text-base p-4 bg-[color:var(--card-bg)] text-[color:var(--card-text)] shadow-[2px_2px_0_2px_var(--card-shadow),-2px_-2px_0_2px_var(--card-bg)] ${className}`}
  style={`--card-bg:${bg ?? "var(--bg-card,white)"};--card-text:${textColor ?? "var(--text-card,black)"};--card-border:${borderColor ?? "var(--border-card,#000000)"};--card-shadow:${shadowColor ?? "var(--shadow-card,#000000)"};border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:${borderImage};border-color:var(--card-border);`}
  on:click={handleClick}
>
  <slot />
</div>
