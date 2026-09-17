export default function EmptyState({
  title = 'Nothing here yet',
  description,
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed border-teal-100 bg-white/60 py-16 px-6 text-center">
      <p className="font-semibold text-ink">{title}</p>
      {description && (
        <p className="max-w-sm text-sm text-ink-soft">{description}</p>
      )}
      {action}
    </div>
  );
}
