import React from "react";
import { structure } from "../../interfaces/interface";
import DisplayName from "../DisplayName/DisplayName";
import AppLogo from "../images/AppLogo.png";
interface Props {
  sideBarList: structure[];
  settingLeftBarPathValue(name: string, type: string, parent?: string): void;
}

const Leftbar = ({ sideBarList, settingLeftBarPathValue }: Props) => {
  let mysidebarDiv = document.getElementById("mySidebar") as HTMLElement;
  let main = document.getElementById("main") as HTMLElement;
  let opnbtn = document.querySelector(".openbtn") as HTMLElement;
  function openNav() {
    mysidebarDiv.style.width = "350px";
    main.style.marginLeft = "350px";
    opnbtn.style.display = "none";
  }

  function closeNav() {
    mysidebarDiv.style.width = "0";
    main.style.marginLeft = "0";
    opnbtn.style.display = "block";
  }
  return (
    <>
      <div className="left">
        {/* <img width="60px"style={{marginTop:"15px"}} src={AppLogo}/> */}
        <div className="Leftbar11leftContent">
          <div id="main">
            <button className="openbtn" onClick={() => openNav()}>
              ☰
            </button>
          </div>

          <div
            className="hasAllFoldersName sidebar"
            id="mySidebar"
            style={{
              margin: "10px",
              marginBottom: "25px",
              borderRadius: "10px",
              backgroundColor: "#F2F2F2",

            }}
          >
            <span>
              <div
                style={{ color: "grey", fontWeight: "bold", fontSize: "large" }}
              >
                Root
              </div>
              <a
                href="javascript:void(0)"
                className="closebtn"
                style={{ color: "grey" }}
                onClick={() => closeNav()}
              >
                ×
              </a>{" "}
            </span>

            {sideBarList.map((singleList, key: number) => {
              return (
                <DisplayName
                  settingLeftBarPathValue={settingLeftBarPathValue}
                  key={key}
                  listDetails={singleList}
                />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftbar;

{
  /* <div className='left'>
            <div className='leftContent'>
            <div style={{color:"grey",fontWeight:"bold",fontSize:"large"}}>Root</div>
            
                  <div className="hasAllFoldersName">
                  { 
                  sideBarList.map((singleList,key:number)=>{
                    return (<DisplayName  settingPathValue={settingPathValue} key={key} listDetails={singleList}/>);
                  })
                     }
                    
                  
                  
                  </div>
 
            </div>
        </div> */
}

//before implementing redux

//         import React from "react";
// import { structure } from "../interfaces/interface";
// import DisplayName from "./DisplayName"
// interface Props{
//     sideBarList:structure[]
//     settingLeftBarPathValue(name:string,type:string,parent?:string):void
//     }

// const Leftbar=({sideBarList,settingLeftBarPathValue}:Props)=>{
//     let mysidebarDiv=document.getElementById("mySidebar") as HTMLElement;
//     let main=document.getElementById("main") as HTMLElement;
//     function openNav() {

//         mysidebarDiv.style.width = "420px";
//         main.style.marginLeft = "420px";
//       }

//       function closeNav() {
//         mysidebarDiv.style.width = "0";
//         main.style.marginLeft= "0";
//       }
// return(
//     <>
//     <div className='left'>
//         <div className='Leftbar11leftContent' >

//                      <div id="main" >
//                       <button className="openbtn" onClick={()=>openNav()}>☰</button>
//                     </div>

//                     <div className="hasAllFoldersName sidebar"  id="mySidebar" style={{margin:"10px",marginBottom:"25px",borderRadius:"10px", backgroundColor: "#dcdcdc"}}>
//                    <span><div style={{color:"grey",fontWeight:"bold",fontSize:"large"}}>Root</div>
//                     <a href="javascript:void(0)" className="closebtn" onClick={()=>closeNav()}>×</a> </span>

//                     {
//                     sideBarList.map((singleList,key:number)=>{
//                         return (<DisplayName  settingLeftBarPathValue={settingLeftBarPathValue} key={key} listDetails={singleList}/>);
//                     })
//                         }

//                     </div>

//         </div>
//     </div>
//    </>
// )
// }

// export default Leftbar;
