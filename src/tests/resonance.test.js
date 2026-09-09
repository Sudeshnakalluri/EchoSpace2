import { describe, it, expect } from 'vitest';
import { computeResonance } from '../utils/resonance.js';

const users = [
  { id: 'you', name: 'You' },
  { id: 'a', name: 'Alice' },
  { id: 'b', name: 'Bob' },
];

describe('computeResonance', () => {
  it('gives a zero score when no shared history exists', () => {
    const constellations = [
      { id: 'c1', nodes: [{ id: 'n1', authorId: 'a', connections: [] }] },
    ];
    const result = computeResonance(constellations, users, 'you');
    const alice = result.find((r) => r.user.id === 'a');
    expect(alice.score).toBe(0);
    expect(alice.sharedConstellations).toBe(0);
  });

  it('increases score for shared constellation participation', () => {
    const constellations = [
      {
        id: 'c1',
        nodes: [
          { id: 'n1', authorId: 'you', connections: [] },
          { id: 'n2', authorId: 'a', connections: [] },
        ],
      },
    ];
    const result = computeResonance(constellations, users, 'you');
    const alice = result.find((r) => r.user.id === 'a');
    expect(alice.sharedConstellations).toBe(1);
    expect(alice.score).toBeGreaterThan(0);
  });

  it('increases score further for direct thread connections across authors', () => {
    const constellations = [
      {
        id: 'c1',
        nodes: [
          { id: 'n1', authorId: 'you', connections: [] },
          { id: 'n2', authorId: 'a', connections: ['n1'] },
        ],
      },
    ];
    const result = computeResonance(constellations, users, 'you');
    const alice = result.find((r) => r.user.id === 'a');
    expect(alice.sharedThreads).toBe(1);
  });

  it('never exceeds a max score of 100', () => {
    const nodes = [{ id: 'n0', authorId: 'you', connections: [] }];
    for (let i = 1; i <= 30; i++) {
      nodes.push({ id: `n${i}`, authorId: 'a', connections: [`n${i - 1}`] });
    }
    const constellations = [{ id: 'c1', nodes }];
    const result = computeResonance(constellations, users, 'you');
    const alice = result.find((r) => r.user.id === 'a');
    expect(alice.score).toBeLessThanOrEqual(100);
  });

  it('does not count same-author connections as shared threads', () => {
    const constellations = [
      {
        id: 'c1',
        nodes: [
          { id: 'n1', authorId: 'you', connections: [] },
          { id: 'n2', authorId: 'you', connections: ['n1'] },
        ],
      },
    ];
    const result = computeResonance(constellations, users, 'you');
    const alice = result.find((r) => r.user.id === 'a');
    expect(alice.sharedThreads).toBe(0);
  });

  it('sorts results by descending score', () => {
    const constellations = [
      {
        id: 'c1',
        nodes: [
          { id: 'n1', authorId: 'you', connections: [] },
          { id: 'n2', authorId: 'b', connections: ['n1'] },
        ],
      },
    ];
    const result = computeResonance(constellations, users, 'you');
    for (let i = 1; i < result.length; i++) {
      expect(result[i - 1].score).toBeGreaterThanOrEqual(result[i].score);
    }
  });
});
