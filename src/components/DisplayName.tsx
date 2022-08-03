import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import React, { useState} from "react";
import { useSelector } from "react-redux";
import { structure } from "../interfaces/interface";
import { RootState } from "../reducers";
import DisplayChildName from "./DisplayChild";

interface Props {
  listDetails: structure;
  settingLeftBarPathValue(name:string,type:string,parent?:string):void
}

const DisplayName = ({ listDetails,settingLeftBarPathValue}: Props) => {

  const list = useSelector((state: RootState) => state.list)
 
 
  return (
    <div >
     
       {
        <div  className=" DisplayName_23_hoverAdded accordion-item " >
            <h2 style={{display:"flex", margin:"25px"}} className="accordion-header" id="headingOne" >
             <span><i style={{margin:"15px",color:"#00BFFF"}}className="bi bi-folder-fill"></i></span>
              <button onClick={() => {
                      settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
                    }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            <h4 className="DisplayNameh4_23_hoverAdded" style={{color:"#36454F"}} >{listDetails.name}</h4>
              </button>

            </h2>

            <DisplayChildName settingLeftBarPathValue={settingLeftBarPathValue} h3Name={listDetails.name} h3Parent={listDetails.parent}/>

        </div>
} 
    
     </div>

    
  );
};

export default DisplayName;












//before implenting redux 

// import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
// import React, { useState } from "react";
// import { structure } from "../interfaces/interface";

// interface Props {
//   listDetails: structure;
//   settingLeftBarPathValue(name:string,type:string,parent?:string):void

// }

// const DisplayName = ({ listDetails,settingLeftBarPathValue}: Props) => {

  
//   const [h3ButtonClicked,seth3ButtonClicked]=useState<boolean>(false);
//   const [h4ButtonClicked,seth4ButtonClicked]=useState<boolean>(false);

//   let h3div=document.querySelector("h3") as HTMLElement
//   let h4div=document.querySelector("h4") as HTMLElement
    
//   function h3Button(){
//     console.log(h3div);
    
//     console.log('display flex');
//    let val=h3ButtonClicked==true?false:true;
//    seth3ButtonClicked(val);
//    console.log(val);
   
//    val==true?h3div.style.display='none':h3div.style.display='flex';
//    }

//    function h4Button(){
//     console.log(h4div);
    
//     console.log('display flex');
//    let val=h4ButtonClicked==true?false:true;
//    seth4ButtonClicked(val);
//    console.log(val);
   
//    val==true?h4div.style.display='none':h4div.style.display='flex';
//    }
  
//   return (
//     <div >
     
//        {listDetails.type=="folder"?
//         <div  className="accordion-item DisplayName23hoverAdded" >
//             <h2 style={{display:"flex", margin:"20px"}} className="accordion-header" id="headingOne" >
//              <span><i style={{margin:"10px"}}className="bi bi-folder"></i></span>
//               <button onClick={() => {
//                       settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
//                     }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                             <h4  >{listDetails.name}</h4>
//               </button>
//                <button style={{backgroundColor:"#dcdcdc", color:"black"}} onClick={h3Button}  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" ></button>
//             </h2>

//             <h3 style={{margin:"30px"}} className="accordion-header Leftbar11DisplayNameh3tag" id="headingOne" >
//                   <span><i style={{margin:"10px"}}className="bi bi-folder"></i></span>
//                     <button onClick={() => {
//                             settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
//                             }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                       <h4 >{listDetails.name}</h4>
//                       </button>
//                       <button style={{backgroundColor:"#dcdcdc", color:"black"}} onClick={h4Button}  className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" ></button>
                    
//             </h3>

//             <h4 style={{margin:"40px"}} className="accordion-header Leftbar11DisplayNameh4tag" id="headingOne" >
//              <span><i style={{margin:"10px"}}className="bi bi-folder"></i></span>
//               <button onClick={() => {
//           settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
//         }} className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                 <h4 className="" >{listDetails.name}</h4>
//               </button>
//             </h4>
//         </div>
//           :
//         <div  className="DisplayName23hoverAdded" onClick={() => {
//             settingLeftBarPathValue(listDetails.name,listDetails.type,listDetails.parent);
//           }} >
//              <h2 style={{display:"flex", margin:"20px"}} className="accordion-header" id="headingOne" >
         
//               <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
//                <i style={{margin:"10px",fontSize:"30px"}}className="bi bi-file-text"></i>

//                <h4 >{listDetails.name}</h4>
//               </button>
//             </h2>
           
          
//         </div>}
    
//      </div>

    
//   );
// };

// export default DisplayName;