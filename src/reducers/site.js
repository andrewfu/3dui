import * as Actions from "../utl/actions";

export default (
  state = {
    title: "",
    sitefetching: false,
    sitefetched: false,
  },
  action
) => {
  switch (action.type) {
    case Actions.FETCH_SITE:
      return {
        ...state,
        sitefetching: true,
        sitefetched: false,
      };
    case `${Actions.FETCH_SITE}_SUCCESS`:
      return {
        ...state,
        sitefetching: false,
        sitefetched: true,
        title: action.payload.Title,
      };
  }
  return state;
};
