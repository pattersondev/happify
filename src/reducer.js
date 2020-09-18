// here goes where every get state user and artist gets dispatched
export const initialState = {
  user: null,
  artists: [],
  token: null,
  genres: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_TOKEN":
      return {
        ...state,
        token: action.token,
      };
    case "SET_ARTISTS":
      return {
        ...state,
        artists: action.artists,
      };
    case "SET_GENRES":
      return {
        ...state,
        genres: action.genres,
      };
    default:
      return state;
  }
};

export default reducer;
