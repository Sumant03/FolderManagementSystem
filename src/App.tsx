
  import React, { useEffect } from 'react';
import {useState,ChangeEvent} from "react";
import axios from 'axios';

import {structure} from "./interfaces/interface"
import {DummmyFileStructure} from "./utils/DummyFileStructure"
import {useDispatch, useSelector } from 'react-redux';

import Leftbar from './components/LeftBar';
import Rightbar from './components/RightBar';
import { bindActionCreators } from 'redux';
import { actionCreators } from "./exportFile"
import { RootState } from '../src/reducers/index';

import './App.css';
// import DisplayImage from './components/DisplayImages';


function App() {

  let url="";
  let pathValue="";

  const dispatch = useDispatch();

const rootList = useSelector((state: RootState) => state.rootList)
const list = useSelector((state: RootState) => state.list)


  const { AddRootList,AddList} = bindActionCreators(actionCreators, dispatch)
  const [type,setType]=useState<string>("");
  const [name,setName]=useState<string>("");
  const [creator,setCreator]=useState<string>("");
  const [size,setSize]=useState<number>(0);
  // const [list,setList]=useState<structure[]>(DummmyFileStructure);
  // const [rootList,setRootList]=useState<structure[]>(DummmyFileStructure);
  const [sideBarList,setSidebarList]=useState<structure[]>([]);
  let   [currentList,setCurrentList]=useState<structure[]>([]);
  const [result,setResult]=useState<any>({});
  const [queryValue,setQueryValue]=useState<string>("");
  const [path,setPath]=useState<string>("root");



  const buttonHandler = () => {

  let id= (new Date().getTime() * Math.random() * 100000)
    const newList= { id:id,type: type,name: name,creator:creator,size: size,parent:path};
    console.log(newList," newList at 38");

        // setList([...list,newList]);
AddList([newList]);
        if(newList.parent=='root'){
          // setRootList([...rootList,newList])
          console.log(rootList,rootList);
          
          AddRootList([newList]);

          console.log(rootList);
          sideBar([newList]);
        }
        const _list=[...list,newList];
        if(path!='root'){
          let listToberender=_list.filter((singleList)=>{

            if(path==singleList.parent){                
              return singleList
            };
          }) 
          updateCurrentList(pathValue)
          if(listToberender!=null){
            setCurrentList(listToberender);

            }else{
              setCurrentList([]);
            }
        }
       
        setType(type)
        setName("");
        setCreator("");
        setSize(0);  


  };

  useEffect(()=>{
     url="https://api.unsplash.com/search/photos?&per_page=100&page=100&query="+queryValue+"&client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cYU"  

    console.log(list,"list")
    console.log(path,"path")
    console.log(currentList,"currentList");
    console.log(rootList,'rootList');
    
   
    console.log("------------------------");
    
    //console.log(result,"resultsArray");
    // console.log(queryValue,"queryvalue");
    
  },[list,path,result,queryValue])

  useEffect(()=>{
    sideBar([])
    console.log("display it");
    console.log("------------------------");
    return () => {
      console.log("unmounted");
    };
  
  },[])
  
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } 
    else if(event.target.name=="creator"){
      setCreator(event.target.value);
    } 
    else if(event.target.name="size"){
      setSize(Number(event.target.value))
    }
  }

  const settingPathValue=(val:string,type:string)=>{   
     console.log("inside settingpath at 124");
     
    let newPath=[];
      if(type=="file"){
        setQueryValue(val);

            if(queryValue.length>1){
              pathValue=path+"/"+val
              newPath = path.split("/");
                if(newPath[newPath.length-1]!=val){
                  pathValue=path+"/"+val
                  setPath(pathValue)
                  handleSubmit()
                    }
                else{
                      console.log("'same value");  
                    }
            }
            if(path!="root"){
              let listToberender=list.filter((singleList)=>{
                                  
                if(pathValue==singleList.parent){                     
                  return singleList
                };
              }) 
              console.log(currentList,"currentList at 118");
              
              updateCurrentList(pathValue)
          if(listToberender!=null){
            setCurrentList(listToberender);

            }else{
              setCurrentList([]);
            }
          console.log(currentList,"currentList at 122");
        }
      }
      else{

        setQueryValue(val);

         let newPath=[];
          if(queryValue.length>1){
            newPath = path.split("/");
                if(newPath[newPath.length-1]!=val){
                      pathValue=path+"/"+val
                      setPath(path+"/"+val)
                    
                }
                else{
                  console.log("'same value");
                  
                }
          
          }
          if(path!="root"){
            let listToberender=list.filter((singleList)=>{
                
              if(path==singleList.parent){  
                  
                return singleList
              };
            }) 
            updateCurrentList(pathValue)
            if(listToberender!=null){
            setCurrentList(listToberender);

            }else{
              setCurrentList([]);
            }
          }
      }   
  }

  const settingLeftBarPathValue=(name:string,type:string,parent?:string)=>{   
    console.log("inside settingpath at 124");
    
   let newPath=[];
     if(type=="file"){
       setQueryValue(name);

           if(queryValue.length>1){
             pathValue=parent+"/"+name
             newPath = pathValue.split("/");
               if(newPath[newPath.length-1]!=name){
                 pathValue=parent+"/"+name
                 setPath(pathValue)
                 handleSubmit()
                   }
               else{
                     console.log("'same value");
                     
                   }
           }
           if(pathValue!="root"){
             let listToberender=list.filter((singleList)=>{
                                 
               if(pathValue==singleList.parent){                     
                 return singleList
               };
             }) 
             console.log(currentList,"currentList at 118");
             
             updateCurrentList(pathValue)
         if(listToberender!=null){

           setCurrentList(listToberender);

           }else{
             setCurrentList([]);
           }
         console.log(currentList,"currentList at 122");
       }
     }
     else{

       setQueryValue(name);

        let newPath=[];
         if(queryValue.length>1){
           newPath = pathValue.split("/");
               if(newPath[newPath.length-1]!=name){
                     pathValue=parent+"/"+name
                     setPath(pathValue+"/"+name)
                   
               }
               else{
                 console.log("'same value");
                 
               }
         
         }
         if(path!="root"){
           let listToberender=list.filter((singleList)=>{
               
             if(pathValue==singleList.parent){  
                 
               return singleList
             };
           }) 
           updateCurrentList(pathValue)
           if(listToberender!=null){
           setCurrentList(listToberender);

           }else{
             setCurrentList([]);
           }
         }
     }   
 }

  function handleSubmit(){

    axios.get(url)
    .then((response)=>{
       setResult(response.data.results);
       console.log(result);
    })
    // .catch((err)=>{
      
    // })
  }

  const updatePath=()=>{
   
    let newPath = path.split("/");
    newPath.splice(newPath.length - 1, 1);

      if(newPath.length==0){
        newPath=["root"]
        setResult({});
      }
    let validPath=newPath.join('/')

    
    updateCurrentList(validPath)
    setPath(validPath);
    setResult([]);
    setQueryValue("");
  }

  const updateCurrentList=(validPath:string)=>{
    
    console.log(currentList,"currentList at 204");
     let listToberender=list.filter((singleList)=>{
        if(validPath==singleList.parent){           
          return singleList
        };
    }) 
    if(listToberender!==null){
    setCurrentList(listToberender);
    }else{
      setCurrentList([]);
    }
    console.log(currentList,"currentList at 212");
  }

  const sideBar=(newList:structure[])=>{

  let leftContent=[];

      leftContent=list.filter((singleList)=>{
        
          if(singleList.parent=='root'){
            leftContent.push(singleList);
          }
        return singleList
      })
      
      let newArr=[...leftContent,newList];    
      setSidebarList([...leftContent,...newList]);
  }

  return (
    <div className="App">

        <Leftbar  
                sideBarList={sideBarList} settingLeftBarPathValue={settingLeftBarPathValue}/>
        <Rightbar 
        settingPathValue={settingPathValue}
        updatePath={updatePath}
        currentList={currentList}
        path={path}
        result={result}
        list={list}
        setType={setType}
        handleChange={handleChange}
        buttonHandler={buttonHandler}
        name={name}
        creator={creator}
        size={size}
        setCurrentList={setCurrentList}
        type={type}
        updateCurrentList={updateCurrentList}             />
         
         
    </div>
  );
}
export default App;


















