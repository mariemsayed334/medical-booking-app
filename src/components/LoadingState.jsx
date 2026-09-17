export default function LoadingState({ label = 'Loading...' }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-ink-soft">
      <div className="h-9 w-9 animate-spin rounded-full border-2 border-teal-100 border-t-pine" />
      <p className="text-sm">{label}</p>
    </div>
  );
}
