# EchoSpace — Reimagine Social

> **A social network without a feed.** Explore ideas as constellations, grow them from each other, and build visible creative history instead of an invisible popularity graph.

EchoSpace is a deliberately non-feed social experience for the **REIMAGINE SOCIAL** challenge. It removes the mechanics that make conventional social products feel interchangeable — infinite scroll, likes, follower counts and engagement ranking — and replaces them with a spatial model of participation.

## 01 · The core idea

### Orbit
The home screen is a navigable sky rather than a timeline. Constellations are placed spatially and sized by how much thought has genuinely grown inside them.

### Constellations
A constellation is a shared idea-space. The first person plants a seed. Other people select a thought and grow a new branch from it. The resulting shape becomes the conversation.

### Drift
A small live-presence signal shows who else is exploring the same constellation. It creates co-presence without turning attention into notifications or counts to chase.

### Resonance
Instead of followers, EchoSpace calculates private creative history: shared spaces and direct thought-to-thought connections. It is intentionally **not a public leaderboard**.

### Trail
Instead of a profile full of vanity metrics, each person has a trail of the thoughts they planted and the spaces they changed.

---

## 02 · What makes the interaction different

**Conventional social:** publish → wait for reactions → scroll → repeat.

**EchoSpace:** discover → choose a thought → grow a branch → follow the resulting structure → leave a trail.

The important interaction is not “reacting to a post.” It is **changing the shape of a shared idea**.

### Example flow

1. Enter Orbit and search for an idea.
2. Open **Unsent Messages**.
3. Select “Sometimes the almost-said thing is the truest draft of it.”
4. The connected ancestry becomes visually highlighted.
5. Press **Grow a thought**.
6. The new thought is attached to that branch.
7. The constellation, Resonance history, and personal Trail update immediately.
8. Refreshing the page preserves the local demo state.

---

## 03 · Interface language

The visual system uses a dark astronomical canvas with restrained mint/violet signals:

- **Mint** = active participation / live presence
- **Violet** = connection / structure
- **Soft white** = authored thought
- **Muted slate** = metadata, never the focus

The interface uses cards only where they clarify an action. The main discovery surface remains spatial, while every spatial interaction has a semantic list alternative.

Responsive behavior is designed intentionally rather than simply shrinking the desktop UI:

- Desktop: full Orbit navigation and spatial discovery.
- Tablet: compact navigation with preserved galaxy layout.
- Mobile: bottom-friendly navigation, stacked content, simplified constellation map, and bottom-sheet composition.
- `prefers-reduced-motion` disables decorative movement.

---

## 04 · Feature set

### Discovery
- Spatial Orbit instead of a ranked feed
- Search across titles, prompts and thought content
- Reflective / Creative / Everyday discovery filters
- Featured starting point
- Live count of ideas, thoughts and voices
- Visual legend explaining the spatial model

### Participation
- Start a new constellation
- Plant the first seed thought
- Select an existing thought
- Grow a new branch from the selected thought
- Switch between visual Map and accessible Thread List
- Recent-growth shortcuts

### Social connection
- Ambient “drifting here” presence
- Private Resonance score
- Shared-space history
- Direct-thread history
- No likes, followers, follower counts or public popularity ranking

### Personal identity
- Your Trail
- Thoughts planted
- Constellations touched
- Threads grown
- Links back into the living constellation

### Quality
- Local persistence with `localStorage`
- Input sanitization
- Route validation
- Error boundary
- Focus-trapped dialogs
- Escape-to-close
- Skip link
- ARIA labels and live regions
- Reduced-motion support
- Lazy-loaded routes
- Deterministic O(1)-per-node layout

---

## 05 · Architecture

```text
src/
├── components/
│   ├── Avatar.jsx
│   ├── ComposeModal.jsx
│   ├── ConstellationCanvas.jsx
│   ├── Icon.jsx
│   ├── NavBar.jsx
│   ├── NewConstellationModal.jsx
│   ├── NodeCard.jsx
│   ├── OrbitField.jsx
│   ├── PresenceBar.jsx
│   ├── ResonanceMeter.jsx
│   └── SkipLink.jsx
├── context/
│   └── AppContext.jsx
├── data/
│   └── mockData.js
├── hooks/
│   └── useFocusTrap.js
├── pages/
│   ├── ConstellationPage.jsx
│   ├── NotFoundPage.jsx
│   ├── OrbitPage.jsx
│   ├── ResonancePage.jsx
│   └── TrailPage.jsx
├── tests/
└── utils/
    ├── layout.js
    ├── resonance.js
    └── sanitize.js
```

Business logic is kept outside the visual components where possible. Layout, sanitization and Resonance are pure utilities and therefore easy to test independently.

---

## 06 · Technical choices

- **React 19 + Vite 8**
- **React Router 7**
- **Tailwind CSS v4** for token integration
- **Vitest + Testing Library**
- **No backend required** for the challenge demo
- **No external network calls**
- **LocalStorage persistence**

The Orbit uses a deterministic golden-angle layout instead of a continuously running force simulation. That keeps the experience stable and avoids unnecessary layout work.

The application is also split at route boundaries with `React.lazy`, so secondary views do not need to be loaded before the initial Orbit is usable.

---

## 07 · Accessibility

EchoSpace treats the spatial UI as an enhancement, not the only way to understand the product.

- Semantic `header`, `nav` and `main`
- Keyboard-accessible controls
- Skip-to-content link
- Visible focus states
- Every node has a descriptive accessible label
- Map/List toggle exposes equivalent thread information
- Modal dialogs use focus trapping and restoration
- Escape closes dialogs
- Form controls have explicit labels
- Validation errors use `role="alert"`
- Presence updates use `aria-live="polite"`
- Reduced-motion mode is respected

---

## 08 · Security / resilience

User-entered text is sanitized before entering application state:

- HTML tags removed
- control / zero-width characters removed
- whitespace normalized
- field lengths capped
- IDs validated before route/state lookup

React JSX escaping provides an additional rendering boundary. There is no `dangerouslySetInnerHTML`.

An application-level error boundary prevents an unexpected render failure from producing a blank page.

---

## 09 · Run locally

```bash
npm install
npm run dev
```

Production:

```bash
npm run build
npm run preview
```

Tests:

```bash
npm test
```

Lint:

```bash
npm run lint
```

---

## 10 · Challenge positioning

EchoSpace is intentionally **not** an Instagram, Snapchat, Reddit, or X clone.

It changes the social primitive itself:

| Familiar primitive | EchoSpace replacement |
| --- | --- |
| Feed | Orbit |
| Post | Thought node |
| Comment/reply | Branch |
| Like | No public reaction metric |
| Followers | Resonance history |
| Profile | Trail |
| Trending | Spatial proximity / growth |
| DM-first presence | Drift |

**The product thesis:** people do not only want to broadcast. They also want places where their ideas can become larger than the person who started them.
