import { Dispatch } from "redux"
import { ActionType } from "./actionTypes"
import { Action } from "../actions/index"
import { structure,DeletingState,IupdateCurrentList} from "../interfaces/interface"




export const addRootList = (amount: structure[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType. ADDROOTLIST,
            payload: amount
        })
    }
}

export const deleteRootList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETEROOTLIST,
            payload: amount
        })
    }
}

export const addList = (amount: structure[]) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.ADDLIST,
            payload: amount
        })
    }
}

export const deleteList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETELIST,
            payload: amount
        })
    }
}

export const deleteCurrentList = (amount: DeletingState) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch({
            type: ActionType.DELETECURRENTLIST,
            payload: amount
        })
    }
}

