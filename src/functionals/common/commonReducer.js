import { ACTION } from "./commonAction";
const initialState = {
  status: false,
};

const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case ACTION.TOGGLE_STATUS:
      return {
        status: true,
      };
    default:
      return { ...state };
  }
};

export default commonReducer;
