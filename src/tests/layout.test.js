import { describe, it, expect } from 'vitest';
import { nodePosition, positionsFor } from '../utils/layout.js';

describe('nodePosition', () => {
  it('is deterministic for the same index and total', () => {
    const a = nodePosition(3, 10);
    const b = nodePosition(3, 10);
    expect(a).toEqual(b);
  });

  it('stays within the clamped bounds', () => {
    for (let i = 0; i < 50; i++) {
      const { x, y } = nodePosition(i, 50);
      expect(x).toBeGreaterThanOrEqual(6);
      expect(x).toBeLessThanOrEqual(94);
      expect(y).toBeGreaterThanOrEqual(8);
      expect(y).toBeLessThanOrEqual(92);
    }
  });

  it('places the first node near the center', () => {
    const { x, y } = nodePosition(0, 5);
    expect(Math.abs(x - 50)).toBeLessThan(15);
    expect(Math.abs(y - 50)).toBeLessThan(15);
  });
});

describe('positionsFor', () => {
  it('returns one position per node keyed by id', () => {
    const nodes = [{ id: 'a' }, { id: 'b' }, { id: 'c' }];
    const positions = positionsFor(nodes);
    expect(positions.size).toBe(3);
    expect(positions.has('a')).toBe(true);
    expect(positions.get('a')).toHaveProperty('x');
    expect(positions.get('a')).toHaveProperty('y');
  });
});
