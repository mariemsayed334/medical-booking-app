import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/doctors', label: 'Doctors' },
  { to: '/appointments', label: 'My Appointments' },
  { to: '/profile', label: 'Profile' },
];

export default function Navbar({ theme, toggleTheme }) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-teal-100 bg-white shadow-sm">
        <nav className="mx-auto max-w-6xl px-5 py-4">
          <div className="flex items-center justify-between gap-3">
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

            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Toggle dark mode"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-teal-100 text-lg text-pine shadow-sm transition hover:bg-teal-200"
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>

              <button
                onClick={() => navigate('/doctors')}
                className="hidden rounded-full bg-pine px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-pine-600 sm:inline-flex"
              >
                Book Appointment
              </button>

              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setIsMenuOpen((prev) => !prev)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-teal-200 bg-teal-100 text-xl text-pine shadow-sm transition hover:bg-teal-200 md:hidden"
              >
                {isMenuOpen ? '×' : '☰'}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="mt-3 flex flex-col gap-2 rounded-2xl border border-teal-100 bg-white p-3 shadow-sm md:hidden">
              {links.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.end}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? 'bg-pine text-white shadow-sm'
                        : 'bg-teal-100 text-ink-soft hover:bg-teal-200 hover:text-pine'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}

              <button
                onClick={() => {
                  setIsMenuOpen(false);
                  navigate('/doctors');
                }}
                className="mt-1 rounded-xl bg-pine px-3 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pine-600"
              >
                Book Appointment
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
}
