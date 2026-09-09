export default function Avatar({ user, size = 32 }) {
  const hue = user?.hue ?? 168;
  const name = user?.name ?? '?';
  const initials = name.split(/\s+/).map((part) => part[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, '--avatar-hue': hue }}
      title={name}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
