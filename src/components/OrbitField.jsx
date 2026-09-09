import { memo, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

function OrbitField({ constellations }) {
  const navigate = useNavigate();

  const placed = useMemo(() => {
    const count = constellations.length;
    return constellations.map((c, i) => {
      const ring = i < 2 ? 1 : i < 5 ? 2 : 3;
      const ringItems = count <= 2 ? count : count > 5 ? (ring === 1 ? 2 : ring === 2 ? 3 : Math.max(1, count - 5)) : (ring === 1 ? Math.min(2, count) : Math.max(1, count - 2));
      const indexInRing = ring === 1 ? i : ring === 2 ? i - Math.min(2, count) : i - Math.min(5, count);
      const angle = (indexInRing / Math.max(1, ringItems)) * 360 - 90 + ring * 18;
      const radius = ring === 1 ? 25 : ring === 2 ? 39 : 48;
      const rad = angle * Math.PI / 180;
      const x = 50 + radius * Math.cos(rad);
      const y = 50 + radius * Math.sin(rad) * 0.78;
      const size = Math.min(154, 104 + c.nodes.length * 7);
      return { ...c, x, y, size };
    });
  }, [constellations]);

  if (constellations.length === 0) {
    return <div className="empty-state">No constellations match that search. Try another phrase.</div>;
  }

  return (
    <div className="orbit-shell">
      <div className="orbit-halo halo-one" />
      <div className="orbit-halo halo-two" />
      <div className="orbit-halo halo-three" />
      <div className="orbit-grid" aria-hidden="true" />
      <div className="orbit-center" aria-hidden="true">
        <Icon name="orbit" size={21} />
        <span>you</span>
      </div>

      <div className="orbit-caption orbit-caption-top">nearby ideas</div>
      <div className="orbit-caption orbit-caption-bottom">further out · still reachable</div>

      {placed.map((c, i) => {
        const preview = c.nodes[c.nodes.length - 1];
        const authors = [...new Set(c.nodes.map((n) => n.authorId))].slice(0, 3);
        return (
          <button
            key={c.id}
            role="listitem"
            onClick={() => navigate(`/constellation/${c.id}`)}
            className="constellation-orb focus-ring"
            style={{
              left: `${c.x}%`,
              top: `${c.y}%`,
              width: c.size,
              height: c.size,
              animationDelay: `${(i * 310) % 2200}ms`,
            }}
            aria-label={`${c.title}, ${c.nodes.length} connected thoughts. Open constellation.`}
          >
            <span className="orb-glow" />
            <span className="orb-icon"><Icon name="spark" size={14} /></span>
            <span className="orb-title">{c.title}</span>
            <span className="orb-meta">{c.nodes.length} thoughts · {authors.length} voices</span>
            <span className="orb-preview">“{preview?.text?.slice(0, 44)}{preview?.text?.length > 44 ? '…' : ''}”</span>
          </button>
        );
      })}
    </div>
  );
}

export default memo(OrbitField);
