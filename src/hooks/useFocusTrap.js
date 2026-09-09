import { useEffect } from 'react';

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Traps keyboard focus within `containerRef` while `isActive` is true,
 * restores focus to the previously focused element on close, and calls
 * `onClose` when Escape is pressed. Used for modal dialogs so keyboard
 * and screen-reader users are never dropped outside the dialog.
 */
export function useFocusTrap(containerRef, isActive, onClose) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return undefined;

    const previouslyFocused = document.activeElement;
    const container = containerRef.current;
    const focusables = () => Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    const first = focusables()[0];
    (first ?? container).focus();

    function handleKeydown(e) {
      if (e.key === 'Escape') {
        e.stopPropagation();
        onClose?.();
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = focusables();
      if (nodes.length === 0) return;
      const firstEl = nodes[0];
      const lastEl = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === firstEl) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        firstEl.focus();
      }
    }

    document.addEventListener('keydown', handleKeydown, true);
    return () => {
      document.removeEventListener('keydown', handleKeydown, true);
      if (previouslyFocused instanceof HTMLElement) previouslyFocused.focus();
    };
  }, [isActive, containerRef, onClose]);
}
