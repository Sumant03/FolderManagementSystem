import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { structure } from "../../interfaces/interface";
import Folderdiv from "../FolderDiv/FolderDiv";
import { actionCreators } from "../../exportFile";
import { RootState } from "../../reducers/index";

import grid from "../../images/grid.png";
import err from "../../images/error.png";
import noImage from "../../images/noImage.png";
import DisplayImage from "../DisplayImages/DisplayImages"


interface Props {
  settingPathValue(val: string, type: string): void;
  updatePath: () => void;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonHandler: () => void;
  setType: Dispatch<SetStateAction<string>>;
  currentList: structure[];
  path: string;
  result: structure[];
  list: structure[];
  pathArray: string[];
  setPath: Dispatch<SetStateAction<string>>;
  setPathArray: Dispatch<SetStateAction<string[]>>;
  name: string;
  creator: string;
  size: number;
  error: string;
  loading: boolean;
  type: string;
  setCurrentList: Dispatch<SetStateAction<structure[]>>;
  updateCurrentList(validPath: string): void;
  queryValue: string;
}

const Rightbar = ({
  settingPathValue,
  updatePath,
  currentList,
  path,
  result,
  setType,
  handleChange,
  buttonHandler,
  name,
  creator,
  size,
  setCurrentList,
  updateCurrentList,
  error,
  type,
  pathArray,
  setPath,
  setPathArray,
  queryValue
}: Props) => {
  const dispatch = useDispatch();

  const { DeleteRootList, DeleteList, DeleteCurrentList } = bindActionCreators(
    actionCreators,
    dispatch
  );
  const rootList = useSelector((state: RootState) => state.rootList);
  const list = useSelector((state: RootState) => state.list);
  const [toggle,setToggle]=useState<boolean>(false);
  const [toggleDelete,setToggleDelete]=useState<boolean>(false);

  useEffect(() => {
    console.log(pathArray);
  }, [pathArray,toggle,toggleDelete]);

  function deletingRootList(id: number, parent?: string, name?: string) {
    DeleteRootList({ id, parent, name });
    DeleteList({ id, parent, name });
    DeleteCurrentList({ id, parent, name });
    DeleteCurrentList({ id, parent, name });
    setToggleDelete(!toggleDelete);
  }

  const debounce = <T extends (...args: any[]) => ReturnType<T>>(
    callback: T,
    timeout: number
  ): ((...args: Parameters<T>) => void) => {
    let timer: ReturnType<typeof setTimeout>;

    return (...args: Parameters<T>) => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        callback(...args);
      }, timeout);
    };
  };

  const myDebouncedFunction = debounce((e) => {
    const originalList = list;
    console.log(e);

    currentList = list.filter((singleList) => {
      return singleList.name.toLowerCase().includes(e.toLowerCase());
    });

    console.log("abc");

    if (currentList.length < 1) {
      setCurrentList([]);
      alert("No Folder Found");
    } else {
      setCurrentList(currentList);
      setCurrentList(currentList);
    }
  }, 1000);

  const settingBreadCrum = (val: string) => {
    let idx = pathArray.indexOf(val);
    let arr = pathArray.slice(0, idx + 1);
    let str = arr.join("/");

    localStorage.setItem("path", str);
    setPath(str);

    if (arr.length < 1) {
      setPathArray(["root"]);
    } else {
      setPathArray(arr);
    }

    let listToberender = list.filter((singleList) => {
      if (str == singleList.parent) {
        return singleList;
      }
    });
    updateCurrentList(str);

    if (listToberender != null) {
      setCurrentList(listToberender);
    } else {
      setCurrentList([]);
    }
  };
  const settingPathOnBreadCrumRight = (val: string) => {
    let idx = pathArray.indexOf(val);
    let arr = pathArray.slice(0, idx + 1);
    let str = arr.join("/");

    localStorage.setItem("path", str);
    setPath(str);

    if (arr.length < 1) {
      setPathArray(["root"]);
    } else {
      setPathArray(arr);
    }

    let listToberender = list.filter((singleList) => {
      if (str == singleList.parent) {
        return singleList;
      }
    });
    updateCurrentList(str);

    if (listToberender != null) {
      setCurrentList(listToberender);
    } else {
      setCurrentList([]);
    }
  };

  function sortArryOnSize(){
  let arr = currentList.sort((a, b) => {
      return a.size - b.size;
   });
  let arr2 = list.sort((a, b) => {
    return a.size - b.size;
  });
  console.log("clicked");
  console.log(arr);
  
  
  updateCurrentList(path);
  setCurrentList(arr);
  setToggle(!toggle)
  // updatePath();
  }

  function sortArryOnName(){
    let arr = currentList.sort((a, b) => {
      let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
        });
    let arr2 = list.sort((a, b) => {
      let fa = a.name.toLowerCase(),
      fb = b.name.toLowerCase();

      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
    });
    console.log("clicked");
    console.log(arr);
    
    
    updateCurrentList(path);
    setCurrentList(arr);
    setToggle(!toggle)
    // updatePath();
    }



  return (
    <div className="right">
      <div
        className="navbar"
        style={{
          width: "100%",
          display: "flex",

        }}
      >
        <div style={{ display: "flex", marginRight: "450px" }}>
          <i
            onClick={updatePath}
            className="bi bi-arrow-left"
            style={{ fontSize: "40px" }}
          ></i>
          <span
            style={{
              fontWeight: "bold",
              fontSize: "large",
              marginLeft: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            {pathArray.map((val: string) => {
              return (
                <span
                  style={{ marginRight: "10px" }}
                  onClick={() => settingBreadCrum(val)}
                >
                  <p className="rightBar22bread">{val + ">"}</p>
                </span>
              );
            })}
          </span>
          
        </div>
        <div>
        <div className="dropdown show">
            <a className="bi bi-filter-left dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" style={{fontSize:"25px"}}>

            </a>

            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
              <p className="dropdown-item" onClick={sortArryOnSize} >Size</p>
              <p className="dropdown-item" onClick={sortArryOnName}>Name</p>
              <p className="dropdown-item" >Date</p>
            </div>
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <img width="250px" style={{ margin: "10px" }} src={grid} />
          {/* <span  
            onClick={sortArry}
            className="bi bi-filter-left"
            style={{ fontSize: "40px", marginTop: "10px" }}>
          </span> */}

        </div>
        <div>
          <div
            className="container"
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
            }}
          >
            <span className="bi bi-search" style={{ fontSize: "20px" }}></span>
            <span>
              {" "}
              <input
                style={{ width: "200px", height: "45px", borderRadius: "1px" }}
                onChange={(e) => myDebouncedFunction(e.target.value)}
                placeholder="Search your Folder/File...."
                type="text"
                list="suggestions"
              />
            </span>

            <datalist id="suggestions">
              <option>docs</option>
              <option>apple</option>
              <option>videos</option>
              <option>new.txt</option>
              <option>downloads</option>
            </datalist>
          </div>
        </div>
      </div>

      <div
        className="displayData"
        style={{ display: "flex", overflow: "auto", padding: "50px" }}
      >
        <span style={{ display: "flex", flexWrap: "wrap" }}>
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
                      className="dropdown"
                      style={{
                        display: "flex",
                        alignContent: "center",
                        marginLeft: "30px",
                      }}
                    >
                      <p style={{ alignContent: "center" }}>
                        {singleList.name}
                      </p>
                      <a
                        style={{
                          backgroundColor: "white",
                          color: "black",
                          border: "none",
                        }}
                        className="btn btn-secondary dropdown-toggle"
                        href="#"
                        role="button"
                        id="dropdownMenuLink"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        {" "}
                      </a>

                      <ul
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuLink"
                      >
                        <li>
                          <p className="dropdown-item ">
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
                            className="dropdown-item"
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
                            <p className="dropdown-item" >
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
      </div>

      {/* <div>
        {result.length > 0 && !error ? (
          result.map((photo: any, key: number) => {
            return (
              <>
                <img
                  width="250px"
                  height="250px"
                  style={{ margin: "10px", borderRadius: "15px" }}
                  key={key}
                  src={photo.urls.small}
                  data-toggle="modal"
                  data-target={`#exampleModalCenterDiv${key}`}
                />

                <div
                  className="modal fade"
                  id={`exampleModalCenterDiv${key}`}
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div
                    className="modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className="modal-content">
                      <div className="modal-body">
                        <img
                          width="450px"
                          height="450px"
                          style={{ margin: "10px", borderRadius: "15px" }}
                          key={key}
                          src={photo.urls.small}
                        />
                      </div>
                      <div className="modal-footer">
                        <button
                          type="button"
                          className="btn btn-secondary"
                          data-dismiss="modal"
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            );
          })
        ) : error.length > 1 ? (
          <div>
            <h1>{error}</h1>
            <img src={err} />
          </div>
        ) : path != "root" && type == "file" ? (
          <img width="400px" height="300px" src={noImage} />
        ) : (
          ""
        )}
      </div> */}
      
      <DisplayImage queryValue={queryValue} type={type} path={path}/>

    </div>
  );
};

