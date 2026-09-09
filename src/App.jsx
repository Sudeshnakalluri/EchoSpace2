import { Suspense, lazy, Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import SkipLink from './components/SkipLink.jsx';

const OrbitPage = lazy(() => import('./pages/OrbitPage.jsx'));
const ConstellationPage = lazy(() => import('./pages/ConstellationPage.jsx'));
const ResonancePage = lazy(() => import('./pages/ResonancePage.jsx'));
const TrailPage = lazy(() => import('./pages/TrailPage.jsx'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage.jsx'));

function RouteFallback() {
  return <div className="route-loading" role="status" aria-label="Loading"><span /><p>Finding your place in the sky…</p></div>;
}

class AppErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return <div className="error-state"><span>✦</span><h1>The sky blinked.</h1><p>Something interrupted this view.</p><button type="button" onClick={() => window.location.reload()} className="primary-button focus-ring">Return to Orbit</button></div>;
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div className="app-shell">
      <SkipLink />
      <NavBar />
      <main id="main-content" tabIndex={-1}>
        <AppErrorBoundary>
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<OrbitPage />} />
              <Route path="/constellation/:id" element={<ConstellationPage />} />
              <Route path="/resonance" element={<ResonancePage />} />
              <Route path="/trail" element={<TrailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppErrorBoundary>
      </main>
    </div>
  );
}
