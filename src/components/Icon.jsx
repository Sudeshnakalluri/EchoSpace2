const paths = {
  orbit: <><circle cx="12" cy="12" r="3"/><ellipse cx="12" cy="12" rx="9" ry="4"/><path d="M12 3v18"/></>,
  spark: <><path d="m12 3-1.4 5.6L5 10l5.6 1.4L12 17l1.4-5.6L19 10l-5.6-1.4L12 3Z"/><path d="m19 16-.7 2.3L16 19l2.3.7L19 22l.7-2.3L22 19l-2.3-.7L19 16Z"/></>,
  plus: <><path d="M12 5v14M5 12h14"/></>,
  arrow: <><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
  search: <><circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/></>,
  close: <><path d="m7 7 10 10M17 7 7 17"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 4.8-4.8 2 2-4.8 4.8-2Z"/></>,
  branch: <><path d="M6 5v8a4 4 0 0 0 4 4h8"/><path d="m15 14 3 3-3 3"/><circle cx="6" cy="5" r="2"/></>,
  users: <><path d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20"/><circle cx="9.5" cy="7" r="3.5"/><path d="M16 4.5a3.5 3.5 0 0 1 0 6.8M21 20v-1.5a4 4 0 0 0-2.5-3.7"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/></>,
  chevron: <path d="m9 18 6-6-6-6"/>,
  check: <path d="m5 12 4 4L19 6"/>,
  trail: <><path d="M4 19c3-6 5-7 8-5s4 1 8-7"/><circle cx="4" cy="19" r="1.5"/><circle cx="20" cy="7" r="1.5"/></>,
  pulse: <path d="M2 12h4l2-6 4 12 2-6h8"/>,
};

export default function Icon({ name, size = 18, strokeWidth = 1.8, className = '' }) {
  const content = paths[name] ?? paths.spark;
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {content}
    </svg>
  );
}
