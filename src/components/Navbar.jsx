import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/doctors', label: 'Doctors' },
  { to: '/appointments', label: 'My Appointments' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-teal-100 bg-white">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
          <NavLink to="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pine text-white font-bold">
              +
            </span>
            <span className="text-lg font-bold text-pine">MediBook</span>
          </NavLink>

          <div className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? 'bg-pine text-white'
                      : 'text-ink-soft hover:bg-teal-100 hover:text-pine'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <button
            onClick={() => navigate('/doctors')}
            className="rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pine-600"
          >
            Book Appointment
          </button>
        </nav>
      </header>
    </>
  );
}
