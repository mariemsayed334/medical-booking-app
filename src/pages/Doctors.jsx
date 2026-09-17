import { useEffect, useMemo, useState } from 'react';
import useDoctorsStore from '../store/useDoctorsStore';
import DoctorCard from '../components/DoctorCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

export default function Doctors() {
  const {
    doctors,
    status,
    error,
    search,
    specialty,
    setSearch,
    setSpecialty,
    loadDoctors,
  } = useDoctorsStore();

  const [searchInput, setSearchInput] = useState(search);

  // Debounced search: waits 400ms after typing stops before querying
  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  useEffect(() => {
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, specialty]);

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))).sort(),
    [doctors]
  );

  return (
    <div className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold text-ink">Find a doctor</h1>
        <p className="text-ink-soft">
          Search by name or filter by specialty to find the right fit.
        </p>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search doctors by name..."
          className="w-full rounded-full border border-teal-100 bg-white px-5 py-3 text-sm outline-none focus:border-pine sm:max-w-sm"
        />
        <select
          value={specialty}
          onChange={(e) => setSpecialty(e.target.value)}
          className="rounded-full border border-teal-100 bg-white px-5 py-3 text-sm outline-none focus:border-pine"
        >
          <option value="">All specialties</option>
          {specialties.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-8">
        {status === 'loading' && <LoadingState label="Loading doctors..." />}

        {status === 'error' && (
          <ErrorState message={error} onRetry={loadDoctors} />
        )}

        {status === 'success' && doctors.length === 0 && (
          <EmptyState
            title="No doctors match your search"
            description="Try a different name or clear the specialty filter."
          />
        )}

        {status === 'success' && doctors.length > 0 && (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {doctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
