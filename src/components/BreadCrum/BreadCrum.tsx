import React from "react";

interface Props{
    pathArray:string[]|string
}

const BreadCrum=(pathArray:Props)=>{
    return(
        <>
{
(Array.isArray(pathArray))?pathArray.map((val:string)=>{
    return <> <p>{val}</p><p>"/</p> </>
 }):""
}
        



        
        </>
    )
}
export default BreadCrum