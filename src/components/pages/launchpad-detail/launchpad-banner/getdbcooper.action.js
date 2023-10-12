import { getDbPass } from "../../../../api/passApi";
import { dbcooperFail, dbcooperSuccess } from "./dbCooperSlice";

export const fetchDbPass = () => async (dispatch) => {
  try {
    const result = await getDbPass();

    dispatch(dbcooperSuccess(result.data.result[0]));
  } catch (error) {
    dispatch(dbcooperFail(error.message));
  }
};
