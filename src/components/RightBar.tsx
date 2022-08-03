
import { setMaxListeners } from "events";
import React, { ChangeEvent, Dispatch,SetStateAction } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { structure } from "../interfaces/interface";
import Folderdiv from "./folderDiv"
import {actionCreators} from "../exportFile"
import { RootState } from "../reducers";
import Modal from "./Modal";
import DisplayImage from "./DisplayImages";
import grid from "../images/grid.png"


interface Props{
settingPathValue(val:string,type:string):void, updatePath:()=>void,handleChange:(event: ChangeEvent<HTMLInputElement>)=>void ,  buttonHandler:()=>void,  setType: Dispatch<SetStateAction<string>>,  currentList:structure[],   path:string,  result:structure[], list:structure[] 
    name:string
    creator:string
    size:number
    type:string
    setCurrentList: Dispatch<SetStateAction<structure[]>>,
    updateCurrentList(validPath:string):void
  }

   


const Rightbar=({settingPathValue,updatePath,currentList,path,result,setType,handleChange,buttonHandler,name,creator,size,setCurrentList,updateCurrentList,type}:Props)=>{


    const dispatch = useDispatch();
      const { DeleteRootList,DeleteList,DeleteCurrentList} = bindActionCreators(actionCreators, dispatch)
      const rootList = useSelector((state: RootState) => state.rootList)
      const list = useSelector((state: RootState) => state.list)

    function ImDeletingRootList(id:number,parent?:string,name?:string){
      DeleteRootList({id,parent,name});
      DeleteList({id,parent,name})
      DeleteCurrentList({id,parent,name})
      DeleteCurrentList({id,parent,name})



    }

    const debounce = <T extends (...args: any[]) => ReturnType<T>>(
      callback: T,
      timeout: number
    ): ((...args: Parameters<T>) => void) => {
      let timer: ReturnType<typeof setTimeout>
    
      return (...args: Parameters<T>) => {
        clearTimeout(timer)
        timer = setTimeout(() => {
          callback(...args)
        }, timeout)
      }
    }

    const myDebouncedFunction = debounce(e => {
      const originalList=list;
      console.log(e);
       
      currentList=list.filter((singleList)=>{
        return singleList.name.toLowerCase().includes(e.toLowerCase());
      })
   
       console.log("abc");
       
       if(e==''){
        setCurrentList([]);
       }else{
         setCurrentList(currentList)
         setCurrentList(currentList)
       }
      }, 1000)

  return(
    
    <div className='right'>

      <div className="handlingWholeRightContent">

        <div className='rightContent' style={{overflow: "auto"}}>
          <div style={{width:"100%",display:"flex"}}>
              <div className='navbar' style={{marginLeft:"0"}}>
                  <div style={{display:"flex",marginRight:"150px"}}>
                    <i   onClick={updatePath}className="bi bi-arrow-left" style={{ fontSize:"40px",marginRight:"60px"}}></i>
                    <span style={{fontWeight:"bold",fontSize:"large" ,marginLeft:"40px"}}>{path}</span>
                  </div>
                  <div style={{display:"flex"}}>
                    <img width="250px" style={{margin:"10px"}} src={grid} />
                    <span className="bi bi-filter-left" style={{fontSize:"40px",marginTop:"10px"}}></span>
                  </div>
                  <div>
                  <div className="container" style={{display:"flex",flexDirection:"row",marginLeft:"20px"}}>
                  <span className="bi bi-search" style={{fontSize:"20px"}}></span>
                   <span> <input style={{width:"250px",height:"45px",borderRadius:'1px'}} onChange={(e)=>myDebouncedFunction(e.target.value)} placeholder='Search your Folder/File....'  type="text" list="suggestions" /></span>
                   
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

          </div>



        </div>

        <div className='displayData' style={{display:"flex",overflow: "auto",padding:"50px"}}>
            <span style={{display:"flex",flexWrap:"wrap"}}>{ 
                                
                                (currentList.length>0||path!='root')?
                                currentList.map((singleList: structure, key: number) => {

                          return  ( <span key={key}style={{alignItems:"center"}}>
                                        <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: '#00BFFF'}} className={"size bi bi-folder-fill "}></span>
                                        <span>
                                        <div className="dropdown" style={{display:"flex",alignContent:"center",marginLeft:"30px"}}>
                                          <p  style={{alignContent:"center"}}>{singleList.name}</p>  
                                        <a style={{backgroundColor:"white",color:"black"}} className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false"> </a>

                                          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink" >
                                            <li><a className="dropdown-item " href="#" >Get Info</a></li>
                                              
                                            <li><a onClick={()=>ImDeletingRootList(singleList.id,singleList.parent,singleList.name)} className="dropdown-item" href="#">Delete</a></li>
                                          </ul>
                                        </div>            
                                        </span>
                                  </span>)
                                  }):
                                  rootList.length>1?
                                  rootList.map((singleList: structure, key: number) => {
                          return  (<span key={key}style={{alignItems:"center"}}>
                                        <span  onClick={()=> settingPathValue(singleList.name,singleList.type)} style={{color: '#00BFFF'}} className={"size bi bi-folder-fill "}></span>
                                      
                                        <p style={{alignContent:"center"}}>{singleList.name}   <span className="dropdown" style={{backgroundColor:"white"}}>
                                                <button style={{backgroundColor:"white",color:"black"}} className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">

      
                                                  <li><a className="dropdown-item" onClick={()=>ImDeletingRootList(singleList.id,singleList.parent,singleList.name)} href="#">Delete</a></li>
                                                </ul>
                                              </span>
                                          </p>
                                      
                                      
                                    </span>)
                                  }):

                                  ""}
                <span style={{padding:"10px 50px 15px 0px"}}>
          <Folderdiv 
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
              return <img width="250px" height="250px" style={{margin:"10px",borderRadius:"15px"}}key={key} src={photo.urls.small}/>
            }):""}
          </div>


     {/* <DisplayImage /> */}


     </div>
    </div>
      
  )
}

export default Rightbar;  





{/* <div className="modal" tabIndex={-1}>
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <a className="dropdown-item modal-title" href="#">Modal title</a>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}













{/* <div className='right'>
         
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

          </div> */}




        














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


