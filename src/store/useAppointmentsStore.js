import { create } from 'zustand';
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../api/appointments';

const LOCAL_APPOINTMENTS_KEY = 'mediBook-local-appointments';

const readLocalAppointments = () => {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_APPOINTMENTS_KEY) || '[]');
  } catch {
    return [];
  }
};

const saveLocalAppointments = (appointments) => {
  localStorage.setItem(LOCAL_APPOINTMENTS_KEY, JSON.stringify(appointments));
};

const useAppointmentsStore = create((set, get) => ({
  appointments: [],
  status: 'idle', // idle | loading | success | error
  error: null,

  loadAppointments: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await fetchAppointments();
      const localAppointments = readLocalAppointments();
      const appointmentsById = new Map(data.map((appointment) => [appointment.id, appointment]));

      localAppointments.forEach((appointment) => {
        appointmentsById.set(appointment.id, appointment);
      });

      set({ appointments: [...appointmentsById.values()], status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err?.message || 'Failed to load appointments.',
      });
    }
  },

  addAppointment: async (payload) => {
    const created = await createAppointment(payload);
    const localAppointments = readLocalAppointments();
    saveLocalAppointments([...localAppointments, created]);
    set({ appointments: [...get().appointments, created] });
    return created;
  },

  editAppointment: async (id, payload) => {
    const updated = await updateAppointment(id, payload);
    const localAppointments = readLocalAppointments();
    const hasLocalAppointment = localAppointments.some((appointment) => appointment.id === id);
    saveLocalAppointments(
      hasLocalAppointment
        ? localAppointments.map((appointment) => (appointment.id === id ? updated : appointment))
        : [...localAppointments, updated],
    );
    set({
      appointments: get().appointments.map((a) => (a.id === id ? updated : a)),
    });
    return updated;
  },

  removeAppointment: async (id) => {
    await deleteAppointment(id);
    saveLocalAppointments(readLocalAppointments().filter((appointment) => appointment.id !== id));
    set({
      appointments: get().appointments.filter((a) => a.id !== id),
    });
  },
}));

export default useAppointmentsStore;
