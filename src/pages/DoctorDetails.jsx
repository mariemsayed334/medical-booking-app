import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchDoctorById } from '../api/doctors';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';

export default function DoctorDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = async () => {
    setStatus('loading');
    setError(null);
    try {
      const data = await fetchDoctorById(id);
      setDoctor(data);
      setStatus('success');
    } catch (err) {
      setError(err?.message || 'Failed to load this doctor.');
      setStatus('error');
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  if (status === 'loading') return <LoadingState label="Loading profile..." />;
  if (status === 'error') return <ErrorState message={error} onRetry={load} />;
  if (!doctor) return null;

  return (
    <div className="mx-auto max-w-4xl px-5 py-10">
      <Link
        to="/doctors"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-pine hover:underline"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        <span>Back to doctors</span>
      </Link>

      <div className="mt-6 flex flex-col gap-6 rounded-2xl border border-teal-100 bg-white p-6 sm:flex-row">
        <img
          src={doctor.photo}
          alt={doctor.name}
          loading="lazy"
            className="h-36 w-36 shrink-0 rounded-lg bg-mist object-contain p-1"
        />
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl font-bold text-ink">{doctor.name}</h1>
          <p className="mt-1 font-medium text-teal">{doctor.specialty}</p>

          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink-soft">
            <span>★ {doctor.rating} rating</span>
            <span>{doctor.yearsExperience}+ years experience</span>
            <span>{doctor.location}</span>
          </div>

          <p className="mt-4 text-ink-soft">{doctor.bio}</p>

          <button
            onClick={() => navigate(`/book/${doctor.id}`)}
            className="mt-6 rounded-full bg-amber px-6 py-3 font-semibold text-pine-700 transition hover:bg-amber-600"
          >
            Book appointment
          </button>
        </div>
      </div>
    </div>
  );
}
