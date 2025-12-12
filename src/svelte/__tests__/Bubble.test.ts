import fs from "fs";
import path from "path";

describe("RetroBubble markup", () => {
  const source = fs.readFileSync(path.join(__dirname, "../Bubble.svelte"), "utf8");

  it("includes default retro speech bubble styling", () => {
    expect(source).toContain("--bubble-bg:${bg ?? \"#ffffff\"}");
    expect(source).toContain("--bubble-text:${textColor ?? \"#000000\"}");
    expect(source).toContain("--bubble-border:${borderColor ?? \"#000000\"}");
    expect(source).toContain("class={`bubble relative inline-block");
  });

  it("supports directional tails for left and right", () => {
    expect(source).toContain("from-right");
    expect(source).toContain("from-left");
  });

  it("dispatches click events for interactions", () => {
    expect(source).toContain("createEventDispatcher");
    expect(source).toContain("dispatch(\"click\"");
  });
});
