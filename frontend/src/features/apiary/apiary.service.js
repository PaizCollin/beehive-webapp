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

// Get user's apiaries
const getApiariesWithDeviceData = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + "filter/" + data.filter, config);

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
const updateDevice = async (apiaryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const { serial, name, remote } = apiaryData;

  const response = await axios.put(
    API_URL +
      "apiary/" +
      apiaryData.apiaryID +
      "/device/" +
      apiaryData.deviceID +
      "/updatedevice",
    { serial, name, remote },
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
      "/serial/" +
      apiaryData.serial +
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

  const { email, role } = userData;

  const response = await axios.put(
    API_URL + "apiary/" + userData.apiaryID + "/setmember",
    { email, role },
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

  const { role } = userData;

  const response = await axios.put(
    API_URL +
      "apiary/" +
      userData.apiaryID +
      "/user/" +
      userData.userID +
      "/updatemember",
    { role },
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
    {},
    config
  );

  return response.data;
};

const apiaryService = {
  setApiary,
  getApiaries,
  getApiariesWithDeviceData,
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
