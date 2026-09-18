const statusStyles = {
  upcoming: 'bg-teal-100 text-pine',
  completed: 'bg-mist text-ink-soft',
  cancelled: 'bg-brick-100 text-brick',
};

export default function AppointmentCard({ appointment, onReschedule, onCancel }) {
  const status = appointment.status || 'upcoming';

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-teal-100 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-ink">{appointment.doctorName}</h3>
          <span
            className={`rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${statusStyles[status]}`}
          >
            {status}
          </span>
        </div>
        <p className="text-sm text-teal">{appointment.specialty}</p>
        <p className="mt-1 text-sm text-ink-soft">
          {appointment.date} · {appointment.time}
        </p>
        {appointment.notes && (
          <p className="mt-1 text-sm text-ink-soft">Note: {appointment.notes}</p>
        )}
      </div>

      {status !== 'cancelled' && (
        <div className="flex w-full shrink-0 flex-wrap gap-2 sm:w-auto">
          <button
            onClick={() => onReschedule(appointment)}
            className="min-w-0 flex-1 rounded-full border border-pine px-3 py-2 text-sm font-medium text-pine transition hover:bg-teal-100 sm:flex-none sm:px-4"
          >
            Reschedule
          </button>
          <button
            onClick={() => onCancel(appointment)}
            className="min-w-0 flex-1 rounded-full border border-brick px-3 py-2 text-sm font-medium text-brick transition hover:bg-brick-100 sm:flex-none sm:px-4"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
