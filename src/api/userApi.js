import axios from "axios";

export const userLogin = (frmData) => {
  return new Promise(async (resolve, reject) => {
    try {
      
      const res = await axios.post("/user/register", frmData);

      resolve(res.data);

      if (res.data.status === "success") {
        localStorage.setItem("accessJWT", res.data.accessJWT);
      }
    } catch (error) {
      reject(error);
    }
  });
};
