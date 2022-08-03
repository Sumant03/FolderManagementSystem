import { Dispatch } from "redux"
import { ActionType } from "./actionTypes"
import { Action } from "../actions/index"
import { structure,DeletingState,IupdateCurrentList} from "../interfaces/interface"




export const AddRootList = (amount: structure[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType. ADDROOTLIST,
            payload: amount
        })
    }
}

export const DeleteRootList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETEROOTLIST,
            payload: amount
        })
    }
}

export const AddList = (amount: structure[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADDLIST,
            payload: amount
        })
    }
}

export const DeleteList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETELIST,
            payload: amount
        })
    }
}

// export const UpdateCurrentList = (amount: IupdateCurrentList) => {
//     return (dispatch: Dispatch<Action>) => {
//         dispatch({
//             type: ActionType.UPDATECURRENTLIST,
//             payload: amount
//         })
//     }
// }

export const DeleteCurrentList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETECURRENTLIST,
            payload: amount
        })
    }
}