export default Rightbar;

{
  /* <div className='right'>
         
          <div className='rightContent' style={{overflow: "auto"}}>
          <div style={{width:"100%",display:"flex"}}>
          <i  onClick={updatePath} className="bi bi-arrow-return-left" style={{ fontSize:"40px"}}></i>
              <div className='navbar'>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:"40px"}}>
             <i  onClick={updatePath} className="bi bi-arrow-return-left" style={{ fontSize:"40px",marginRight:"50px"}}></i>
            <span style={{fontWeight:"bold",fontSize:"large",marginTop:"20px" ,marginLeft:"50px",marginRight:"150px"}}>{path}</span>
            </div>
            <div>
                <div >
                  <input  style={{width:"250px",height:"45px",borderRadius:'5px'}} onChange={searchFolder} placeholder='Search your Folder/File....' />
                </div>
          </div>
          </div>

          </div>


  
          </div>

          <div className='displayData' style={{display:"flex",overflow: "auto"}}>
              <span style={{display:"flex",flexWrap:"wrap"}}>{ 
                                  
                                  (currentList.length>0||path!='root')?
                                  currentList.map((singleList: structure, key: number) => {
    
                            return  ( <span key={key}style={{alignItems:"center"}}>
                                          <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>
                                          <p style={{alignContent:"center"}}>{singleList.name}</p>
                                     </span>)
                                    }):
                                    rootList.length>1?
                                    rootList.map((singleList: structure, key: number) => {
                             return  (<span key={key}style={{alignItems:"center"}}>
                                          <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>
                                          <p style={{alignContent:"center"}}>{singleList.name}</p>
                                      </span>)
                                    }):

                                    <i className="size bi bi-plus-square-dotted"  data-toggle="modal" data-target="#exampleModalCenter" ></i>}
                  <span style={{padding:"10px 50px 25px 0px"}}>
            <Folderdiv 
                settingPathValue={settingPathValue} 
                setType={setType} 
                handleChange={handleChange} 
                buttonHandler={buttonHandler} 
                name={name} 
                creator={creator} 
                size={size}/>
                  </span>                
              </span>
          </div>

          <div >
              {result.length>0?result.map((photo:any,key:number)=>{
                return <img width="100px" height="100px" style={{margin:"10px",borderRadius:"15px"}}key={key} src={photo.urls.small}/>
              }):""}
            </div>

          </div> */
}

