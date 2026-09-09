import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { AppProvider } from '../context/AppContext.jsx';
import App from '../App.jsx';

function renderApp(initialEntries = ['/']) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <AppProvider>
        <App />
      </AppProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  window.localStorage.clear();
});

describe('App shell', () => {
  it('renders the Orbit page by default with primary navigation', async () => {
    renderApp();
    expect(await screen.findByRole('heading', { name: /no feed/i })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: /primary/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /orbit/i })).toBeInTheDocument();
  });

  it('has a skip link as the first focusable element for keyboard users', () => {
    renderApp();
    const skipLink = screen.getByText(/skip to main content/i);
    expect(skipLink).toHaveAttribute('href', '#main-content');
  });

  it('renders constellations as an accessible list of buttons', async () => {
    renderApp();
    const items = await screen.findAllByRole('listitem');
    expect(items.length).toBeGreaterThan(0);
  });

  it('opens the new-constellation dialog and traps focus inside it', async () => {
    const user = userEvent.setup();
    renderApp();
    await user.click(screen.getByRole('button', { name: /start a constellation/i }));
    const dialog = await screen.findByRole('dialog', { name: /start a new constellation/i });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByLabelText(/^name$/i)).toBeInTheDocument();
  });

  it('shows a 404 state for unknown routes', async () => {
    renderApp(['/somewhere-that-does-not-exist']);
    expect(await screen.findByText(/this part of the sky is empty/i)).toBeInTheDocument();
  });

  it('redirects an unknown constellation id back to Orbit', async () => {
    renderApp(['/constellation/does-not-exist']);
    expect(await screen.findByRole('heading', { name: /no feed/i })).toBeInTheDocument();
  });
});
