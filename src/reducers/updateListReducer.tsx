import { ActionType } from "../actions/actionTypes"
import { Action } from "../actions/index"
import { structure } from "../interfaces/interface"
import { DummmyFileStructure } from "../utils/DummyFileStructure"

export interface RootListState {
  newList: structure[]
}

// localStorage.setItem("list", JSON.stringify(DummmyFileStructure));

const initialState =DummmyFileStructure

const listReducer = (state: structure[] = initialState, action: Action): structure[] => {
    switch (action.type){
        case ActionType.ADDLIST:
            console.log([...state,...action.payload]);
            // localStorage.setItem('list', JSON.stringify([...state,...action.payload]));
            return [...state,...action.payload]
        case ActionType.DELETELIST:
            let id=action.payload.id;
            let parent=action.payload.parent;
            let name=action.payload.name;
 
            let updatedList= state.filter((singleList)=>{
                let parentvaluePlusName=parent+"/"+name;
                if(singleList.id!=id&&singleList.parent!=parentvaluePlusName){
                  return singleList;
                }
                })
              console.log(id,"id in reducer");
              console.log(parent,"parent in reducer");
              console.log(name,"name in reducer");
              console.log(updatedList);
              // localStorage.setItem("list", JSON.stringify(updatedList));
              return updatedList
  
              default:
            return state
    }
}

export default listReducer