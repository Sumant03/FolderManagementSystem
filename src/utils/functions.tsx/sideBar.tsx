import react from "react";
import { structure } from "../../interfaces/interface";

interface Props{

list:structure[];
newList:structure[];
setSidebarList:React.Dispatch<React.SetStateAction<structure[]>>

}


const sideBar=({list,newList,setSidebarList}:Props)=>{

    let leftContent:structure[]=[];
  
        leftContent=list.filter((singleList)=>{
          
            if(singleList.parent=='root'){
              leftContent.push(singleList);
            }
          return singleList
        })
  
        setSidebarList([...leftContent,...newList]);
    }

export default  sideBar    