<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { createEventDispatcher } from "svelte";

  export let bg: string | undefined = undefined;
  export let textColor: string | undefined = undefined;
  export let borderColor: string | undefined = undefined;
  export let shadowColor: string | undefined = undefined;
  export let className = "";
  export let label: string | undefined = undefined;

  let isOpen = false;
  let triggerEl: HTMLButtonElement | null = null;
  let wrapperEl: HTMLDivElement | null = null;
  let triggerWidth = 0;

  const dispatch = createEventDispatcher();

  const svg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"8\" height=\"8\"><path d=\"M3 1h1v1h-1zM4 1h1v1h-1zM2 2h1v1h-1zM5 2h1v1h-1zM1 3h1v1h-1zM6 3h1v1h-1zM1 4h1v1h-1zM6 4h1v1h-1zM2 5h1v1h-1zM5 5h1v1h-1zM3 6h1v1h-1zM4 6h1v1h-1z\" fill=\"${borderColor ?? "currentColor"}\"/></svg>`;
  const borderImage = `url(\"data:image/svg+xml,${encodeURIComponent(svg)}\")`;

  const arrowSvg = `<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"512\" height=\"512\"><path d=\"M127 21h44v43h43v42h43v43h42v43h43v42h42v44h-42v43h-43v42h-42v43h-43v42h-43v43h-44z\" fill=\"currentColor\" /></svg>`;
  const arrowMask = `url(\"data:image/svg+xml,${encodeURIComponent(arrowSvg)}\")`;

  const toggle = () => {
    isOpen = !isOpen;
    triggerWidth = triggerEl?.offsetWidth ?? 0;
    dispatch(isOpen ? "open" : "close");
  };

  const handleOutsideClick = (event: MouseEvent) => {
    if (!wrapperEl) return;
    if (wrapperEl && !wrapperEl.contains(event.target as Node)) {
      isOpen = false;
      dispatch("close");
    }
  };

  onMount(() => {
    document.addEventListener("click", handleOutsideClick);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleOutsideClick);
  });
</script>

<div
  class={`relative inline-block font-minecraft text-base ${className}`}
  bind:this={wrapperEl}
  style={`--dropdown-bg:${bg ?? "var(--bg-dropdown,white)"};--dropdown-text:${textColor ?? "var(--text-dropdown,black)"};--dropdown-border:${borderColor ?? "var(--border-dropdown,#000000)"};--dropdown-shadow:${shadowColor ?? "var(--shadow-dropdown,#000000)"};--dropdown-border-image:${borderImage};border-image-source:${borderImage};`}
>
  <button
    class="relative inline-flex items-center justify-between border-[5px] border-solid px-3 py-2 bg-[color:var(--dropdown-bg)] text-[color:var(--dropdown-text)] shadow-[2px_2px_0_2px_var(--dropdown-shadow),-2px_-2px_0_2px_var(--dropdown-bg)] border-[color:var(--dropdown-border)]"
    style="border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:var(--dropdown-border-image);"
    bind:this={triggerEl}
    on:click={toggle}
  >
    <slot name="trigger">{label}</slot>
    <div
      class="w-4 h-4 ml-2 transition-transform duration-300 ease-in-out"
      style={`mask-image:${arrowMask};-webkit-mask-image:${arrowMask};mask-repeat:no-repeat;-webkit-mask-repeat:no-repeat;mask-position:center;-webkit-mask-position:center;mask-size:contain;-webkit-mask-size:contain;background-color:currentColor;transform:${isOpen ? "rotate(90deg)" : "rotate(0deg)"};`}
    />
  </button>

  {#if isOpen}
    <div
      class="absolute left-0 z-10 mt-4 border-[5px] border-solid px-3 py-2 bg-[color:var(--dropdown-bg)] text-[color:var(--dropdown-text)] shadow-[2px_2px_0_2px_var(--dropdown-shadow),-2px_-2px_0_2px_var(--dropdown-bg)]"
      style={`min-width:${triggerWidth}px;border-image-slice:3;border-image-width:2;border-image-repeat:stretch;border-image-outset:2;border-image-source:${borderImage};border-color:var(--dropdown-border);`}
      on:click={() => (isOpen = false)}
    >
      <slot />
    </div>
  {/if}
</div>
