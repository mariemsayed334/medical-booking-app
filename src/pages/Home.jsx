import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import useDoctorsStore from '../store/useDoctorsStore';
import { useToast } from '../components/useToast';

const features = [
  {
    title: 'Patient First',
    text: 'Your health and convenience come before anything else.',
    icon: (
      <path d="M20 21a8 8 0 10-16 0" />
    ),
    icon2: <circle cx="12" cy="8" r="5" />,
  },
  {
    title: 'Verified Doctors',
    text: 'Every doctor is licensed and reviewed before joining.',
    icon: <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />,
  },
  {
    title: 'Easy Scheduling',
    text: 'Book, reschedule, or cancel in just a few taps.',
    icon: (
      <>
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
      </>
    ),
  },
  {
    title: 'Secure & Private',
    text: 'Your medical details stay protected, always.',
    icon: (
      <>
        <rect x="4" y="11" width="16" height="9" rx="2" />
        <path d="M8 11V7a4 4 0 018 0v4" />
      </>
    ),
  },
];

const services = [
  {
    name: 'Cardiology',
    desc: 'Comprehensive heart care for a healthier tomorrow.',
    icon: (
      <>
        <path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z" />
        <path d="M3 12h4l2-4 3 8 2-5h5" />
      </>
    ),
  },
  {
    name: 'Dermatology',
    desc: 'Skin health and cosmetic care with modern techniques.',
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9 10h.01M15 10h.01M8 15c1.5 1 6.5 1 8 0" />
      </>
    ),
  },
  {
    name: 'Pediatrics',
    desc: 'Compassionate care for your little ones.',
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a6 6 0 0112 0v2" />
        <path d="M9 8a3 3 0 006 0" />
      </>
    ),
  },
  {
    name: 'Orthopedics',
    desc: 'Advanced treatment for bones, joints and mobility.',
    icon: (
      <>
        <path d="M6 6a3 3 0 116 0c0 2-2 2-2 5s2 3 2 5a3 3 0 11-6 0c0-2 2-2 2-5s-2-3-2-5z" />
        <path d="M12 11l6-6a3 3 0 114 4l-6 6" />
      </>
    ),
  },
  {
    name: 'Neurology',
    desc: 'Expert care for brain, spine and nervous disorders.',
    icon: (
      <path d="M9 4a3 3 0 00-3 3v1a3 3 0 000 6v1a3 3 0 003 3M15 4a3 3 0 013 3v1a3 3 0 010 6v1a3 3 0 01-3 3M9 4v16M15 4v16" />
    ),
  },
  {
    name: 'Dentistry',
    desc: 'General and cosmetic dental care for the whole family.',
    icon: (
      <path d="M12 3c2.5 0 4 1.5 4 4 0 2-.5 3-1 5-.5 2-1 6-2 6s-1-4-1-6-.5-2-1-2-.5 0-1 2-1 6-2 6-1.5-4-2-6c-.5-2-1-3-1-5 0-2.5 1.5-4 4-4z" />
    ),
  },
];

