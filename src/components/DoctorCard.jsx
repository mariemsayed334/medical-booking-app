import { Link } from 'react-router-dom';

export default function DoctorCard({ doctor }) {
  return (
    <Link
      to={`/doctors/${doctor.id}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-teal-100 bg-white transition hover:-translate-y-0.5 hover:border-pine hover:shadow-md"
    >
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
  );
}
