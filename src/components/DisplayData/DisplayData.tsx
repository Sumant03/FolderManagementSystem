import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../exportFile";
import { structure } from "../../interfaces/interface";
import Folderdiv from "../FolderDiv/FolderDiv";

import  "./displayData.css"

interface Props{

    path:string
    name:string;
    size:number
    type:string
    creator:string;
    typeOfDisplay:number
    toggleDelete:boolean
    currentList:structure[]
    rootList:structure[]
    settingPathValue(val: string, type: string): void;setToggleDelete: Dispatch<SetStateAction<boolean>>;setType: Dispatch<SetStateAction<string>>;handleChange: (event: ChangeEvent<HTMLInputElement>) => void;settingLeftBarPathValue(    name?: string,type?: string,parent?: string): void;buttonHandler: () => void;

}


function DisplayData({currentList,rootList,path,settingPathValue,toggleDelete,setToggleDelete,setType,handleChange,buttonHandler,name,creator,size,typeOfDisplay,type,settingLeftBarPathValue}:Props){

    const dispatch=useDispatch();
    const [singleListName,setSingleListName]=useState<string>("")
    const [singleListType,setSingleListType]=useState<string>("")
    const [singleListSize,setSingleListSize]=useState<number>(0)
    const [singleListCreator,setSingleListCreator]=useState<string>("")
    const [folderClicked,setFolderClicked]=useState<boolean>(false);


    let arrMain:string[]=["Application","Library","System","Users"]
    let arrAdmin:string[]=["shared","sumant.sharma"]
    let allFolders:string[]=["Applications","Documents","Desktop","Downloads","Movies","Music","node_modules","package.json","Pictures","Public"]
    let adminArrayStyle={height:"30px",background:"#E5E4E2",margin:"20px",display:"flex",justifyContent:"space-around",borderRadius:"25px"}
    let valStyle={width:"30%",borderRight:"2px grey solid"}
    let folderStyle={display:"flex",height:"550px"}
    let upperStyle={width:"70%",display:"flex",justifyContent:"center",margin:"auto"}
    let lowerStyle={width:"30%",borderLeft:"2px grey solid",height:"100%"}


    const { deleteRootList, deleteList, deleteCurrentList } = bindActionCreators(
        actionCreators,
        dispatch
      );

      function deletingRootList(id: number, parent?: string, name?: string) {
        deleteRootList({ id, parent, name });
        deleteList({ id, parent, name });
        deleteCurrentList({ id, parent, name });
        deleteCurrentList({ id, parent, name });
        setToggleDelete(!toggleDelete);
        settingLeftBarPathValue(name,type,parent);
      }

      function updateFolderData(listname:string,listtype:string,listsize:number,listcreator:string){
        setSingleListName(listname);
        setSingleListType(listtype);
        setSingleListSize(listsize);
        setSingleListCreator(listcreator);
        setFolderClicked(true);
        console.log(folderClicked);
        
      }

      function DisplayFolderData(listname:string,listtype:string,listsize:number,listcreator:string){
        let divOfGetInfo=document.querySelector(".displayData44GetInfo") as HTMLElement;

        if(divOfGetInfo.style.display=="none"){
         divOfGetInfo.style.display="block"
        }else{
         divOfGetInfo.style.display="none"
        }
        setSingleListName(listname);
        setSingleListType(listtype);
        setSingleListSize(listsize);
        setSingleListCreator(listcreator);
        setFolderClicked(true);
        console.log(folderClicked);
        
      }

      function CloseGetInfo(){
        let divOfGetInfo=document.querySelector(".displayData44GetInfo") as HTMLElement;

        if(divOfGetInfo.style.display=="none"){
         divOfGetInfo.style.display="block"
        }else{
         divOfGetInfo.style.display="none"
        }
      }

  return (
    <>
       <div className="displayData">
      
           {typeOfDisplay==1&&
           <div className="dd441stGrid">
             <span className="dd44displaylist" style={{ display: "flex", flexWrap: "wrap" }}>
                 {currentList.length > 0 || path != "root"
                 ? currentList.map((singleList: structure, key: number) => {
                 return (
                   <span key={key} style={{ alignItems: "center" }}>
                     <span
                       className={"rigthBar22folder size bi bi-folder-fill "}
                       onClick={() =>
                         settingPathValue(singleList.name, singleList.type)
                       }
                       style={{ color: "#00BFFF" }}
                     ></span>
                     <span>
                       <div
                         className="rb22dropdown dropdown"
                         style={{
                           display: "flex",
                           alignContent: "center",
                           marginLeft: "30px",
                         }}
                       >
                         <p className="rb22name" style={{ alignContent: "center" }}>
                           {singleList.name}
                         </p>
                         <a
                           style={{
                             backgroundColor: "white",
                             color: "black",
                             border: "none",
                           }}
                           className="rb22toggle btn btn-secondary dropdown-toggle"
                           href="#"
                           role="button"
                           id="dropdownMenuLink"
                           data-bs-toggle="dropdown"
                           aria-expanded="false"
                         >
                           {" "}
                         </a>
   
                         <ul
                           className="rb22dropdownMenu dropdown-menu"
                           aria-labelledby="dropdownMenuLink"
                         >
                           <li>
                             <p onClick={()=>DisplayFolderData(singleList.name,singleList.type,singleList.size,singleList.creator)} className="dropdown-item ">
                               Get Info
                             </p>
                           </li>
                           <li>
                             <a
                               onClick={() =>
                                 deletingRootList(
                                   singleList.id,
                                   singleList.parent,
                                   singleList.name
                                 )
                               }
                               className="rb22Item dropdown-item"
                               href="#"
                             >
                               Delete
                             </a>
                           </li>
                         </ul>
                       </div>
                     </span>
                   </span>
                 );
                 })
                 : rootList.length > 1
                 ? rootList.map((singleList: structure, key: number) => {
                   return (
                     <span key={key} style={{ alignItems: "center" }}>
                       <span
                         onClick={() =>
                           settingPathValue(singleList.name, singleList.type)
                         }
                         style={{ color: "#00BFFF" }}
                         className={"size bi bi-folder-fill "}
                       ></span>
   
                       <p style={{ alignContent: "center" }}>
                         {singleList.name}{" "}
                         <span
                           className="dropdown"
                           style={{ backgroundColor: "white" }}
                         >
                           <button
                             style={{ backgroundColor: "white", color: "black" }}
                             className="btn btn-secondary dropdown-toggle"
                             type="button"
                             id="dropdownMenuButton1"
                             data-bs-toggle="dropdown"
                             aria-expanded="false"
                           ></button>
                           <ul
                             className="dropdown-menu"
                             aria-labelledby="dropdownMenuButton1"
                           >
                             <li>
                               <p className="dropdown-item" onClick={()=>DisplayFolderData(singleList.name,singleList.type,singleList.size,singleList.creator)} >
                                 Get Info
                               </p>
                             </li>
   
                             <li>
                               <a
                                 className="dropdown-item"
                                 onClick={() =>
                                   deletingRootList(
                                     singleList.id,
                                     singleList.parent,
                                     singleList.name
                                   )
                                 }
                                 href="#"
                               >
                                 Delete
                               </a>
                             </li>
                           </ul>
                         </span>
                       </p>
                     </span>
                   );
                 })
                 : ""}
             <span style={{ padding: "10px 50px 15px 0px" }}>
               <Folderdiv
                 setType={setType}
                 handleChange={handleChange}
                 buttonHandler={buttonHandler}
                 name={name}
                 creator={creator}
                 size={size}
               />
             </span>
             </span>
           
             <div className="displayData44GetInfo" style={{width:"25%",height:"50%",display:"none",justifyContent:"center",margin:"auto",border:"2px grey solid",zIndex:"2",background: "linear-gradient(75deg, #00E39F, #00C4E1)"}}>
        
              <div className="dd44Info"  style={{display:"flex",padding:"30px"}} >
                  <div>
                    <h4> Name:{singleListName}</h4>
                    <h4>Type:{singleListType}</h4>
                    <h4>Creator:{singleListCreator}</h4>
                    <h4>Size:{singleListSize}</h4>
                  </div>
      
                  <div onClick={CloseGetInfo} >
                  <i style={{fontSize:"30px",marginLeft:"120px"}} className="bi bi-x-square-fill"></i>
                  </div>
              </div>   
            </div>

          </div>}      

           {typeOfDisplay==2&&
             <span className="dd442ndGrid"   
             style={{ display: "flex",flexDirection:"column", flexWrap: "wrap",width:"100%" }}>
              {<div className="dd44headerDiv" style={{display:"flex",justifyContent:"space-around"}}> <span ><h3>Folder Name</h3></span> <span ><h3>Type</h3></span> <span ><h3>Creator</h3></span> <span ><h3>Size</h3></span></div>}
             {currentList.length > 0 || path != "root"
               ? currentList.map((singleList: structure, key: number) => {
                 return (
                   <div key={key} style={{ alignItems: "center",display:"flex",flexDirection:"row"}}>
                    <div className="dd44TableDiv" style={{display:"flex",background:"#E5E4E2"}}>
                    <span
                       className={"dd44folder bi bi-folder-fill "}
                       
                       onClick={() =>
                         settingPathValue(singleList.name, singleList.type)
                       }
                       style={{ color: "#00BFFF",fontSize:"60px",display:"flex",flexDirection:"row",borderRadius:"25px",minWidth:"44px" }}>

                     </span>

                     <span className="dd44type" style={{minWidth:"44px"}}>{singleList.type}</span>
                     <span className="dd44creator"  style={{minWidth:"44px"}}>{singleList.creator}</span>
                     <span className="dd44size"  style={{minWidth:"44px"}}>{singleList.size}</span>

                    </div>
                   </div>
                 );
               })
               : rootList.length > 1
                 ? rootList.map((singleList: structure, key: number) => {
                   return (
                     <div className="dd44headerDiv" key={key} style={{ alignItems: "center"}}>
                        <div className="dd44TableDiv" style={{display:"flex",justifyContent:"space-around", background:"#E5E4E2",margin:"25px",padding:"5px"}}>
                                <span className="dd44folder" style={{display:"flex"}}>
                                <span
                                onClick={() =>
                                settingPathValue(singleList.name, singleList.type)
                                }
                                style={{ color: "#00BFFF",fontSize:"30px",marginRight:"5px",marginLeft:"20px"  }}
                                className={" bi bi-folder-fill "}  >

                                </span>


                                <span>
                                <p style={{ alignContent: "center",padding:"7px"}}>
                                {singleList.name}{" "}
                               </p>
                                  </span>
                                </span>
                                  <span className="dd44type">{singleList.type}</span>
                                  <span className="dd44creator">{singleList.creator}</span>
                                  <span className="dd44size">{singleList.size}</span>
                        </div>


                     </div>
                   );
                 })
                 : ""}
             <span className="dd44folderDiv" style={{ padding: "10px 50px 15px 0px" }}>
               <Folderdiv
                 setType={setType}
                 handleChange={handleChange}
                 buttonHandler={buttonHandler}
                 name={name}
                 creator={creator}
                 size={size}
               />
             </span>
           </span>}

           {typeOfDisplay==3&&
            <div className="dd443rdGrid" 
                style={{display:"flex",height:"100vh"}}>

              <div className="dd44arrmain" style={valStyle}>{
                arrMain.map((val)=>{
                  return <div style={adminArrayStyle} ><span style={{}}>{val}</span><span></span></div>
                })
                
                }</div>
              <div className="dd44arrAdmin"  style={valStyle}> {
                arrAdmin.map((val)=>{
                  return <div style={adminArrayStyle}><span>{val}</span><span></span></div>
                })
                
                }
                
              </div>
              <div className="dd44allFolder"  style={valStyle}> {
                allFolders.map((val)=>{
                  return <div style={adminArrayStyle}><span>{val}</span><span></span></div>
                })
                
                }</div>
            
            </div>}   

          {typeOfDisplay==4&&
              <div className="dd444thGrid">
                {folderClicked&&
                <div className="dd44FolderData" 
                style={folderStyle}>
                  <div className="dd44upperBar" style={upperStyle}>
                    { <div>   <span  className={"rigthBar22folder bi bi-folder-fill "}
                       style={{ color: "#00BFFF",fontSize:"180px",display:"flex",flexDirection:"row",margin:"20px" }}> </span>
                     <h3>{singleListName}</h3>
                      </div>
                    }

                  </div>
                  <div className="dd44bottomBar" style={lowerStyle}>

                    <div style={{display:"flex",margin:"50px"}}>
                    <span
                       className={"rigthBar22folder bi bi-folder-fill "}
                       
                       style={{ color: "#00BFFF",fontSize:"80px",display:"flex",flexDirection:"row",margin:"20px" }}
                     > </span>
                     <span style={{marginTop:"25px"}}> <h4 style={{fontWeight:"bold"}}>{singleListName}</h4>{singleListType}-{singleListSize}kb</span>
                    </div>

                    <div style={{marginTop:"40px"}}>
                    <hr />
                    <div style={{margin:"22px"}}>
                      <span style={{fontWeight:"bold",margin:"10px"}}>Information</span>
                      <span style={{color:"#00BFFF"}}><a>Show More</a></span>
                      </div>



                      <div style={{borderBottom:"2px grey solid",width:"80%",justifyContent:"center",margin:"auto"}}>
                      <span style={{ color:"grey",margin:"20px"}}>Folder Name</span>
                      <span style={{color:""}}><a>{singleListName}</a></span>
                      </div>

                      <div style={{borderBottom:"2px grey solid",width:"80%",justifyContent:"center",margin:"auto"}}>
                      <span style={{ color:"grey",margin:"20px"}}>Folder Type</span>
                      <span ><a>{singleListType}</a></span>
                      </div>
                      <div style={{borderBottom:"2px grey solid",width:"80%",justifyContent:"center",margin:"auto"}}>
                      <span style={{ color:"grey",margin:"20px"}}>Folder Size</span>
                      <span ><a>{singleListSize}</a></span>
                      </div>
                      <div style={{borderBottom:"2px grey solid",width:"80%",justifyContent:"center",margin:"auto"}}>
                      <span style={{ color:"grey",margin:"20px"}}>Creator Name</span>
                      <span ><a>{singleListCreator}</a></span>
                      </div>

                      <div style={{marginTop:"30px"}}>
                        <p style={{fontWeight:"bold"}}>Tags</p>
                        <p style={{color:"lightgrey"}}>Add Tags....</p>
                      </div>

                    </div>


                  
                  </div>
                </div>}
              <span  className="dd44folderDiv" 
               style={{ display: "flex",flexDirection:"row",width:"100%",overflowX: "scroll",position:"absolute",bottom:"20px" }}>
              {currentList.length > 0 || path != "root"
                ? currentList.map((singleList: structure, key: number) => {
                  return (
                    <div key={key} style={{ alignItems: "center",display:"flex",flexDirection:"row" }}>
                      <div style={{display:"flex",background:"#E5E4E2"}}>
                      <span
                        className={"rigthBar22folder bi bi-folder-fill "}
                        
                        onClick={() =>
                          updateFolderData(singleList.name,singleList.type,singleList.size,singleList.creator)
                        }
                        style={{ color: "#00BFFF",fontSize:"60px",display:"flex",flexDirection:"row",margin:"20px" }}
                      ></span>
                      <span>
                          <span>

                          <p style={{ alignContent: "center" }}>
                            {singleList.name}
                          </p>
                          </span>

                      </span>
                      </div>

                    </div>
                  );
                })
                : rootList.length > 1
                  ? rootList.map((singleList: structure, key: number) => {
                    return (
                      <div key={key} style={{ alignItems: "center"}}>
                          <div style={{display:"flex",margin:"5px"}}>
                                  <span
                                  onClick={() =>
                                    updateFolderData(singleList.name,singleList.type,singleList.size,singleList.creator)
                                  }
                                  style={{ color: "#00BFFF",fontSize:"80px",marginRight:"10px",marginLeft:"20px"  }}
                                  className={" bi bi-folder-fill "}  >

                                    </span>
                                  <span>
                                  <p style={{ alignContent: "center",marginTop:"50px" }}>
                                  {singleList.name}{" "}
                                </p>
                                    </span>
                          </div>


                      </div>
                    );
                  })
                  : ""}
              <span  className="dd44folderDiv" style={{ padding: "10px 50px 15px 0px" }}>
                <Folderdiv
                  setType={setType}
                  handleChange={handleChange}
                  buttonHandler={buttonHandler}
                  name={name}
                  creator={creator}
                  size={size}
                />
              </span>
              </span>
           </div>}    

      </div>
    </>
  )
}

export default DisplayData