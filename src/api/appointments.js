import axiosClient from './axiosClient';

export const fetchAppointments = async () => {
  const { data } = await axiosClient.get('/appointments', {
    params: { _sort: 'date' },
  });
  return data;
};

export const createAppointment = async (payload) => {
  const { data } = await axiosClient.post('/appointments', payload);
  return data;
};

export const updateAppointment = async (id, payload) => {
  const { data } = await axiosClient.patch(`/appointments/${id}`, payload);
  return data;
};

export const deleteAppointment = async (id) => {
  await axiosClient.delete(`/appointments/${id}`);
  return id;
};
