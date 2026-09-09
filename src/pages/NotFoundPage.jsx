import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-md flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">
        ✦
      </p>
      <h1 className="mt-4 font-display text-2xl text-bright">This part of the sky is empty</h1>
      <p className="mt-2 text-sm text-fog">Nothing has grown here yet.</p>
      <Link to="/" className="focus-ring mt-6 rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-[#06110e]">
        Back to Orbit
      </Link>
    </div>
  );
}
