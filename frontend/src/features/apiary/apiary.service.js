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
const updateApiary = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { name, location } = apiaryData;

  const response = await axios.put(
    API_URL + "apiary/" + apiaryData.apiaryID,
    { name, location },
    config
  );

  return response.data;
};

// Delete user apiary
const deleteApiary = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    API_URL + "apiary/" + apiaryData.apiaryID,
    config
  );

  return response.data;
};

// Set device
const setDevice = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + "apiary/" + apiaryData.apiaryID + "/setdevice",
    apiaryData.deviceData,
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
const deleteDevice = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL +
      "apiary/" +
      apiaryData.apiaryID +
      "/device/" +
      apiaryData.deviceID +
      "/deletedevice",
    {},
    config
  );

  return response.data;
};

// Set member
const setMember = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { email, isEditor } = userData;

  const response = await axios.put(
    API_URL + "apiary/" + userData.apiaryID + "/setmember",
    { email, isEditor },
    config
  );

  return response.data;
};

// Update member
const updateMember = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { isEditor } = userData;

  const response = await axios.put(
    API_URL +
      "apiary/" +
      userData.apiaryID +
      "/user/" +
      userData.userID +
      "/updatemember",
    { isEditor },
    config
  );

  return response.data;
};

// Delete member
const deleteMember = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL +
      "apiary/" +
      userData.apiaryID +
      "/user/" +
      userData.userID +
      "/deletemember",
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
