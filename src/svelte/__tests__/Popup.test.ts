import fs from "fs";
import path from "path";

describe("RetroPopup markup", () => {
  const source = fs.readFileSync(path.join(__dirname, "../Popup.svelte"), "utf8");

  it("includes overlay, container, and retro palette variables", () => {
    expect(source).toContain("class={`fixed inset-0 z-50 flex items-center justify-center ${className}`}");
    expect(source).toContain("background-color:${overlayBg ?? \"rgba(0,0,0,0.5)\"}");
    expect(source).toContain("--popup-bg:${bg ?? \"var(--bg-popup,#f0f0f0)\"}");
    expect(source).toContain("--popup-base-bg:${baseBg ?? \"var(--bg-popup-base,white)\"}");
    expect(source).toContain("--popup-text:${textColor ?? \"var(--text-popup,black)\"}");
    expect(source).toContain("--popup-border:${borderColor ?? \"var(--border-popup,#000000)\"}");
  });

  it("exposes close controls via overlay and button", () => {
    expect(source).toContain("export let closeButtonText = \"X\"");
    expect(source).toContain("const handleClose = () => {");
    expect(source).toContain("dispatch(\"close\")");
    expect(source).toContain("on:click={handleClose}");
    expect(source).toContain("on:click|stopPropagation");
  });
});
