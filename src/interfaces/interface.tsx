export interface structure{
    id:number,
    type:string;
    name:string;
    creator:string;
    size:number;
    date?:Date;
    parent?:string

}

export interface DeletingState{
    id:number,
    parent?:string,
    name?:string
}

export interface IupdateCurrentList{
    listToberender:structure[]
    validPath:string
}



// export interface updateCurrentlist{
//     function log(message): void {
       
//     }
// }