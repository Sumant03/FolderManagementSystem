
import React, { useState } from "react";
import { structure } from "../interfaces/interface";

interface Props {
name:string
type:string
size:number
creator:string
}

const Modal= ({name,type,size,creator}: Props) => {
return(
  <>
   <div className="modal fade" id="exampleModalCenter" tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalLongTitle" >Create New</h5>
                  <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <span>
                        
                  </span>
                  <div className='modalInputs'>
                   
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                  <button type="button" data-dismiss="modal" className="buttonClick btn btn-primary">Save changes</button>
                </div>
              </div>
            </div>
   </div>
  
  </>
  
)    
};

export default Modal;
