import { useEffect, useMemo, useState } from 'react';
import useDoctorsStore from '../store/useDoctorsStore';
import DoctorCard from '../components/DoctorCard';
import LoadingState from '../components/LoadingState';
import ErrorState from '../components/ErrorState';
import EmptyState from '../components/EmptyState';

const PAGE_SIZE = 6;

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
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => setSearch(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput, setSearch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, specialty]);

  useEffect(() => {
    loadDoctors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, specialty]);

  const specialties = useMemo(
    () => Array.from(new Set(doctors.map((d) => d.specialty))).sort(),
    [doctors]
  );

  const totalPages = Math.max(1, Math.ceil(doctors.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedDoctors = doctors.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
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
          <>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {paginatedDoctors.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
              ))}
            </div>

            <div className="mt-8 flex flex-col items-center justify-between gap-3 sm:flex-row">
              <p className="text-sm text-ink-soft">
                Page {safePage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                  disabled={safePage === 1}
                  className="rounded-full border border-teal-100 bg-white px-4 py-2 text-sm font-medium text-ink-soft disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Previous
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                  disabled={safePage === totalPages}
                  className="rounded-full bg-pine px-4 py-2 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
