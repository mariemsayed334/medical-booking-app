import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useAppointmentsStore from '../store/useAppointmentsStore';
import AppointmentCard from '../components/AppointmentCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';
import ConfirmDialog from '../components/ConfirmDialog';
import { useToast } from '../components/useToast';

export default function Appointments() {
  const { appointments, status, error, loadAppointments, removeAppointment } =
    useAppointmentsStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [toCancel, setToCancel] = useState(null);
  const [cancelError, setCancelError] = useState(null);

  useEffect(() => {
    loadAppointments();
  }, [loadAppointments]);

  const handleReschedule = (appointment) => {
    navigate(`/book/${appointment.doctorId}`, { state: { appointment } });
  };

  const confirmCancel = async () => {
    try {
      await removeAppointment(toCancel.id);
      setToCancel(null);
      showToast('Appointment cancelled.');
    } catch (err) {
      setCancelError(err?.message || 'Could not cancel this appointment.');
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-ink">My appointments</h1>
        <p className="text-ink-soft">
          View, reschedule, or cancel your upcoming visits.
        </p>
      </div>

      {cancelError && (
        <p className="mt-4 rounded-xl bg-brick-100 px-4 py-2 text-sm text-brick">
          {cancelError}
        </p>
      )}

      <div className="mt-8 space-y-4">
        {status === 'loading' && <LoadingState label="Loading your appointments..." />}

        {status === 'error' && (
          <ErrorState message={error} onRetry={loadAppointments} />
        )}

        {status === 'success' && appointments.length === 0 && (
          <EmptyState
            title="No appointments yet"
            description="Book a visit with one of our doctors to see it here."
            action={
              <Link
                to="/doctors"
                className="mt-2 rounded-full bg-pine px-5 py-2 text-sm font-semibold text-white transition hover:bg-pine-600"
              >
                Find a doctor
              </Link>
            }
          />
        )}

        {status === 'success' &&
          appointments.map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onReschedule={handleReschedule}
              onCancel={setToCancel}
            />
          ))}
      </div>

      <ConfirmDialog
        open={Boolean(toCancel)}
        title="Cancel this appointment?"
        description={
          toCancel
            ? `Your visit with ${toCancel.doctorName} on ${toCancel.date} will be cancelled.`
            : ''
        }
        confirmLabel="Cancel appointment"
        onConfirm={confirmCancel}
        onCancel={() => setToCancel(null)}
      />
    </div>
  );
}
