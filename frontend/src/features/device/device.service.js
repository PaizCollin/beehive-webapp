import axios from "axios";

const API_URL = "/api/devices/";

// Get device data
const getData = async (apiaryID, deviceID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + apiaryID + deviceID, config);

  return response.data;
};

// Get all apiary devices
const getDevices = async (apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + apiaryID, config);

  return response.data;
};

// Create new device
const createDevice = async (deviceData, apiaryID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL + apiaryID, deviceData, config);

  return response.data;
};

// Delete user device
const updateDevice = async (deviceData, apiaryID, deviceID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(
    API_URL + apiaryID + deviceID,
    deviceData,
    config
  );

  return response.data;
};

// Delete user device
const deleteDevice = async (apiaryID, deviceID, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + apiaryID + deviceID, config);

  return response.data;
};

const deviceService = {
  createDevice,
  getDevices,
  deleteDevice,
};

export default deviceService;
