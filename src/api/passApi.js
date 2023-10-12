import axios from "axios";

export const getAllPass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("/priorityPass/");

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const removePass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        "/priorityPass/removePass",
        {},
        { headers: { authorization: localStorage.getItem("accessJWT") } }
      );

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const getDbPass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.get("/dbCooperPass/");

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export const removeDbPass = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.patch(
        "/dbCooperPass/removePass",
        {},
        { headers: { authorization: localStorage.getItem("accessJWT") } }
      );

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};
