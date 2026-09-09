import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

export default function ResonanceMeter({ entry }) {
  const { user, score, sharedConstellations, sharedThreads } = entry;
  return (
    <li className={`resonance-card ${score === 0 ? 'quiet' : ''}`}>
      <Avatar user={user} size={44} />
      <div className="resonance-person">
        <div className="resonance-name"><strong>{user.name}</strong>{score > 0 && <span className="resonance-live"><Icon name="spark" size={11} /> connected</span>}</div>
        <div className="resonance-bar"><span style={{ width: `${score}%` }} /></div>
        <p>{sharedConstellations} shared space{sharedConstellations === 1 ? '' : 's'} · {sharedThreads} direct thread{sharedThreads === 1 ? '' : 's'}</p>
      </div>
      <div className="resonance-score"><strong>{score}</strong><span>res.</span></div>
    </li>
  );
}
