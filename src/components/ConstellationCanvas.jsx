import { useMemo, useState } from 'react';
import { positionsFor } from '../utils/layout.js';
import NodeCard from './NodeCard.jsx';
import Icon from './Icon.jsx';

export default function ConstellationCanvas({ nodes, getUser, selectedId, onSelectNode, linkTargetId }) {
  const [view, setView] = useState('map');
  const positions = useMemo(() => positionsFor(nodes), [nodes]);
  const byId = useMemo(() => new Map(nodes.map((n) => [n.id, n])), [nodes]);

  const lines = useMemo(() => {
    const out = [];
    for (const node of nodes) {
      for (const parentId of node.connections) {
        const from = positions.get(parentId);
        const to = positions.get(node.id);
        if (from && to) out.push({ key: `${parentId}->${node.id}`, from, to, active: selectedId === parentId || selectedId === node.id });
      }
    }
    return out;
  }, [nodes, positions, selectedId]);

  return (
    <div className="constellation-canvas-wrap">
      <div className="canvas-toolbar">
        <div className="canvas-hint"><Icon name="compass" size={15} /> Follow the lines. Pick a thought to grow from it.</div>
        <div role="group" aria-label="Constellation view mode" className="view-toggle">
          <button type="button" onClick={() => setView('map')} aria-pressed={view === 'map'} className={`focus-ring ${view === 'map' ? 'active' : ''}`}><Icon name="orbit" size={14} /> Map</button>
          <button type="button" onClick={() => setView('list')} aria-pressed={view === 'list'} className={`focus-ring ${view === 'list' ? 'active' : ''}`}><Icon name="branch" size={14} /> Thread list</button>
        </div>
      </div>

      {view === 'map' ? (
        <div className="constellation-map">
          <svg className="connection-svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            {lines.map((line) => (
              <line key={line.key} x1={line.from.x} y1={line.from.y} x2={line.to.x} y2={line.to.y} className={line.active ? 'connection active' : 'connection'} />
            ))}
          </svg>
          <div className="map-stars" aria-hidden="true"><span /><span /><span /><span /><span /><span /></div>
          {nodes.map((node) => (
            <NodeCard
              key={node.id}
              node={node}
              author={getUser(node.authorId)}
              position={positions.get(node.id)}
              isSelected={selectedId === node.id}
              isLinkTarget={linkTargetId === node.id}
              onSelect={onSelectNode}
            />
          ))}
        </div>
      ) : (
        <ol className="thread-list">
          {nodes.map((node, index) => {
            const author = getUser(node.authorId);
            const parents = node.connections.map((id) => byId.get(id)).filter(Boolean);
            return (
              <li key={node.id}>
                <span className="thread-number">{String(index + 1).padStart(2, '0')}</span>
                <button type="button" onClick={() => onSelectNode(node.id)} aria-pressed={selectedId === node.id} className={`thread-item focus-ring ${selectedId === node.id ? 'selected' : ''}`}>
                  <AvatarFallback author={author} />
                  <span className="thread-content"><strong>{author?.name ?? 'Unknown'}</strong><span>{node.text}</span>{parents.length > 0 && <small>↳ grown from {parents.map((p) => `“${p.text.slice(0, 42)}${p.text.length > 42 ? '…' : ''}”`).join(' · ')}</small>}</span>
                  <Icon name="chevron" size={16} />
                </button>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function AvatarFallback({ author }) {
  return (
    <div className="thread-avatar" style={{ '--avatar-hue': author?.hue ?? 168 }}>
      {(author?.name ?? '?').slice(0, 1)}
    </div>
  );
}
