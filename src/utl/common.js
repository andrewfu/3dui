export const GetRandomInt = (seed) => Math.ceil(Math.random() * seed);

export const Fetch = ({ type, ServiceAction }) => {
  return async (dispatch, getState) => {
    dispatch({ type });
    try {
      const serviceActionResult = await ServiceAction(getState);
      dispatch({
        type: `${type}_SUCCESS`,
        payload: serviceActionResult,
      });
      return serviceActionResult;
    } catch (error) {
      dispatch({
        type: `${type}_ERROR`,
        payload: error,
      });
    }
  };
};
