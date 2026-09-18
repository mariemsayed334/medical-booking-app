# MediBook — Medical Booking App

A React app for browsing doctors and booking, rescheduling, or cancelling
appointments. Built for the ITI Fayoum React Summer T26/27 (G1) React
project.

## Tech stack

- **React 19** + **Vite**
- **React Router** for navigation between pages
- **Zustand** for state management (doctors list, appointments)
- **Axios** for API requests
- **React Hook Form** for the booking form and validation
- **Tailwind CSS v4** for styling
- **json-server** as a mock REST API (serves `db.json`)

## Project structure

```
src/
  api/            axios instance + doctors/appointments API calls
  components/     reusable UI pieces (cards, states, navbar, dialogs)
  pages/          route-level pages (Home, Doctors, DoctorDetails,
                  BookAppointment, Appointments, Profile, NotFound)
  store/          zustand stores (useDoctorsStore, useAppointmentsStore)
db.json           mock database for json-server (doctors + appointments)
.env.example      example environment variables (no secrets)
```

## Delivery links

- **Deployed app:** `ADD_DEPLOYED_APP_URL`
- **GitHub repository:** `ADD_GITHUB_REPOSITORY_URL`
- **Commit history:** [View commits](ADD_GITHUB_COMMITS_URL)

## Screenshots

Add the final screenshots to `docs/screenshots/` before submission:

![Home page](docs/screenshots/home.png)
![Doctors page](docs/screenshots/doctors.png)
![Booking page](docs/screenshots/booking.png)
![Profile and settings](docs/screenshots/profile.png)

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the example environment file:

   ```bash
   cp .env.example .env
   ```

3. Run the app. This starts both the Vite dev server and the json-server
   API together:

   ```bash
   npm run dev:all
   ```

   - Frontend: http://localhost:5173
   - API: http://localhost:3001

   Alternatively, run them separately in two terminals:

   ```bash
   npm run server   # json-server on port 3001
   npm run dev      # Vite dev server on port 5173
   ```

## Vercel deployment

Vercel serves the React frontend, but it cannot reach the local
`http://localhost:3001` API from a phone or another computer. Deploy the
json-server API (or replace it with Supabase/Firebase/another hosted REST API)
and add this Vercel environment variable before redeploying:

```text
VITE_API_BASE_URL=https://YOUR-HOSTED-API-URL
```

The included `vercel.json` rewrites direct client-side routes such as
`/doctors/8` to the React entry point. The frontend and API must both be
running for Doctors and Appointments to load and for appointment CRUD to work.

## Features

- **Doctors list** — browse all doctors, search by name (debounced), and
  filter by specialty.
- **Doctor details** — view a doctor's profile, rating, experience, and bio.
- **Book an appointment** — form built with React Hook Form, with
  validation on name, phone, date, and time.
- **My appointments** — view all booked appointments, reschedule (reuses
  the booking form pre-filled), or cancel (with a confirmation dialog).
- **Loading / error / empty states** on every page that fetches data.
- **404 page** for unmatched routes.
- **Profile & settings** page with an uncontrolled form using `useRef`.
- **Toast notifications** for booking, cancellation, profile saves, and quick-booking feedback.
- **Responsive** layout down to mobile.

## API (json-server)

For local development, `db.json` is served by json-server and exposes two resources:

- `GET /doctors` — supports `name:contains=` (search) and `specialty=`
  (filter) query params
- `GET|POST|PATCH|DELETE /appointments` — full CRUD, supports `_sort=date`

For production deployment, replace the local API with a hosted REST API or a
managed backend such as Supabase, Firebase, or Retool. Set its base URL with
`VITE_API_BASE_URL` before building the frontend. The app currently uses
`PATCH` for partial appointment updates, which is supported by json-server;
change it to `PUT` in `src/api/appointments.js` if the hosted API requires
full-resource replacement.

### Shared appointment storage with Supabase

Run `supabase-schema.sql` in the Supabase SQL editor, then add these Vercel
environment variables for the API function:

```text
SUPABASE_URL=https://YOUR-PROJECT.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVER_ONLY_SERVICE_ROLE_KEY
```

Keep `SUPABASE_SERVICE_ROLE_KEY` server-only. When both variables exist, the
API stores all appointments in Supabase, so bookings from different users are
visible from `GET /api/appointments`. Without them, local development falls
back to `db.json`.

## Available scripts

| Script            | Description                                  |
| ------------------ | --------------------------------------------- |
| `npm run dev`       | Start the Vite dev server only                |
| `npm run server`    | Start json-server only (port 3001)            |
| `npm run dev:all`   | Start both dev server and json-server together |
| `npm run build`     | Build for production                          |
| `npm run preview`   | Preview the production build locally          |

## Notes

- `.env` is git-ignored; use `.env.example` as a template — it contains no
  secrets, just the local API base URL.
- Bonus features (auth, dark mode, favorites, pagination, etc.) are not
  included in this base version and can be layered on top of the existing
  structure.
