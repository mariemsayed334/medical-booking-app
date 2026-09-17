import axiosClient from './axiosClient';

// Fetch all doctors, optionally filtered by search text and specialty.
// json-server's query syntax uses "field:operator=value", so name search
// uses a case-insensitive "contains" match and specialty is an exact match.
export const fetchDoctors = async ({ search = '', specialty = '' } = {}) => {
  const params = {};
  if (search) params['name:contains'] = search;
  if (specialty) params.specialty = specialty;
  const { data } = await axiosClient.get('/doctors', { params });
  return data;
};

export const fetchDoctorById = async (id) => {
  const { data } = await axiosClient.get(`/doctors/${id}`);
  return data;
};
