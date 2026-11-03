# Refine the Extensions control

## Scope
- Change only the existing Extensions trigger and its dropdown.
- Preserve all URLs, browser detection, navigation behavior, responsive placement, and every other page element.

## Implementation
- Replace the generic puzzle glyph with one original Nexpath extension mark: a compact extension outline combining a prompt/code chevron and verification check in the existing green accent.
- Reuse that same mark in the desktop trigger, mobile trigger, Chrome row, and Firefox row.
- Keep the current button dimensions and visual treatment; retain the Extensions label and dropdown chevron.
- Make the menu compact and polished with aligned icon tiles, text-only browser names, and the existing Recommended badge on the detected browser.
- Keep subtle existing-token hover/focus states and avoid extra animation or dependencies.

## Verification
- Check desktop and mobile for menu opening, link targets, recommendation state, clipping, overflow, and unchanged surrounding layout.
- Confirm the project preview builds without errors.
