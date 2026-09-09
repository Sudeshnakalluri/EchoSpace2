import { useEffect, useMemo, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import ConstellationCanvas from '../components/ConstellationCanvas.jsx';
import ComposeModal from '../components/ComposeModal.jsx';
import PresenceBar from '../components/PresenceBar.jsx';
import Avatar from '../components/Avatar.jsx';
import Icon from '../components/Icon.jsx';

export default function ConstellationPage() {
  const { id } = useParams();
  const { getConstellation, getUser, addNode, drifting, setActiveConstellation } = useApp();
  const constellation = getConstellation(id);
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [isComposeOpen, setComposeOpen] = useState(false);

  useEffect(() => {
    const cleanup = setActiveConstellation(id);
    return () => {
      if (typeof cleanup === 'function') cleanup();
      setActiveConstellation(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (!constellation) return <Navigate to="/" replace />;

  const selectedNode = constellation.nodes.find((n) => n.id === selectedNodeId) ?? null;
  const people = [...new Set(constellation.nodes.map((n) => n.authorId))].map(getUser).filter(Boolean);
  const latest = [...constellation.nodes].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3);
  const branchCount = constellation.nodes.filter((n) => n.connections.length > 1).length;
  const roots = constellation.nodes.filter((n) => n.connections.length === 0).length;

  const connectionLabel = useMemo(() => {
    if (!selectedNode) return 'Select any thought to reveal its thread.';
    if (selectedNode.connections.length === 0) return 'This is a seed thought — everything here grew after it.';
    return `Grown from ${selectedNode.connections.length} ${selectedNode.connections.length === 1 ? 'thought' : 'thoughts'}.`;
  }, [selectedNode]);

  return (
    <div className="page-shell constellation-page">
      <Link to="/" className="back-link focus-ring"><Icon name="arrow" size={15} className="back-arrow" /> Back to Orbit</Link>

      <section className="constellation-header">
        <div className="constellation-title-block">
          <div className="eyebrow"><span className="eyebrow-line" /> CONSTELLATION / {constellation.nodes.length} NODES</div>
          <h1>{constellation.title}</h1>
          <p>{constellation.prompt || 'A shared space for unfinished thoughts.'}</p>
        </div>
        <div className="presence-wrap">
          <PresenceBar people={drifting} />
        </div>
      </section>

      <section className="constellation-metrics">
        <div><span>Thoughts</span><strong>{constellation.nodes.length}</strong></div>
        <div><span>Voices</span><strong>{people.length}</strong></div>
        <div><span>Branches</span><strong>{branchCount}</strong></div>
        <div><span>Seeds</span><strong>{roots}</strong></div>
        <div className="metric-people">
          {people.slice(0, 5).map((person) => <Avatar key={person.id} user={person} size={27} />)}
          {people.length > 5 && <span>+{people.length - 5}</span>}
        </div>
      </section>

      <div className="growth-bar">
        <div className="growth-copy">
          <span className="growth-icon"><Icon name="branch" size={18} /></span>
          <div><strong>Choose a thought. Change its direction.</strong><span>{connectionLabel}</span></div>
        </div>
        <button type="button" onClick={() => setComposeOpen(true)} className="primary-button focus-ring">
          <Icon name="plus" size={17} /> Grow a thought
        </button>
      </div>

      <section className="constellation-workspace">
        <div className="workspace-heading">
          <div><h2>The living map</h2><p>Lines show ancestry. Nothing is ranked.</p></div>
          <div className="workspace-legend"><span><i className="legend-line" /> grows from</span><span><i className="legend-ring" /> selected</span></div>
        </div>
        <ConstellationCanvas
          nodes={constellation.nodes}
          getUser={getUser}
          selectedId={selectedNodeId}
          linkTargetId={selectedNodeId}
          onSelectNode={(nodeId) => setSelectedNodeId((cur) => cur === nodeId ? null : nodeId)}
        />
      </section>

      <section className="thread-drawer">
        <div>
          <span className="mini-label">Recent growth</span>
          <h2>The newest branches</h2>
        </div>
        <div className="recent-branches">
          {latest.map((node) => (
            <button type="button" key={node.id} onClick={() => setSelectedNodeId(node.id)} className={`recent-branch focus-ring ${selectedNodeId === node.id ? 'selected' : ''}`}>
              <Avatar user={getUser(node.authorId)} size={28} />
              <span><strong>{getUser(node.authorId)?.name ?? 'Someone'}</strong><em>{node.text}</em></span>
              <Icon name="chevron" size={15} />
            </button>
          ))}
        </div>
      </section>

      <ComposeModal
        isOpen={isComposeOpen}
        onClose={() => setComposeOpen(false)}
        linkedNode={selectedNode}
        onSubmit={(text) => {
          const connections = selectedNode ? [selectedNode.id] : [];
          const result = addNode(constellation.id, text, connections);
          if (result.ok) {
            setComposeOpen(false);
            setSelectedNodeId(null);
          }
          return result;
        }}
      />
    </div>
  );
}
