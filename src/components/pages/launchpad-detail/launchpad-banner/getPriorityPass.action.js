import { getAllPass } from "../../../../api/passApi";
import { mintFail, mintSuccess } from "./prioritypassSlice";

export const fetchPriorityPass = () => async (dispatch) => {
  try {
    const result = await getAllPass();
    dispatch(mintSuccess(result.data.result[0]));
  } catch (error) {
    dispatch(mintFail(error.message));
  }
};
