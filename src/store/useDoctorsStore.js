import { create } from 'zustand';
import { fetchDoctors } from '../api/doctors';

const useDoctorsStore = create((set, get) => ({
  doctors: [],
  status: 'idle', // idle | loading | success | error
  error: null,
  search: '',
  specialty: '',

  setSearch: (search) => set({ search }),
  setSpecialty: (specialty) => set({ specialty }),

  loadDoctors: async () => {
    set({ status: 'loading', error: null });
    try {
      const { search, specialty } = get();
      const data = await fetchDoctors({ search, specialty });
      set({ doctors: data, status: 'success' });
    } catch (err) {
      set({
        status: 'error',
        error: err?.message || 'Failed to load doctors.',
      });
    }
  },
}));

export default useDoctorsStore;
