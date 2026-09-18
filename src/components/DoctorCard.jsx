import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const STORAGE_KEY = 'medibook-favorites';

export default function DoctorCard({ doctor }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    setIsFavorite(savedFavorites.includes(String(doctor.id)));
  }, [doctor.id]);

  const toggleFavorite = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const savedFavorites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    const doctorId = String(doctor.id);
    const updatedFavorites = savedFavorites.includes(doctorId)
      ? savedFavorites.filter((id) => id !== doctorId)
      : [...savedFavorites, doctorId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedFavorites));
    setIsFavorite(updatedFavorites.includes(doctorId));
  };

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-teal-100 bg-white transition hover:-translate-y-0.5 hover:border-pine hover:shadow-md">
      <Link to={`/doctors/${doctor.id}`} className="block">
        <div className="flex items-center gap-4 p-5">
          <img
            src={doctor.photo}
            alt={doctor.name}
            className="h-20 w-20 shrink-0 rounded-xl bg-mist object-contain p-1"
          />
          <div className="min-w-0">
            <h3 className="truncate font-semibold text-ink">{doctor.name}</h3>
            <p className="text-sm text-teal">{doctor.specialty}</p>
            <p className="mt-1 text-xs text-ink-soft">
              {doctor.yearsExperience}+ yrs · {doctor.location}
            </p>
          </div>
        </div>
        <div className="mt-auto flex items-center justify-between border-t border-teal-100 px-5 py-3 text-sm">
          <span className="flex items-center gap-1 font-medium text-amber-600">
            ★ {doctor.rating}
          </span>
          <span className="font-medium text-pine group-hover:underline">
            View profile
          </span>
        </div>
      </Link>

      <button
        type="button"
        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={toggleFavorite}
        className={`absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border text-lg shadow-sm transition ${
          isFavorite
            ? 'border-amber-200 bg-amber-100 text-amber-600'
            : 'border-teal-100 bg-white text-ink-soft hover:bg-teal-100 hover:text-pine'
        }`}
      >
        {isFavorite ? '♥' : '♡'}
      </button>
    </div>
  );
}
