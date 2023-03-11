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
const setApiary = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, apiaryData, config);

  return response.data;
};

// Update apiary
const updateApiary = async (apiaryData, apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID,
    apiaryData,
    config
  );

  return response.data;
};

// Delete user apiary
const deleteApiary = async (apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + "apiary/" + apiaryID, config);

  return response.data;
};

// Set device
const setDevice = async (deviceData, apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/setdevice",
    deviceData,
    config
  );

  return response.data;
};

// Update device
const updateDevice = async (deviceData, apiaryID, deviceID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/device/" + deviceID + "/updatedevice",
    deviceData,
    config
  );

  return response.data;
};

// Delete device
const deleteDevice = async (apiaryID, deviceID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/device/" + deviceID + "/deletedevice",
    config
  );

  return response.data;
};

// Set member
const setMember = async (userData, apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/setmember",
    userData,
    config
  );

  return response.data;
};

// Update member
const updateMember = async (userData, apiaryID, userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/user/" + userID + "/updatemember",
    userData,
    config
  );

  return response.data;
};

// Delete member
const deleteMember = async (apiaryID, userID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryID + "/user/" + userID + "/deletemember",
    config
  );

  return response.data;
};

const apiaryService = {
  setApiary,
  getApiaries,
  updateApiary,
  deleteApiary,
  setDevice,
  updateDevice,
  deleteDevice,
  setMember,
  updateMember,
  deleteMember,
};

export default apiaryService;
