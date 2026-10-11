
# Practice Floating UI — Design Contract

## Components

- ExperimentPracticeToolbar
- ExperimentFloatingPanel
- ExperimentPracticeDock

## Layout

- Runtime remains inside ExperimentRuntimeHost.
- UI remains inside the routed PracticePage.
- Toolbar is anchored to the right.
- Floating Panel is draggable on desktop.
- Dock is anchored to the bottom.

## State

- Controller owns experiment data.
- PracticePage owns panel selection and position.
- Only one floating panel is open at a time.
- UI position resets when PracticePage remounts.
- Closing a panel does not reset experiment data.

## Interaction

- Drag from the panel title bar only.
- Inputs and buttons must remain interactive.
- Keep the panel within Workspace bounds.
- Provide Close and Reset Position actions.
- Escape closes the open panel.
- Uncovered simulation areas receive pointer events.

## Responsive

- Desktop: draggable floating panel.
- Mobile / short viewport: bottom sheet.
- Resize and fullscreen must keep the panel accessible.

## Constraints

- No controller or physics changes.
- No router or session lifecycle changes.
- No Canvas remount caused by panel interaction.
- No persistence or multi-window management in GĐ2.
- Integrate into _template before real modules.
