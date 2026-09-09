import { memo } from 'react';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

function timeAgo(ts) {
  const diff = Math.max(0, Date.now() - ts);
  const hours = Math.floor(diff / 3600000);
  if (hours < 1) return 'now';
  if (hours < 24) return `${hours}h`;
  return `${Math.floor(hours / 24)}d`;
}

function NodeCard({ node, author, position, isSelected, isLinkTarget, onSelect }) {
  if (!position) return null;
  return (
    <div className={`node-wrap ${isSelected ? 'selected' : ''} ${isLinkTarget && !isSelected ? 'target' : ''}`} style={{ left: `${position.x}%`, top: `${position.y}%` }}>
      <button type="button" onClick={() => onSelect(node.id)} className="node-card focus-ring" aria-pressed={isSelected} aria-label={`Thought by ${author?.name ?? 'someone'}: ${node.text}`}>
        <div className="node-top">
          <Avatar user={author} size={22} />
          <span>{author?.name ?? 'Unknown'}</span>
          <time>{timeAgo(node.createdAt)}</time>
        </div>
        <p>{node.text}</p>
        <div className="node-bottom">
          <span><Icon name="branch" size={12} /> {node.connections.length ? `${node.connections.length} parent${node.connections.length > 1 ? 's' : ''}` : 'seed'}</span>
          <span className="node-open"><Icon name="chevron" size={12} /></span>
        </div>
      </button>
    </div>
  );
}
export default memo(NodeCard);
