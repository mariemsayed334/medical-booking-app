import { create } from 'zustand';
import {
  fetchAppointments,
  createAppointment,
  updateAppointment,
  deleteAppointment,
} from '../api/appointments';

const useAppointmentsStore = create((set, get) => ({
  appointments: [],
  status: 'idle', // idle | loading | success | error
  error: null,

  loadAppointments: async () => {
    set({ status: 'loading', error: null });
    try {
      const data = await fetchAppointments();
      set({ appointments: data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err?.message || 'Failed to load appointments.',
      });
    }
  },

  addAppointment: async (payload) => {
    const created = await createAppointment(payload);
    set({ appointments: [...get().appointments, created] });
    return created;
  },

  editAppointment: async (id, payload) => {
    const updated = await updateAppointment(id, payload);
    set({
      appointments: get().appointments.map((a) => (a.id === id ? updated : a)),
    });
    return updated;
  },

  removeAppointment: async (id) => {
    await deleteAppointment(id);
    set({
      appointments: get().appointments.filter((a) => a.id !== id),
    });
  },
}));

export default useAppointmentsStore;
