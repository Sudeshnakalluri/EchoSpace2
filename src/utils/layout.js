/**
 * Deterministic phyllotaxis (golden-angle spiral) layout.
 *
 * Rather than running a physics/force simulation on every render (expensive,
 * non-deterministic, bad for Core Web Vitals), each node's position is a
 * pure function of its index in the constellation. This produces an organic,
 * spiral "constellation" arrangement, is O(1) per node, is stable across
 * re-renders, and needs no simulation loop.
 */
const GOLDEN_ANGLE = 137.50776;

export function nodePosition(index, total) {
  const angle = index * GOLDEN_ANGLE * (Math.PI / 180);
  const growth = 6.6 + Math.min(total, 40) * 0.05;
  const radius = Math.min(44, growth * Math.sqrt(index + 1));
  const x = 50 + radius * Math.cos(angle);
  const y = 50 + radius * Math.sin(angle);
  return { x: clamp(x, 6, 94), y: clamp(y, 8, 92) };
}

function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

export function positionsFor(nodes) {
  const map = new Map();
  nodes.forEach((node, i) => {
    map.set(node.id, nodePosition(i, nodes.length));
  });
  return map;
}
