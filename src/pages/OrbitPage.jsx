import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import OrbitField from '../components/OrbitField.jsx';
import NewConstellationModal from '../components/NewConstellationModal.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';

const filters = ['All', 'Reflective', 'Creative', 'Everyday'];

function categoryFor(c) {
  const t = `${c.title} ${c.prompt}`.toLowerCase();
  if (/sound|ritual|small|everyday|home/.test(t)) return 'Everyday';
  if (/build|learn|future|idea|creative|dream/.test(t)) return 'Creative';
  return 'Reflective';
}

export default function OrbitPage() {
  const { constellations, addConstellation, users } = useApp();
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return constellations.filter((c) => {
      const matchesFilter = filter === 'All' || categoryFor(c) === filter;
      const haystack = `${c.title} ${c.prompt} ${c.nodes.map((n) => n.text).join(' ')}`.toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }, [constellations, filter, query]);

  const totalThoughts = constellations.reduce((sum, c) => sum + c.nodes.length, 0);
  const voices = new Set(constellations.flatMap((c) => c.nodes.map((n) => n.authorId))).size;
  const featured = filtered[0] ?? constellations[0];

  return (
    <div className="page-shell">
      <section className="orbit-hero">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> THE FEED IS GONE</div>
          <h1><span className="sr-only">No feed. </span>Social space for <em>thoughts that grow.</em></h1>
          <p className="hero-lede">
            EchoSpace replaces the scroll with a living sky. Find an idea, add a perspective,
            and watch a conversation become something none of you could have made alone.
          </p>
          <div className="hero-actions">
            <button type="button" onClick={() => setModalOpen(true)} className="primary-button focus-ring">
              <Icon name="plus" size={17} /> Start a constellation
            </button>
            <span className="hero-note"><Icon name="branch" size={15} /> no likes · no followers · no ranking</span>
          </div>
        </div>

        <div className="hero-signal" aria-label="EchoSpace live signal">
          <div className="signal-ring signal-ring-a" />
          <div className="signal-ring signal-ring-b" />
          <div className="signal-core"><Icon name="spark" size={24} /></div>
          <span className="signal-label signal-label-a">ideas<br /><strong>drift</strong></span>
          <span className="signal-label signal-label-b">people<br /><strong>weave</strong></span>
          <span className="signal-label signal-label-c">meaning<br /><strong>stays</strong></span>
        </div>
      </section>

      <section className="stats-strip" aria-label="EchoSpace at a glance">
        <div><span>Living constellations</span><strong>{constellations.length}</strong></div>
        <div><span>Thoughts in orbit</span><strong>{totalThoughts}</strong></div>
        <div><span>Voices represented</span><strong>{voices}</strong></div>
        <div><span>Your mode</span><strong className="accent-text">Builder</strong></div>
      </section>

      <section className="section-heading-row">
        <div>
          <p className="eyebrow">DISCOVERY WITHOUT A RANKING</p>
          <h2>What is alive in the sky</h2>
        </div>
        <p className="section-explainer">Distance is visual, not social status. Size comes from genuine growth.</p>
      </section>

      <section className="discovery-toolbar" aria-label="Discover constellations">
        <label className="search-field">
          <Icon name="search" size={18} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ideas, words, or thoughts…"
            aria-label="Search constellations"
          />
          {query && <button type="button" className="search-clear focus-ring" onClick={() => setQuery('')} aria-label="Clear search"><Icon name="close" size={15} /></button>}
        </label>
        <div className="filter-row" role="group" aria-label="Filter constellations">
          {filters.map((item) => (
            <button key={item} type="button" onClick={() => setFilter(item)} aria-pressed={filter === item} className={`filter-chip focus-ring ${filter === item ? 'active' : ''}`}>
              {item}
            </button>
          ))}
        </div>
      </section>

      <section className="orbit-stage-wrap">
        <div className="stage-topline">
          <span><span className="live-dot" /> {filtered.length} {filtered.length === 1 ? 'constellation' : 'constellations'} in view</span>
          <span className="stage-key"><i className="key-dot key-dot-small" /> smaller = early <i className="key-dot key-dot-large" /> larger = more woven</span>
        </div>
        <div className="orbit-list" role="list" aria-label="Active constellations">
          <OrbitField constellations={filtered} />
        </div>
      </section>

      {featured && (
        <section className="featured-card">
          <div className="featured-art" aria-hidden="true"><Icon name="spark" size={30} /></div>
          <div className="featured-copy">
            <span className="mini-label">A good place to begin</span>
            <h3>{featured.title}</h3>
            <p>{featured.prompt}</p>
            <div className="featured-voices">
              {featured.nodes.slice(-4).map((n) => <Avatar key={n.id} user={users.find((u) => u.id === n.authorId)} size={25} />)}
              <span>{featured.nodes.length} thoughts have grown here</span>
            </div>
          </div>
          <button type="button" className="text-button focus-ring" onClick={() => navigate(`/constellation/${featured.id}`)}>
            Enter <Icon name="arrow" size={16} />
          </button>
        </section>
      )}

      <section className="how-section">
        <div>
          <p className="eyebrow">THE SOCIAL MODEL</p>
          <h2>One thought. Three possible futures.</h2>
          <p className="muted-copy">EchoSpace changes the unit of interaction from a post to a connection.</p>
        </div>
        <div className="model-grid">
          <article><span className="model-number">01</span><Icon name="compass" size={20} /><h3>Drift</h3><p>Explore by curiosity, not by an engagement score.</p></article>
          <article><span className="model-number">02</span><Icon name="branch" size={20} /><h3>Grow</h3><p>Select a thought and add a perspective directly to its branch.</p></article>
          <article><span className="model-number">03</span><Icon name="pulse" size={20} /><h3>Resonate</h3><p>See the people you've actually built with, without a follower graph.</p></article>
        </div>
      </section>

      <NewConstellationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={(title, prompt, seed) => {
          const result = addConstellation(title, prompt, seed);
          if (result.ok) setModalOpen(false);
          return result;
        }}
      />
    </div>
  );
}
