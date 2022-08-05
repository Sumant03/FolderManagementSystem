import { combineReducers } from "redux";
import reducer from "./updateRootlistReducer";
import listReducer from "./updateListReducer";
import currentListReducer from "./updateCurrentList";

const reducers = combineReducers({
  rootList: reducer,
  list: listReducer,
  currentList: currentListReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
