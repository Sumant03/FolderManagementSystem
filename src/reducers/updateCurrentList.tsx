import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions/index";
import { structure } from "../interfaces/interface";

export interface RootListState {
  currentList: structure[];
}

const initialState: structure[] = [];

const currentListReducer = (
  state: structure[] = initialState,
  action: Action
): structure[] => {
  switch (action.type) {
    case ActionType.DELETECURRENTLIST:
      let id = action.payload.id;
      let parent = action.payload.parent;
      let name = action.payload.name;
      console.log(id, "id in reducer");
      console.log(parent, "parent in reducer");
      console.log(name, "name in reducer");

      let updatedList = state.filter((singleList) => {
        let parentvaluePlusName = parent + "/" + name;
        if (singleList.id != id && singleList.parent != parentvaluePlusName) {
          return singleList;
        }
      });
      console.log(id, "id in reducer");
      console.log(parent, "parent in reducer");
      console.log(name, "name in reducer");
      console.log(updatedList);
      return updatedList;
    default:
      return state;
  }
};

export default currentListReducer;
