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
    // case ActionType.UPDATECURRENTLIST:
    //     console.log("inside currentList reducer");

    //     let list=action.payload.listToberender;
    //     console.log(list,'list value in reducer');

    //     let validPath=action.payload.validPath;
    //     console.log(validPath,'validpath value in reducer');
    //     let listToberender:structure[]=[]
    //     if(list.length>0){
    //      listToberender=list.filter((singleList)=>{
    //         if(validPath==singleList.parent){
    //           return singleList
    //         };
    //     })
    // }
    //     if(listToberender.length>0){
    //     return listToberender;
    //     }else{
    //       return [];
    //     }
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
