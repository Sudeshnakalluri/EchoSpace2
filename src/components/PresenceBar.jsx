import Avatar from './Avatar.jsx';

export default function PresenceBar({ people = [] }) {
  if (!people.length) return <div className="presence-bar"><span className="live-dot" /> You're the first one here</div>;
  return (
    <div className="presence-bar" aria-live="polite" aria-label={`${people.length} other people are drifting here`}>
      <span className="live-dot" />
      <div className="presence-avatars">{people.slice(0, 3).map((person) => <Avatar key={person.id} user={person} size={25} />)}</div>
      <span>{people.length === 1 ? `${people[0].name} is drifting here` : `${people.length} people are drifting here`}</span>
    </div>
  );
}
