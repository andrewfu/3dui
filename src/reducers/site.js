import * as Actions from "../utl/actions";

export default (
  state = {
    title: "",
    sitefetching: false,
    sitefetched: false,
    lists: [],
    listsfetching: false,
    listsfetched: false,
  },
  action
) => {
  switch (action.type) {
    case Actions.FETCH_LISTS:
      return {
        ...state,
        listsfetched: false,
        listsfetching: true,
      };
    case `${Actions.FETCH_LISTS}_SUCCESS`:
      return {
        ...state,
        listsfetched: true,
        listsfetching: false,
        lists: action.payload,
      };
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