export default function Home() {
  const navigate = useNavigate();
  const setSpecialty = useDoctorsStore((s) => s.setSpecialty);
  const { showToast } = useToast();
  const [showAboutDetails, setShowAboutDetails] = useState(false);
  const quickBookingNameRef = useRef(null);
  const quickBookingPhoneRef = useRef(null);

  const goToSpecialty = (name) => {
    setSpecialty(name);
    navigate('/doctors');
  };

  return (
    <div>
      {/* Hero */}
      <div className="bg-mist">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:py-20 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-extrabold leading-tight text-pine sm:text-5xl">
              Find Your Doctor.
              <br />
              Book with Confidence.
              <br />
              <span className="text-teal">Feel Better Sooner.</span>
            </h1>
            <p className="mt-5 max-w-md text-ink-soft">
              We're committed to making healthcare simple — browse verified
              doctors, compare specialties, and reserve your visit in a few
              taps.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/doctors"
                className="flex items-center gap-2 rounded-full bg-pine px-6 py-3 font-semibold text-white transition hover:bg-pine-600"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                Book Appointment
              </Link>
              <Link
                to="/doctors"
                className="flex items-center gap-2 rounded-full border border-teal-100 bg-white px-6 py-3 font-semibold text-pine transition hover:bg-teal-100"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M10 8l6 4-6 4V8z" />
                </svg>
                See How It Works
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute -top-8 -right-8 h-40 w-40 rounded-full bg-teal-100" />
            <div
              className="relative flex h-72 items-center justify-center overflow-hidden rounded-3xl shadow-xl sm:h-96"
              style={{ background: 'linear-gradient(135deg,#123B75 0%,#2E6FE8 100%)' }}
            >
              <img
                src="/images/all.jpg"
                alt="MediBook medical team"
                className="h-full w-full object-contain"
              />
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)',
                  backgroundSize: '22px 22px',
                }}
              />
            </div>
            <div className="absolute -bottom-6 left-6 flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-lg">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-teal-100 text-teal font-bold">
                ★
              </span>
              <div>
                <p className="text-sm font-bold text-ink">4.8 / 5</p>
                <p className="text-xs text-ink-soft">from 2,000+ patients</p>
              </div>
            </div>
          </div>
        </div>

        {/* Floating feature strip */}
        <div className="mx-auto max-w-6xl px-5 pb-14">
          <div className="grid gap-6 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:grid-cols-2 sm:p-8 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f.title} className="flex items-start gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-teal">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    {f.icon}
                    {f.icon2}
                  </svg>
                </span>
                <div>
                  <h3 className="font-semibold text-ink">{f.title}</h3>
                  <p className="mt-1 text-sm text-ink-soft">{f.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="mx-auto max-w-6xl px-5 py-16 text-center">
        <p className="text-xs font-bold tracking-wide text-teal">OUR SERVICES</p>
        <h2 className="mt-2 text-3xl font-extrabold text-pine">
          Comprehensive care for you and your family
        </h2>

        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div
              key={s.name}
              className="rounded-2xl border border-teal-100 bg-white p-6 transition hover:-translate-y-0.5 hover:shadow-md"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-100 text-teal">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  {s.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-semibold text-ink">{s.name}</h3>
              <p className="mt-1 text-sm text-ink-soft">{s.desc}</p>
              <button
                onClick={() => goToSpecialty(s.name)}
                className="mt-3 text-sm font-semibold text-pine hover:underline"
              >
                Learn More →
              </button>
            </div>
          ))}
        </div>

        <Link
          to="/doctors"
          className="mt-10 inline-block rounded-full bg-pine px-8 py-3 font-semibold text-white transition hover:bg-pine-600"
        >
          View All Doctors
        </Link>
      </div>

      {/* Stats band */}
      <div className="bg-pine">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-5 py-14 text-center text-white sm:grid-cols-4">
          <div>
            <p className="text-3xl font-extrabold">2,000+</p>
            <p className="mt-1 text-sm text-teal-100/80">Appointments Booked</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">50+</p>
            <p className="mt-1 text-sm text-teal-100/80">Verified Doctors</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">6</p>
            <p className="mt-1 text-sm text-teal-100/80">Specialties Covered</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">4.8★</p>
            <p className="mt-1 text-sm text-teal-100/80">Average Rating</p>
          </div>
        </div>
      </div>

      {/* About + booking */}
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 lg:grid-cols-2 lg:items-stretch">
        <div className="flex flex-col justify-between gap-8">
          <div>
            <p className="text-xs font-bold tracking-wide text-teal">ABOUT US</p>
            <h3 className="mt-2 text-2xl font-bold text-pine sm:text-3xl">
              Trusted care, close to home
            </h3>
            <p className="mt-4 max-w-md text-sm text-ink-soft">
              MediBook connects you with a growing network of trusted doctors
              across Cairo, Giza, and Fayoum. We handle the scheduling so you
              can focus on getting the care you need, when you need it.
            </p>
            {showAboutDetails && (
              <p className="mt-3 max-w-md text-sm text-ink-soft">
                Browse verified specialists, compare experience and ratings,
                then book or reschedule a visit in a few simple steps. Our
                support team is available when your plans change.
              </p>
            )}
            <button
              type="button"
              onClick={() => setShowAboutDetails((visible) => !visible)}
              className="mt-5 flex items-center gap-2 rounded-full border border-pine px-5 py-2.5 text-sm font-semibold text-pine transition hover:bg-teal-100"
            >
              {showAboutDetails ? 'Show Less' : 'Read More'}
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={showAboutDetails ? 'M5 12h14' : 'M5 12h14M13 6l6 6-6 6'} />
              </svg>
            </button>
          </div>

          <div
            className="relative flex flex-1 items-center gap-5 overflow-hidden rounded-3xl p-8 text-white"
            style={{
              background: 'linear-gradient(135deg,#0C2A54 0%,#15458C 100%)',
              minHeight: '180px',
            }}
          >
            <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-white/5" />
            <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M3 21h18M6 21V7l6-4 6 4v14M9 9h1M14 9h1M9 13h1M14 13h1M9 17h1M14 17h1" />
              </svg>
            </span>
            <div className="relative">
              <p className="font-semibold">MediBook Clinic Network</p>
              <p className="mt-1 text-sm text-teal-100/80">
                12 partner clinics across Cairo, Giza &amp; Fayoum
              </p>
            </div>
          </div>
        </div>

        <div
          className="rounded-3xl p-7 text-white shadow-lg sm:p-9"
          style={{ background: 'linear-gradient(160deg,#123B75 0%,#0C2A54 100%)' }}
        >
          <h3 className="text-xl font-bold">Book an Appointment</h3>
          <p className="mt-1 text-sm text-teal-100/80">
            Fill in your details and we'll confirm shortly.
          </p>

          <form
            className="mt-6 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              const name = quickBookingNameRef.current.value.trim();
              const phone = quickBookingPhoneRef.current.value.trim();
              if (!name || !phone) {
                showToast('Please enter your name and phone number first.', 'error');
                return;
              }
              showToast('Choose a doctor to complete your booking.');
              navigate('/doctors');
            }}
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="relative block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                  <path d="M20 21a8 8 0 10-16 0" />
                  <circle cx="12" cy="8" r="5" />
                </svg>
                <input
                  ref={quickBookingNameRef}
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none ring-1 ring-white/10 placeholder:text-ink-soft/70 focus:ring-2 focus:ring-teal"
                />
              </label>
              <label className="relative block">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                  <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.7a2 2 0 01-.4 2.1L8.1 9.7a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.4c.9.3 1.8.5 2.7.6a2 2 0 011.9 2.2z" />
                </svg>
                <input
                  ref={quickBookingPhoneRef}
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none ring-1 ring-white/10 placeholder:text-ink-soft/70 focus:ring-2 focus:ring-teal"
                />
              </label>
            </div>

            <label className="relative block">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                <path d="M12 22s8-4.5 8-11V5l-8-3-8 3v6c0 6.5 8 11 8 11z" />
              </svg>
              <select className="w-full appearance-none rounded-xl border-0 bg-white py-3 pl-11 pr-10 text-sm text-ink outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-teal">
                <option>Select Specialty</option>
                {services.map((s) => (
                  <option key={s.name}>{s.name}</option>
                ))}
              </select>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-ink-soft">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </label>

            <label className="relative block">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-soft">
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
              <input
                type="date"
                className="w-full rounded-xl border-0 bg-white py-3 pl-11 pr-4 text-sm text-ink outline-none ring-1 ring-white/10 focus:ring-2 focus:ring-teal"
              />
            </label>

            <button
              type="submit"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3.5 text-sm font-semibold text-pine transition hover:bg-teal-100"
            >
              Book Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        </div>
      </div>

      {/* Bottom icon row */}
      <div className="border-t border-teal-100 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 px-5 py-10 text-center sm:grid-cols-4">
          <div className="flex flex-col items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 3" />
            </svg>
            <p className="text-sm font-semibold text-ink">24/7 Access</p>
            <p className="text-xs text-ink-soft">Book anytime, day or night</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18M9 16l2 2 4-4" />
            </svg>
            <p className="text-sm font-semibold text-ink">Quick Confirmation</p>
            <p className="text-xs text-ink-soft">Instant booking, no waiting</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
              <path d="M3 12a9 9 0 0118 0M3 12v3a2 2 0 002 2h1v-6H4a1 1 0 00-1 1zM21 12v3a2 2 0 01-2 2h-1v-6h2a1 1 0 011 1z" />
            </svg>
            <p className="text-sm font-semibold text-ink">Dedicated Support</p>
            <p className="text-xs text-ink-soft">We're here if plans change</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-teal">
              <rect x="4" y="11" width="16" height="9" rx="2" />
              <path d="M8 11V7a4 4 0 018 0v4" />
            </svg>
            <p className="text-sm font-semibold text-ink">Secure & Private</p>
            <p className="text-xs text-ink-soft">Your data stays protected</p>
          </div>
        </div>
      </div>
    </div>
  );
}