// function trigger(trigger: any, arg1: { onClick: () => void; }): React.ReactNode {
//   throw new Error("Function not implemented.");
// }
//updated Content

//       <div className='right'>

// <div className='rightContent' style={{overflow: "auto"}}>
// <div style={{width:"100%",display:"flex"}}>
//     <div className='navbar'>
//   <div style={{display:"flex",justifyContent:"space-between",marginBottom:"40px"}}>
//    <i  onClick={updatePath} className="bi bi-arrow-return-left" style={{ fontSize:"40px",marginRight:"50px"}}></i>
//   <span style={{fontWeight:"bold",fontSize:"large",marginTop:"20px" ,marginLeft:"50px",marginRight:"150px"}}>{path}</span>
//   </div>
//   <div>
//       <div >
//         <input  style={{width:"250px",height:"45px",borderRadius:'5px'}} onChange={searchFolder} placeholder='Search your Folder/File....' />
//       </div>
// </div>
// </div>

// </div>

// </div>

// <div className='displayData' style={{display:"flex",overflow: "auto"}}>
//     <span style={{display:"flex",flexWrap:"wrap"}}>{

//                         (currentList.length>0||path!='root')?
//                         currentList.map((singleList: structure, key: number) => {

//                   return  ( <span key={key}style={{alignItems:"center"}}>
//                                 <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>
//                                 <p style={{alignContent:"center"}}>{singleList.name}</p>
//                            </span>)
//                           }):
//                           rootList.length>1?
//                           rootList.map((singleList: structure, key: number) => {
//                    return  (<span key={key}style={{alignItems:"center"}}>
//                                 <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>
//                                 <p style={{alignContent:"center"}}>{singleList.name}</p>
//                             </span>)
//                           }):

//                           <i className="size bi bi-plus-square-dotted"  data-toggle="modal" data-target="#exampleModalCenter" ></i>}
//         <span style={{padding:"10px 50px 25px 0px"}}>
//   <Folderdiv
//       settingPathValue={settingPathValue}
//       setType={setType}
//       handleChange={handleChange}
//       buttonHandler={buttonHandler}
//       name={name}
//       creator={creator}
//       size={size}/>
//         </span>
//     </span>
// </div>