// let currentList=[];
//     useEffect(()=>{
      
//      currentList list.filter((ls)=>{
      
//         ls.directory

//       })

      
//     },[path])

  
  // const searchImage=(query:string)=>{
  //   console.log("queryvalueIsNull");

  //     setQueryValue(query);
  //     setTimeout(()=>{  handleSubmit()},2000)
    
  // }


    // const handlePhotoname=(event:ChangeEvent<HTMLInputElement>)=>{
  //      setQueryValue(event.target.value);
  // }

















//before implementing Redux



//   import React, { useEffect } from 'react';
// import {useState,ChangeEvent} from "react";
// import axios from 'axios';

// import {structure} from "./interfaces/interface"
// import {DummmyFileStructure} from "./utils/DummyFileStructure"
// import {useDispatch, useSelector } from 'react-redux';

// import Leftbar from './components/LeftBar';
// import Rightbar from './components/RightBar';
// import { bindActionCreators } from 'redux';
// import { actionCreators } from "./exportFile"
// import { RootState } from '../src/reducers/index';

// import './App.css';


// function App() {

//   let url="";
//   let pathValue="";

//   const dispatch = useDispatch();

// const rootList = useSelector((state: RootState) => state.rootList)
// const list = useSelector((state: RootState) => state.rootList)


