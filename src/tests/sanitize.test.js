import { describe, it, expect } from 'vitest';
import { sanitizeText, sanitizeTitle, isValidId, stripTags } from '../utils/sanitize.js';

describe('sanitizeText', () => {
  it('strips HTML tags', () => {
    expect(sanitizeText('<script>alert(1)</script>hello')).toBe('alert(1)hello');
  });

  it('removes control and zero-width characters', () => {
    expect(sanitizeText('hello\u200bworld\u0007')).toBe('helloworld');
  });

  it('trims and collapses whitespace', () => {
    expect(sanitizeText('   too   much   space   ')).toBe('too much space');
  });

  it('enforces a max length', () => {
    const long = 'a'.repeat(500);
    expect(sanitizeText(long, 280)).toHaveLength(280);
  });

  it('returns empty string for non-string input', () => {
    expect(sanitizeText(null)).toBe('');
    expect(sanitizeText(undefined)).toBe('');
    expect(sanitizeText(42)).toBe('');
  });
});

describe('sanitizeTitle', () => {
  it('defaults to a shorter max length than sanitizeText', () => {
    const long = 'b'.repeat(200);
    expect(sanitizeTitle(long).length).toBeLessThanOrEqual(60);
  });
});

describe('stripTags', () => {
  it('removes nested and malformed-looking tags', () => {
    expect(stripTags('<div><b>bold</b></div>')).toBe('bold');
  });
});

describe('isValidId', () => {
  it('accepts well-formed ids', () => {
    expect(isValidId('c_unsent')).toBe(true);
    expect(isValidId('n_1699999999_ab12c')).toBe(true);
  });

  it('rejects malformed or hostile ids', () => {
    expect(isValidId('')).toBe(false);
    expect(isValidId('../etc/passwd')).toBe(false);
    expect(isValidId('<script>')).toBe(false);
    expect(isValidId(null)).toBe(false);
    expect(isValidId('a'.repeat(65))).toBe(false);
  });
});
