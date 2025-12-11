<script lang="ts">
  export let bg: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let shadow: string | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let className = "";
  export let type: "button" | "submit" | "reset" = "button";
  export let disabled: boolean = false;
  import { createEventDispatcher } from "svelte";

  const dispatch = createEventDispatcher();

  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\"><path d=\"M3 1h1v1h-1zM4 1h1v1h-1zM2 2h1v1h-1zM5 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM6 4h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1z\" fill=\"${borderColor ?? "currentColor"}\"/></svg>`;
  const borderImage = `url(\"data:image/svg+xml,${encodeURIComponent(svg)}\")`;

  const handleClick = (event: MouseEvent) => {
    dispatch("click", event);
  };
</script>

<button
  class={`relative inline-block border-[5px] px-2 py-2 mx-3 my-2 font-minecraft text-base border-solid bg-[color:var(--button-bg)] text-[color:var(--button-text)] shadow-[2px_2px_0_2px_var(--button-shadow),-2px_-2px_0_2px_var(--button-bg)] active:translate-y-[2px] active:shadow-[2px_2px_0_2px_var(--button-bg),-2px_-2px_0_2px_var(--button-bg)] ${className}`}
  style={`--button-bg:${bg ?? "var(--bg-button,#f0f0f0)"};--button-text:${textColor ?? "var(--text-button,#000000)"};--button-shadow:${shadow ?? "var(--shadow-button,#000000)"};--button-border:${borderColor ?? "var(--border-button,#000000)"};border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:${borderImage};border-color:var(--button-border);`}
  type={type}
  disabled={disabled}
  on:click={handleClick}
>
  <slot />
</button>
