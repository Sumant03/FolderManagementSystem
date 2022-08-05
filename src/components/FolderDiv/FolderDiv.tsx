import img1 from "../../images/add-folder.png"
import React, { ChangeEvent, Dispatch,SetStateAction } from "react";
interface Props{


    handleChange:(event: ChangeEvent<HTMLInputElement>)=>void
    buttonHandler:()=>void
    setType: Dispatch<SetStateAction<string>>
    name:string
    creator:string
    size:number
    }


const Folderdiv=({setType,handleChange,buttonHandler,name,creator,size}:Props)=>{

 
  return(

    <div className="folderDiv" >

          <div>
              <span>
                      <img src={img1} width="135px" className="folderDiv33size size"   data-toggle="modal" data-target="#exampleCenter" />
                 
              </span>
          </div>

          <div className="modal fade" id="exampleCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content" style={{background:"	##E8E8E8"}}>
                <div className="modal-header">
                  <h3 className="modal-title" id="exampleModalLongTitle" >Create New Folder</h3>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <span>
                    <span>
                      <button style={{background: "linear-gradient(75deg, #00E39F, #00C4E1)"}} onClick={()=> setType("file")} className='create btn-primary'>Create File</button>
                    </span>
                    <span>
                      <button style={{background: "linear-gradient(75deg, #00E39F, #00C4E1)"}} onClick={()=>setType("folder")}className='create btn-primary'>Create Folder</button>
                    </span>
                  </span>
                  <div className='modalInputs'>
                    <div>
                      <input type="text"  value={name}  style={{padding:"20px"}} name="name" onChange={handleChange} placeholder='Name.....'/>
                    </div>
                    <div>
                      <input type="text" value={creator} style={{padding:"20px"}}  name="creator" onChange={handleChange} placeholder='Creator.....'/>
                    </div>
                    <div>
                      <input type="number"  value={size} style={{padding:"20px"}} name="size" onChange={handleChange} placeholder='Size....'/>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button style={{background: "linear-gradient(75deg, #00E39F, #00C4E1)"}} type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button style={{background: "linear-gradient(75deg, #00E39F, #00C4E1)"}} onClick={buttonHandler} type="button" data-dismiss="modal" className="buttonClick btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
          </div>

        </div>

)
}

export default Folderdiv;    























// <div className="folderDiv" >

// <div style={{margin:"40px",fontSize:"60px",marginTop:"30px"}}>
//     <span >
//             <i className="bi bi-plus-square-dotted"   data-toggle="modal" data-target="#exampleModalCenter" ></i>
//     </span>
// </div>
// {/* font-size:100px;
// margin-left:40px; */}

// <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//   <div className="modal-dialog modal-dialog-centered" role="document">
//     <div className="modal-content">
//       <div className="modal-header">
//         <h5 className="modal-title" id="exampleModalLongTitle" >Create New</h5>
//         <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//           <span aria-hidden="true">&times;</span>
//         </button>
//       </div>
//       <div className="modal-body">
//         <span>
//           <span>
//             <button  onClick={()=> setType("file")} className='create btn-primary'>Create File</button>
//           </span>
//           <span>
//             <button  onClick={()=>setType("folder")}className='create btn-primary'>Create Folder</button>
//           </span>
//         </span>
//         <div className='modalInputs'>
//           <div>
//             <input value={name}  name="name" onChange={handleChange} placeholder='Name'/>
//           </div>
//           <div>
//             <input value={creator} name="creator" onChange={handleChange} placeholder='Creator'/>
//           </div>
//           <div>
//             <input value={size} name="size" onChange={handleChange} placeholder='Size'/>
//           </div>
//           <div>
//             <input placeholder='Date'/>
//           </div>
//         </div>
//       </div>
//       <div className="modal-footer">
//         <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//         <button onClick={buttonHandler} type="button" data-dismiss="modal" className="buttonClick btn btn-primary">Save changes</button>
//       </div>
//     </div>
//   </div>
// </div>
// </div>









//before implementing redux




// import React, { ChangeEvent, Dispatch,SetStateAction } from "react";
// import { structure } from "../interfaces/interface";
// import DisplayName from "./DisplayName"
// interface Props{


//     handleChange:(event: ChangeEvent<HTMLInputElement>)=>void
//     buttonHandler:()=>void
//     setType: Dispatch<SetStateAction<string>>
//     name:string
//     creator:string
//     size:number
//     }


// const Folderdiv=({setType,handleChange,buttonHandler,name,creator,size}:Props)=>{

 
//   return(
//     <div className="folderDiv" >

//           <div>
//               <span >
//                       <i className="folderDiv33size bi bi-plus-square-dotted"   data-toggle="modal" data-target="#exampleModalCenter" ></i>
//               </span>
//           </div>

//           <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
//             <div className="modal-dialog modal-dialog-centered" role="document">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h5 className="modal-title" id="exampleModalLongTitle" >Create New</h5>
//                   <button type="button" className="close" data-dismiss="modal" aria-label="Close">
//                     <span aria-hidden="true">&times;</span>
//                   </button>
//                 </div>
//                 <div className="modal-body">
//                   <span>
//                     <span>
//                       <button  onClick={()=> setType("file")} className='create btn-primary'>Create File</button>
//                     </span>
//                     <span>
//                       <button  onClick={()=>setType("folder")}className='create btn-primary'>Create Folder</button>
//                     </span>
//                   </span>
//                   <div className='modalInputs'>
//                     <div>
//                       <input value={name}  name="name" onChange={handleChange} placeholder='Name'/>
//                     </div>
//                     <div>
//                       <input value={creator} name="creator" onChange={handleChange} placeholder='Creator'/>
//                     </div>
//                     <div>
//                       <input value={size} name="size" onChange={handleChange} placeholder='Size'/>
//                     </div>
//                     <div>
//                       <input placeholder='Date'/>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="modal-footer">
//                   <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
//                   <button onClick={buttonHandler} type="button" data-dismiss="modal" className="buttonClick btn btn-primary">Save changes</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

// )
// }

// export default Folderdiv;    













