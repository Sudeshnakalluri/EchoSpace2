import { useMemo } from 'react';
import { useApp } from '../context/AppContext.jsx';
import ResonanceMeter from '../components/ResonanceMeter.jsx';
import Icon from '../components/Icon.jsx';
import Avatar from '../components/Avatar.jsx';

export default function ResonancePage() {
  const { resonance, constellations, currentUser, getUser } = useApp();
  const active = resonance.filter((entry) => entry.score > 0);
  const totalShared = active.reduce((sum, entry) => sum + entry.sharedConstellations, 0);
  const totalThreads = active.reduce((sum, entry) => sum + entry.sharedThreads, 0);
  const strongest = active[0];

  const sharedMap = useMemo(() => {
    if (!strongest) return [];
    return constellations.filter((c) => c.nodes.some((n) => n.authorId === currentUser.id) && c.nodes.some((n) => n.authorId === strongest.user.id));
  }, [constellations, currentUser.id, strongest]);

  return (
    <div className="page-shell narrow-page">
      <section className="resonance-hero">
        <div>
          <div className="eyebrow"><span className="eyebrow-line" /> PRIVATE / NON-RANKABLE</div>
          <h1>Connection is a <em>history,</em> not a number.</h1>
          <p>Resonance measures what you have actually made together: shared spaces and direct thought-to-thought connections. Nobody else can see or compare it.</p>
        </div>
        <div className="resonance-orb"><Icon name="pulse" size={29} /><strong>{active.length}</strong><span>shared voices</span></div>
      </section>

      <section className="resonance-summary">
        <div><Icon name="users" size={18} /><span>shared constellations</span><strong>{totalShared}</strong></div>
        <div><Icon name="branch" size={18} /><span>direct threads</span><strong>{totalThreads}</strong></div>
        <div><Icon name="spark" size={18} /><span>public metrics</span><strong>none</strong></div>
      </section>

      {strongest && (
        <section className="strongest-card">
          <div className="strongest-avatar"><Avatar user={strongest.user} size={48} /></div>
          <div><span className="mini-label">Your strongest shared history</span><h2>{strongest.user.name}</h2><p>{strongest.user.bio}</p></div>
          <div className="strongest-score"><strong>{strongest.score}</strong><span>resonance</span></div>
        </section>
      )}

      <section className="resonance-list-section">
        <div className="section-heading-row compact"><div><p className="eyebrow">THE PEOPLE YOU BUILT WITH</p><h2>Resonance map</h2></div><span className="muted-badge">not a leaderboard</span></div>
        <ul className="resonance-list">
          {resonance.map((entry) => <ResonanceMeter key={entry.user.id} entry={entry} />)}
        </ul>
      </section>

      {strongest && (
        <section className="shared-spaces">
          <div><p className="eyebrow">SHARED GROUND</p><h2>Where your paths crossed</h2></div>
          <div className="shared-space-grid">
            {sharedMap.map((c) => (
              <div key={c.id} className="shared-space-card">
                <span className="space-symbol"><Icon name="orbit" size={17} /></span>
                <strong>{c.title}</strong>
                <span>{c.nodes.length} thoughts · both contributed</span>
              </div>
            ))}
            {sharedMap.length === 0 && <p className="muted-copy">Your next shared space will appear here when two thoughts meet.</p>}
          </div>
        </section>
      )}
    </div>
  );
}
