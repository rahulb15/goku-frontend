import { nightModeSuccess } from "./nightModeSlice";

export const nightModeStatusUpdate = (frmDt) => async (dispatch) => {
  // try {
  // 	dispatch(addStudentPending());

  // 	const result = await createNewStudent(frmDt);
  // 	result.status === 'success'
  // 		? dispatch(addStudentSuccess(result.message)) &&
  // 		  setTimeout(() => {
  // 				dispatch(addStudentResetMessage());
  // 		  }, 1000)
  // 		: dispatch(addStudentError(result.message));

  // 	
  // } catch (error) {
  // 	dispatch(addStudentError(error.message));
  // }
  dispatch(nightModeSuccess(frmDt));
};