//   const state = useSelector((state: RootState) => state.bank)
//   const { AddRootList} = bindActionCreators(actionCreators, dispatch)
//   const [type,setType]=useState<string>("");
//   const [name,setName]=useState<string>("");
//   const [creator,setCreator]=useState<string>("");
//   const [size,setSize]=useState<number>(0);
//   const [list,setList]=useState<structure[]>(DummmyFileStructure);
//   const [rootList,setRootList]=useState<structure[]>(DummmyFileStructure);
//   const [sideBarList,setSidebarList]=useState<structure[]>([]);
//   let   [currentList,setCurrentList]=useState<structure[]>([]);
//   const [result,setResult]=useState<any>({});
//   const [queryValue,setQueryValue]=useState<string>("");
//   const [path,setPath]=useState<string>("root");



//   const buttonHandler = () => {

//   let id= (new Date().getTime() * Math.random() * 100000)
//     const newList= { id:id,type: type,name: name,creator:creator,size: size,parent:path};
//     console.log(newList," newList at 38");

//         setList([...list,newList]);
// AddList([newList]);
//         if(newList.parent=='root'){
//           // setRootList([...rootList,newList])
//           console.log(rootList,rootList);
          
//           AddRootList([newList]);

//           console.log(rootList);
//           sideBar([newList]);
//         }
//         const _list=[...list,newList];
//         if(path!='root'){
//           let listToberender=_list.filter((singleList)=>{

//             if(path==singleList.parent){                
//               return singleList
//             };
//           }) 
//           if(listToberender!=null){
//             setCurrentList(listToberender);
//             }else{
//               setCurrentList([]);
//             }
//         }
       
//         setType(type)
//         setName("");
//         setCreator("");
//         setSize(0);  


//   };

//   useEffect(()=>{
//      url="https://api.unsplash.com/search/photos?&per_page=100&page=100&query="+queryValue+"&client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cYU"  

//     console.log(list,"list")
//     console.log(path,"path")
//     console.log(currentList,"currentList");
   
//     console.log("------------------------");
    
//     //console.log(result,"resultsArray");
//     // console.log(queryValue,"queryvalue");
    
//   },[list,path,result,queryValue])

//   useEffect(()=>{
//     sideBar([])
//     console.log("display it");
//     console.log("------------------------");
//     return () => {
//       console.log("unmounted");
//     };
  
//   },[])
  
//   const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
//     if (event.target.name === "name") {
//       setName(event.target.value);
//     } 
//     else if(event.target.name=="creator"){
//       setCreator(event.target.value);
//     } 
//     else if(event.target.name="size"){
//       setSize(Number(event.target.value))
//     }
//   }

//   const settingPathValue=(val:string,type:string)=>{   
//      console.log("inside settingpath at 124");
     
//     let newPath=[];
//       if(type=="file"){
//         setQueryValue(val);

//             if(queryValue.length>1){
//               pathValue=path+"/"+val
//               newPath = path.split("/");
//                 if(newPath[newPath.length-1]!=val){
//                   pathValue=path+"/"+val
//                   setPath(pathValue)
//                   handleSubmit()
//                     }
//                 else{
//                       console.log("'same value");
                      
//                     }
//             }
//             if(path!="root"){
//               let listToberender=list.filter((singleList)=>{
                                  
//                 if(pathValue==singleList.parent){                     
//                   return singleList
//                 };
//               }) 
//               console.log(currentList,"currentList at 118");
              
//           updateCurrentList(pathValue)
//           if(listToberender!=null){
//             setCurrentList(listToberender);
//             }else{
//               setCurrentList([]);
//             }
//           console.log(currentList,"currentList at 122");
//         }
//       }
//       else{

//         setQueryValue(val);

//          let newPath=[];
//           if(queryValue.length>1){
//             newPath = path.split("/");
//                 if(newPath[newPath.length-1]!=val){
//                       pathValue=path+"/"+val
//                       setPath(path+"/"+val)
                    
//                 }
//                 else{
//                   console.log("'same value");
                  
//                 }
          
//           }
//           if(path!="root"){
//             let listToberender=list.filter((singleList)=>{
                
//               if(path==singleList.parent){  
                  
//                 return singleList
//               };
//             }) 
//             updateCurrentList(pathValue)
//             if(listToberender!=null){
//             setCurrentList(listToberender);
//             }else{
//               setCurrentList([]);
//             }
//           }
//       }   
//   }

//   const settingLeftBarPathValue=(name:string,type:string,parent?:string)=>{   
//     console.log("inside settingpath at 124");
    