// <div >
//     {result.length>0?result.map((photo:any,key:number)=>{
//       return <img width="100px" height="100px" style={{margin:"10px",borderRadius:"15px"}}key={key} src={photo.urls.small}/>
//     }):""}
//   </div>

// </div>

// before implementing redux

//     import { setMaxListeners } from "events";
// import React, { ChangeEvent, Dispatch, MouseEventHandler ,SetStateAction } from "react";
// import { structure } from "../interfaces/interface";
// import DisplayName from "./DisplayName"
// import Folderdiv from "./folderDiv"

// interface Props{
//     sideBarList:structure[]
//     settingPathValue(val:string,type:string):void
//     updatePath:()=>void
//     searchFolder:(e: ChangeEvent<HTMLInputElement>)=>void
//     handleChange:(event: ChangeEvent<HTMLInputElement>)=>void
//     buttonHandler:()=>void
//     setType: Dispatch<SetStateAction<string>>
//     setList: Dispatch<SetStateAction<structure[]>>
//     currentList:structure[]
//     path:string
//     rootList:structure[]
//     result:structure[]
//     list:structure[]
//     name:string
//     creator:string
//     size:number
//     }

// const Rightbar=({settingPathValue,updatePath,searchFolder,currentList,path,rootList,result,setType,handleChange,buttonHandler,name,creator,size,list,setList}:Props)=>{
//     const deleteFolder=(id:number,parent?:string,name?:string )=>{

//     let updatedList=  list.filter((singleList)=>{
//         let parentvaluePlusName=parent+"/"+name;
//         if(singleList.id!=id||singleList.parent!=parentvaluePlusName){
//           return singleList;
//         }
//       })

//       setList([...updatedList])

//     console.log("testing 42");

//     }

//   return(

//     <div className='right'>

//     <div className='rightContent' style={{overflow: "auto"}}>
//     <div style={{width:"100%",display:"flex"}}>
//         <div className='navbar'>
//       <div style={{display:"flex",justifyContent:"space-between",marginBottom:"40px"}}>
//        <i  onClick={updatePath} className="bi bi-arrow-return-left" style={{ fontSize:"40px",marginRight:"50px"}}></i>
//       <span style={{fontWeight:"bold",fontSize:"large",marginTop:"20px" ,marginLeft:"50px",marginRight:"150px"}}>{path}</span>
//       </div>
//       <div>
//           <div >
//             <input  style={{width:"250px",height:"45px",borderRadius:'5px'}} onChange={searchFolder} placeholder='Search your Folder/File....' />
//           </div>
//     </div>
//     </div>

//     </div>

//     </div>

//     <div className='displayData' style={{display:"flex",overflow: "auto"}}>
//         <span style={{display:"flex",flexWrap:"wrap"}}>{

//                             (currentList.length>0||path!='root')?
//                             currentList.map((singleList: structure, key: number) => {

//                       return  ( <span key={key}style={{alignItems:"center"}}>
//                                     <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>
//                                     <span>
//                                     <p style={{alignContent:"center"}}>{singleList.name}<span onClick={()=>deleteFolder(singleList.id,singleList.parent,singleList.name)} className="bi bi-trash"></span></p>

//                                     </span>
//                                </span>)
//                               }):
//                               rootList.length>1?
//                               rootList.map((singleList: structure, key: number) => {
//                        return  (<span key={key}style={{alignItems:"center"}}>
//                                     <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: 'lightblue'}} className={"size bi bi-folder-fill "}></span>

//                                     <p style={{alignContent:"center"}}>{singleList.name}  <span onClick={()=>deleteFolder(singleList.id,singleList.parent,singleList.name)} className="bi bi-trash"></span></p>

//                                 </span>)
//                               }):

//                               <i className="size bi bi-plus-square-dotted"  data-toggle="modal" data-target="#exampleModalCenter" ></i>}
//             <span style={{padding:"10px 50px 25px 0px"}}>
//       <Folderdiv
//           setType={setType}
//           handleChange={handleChange}
//           buttonHandler={buttonHandler}
//           name={name}
//           creator={creator}
//           size={size}/>
//             </span>
//         </span>
//     </div>

//     <div >
//         {result.length>0?result.map((photo:any,key:number)=>{
//           return <img width="250px" height="250px" style={{margin:"10px",borderRadius:"15px"}}key={key} src={photo.urls.small}/>
//         }):""}
//       </div>

//     </div>

//   )
// }

// export default Rightbar;
