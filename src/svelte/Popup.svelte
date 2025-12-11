<script lang="ts">
  import { createEventDispatcher } from "svelte";

  export let isOpen = false;
  export let title: string | undefined = undefined;
  export let closeButtonText = "X";
  export let bg: string | undefined = undefined;
  export let baseBg: string | undefined = undefined;
  export let overlayBg: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let className = "";

  const dispatch = createEventDispatcher();

  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\"><path d=\"M3 1h1v1h-1zM4 1h1v1h-1zM2 2h1v1h-1zM5 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM6 4h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1z\" fill=\"${borderColor ?? "currentColor"}\"/></svg>`;
  const borderImage = `url(\"data:image/svg+xml,${encodeURIComponent(svg)}\")`;

  const handleClose = () => {
    dispatch("close");
  };
</script>

{#if isOpen}
  <div
    class={`fixed inset-0 z-50 flex items-center justify-center ${className}`}
    style={`background-color:${overlayBg ?? "rgba(0,0,0,0.5)"};--popup-bg:${bg ?? "var(--bg-popup,#f0f0f0)"};--popup-base-bg:${baseBg ?? "var(--bg-popup-base,white)"};--popup-text:${textColor ?? "var(--text-popup,black)"};--popup-border:${borderColor ?? "var(--border-popup,#000000)"};--popup-border-image:${borderImage};`}
    on:click={handleClose}
  >
    <div
      class="relative p-1 bg-[color:var(--popup-base-bg)] text-[color:var(--popup-text)] border-[5px] border-solid shadow-[2px_2px_0_2px_var(--popup-base-bg),-2px_-2px_0_2px_var(--popup-base-bg)]"
      style="border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:var(--popup-border-image);"
      on:click|stopPropagation
    >
      <div
        class="p-4 bg-[color:var(--popup-bg)] text-[color:var(--popup-text)] border-[5px] border-solid shadow-[2px_2px_0_2px_var(--popup-bg),-2px_-2px_0_2px_var(--popup-bg)]"
        style="border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:var(--popup-border-image);"
      >
        {#if title}
          <h2 class="mb-4 text-2xl text-center font-minecraft">{title}</h2>
        {/if}
        <button
          class="absolute top-1 right-2 bg-transparent border-none cursor-pointer text-lg font-minecraft text-[color:var(--popup-text)]"
          on:click={handleClose}
        >
          {closeButtonText}
        </button>
        <div class="font-minecraft">
          <slot />
        </div>
      </div>
    </div>
  </div>
{/if}
