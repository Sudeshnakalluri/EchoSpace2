import { CURRENT_USER_ID } from '../data/mockData.js';

/**
 * Computes "resonance" between the current user and everyone else, based
 * purely on shared creative history:
 *   - constellations both people have contributed a node to
 *   - thoughts that connect directly to one another across authors
 *
 * Deliberately excludes anything resembling follows/likes — there are none
 * in this model. Extracted as a pure function (no React) so it's trivially
 * unit-testable and reusable outside the context.
 */
export function computeResonance(constellations, users, currentUserId = CURRENT_USER_ID) {
  const scores = new Map();
  for (const u of users) {
    if (u.id === currentUserId) continue;
    scores.set(u.id, { user: u, sharedConstellations: 0, sharedThreads: 0, score: 0 });
  }

  for (const c of constellations) {
    const authorsHere = new Set(c.nodes.map((n) => n.authorId));
    const youAreHere = authorsHere.has(currentUserId);
    if (youAreHere) {
      for (const authorId of authorsHere) {
        if (authorId === currentUserId) continue;
        const entry = scores.get(authorId);
        if (entry) entry.sharedConstellations += 1;
      }
    }

    const byId = new Map(c.nodes.map((n) => [n.id, n]));
    for (const node of c.nodes) {
      for (const parentId of node.connections) {
        const parent = byId.get(parentId);
        if (!parent) continue;
        const a = node.authorId;
        const b = parent.authorId;
        if (a === b) continue;
        if (a === currentUserId && scores.has(b)) scores.get(b).sharedThreads += 1;
        if (b === currentUserId && scores.has(a)) scores.get(a).sharedThreads += 1;
      }
    }
  }

  const list = [...scores.values()].map((entry) => ({
    ...entry,
    score: Math.min(100, entry.sharedConstellations * 22 + entry.sharedThreads * 14),
  }));
  list.sort((a, b) => b.score - a.score);
  return list;
}
