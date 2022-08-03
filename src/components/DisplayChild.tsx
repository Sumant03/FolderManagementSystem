// import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import React, { useState} from "react";
import { useSelector } from "react-redux";
import { structure } from "../interfaces/interface";
import { RootState } from "../reducers";
import LeftbarNext from "./LeftbarNext";

interface Props {
    h3Name?:string
    h3Parent?:string
  settingLeftBarPathValue(name:string,type:string,parent?:string):void
}

const DisplayChildName = ({ h3Name,h3Parent,settingLeftBarPathValue}: Props) => {

  const list = useSelector((state: RootState) => state.list)

  let pathPresent=h3Parent+"/"+h3Name;
  const h3listTobeRendered=list.filter((singleList)=>{
    if(singleList.parent==pathPresent){
        console.log(singleList,'list at 22 child');
        return singleList;
    }

  })
  
  return (
    < >
                {
                        h3listTobeRendered.map((listDetails)=>{
                         return   <div>
                            <div  className=" DisplayName_23_hoverAdded accordion-item " >
                            <h3 style={{display:"flex", marginLeft:"60px"}} className="accordion-header" id="headingOne" >
                             <span><i style={{margin:"10px",color:"#00BFFF"}}className="bi bi-folder-fill"></i></span>
                              <button onClick={() => {
                                      settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
                                    }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                            <h4 className="DisplayNameh4_23_hoverAdded"  >{listDetails.name}</h4>
                              </button>
                
                              <h3>
                                    
                              </h3>
                            </h3>

                            <LeftbarNext settingLeftBarPathValue={settingLeftBarPathValue} h4Name={listDetails.name} h4Parent={listDetails.parent}/>
                           </div>
                        </div> 
                    
                    })
                }


        


    
     </>

    
  );
};

export default DisplayChildName;










