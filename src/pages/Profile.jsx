import { useRef, useState } from 'react';
import { useToast } from '../components/useToast';

const inputClass =
  'mt-2 w-full rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm text-ink outline-none focus:border-teal focus:ring-2 focus:ring-teal/20';

export default function Profile() {
  const nameRef = useRef(null);
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState(true);

  const handleSubmit = (event) => {
    event.preventDefault();
    showToast(`Profile saved for ${nameRef.current.value || 'your account'}.`);
  };

  return (
    <div className="mx-auto max-w-3xl px-5 py-10">
      <div>
        <p className="text-xs font-bold tracking-wide text-teal">ACCOUNT</p>
        <h1 className="mt-2 text-2xl font-bold text-ink">Profile & settings</h1>
        <p className="mt-2 text-ink-soft">Keep your contact details and booking preferences up to date.</p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 rounded-3xl border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="text-sm font-semibold text-ink">
            Full name
            <input ref={nameRef} defaultValue="MediBook Patient" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-ink">
            Phone number
            <input ref={phoneRef} defaultValue="01012345678" type="tel" className={inputClass} />
          </label>
        </div>
        <label className="mt-5 block text-sm font-semibold text-ink">
          Email address
          <input ref={emailRef} defaultValue="patient@medibook.test" type="email" className={inputClass} />
        </label>
        <label className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-mist p-4 text-sm font-semibold text-ink">
          Receive appointment reminders
          <input
            type="checkbox"
            checked={notifications}
            onChange={(event) => setNotifications(event.target.checked)}
            className="h-5 w-5 accent-pine"
          />
        </label>
        <button type="submit" className="mt-6 rounded-full bg-pine px-6 py-3 text-sm font-semibold text-white transition hover:bg-pine-600">
          Save profile
        </button>
      </form>
    </div>
  );
}