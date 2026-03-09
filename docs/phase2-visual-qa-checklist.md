# Phase 2 Visual QA Checklist

Use this checklist after `npm run dev` and for each target viewport:

- Desktop: `1440x900`
- Tablet: `1180x820`
- Mobile: `390x844`

## 1) Map-First Hierarchy

- [ ] Eye lands on map before rails/nav.
- [ ] Coastline edge reads clearly in under 2 seconds.
- [ ] Corridor focus (Aberdeen -> Humber by default) is visible but subtle.
- [ ] Foreground/midground/background separation is obvious.

## 2) Luminance Quality

- [ ] London is intense and structured, not a soft blob.
- [ ] Tier-B cities are legible without overpowering Tier-A.
- [ ] Minor/offshore points feel delicate and precise.
- [ ] Surge/Dimming anomaly modes visibly alter outer glow behavior.

## 3) Timeline Control Surface

- [ ] Timeline reads as primary interaction zone.
- [ ] Play button feels central and tactile.
- [ ] Scrubber thumb is easy to target and visually dominant.
- [ ] Tick rhythm feels clean (no noisy micro clutter).

## 4) Rail Density and Readability

- [ ] Right rail scans quickly: hero controls first, then secondary groups.
- [ ] Left rail feels like one lightweight assistant panel.
- [ ] Tertiary labels are subdued and do not compete with scene.
- [ ] Regions selection clearly reflects active choice.

## 5) Top Bar Integration

- [ ] Top bar feels part of the scene, not a pasted strip.
- [ ] Active tab is softly backlit (not boxy).
- [ ] Subtitle/title rhythm is balanced and legible.

## 6) Motion Restraint

- [ ] Subtle sea haze drift is visible but non-distracting.
- [ ] Playhead pulse is present only when useful.
- [ ] No aggressive twinkling or noisy animation loops.

## 7) Responsive Behavior

- [ ] Desktop keeps 3-column composition with map priority.
- [ ] Tablet collapses one rail into drawer without layout stress.
- [ ] Mobile remains map-first with floating card + bottom controls.
- [ ] Touch targets are comfortably tappable on mobile.

## 8) Performance and Build

- [ ] No visible frame drops during idle animation on laptop.
- [ ] Interactions (scrub/play/open drawer) remain smooth.
- [ ] `npm run build` succeeds without errors.

## QA Notes Template

- Date:
- Commit:
- Reviewer:
- Device/Browser:
- Findings:
- Actions:
