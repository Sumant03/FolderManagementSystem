// import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import React, { useState} from "react";
import { useSelector } from "react-redux";
import { structure } from "../interfaces/interface";
import { RootState } from "../reducers";

interface Props {
    h4Name?:string
    h4Parent?:string
  settingLeftBarPathValue(name:string,type:string,parent?:string):void
}

const DisplayChildName = ({ h4Name,h4Parent,settingLeftBarPathValue}: Props) => {

  const list = useSelector((state: RootState) => state.list)

  let pathPresent=h4Parent+"/"+h4Name;
  const h4listTobeRendered=list.filter((singleList)=>{
    if(singleList.parent==pathPresent){
        console.log(singleList,'list at 22 child');
        return singleList;
    }

  })  
  return (
    < >
                {
                        h4listTobeRendered.map((listDetails)=>{
                         return   <div>
                            <div  className=" DisplayName_23_hoverAdded accordion-item " >
                            <h3 style={{display:"flex", marginLeft:"70px"}} className="accordion-header" id="headingOne" >
                             <span><i style={{margin:"20px",color:"#00BFFF"}}className="bi bi-folder-fill"></i></span>
                              <button onClick={() => {
                                      settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
                                    }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <h4 className="DisplayNameh4_23_hoverAdded"  >{listDetails.name}</h4>
                              </button>
                
                              <h3>
                                    
                              </h3>
                            </h3>
                           </div>
                        </div> 
                    
                    })
                }


        


    
     </>

    
  );
};

export default DisplayChildName;










