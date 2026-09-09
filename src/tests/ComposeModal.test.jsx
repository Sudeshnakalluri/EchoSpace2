import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ComposeModal from '../components/ComposeModal.jsx';

describe('ComposeModal', () => {
  it('renders nothing when closed', () => {
    const { container } = render(<ComposeModal isOpen={false} onClose={vi.fn()} onSubmit={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('shows a validation error when submitting empty text', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ComposeModal isOpen onClose={vi.fn()} onSubmit={onSubmit} />);
    await user.click(screen.getByRole('button', { name: /add to constellation/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/say something/i);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('calls onSubmit with trimmed text', async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn(() => ({ ok: true }));
    render(<ComposeModal isOpen onClose={vi.fn()} onSubmit={onSubmit} />);
    await user.type(screen.getByLabelText(/your thought/i), '  a real thought  ');
    await user.click(screen.getByRole('button', { name: /add to constellation/i }));
    expect(onSubmit).toHaveBeenCalledWith('a real thought');
  });

  it('closes on Escape key press', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<ComposeModal isOpen onClose={onClose} onSubmit={vi.fn()} />);
    await user.keyboard('{Escape}');
    expect(onClose).toHaveBeenCalled();
  });
});
