import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center gap-4 px-5 py-24 text-center">
      <span className="text-6xl font-extrabold text-teal-100">404</span>
      <h1 className="text-2xl font-bold text-ink">Page not found</h1>
      <p className="text-ink-soft">
        The page you're looking for doesn't exist or may have moved.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-pine px-6 py-3 font-semibold text-white transition hover:bg-pine-600"
      >
        Back to home
      </Link>
    </div>
  );
}
