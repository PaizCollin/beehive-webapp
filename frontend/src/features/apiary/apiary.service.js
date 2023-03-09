import axios from "axios";

const API_URL = "/api/apiaries/";

// Get user's apiaries
const getApiaries = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Create new apiary
const createApiary = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, apiaryData, config);

  return response.data;
};

// Update members
const updateMembers = async (apiaryID, userID, setOwner, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + apiaryID + userID + setOwner,
    config
  );

  return response.data;
};

// Update members
const deleteMember = async (apiaryID, userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + apiaryID + userID, config);

  return response.data;
};

// Update apiary
const updateApiary = async (apiaryData, apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + apiaryID, apiaryData, config);

  return response.data;
};

// Delete user apiary
const deleteApiary = async (apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + apiaryID, config);

  return response.data;
};

const apiaryService = {
  getApiaries,
  createApiary,
  updateMembers,
  deleteMember,
  updateApiary,
  deleteApiary,
};

export default apiaryService;
