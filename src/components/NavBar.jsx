import { NavLink } from 'react-router-dom';
import { useApp } from '../context/AppContext.jsx';
import Avatar from './Avatar.jsx';
import Icon from './Icon.jsx';

const links = [
  { to: '/', label: 'Orbit', icon: 'orbit', end: true },
  { to: '/resonance', label: 'Resonance', icon: 'pulse' },
  { to: '/trail', label: 'Your Trail', icon: 'trail' },
];

export default function NavBar() {
  const { currentUser, constellations } = useApp();

  return (
    <>
      <header className="site-header">
        <div className="nav-inner">
          <NavLink to="/" className="brand focus-ring" aria-label="EchoSpace home">
            <span className="brand-mark"><Icon name="orbit" size={19} /></span>
            <span>
              <span className="brand-name">EchoSpace</span>
              <span className="brand-sub">social, rethought</span>
            </span>
          </NavLink>

          <nav aria-label="Primary" className="desktop-nav">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                <Icon name={link.icon} size={16} />
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="nav-right">
            <span className="live-pill"><span className="live-dot" /> Live sky</span>
            <div className="user-chip" aria-label={`Signed in as ${currentUser.name}`}>
              <Avatar user={currentUser} size={32} />
              <span className="user-name">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <nav className="mobile-nav" aria-label="Mobile primary">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.end}
            className={({ isActive }) => `mobile-nav-link ${isActive ? 'active' : ''}`}
          >
            <Icon name={link.icon} size={18} />
            <span>{link.label}</span>
          </NavLink>
        ))}
        <span className="mobile-nav-count" aria-label={`${constellations.length} constellations`}>
          {constellations.length}
        </span>
      </nav>
    </>
  );
}
