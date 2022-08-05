import { ActionType } from "../actions/actionTypes";
import { Action } from "../actions/index";
import { structure } from "../interfaces/interface";
import { DummmyFileStructure } from "../utils/DummyFileStructure";

export interface RootListState {
  newList: structure[];
}

const initialState = DummmyFileStructure;

const reducer = (
  state: structure[] = initialState,
  action: Action
): structure[] => {
  switch (action.type) {
    case ActionType.ADDROOTLIST:
      console.log([...state, ...action.payload]);
      localStorage.setItem(
        "rootList",
        JSON.stringify([...state, ...action.payload])
      );
      return [...state, ...action.payload];
    case ActionType.DELETEROOTLIST:
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
      localStorage.setItem("rootList", JSON.stringify(updatedList));
      return updatedList;
    default:
      return state;
  }
};

export default reducer;
