export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-lg">
        <h3 className="text-lg font-semibold text-ink">{title}</h3>
        {description && (
          <p className="mt-2 text-sm text-ink-soft">{description}</p>
        )}
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="rounded-full px-4 py-2 text-sm font-medium text-ink-soft hover:bg-mist"
          >
            Go back
          </button>
          <button
            onClick={onConfirm}
            className="rounded-full bg-brick px-4 py-2 text-sm font-semibold text-white hover:bg-brick/90"
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
