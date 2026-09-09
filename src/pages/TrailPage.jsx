import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import Icon from '../components/Icon.jsx';

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'moments ago';
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function TrailPage() {
  const { myTrail, constellations, currentUser } = useApp();
  const touched = useMemo(() => [...new Set(myTrail.map((n) => n.constellationId))].map((id) => constellations.find((c) => c.id === id)).filter(Boolean), [myTrail, constellations]);
  const connectedThreads = myTrail.filter((n) => n.connections.length > 0).length;

  return (
    <div className="page-shell narrow-page trail-page">
      <section className="trail-hero">
        <div className="trail-mark"><Icon name="trail" size={34} /></div>
        <div><div className="eyebrow"><span className="eyebrow-line" /> YOUR TRACE THROUGH THE SKY</div><h1>{currentUser.name}'s trail</h1><p>Your identity here is not a profile of metrics. It is the evidence of what you chose to add, connect, and leave behind.</p></div>
      </section>

      <section className="trail-stats">
        <div><span>Thoughts planted</span><strong>{myTrail.length}</strong><small>your original contributions</small></div>
        <div><span>Constellations touched</span><strong>{touched.length}</strong><small>different ideas entered</small></div>
        <div><span>Threads grown</span><strong>{connectedThreads}</strong><small>thoughts attached to another</small></div>
      </section>

      <section className="trail-map">
        <div className="section-heading-row compact"><div><p className="eyebrow">YOUR PLACES</p><h2>Constellations you've changed</h2></div></div>
        <div className="trail-place-grid">
          {touched.map((c, index) => (
            <Link to={`/constellation/${c.id}`} key={c.id} className="trail-place focus-ring">
              <span className="place-index">0{index + 1}</span>
              <span className="place-dot"><Icon name="spark" size={13} /></span>
              <strong>{c.title}</strong>
              <span>{c.nodes.length} total thoughts</span>
              <Icon name="arrow" size={15} className="place-arrow" />
            </Link>
          ))}
          {touched.length === 0 && <p className="muted-copy">Your trail starts when you grow your first thought from the Orbit.</p>}
        </div>
      </section>

      <section className="timeline-section">
        <div className="section-heading-row compact"><div><p className="eyebrow">CHRONOLOGY WITHOUT A FEED</p><h2>Your planted thoughts</h2></div></div>
        {myTrail.length === 0 ? (
          <div className="empty-state">Nothing planted yet. <Link to="/">Visit the Orbit →</Link></div>
        ) : (
          <ol className="trail-timeline">
            {myTrail.map((node, index) => (
              <li key={node.id}>
                <span className="timeline-node">{index + 1}</span>
                <div className="timeline-card">
                  <span className="timeline-meta">{node.constellationTitle} · {timeAgo(node.createdAt)}</span>
                  <p>{node.text}</p>
                  <span className="timeline-tag">{node.connections.length ? 'grown from another thought' : 'seed thought'}</span>
                  <Link to={`/constellation/${node.constellationId}`} className="focus-ring">Open constellation <Icon name="arrow" size={13} /></Link>
                </div>
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}
