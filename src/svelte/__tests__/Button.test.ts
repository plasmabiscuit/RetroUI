import fs from "fs";
import path from "path";

describe("RetroButton markup", () => {
  const source = fs.readFileSync(path.join(__dirname, "../Button.svelte"), "utf8");

  it("uses retro shadow, border, and default color variables", () => {
    expect(source).toMatch(/--button-bg:\${bg \?\? "var\(--bg-button,#f0f0f0\)"}/);
    expect(source).toMatch(/--button-text:\${textColor \?\? "var\(--text-button,#000000\)"}/);
    expect(source).toMatch(/--button-shadow:\${shadow \?\? "var\(--shadow-button,#000000\)"}/);
    expect(source).toMatch(/--button-border:\${borderColor \?\? "var\(--border-button,#000000\)"}/);
  });

  it("exposes button semantics and click dispatcher", () => {
    expect(source).toMatch(/export let type:\s*"button"\s*\|\s*"submit"\s*\|\s*"reset"\s*=\s*"button";/);
    expect(source).toContain("createEventDispatcher");
    expect(source).toContain('dispatch("click", event)');
  });
});
