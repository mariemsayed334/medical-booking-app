import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { fetchDoctorById } from '../api/doctors';
import useAppointmentsStore from '../store/useAppointmentsStore';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import { useToast } from '../components/useToast';

// Today's date in YYYY-MM-DD, used to block past-date bookings
const todayStr = new Date().toISOString().split('T')[0];

const inputClass =
  'w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none ring-1 ring-white/10 placeholder:text-ink-soft/70 focus:ring-2 focus:ring-teal';

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const editingAppointment = location.state?.appointment || null;

  const { addAppointment, editAppointment } = useAppointmentsStore();
  const { showToast } = useToast();

  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);
  const [submitError, setSubmitError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      patientName: editingAppointment?.patientName || '',
      phone: editingAppointment?.phone || '',
      date: editingAppointment?.date || '',
      time: editingAppointment?.time || '',
      notes: editingAppointment?.notes || '',
    },
  });

  const resolvedDoctorId = doctorId || editingAppointment?.doctorId;

  const load = async () => {
    if (!resolvedDoctorId) {
      setStatus('error');
      setError('No doctor selected.');
      return;
    }
    setStatus('loading');
    try {
      const data = await fetchDoctorById(resolvedDoctorId);
      setDoctor(data);
      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Failed to load doctor details.');
      setStatus('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resolvedDoctorId]);

  const onSubmit = async (values) => {
    setSubmitError(null);
    try {
      const payload = {
        doctorId: doctor.id,
        doctorName: doctor.name,
        specialty: doctor.specialty,
        status: 'upcoming',
        ...values,
      };

      if (editingAppointment) {
        await editAppointment(editingAppointment.id, payload);
        showToast('Appointment updated successfully.');
      } else {
        await addAppointment(payload);
        showToast('Appointment booked successfully.');
      }
      navigate('/appointments');
    } catch (err) {
      setSubmitError(err?.message || 'Could not save this appointment.');
    }
  };

  if (status === 'loading') return <LoadingState label="Loading booking form..." />;
  if (status === 'error') return <ErrorState message={error} onRetry={load} />;
  if (!doctor) return null;

  return (
    <div className="mx-auto max-w-5xl px-5 py-10">
      <Link
        to={`/doctors/${doctor.id}`}
        className="flex items-center gap-1.5 text-sm font-medium text-pine hover:underline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to {doctor.name}
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        {/* Doctor summary card */}
        <div className="rounded-3xl border border-teal-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-mist p-1">
              <img
                src={doctor.photo}
                alt={doctor.name}
                className="h-full w-full object-contain"
              />
            </div>
            <div>
              <h2 className="font-bold text-ink">{doctor.name}</h2>
              <p className="text-sm text-teal">{doctor.specialty}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3 border-t border-teal-100 pt-5 text-sm text-ink-soft">
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
                <path d="M12 17.3l-6.2 3.7 1.6-7-5.4-4.7 7.1-.6L12 2l2.9 6.7 7.1.6-5.4 4.7 1.6 7z" />
              </svg>
              {doctor.rating} rating · {doctor.yearsExperience}+ years experience
            </div>
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
                <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1116 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              {doctor.location}
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-teal-100 p-4 text-sm text-pine">
            Please arrive 10 minutes early and bring any previous test results.
          </div>
        </div>

        {/* Booking form */}
        <div
          className="rounded-3xl p-7 text-white shadow-lg sm:p-9"
          style={{ background: 'linear-gradient(160deg,#123B75 0%,#0C2A54 100%)' }}
        >
          <h1 className="text-xl font-bold">
            {editingAppointment ? 'Reschedule appointment' : 'Book an appointment'}
          </h1>
          <p className="mt-1 text-sm text-teal-100/80">
            Fill in your details to confirm the visit.
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="relative block">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <path d="M20 21a8 8 0 10-16 0" />
                    <circle cx="12" cy="8" r="5" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Full name"
                    className={inputClass}
                    {...register('patientName', {
                      required: 'Please enter your full name.',
                      minLength: { value: 3, message: 'Name is too short.' },
                    })}
                  />
                </label>
                {errors.patientName && (
                  <p className="mt-1 text-xs text-amber-100">{errors.patientName.message}</p>
                )}
              </div>

              <div>
                <label className="relative block">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8.1 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.9 2.2z" />
                  </svg>
                  <input
                    type="tel"
                    placeholder="Phone number"
                    className={inputClass}
                    {...register('phone', {
                      required: 'Please enter a phone number.',
                      pattern: {
                        value: /^01[0-2,5]{1}[0-9]{8}$/,
                        message: 'Enter a valid Egyptian phone number.',
                      },
                    })}
                  />
                </label>
                {errors.phone && (
                  <p className="mt-1 text-xs text-amber-100">{errors.phone.message}</p>
                )}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="relative block">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18" />
                  </svg>
                  <input
                    type="date"
                    min={todayStr}
                    className={inputClass}
                    {...register('date', { required: 'Please choose a date.' })}
                  />
                </label>
                {errors.date && <p className="mt-1 text-xs text-amber-100">{errors.date.message}</p>}
              </div>

              <div>
                <label className="relative block">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 7v5l3 3" />
                  </svg>
                  <input
                    type="time"
                    className={inputClass}
                    {...register('time', { required: 'Please choose a time.' })}
                  />
                </label>
                {errors.time && <p className="mt-1 text-xs text-amber-100">{errors.time.message}</p>}
              </div>
            </div>

            <div>
              <label className="relative block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-3.5 text-ink-soft">
                  <path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z" />
                </svg>
                <textarea
                  rows={3}
                  placeholder="Notes (optional) — anything the doctor should know beforehand"
                  className={`resize-none ${inputClass}`}
                  {...register('notes', {
                    maxLength: { value: 300, message: 'Keep notes under 300 characters.' },
                  })}
                />
              </label>
              {errors.notes && <p className="mt-1 text-xs text-amber-100">{errors.notes.message}</p>}
            </div>

            {submitError && (
              <p className="rounded-xl bg-white/10 px-4 py-2 text-sm text-white">{submitError}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-pine transition hover:bg-teal-100 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting
                ? 'Saving...'
                : editingAppointment
                ? 'Save changes'
                : 'Confirm booking'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