//    let newPath=[];
//      if(type=="file"){
//        setQueryValue(name);

//            if(queryValue.length>1){
//              pathValue=parent+"/"+name
//              newPath = pathValue.split("/");
//                if(newPath[newPath.length-1]!=name){
//                  pathValue=parent+"/"+name
//                  setPath(pathValue)
//                  handleSubmit()
//                    }
//                else{
//                      console.log("'same value");
                     
//                    }
//            }
//            if(pathValue!="root"){
//              let listToberender=list.filter((singleList)=>{
                                 
//                if(pathValue==singleList.parent){                     
//                  return singleList
//                };
//              }) 
//              console.log(currentList,"currentList at 118");
             
//          updateCurrentList(pathValue)
//          if(listToberender!=null){
//            setCurrentList(listToberender);
//            }else{
//              setCurrentList([]);
//            }
//          console.log(currentList,"currentList at 122");
//        }
//      }
//      else{

//        setQueryValue(name);

//         let newPath=[];
//          if(queryValue.length>1){
//            newPath = pathValue.split("/");
//                if(newPath[newPath.length-1]!=name){
//                      pathValue=parent+"/"+name
//                      setPath(pathValue+"/"+name)
                   
//                }
//                else{
//                  console.log("'same value");
                 
//                }
         
//          }
//          if(path!="root"){
//            let listToberender=list.filter((singleList)=>{
               
//              if(pathValue==singleList.parent){  
                 
//                return singleList
//              };
//            }) 
//            updateCurrentList(pathValue)
//            if(listToberender!=null){
//            setCurrentList(listToberender);
//            }else{
//              setCurrentList([]);
//            }
//          }
//      }   
//  }

//   function handleSubmit(){

//     axios.get(url)
//     .then((response)=>{
//        setResult(response.data.results);
//        console.log(result);
//     })
//     // .catch((err)=>{
      
//     // })
//   }

//   const updatePath=()=>{
   
//     let newPath = path.split("/");
//     newPath.splice(newPath.length - 1, 1);

//       if(newPath.length==0){
//         newPath=["root"]
//         setResult({});
//       }
//     let validPath=newPath.join('/')

    
//     updateCurrentList(validPath)
//     setPath(validPath);
//     setResult([]);
//     setQueryValue("");
//   }

//   const searchFolder=(e: ChangeEvent<HTMLInputElement>)=>{
//     const originalList=list;

//     currentList=list.filter((singleList)=>{
//       return singleList.name.toLowerCase().includes(e.target.value.toLowerCase());
//     })
 
//      if(e.target.value==''){
//       updateCurrentList(path)
//      }else{
//        setCurrentList(currentList)
//      }


//   }

//   const updateCurrentList=(validPath:string)=>{
    
//     console.log(currentList,"currentList at 204");
//      let listToberender=list.filter((singleList)=>{
//         if(validPath==singleList.parent){           
//           return singleList
//         };
//     }) 
//     if(listToberender!==null){
//     setCurrentList(listToberender);
//     }else{
//       setCurrentList([]);
//     }
//     console.log(currentList,"currentList at 212");
//   }

//   const sideBar=(newList:structure[])=>{

//   let leftContent=[];

//       leftContent=rootList.filter((singleList)=>{
        
//           if(singleList.parent=='root'){
//             leftContent.push(singleList);
//           }
//         return singleList
//       })
      
//       let newArr=[...leftContent,newList];    
//       setSidebarList([...leftContent,...newList]);
//   }

//   return (
//     <div className="App">

//         <Leftbar  
//                 sideBarList={sideBarList} settingLeftBarPathValue={settingLeftBarPathValue}/>
//         <Rightbar 
//                 sideBarList={sideBarList} 
//                 searchFolder={searchFolder} 
//                 settingPathValue={settingPathValue}  
//                 updatePath={ updatePath} 
//                 currentList={currentList} 
//                 path={path} 
//                 rootList={state} 
//                 result={result}
//                 list={list}
//                 setType={setType} 
//                 handleChange={handleChange} 
//                 buttonHandler={buttonHandler} 
//                 name={name} 
//                 creator={creator} 
//                 size={size}
//                 setList={setList}
//                 />
          
//     </div>
//   );
// }
// export default App;


















// let currentList=[];
//     useEffect(()=>{
      
//      currentList list.filter((ls)=>{
      
//         ls.directory

//       })

      
//     },[path])

  
  // const searchImage=(query:string)=>{
  //   console.log("queryvalueIsNull");

  //     setQueryValue(query);
  //     setTimeout(()=>{  handleSubmit()},2000)
    
  // }


    // const handlePhotoname=(event:ChangeEvent<HTMLInputElement>)=>{
  //      setQueryValue(event.target.value);
  // }