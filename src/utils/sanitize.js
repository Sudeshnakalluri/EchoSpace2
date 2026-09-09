/**
 * Input sanitization utilities.
 *
 * React escapes text content by default when rendered via JSX, which
 * neutralizes the classic stored-XSS vector. These helpers add a second
 * layer of defense so raw values are already safe before they ever reach
 * state, storage, or an eventual API boundary:
 *   - strip any HTML tags a user might paste in
 *   - collapse control/zero-width characters
 *   - enforce sane length limits per content type
 *   - trim whitespace
 */

const TAG_PATTERN = /<[^>]*>/g;
// eslint-disable-next-line no-control-regex -- intentional: stripping control/zero-width chars is the point of this pattern
const CONTROL_CHARS = /[\u0000-\u001F\u007F\u200B-\u200D\uFEFF]/g;

export function stripTags(value) {
  if (typeof value !== 'string') return '';
  return value.replace(TAG_PATTERN, '');
}

export function sanitizeText(value, maxLength = 280) {
  if (typeof value !== 'string') return '';
  const noTags = stripTags(value);
  const noControl = noTags.replace(CONTROL_CHARS, '');
  const collapsed = noControl.replace(/\s+/g, ' ').trim();
  return collapsed.slice(0, maxLength);
}

export function sanitizeTitle(value, maxLength = 60) {
  return sanitizeText(value, maxLength);
}

export function isNonEmpty(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

/**
 * Validates that an id (used to look up nodes/constellations/users)
 * matches the expected internal id shape before it's used to index
 * into state. Prevents malformed/hostile ids from propagating.
 */
export function isValidId(id) {
  return typeof id === 'string' && /^[a-zA-Z0-9_-]{1,64}$/.test(id);
}
