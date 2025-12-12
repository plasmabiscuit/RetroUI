import fs from "fs";
import path from "path";

describe("RetroDropdown markup", () => {
  const source = fs.readFileSync(path.join(__dirname, "../Dropdown.svelte"), "utf8");

  it("defines retro theme variables and border image", () => {
    expect(source).toContain("--dropdown-bg:${bg ?? \"var(--bg-dropdown,white)\"}");
    expect(source).toContain("--dropdown-text:${textColor ?? \"var(--text-dropdown,black)\"}");
    expect(source).toContain("--dropdown-border:${borderColor ?? \"var(--border-dropdown,#000000)\"}");
    expect(source).toContain("--dropdown-shadow:${shadowColor ?? \"var(--shadow-dropdown,#000000)\"}");
    expect(source).toContain("border-image-source:${borderImage}");
  });

  it("tracks open state and toggles with outside clicks", () => {
    expect(source).toContain("let isOpen = false");
    expect(source).toContain("const toggle = () => {");
    expect(source).toContain("dispatch(isOpen ? \"open\" : \"close\")");
    expect(source).toContain("document.addEventListener(\"click\", handleOutsideClick)");
    expect(source).toContain("!wrapperEl.contains(event.target as Node)");
  });
});
