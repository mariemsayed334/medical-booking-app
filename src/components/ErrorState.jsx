export default function ErrorState({
  message = 'Something went wrong.',
  onRetry,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-brick-100 bg-brick-100/40 py-16 px-6 text-center">
      <p className="font-semibold text-brick">Couldn't load this</p>
      <p className="max-w-sm text-sm text-ink-soft">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-2 rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white transition hover:bg-pine-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}
