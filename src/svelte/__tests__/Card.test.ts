import fs from "fs";
import path from "path";

describe("RetroCard markup", () => {
  const source = fs.readFileSync(path.join(__dirname, "../Card.svelte"), "utf8");

  it("defines default retro palette and border image", () => {
    expect(source).toMatch(/--card-bg:\${bg \?\? "var\(--bg-card,white\)"}/);
    expect(source).toMatch(/--card-text:\${textColor \?\? "var\(--text-card,black\)"}/);
    expect(source).toMatch(/--card-border:\${borderColor \?\? "var\(--border-card,#000000\)"}/);
    expect(source).toMatch(/--card-shadow:\${shadowColor \?\? "var\(--shadow-card,#000000\)"}/);
    expect(source).toContain("border-image-source:${borderImage}");
  });

  it("dispatches clicks for interaction handling", () => {
    expect(source).toContain("createEventDispatcher");
    expect(source).toContain("dispatch(\"click\"");
  });
});
