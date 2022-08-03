import { structure,DeletingState,IupdateCurrentList} from "../interfaces/interface"
import { ActionType } from "./actionTypes"





interface AddRootListAction {
    type: ActionType. ADDROOTLIST,
    payload: structure[]
}



interface DeleteRootListAction {
    type: ActionType.DELETEROOTLIST,
    payload: DeletingState
}

interface AddListAction {
    type: ActionType. ADDLIST,
    payload: structure[]
}

interface DeleteListAction {
    type: ActionType. DELETELIST,
    payload: DeletingState
}


// interface UpdateCurrentListAction {
//     type: ActionType. UPDATECURRENTLIST,
//     payload: IupdateCurrentList
// }

interface DeleteCurrentListAction {
    type: ActionType. DELETECURRENTLIST,
    payload: DeletingState
}

export type Action = AddRootListAction|DeleteRootListAction|AddListAction|DeleteListAction|DeleteCurrentListAction
//  | WithdrawAction | BankruptAction;