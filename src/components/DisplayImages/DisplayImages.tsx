import React, { useCallback, useEffect, useState ,useRef} from "react";
import { Card, Button, Space } from "antd";
import { DoubleArrow } from "@mui/icons-material";
const clientID = `?client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cYU`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

interface Props{
  queryValue:string
  type:string
  path:string
}


const DisplayImage=({queryValue,type,path}:Props)=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [photos, setPhotos] = useState<[]>([]);
    const [page, setPage] = useState<number>(0);
    const [clicked,setClicked]=useState<boolean>(false);
    const [query, setQuery] = useState<string>("");
    const [error,setError]=useState<string>("");

  const loader=useRef(null)
  let btnShow=document.querySelector(".btnForLoadMore") as HTMLElement;
  // if(type=='file'){
  //   btnShow.style.display='block'
  //   console.log(type);
    
  // }else{
  //   btnShow.style.display='none';
  // }
    
    useEffect(() => {
        fetchImages();

        
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page]);

    const fetchImages = async () => {
        setLoading(true);
        let url;
        const urlPage = `&page=${page}`;
        const urlQuery = `&query=${queryValue}`;
        if (queryValue) {
          url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
        } else {
          url = `${mainUrl}${clientID}${urlPage}`;
        }
        try {
          const response = await fetch(url)
          const data = await response.json();
          console.log("data", data);
          console.log(queryValue,"querya  at 24");
          setPhotos((oldPhotos) => {
            if (queryValue && page === 1) {
              return data.results;
            } else if (queryValue) {
              return [...oldPhotos, ...data.results];
            } else {
              return [...oldPhotos, ...data];
            }
          });
          setLoading(false);
        } catch (error) {

          setLoading(false);
        }
      };

      useEffect(() => {
        let div=document.querySelector(".bi-folder-fill") as HTMLElement;
        const event:any = div.addEventListener("click", () => {
          if (
            (!loading && window.innerHeight + window.scrollY) >=
            document.body.scrollHeight - 2
          ) {
            setPage((oldPage) => {
              return oldPage + 1;
            });
          }
        });
    
        return () => div.removeEventListener("click", event);
      }, []);


      const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        fetchImages()
      };

      const handleObserver = useCallback((entries:any) => {
       
      }, []);
    
      useEffect(() => {
        const option = {
          root: null,
          rootMargin: "20px",
          threshold: 0
        };

          setClicked(!clicked);

        const observer = new IntersectionObserver(handleObserver, option);
        if (loader.current) observer.observe(loader.current);
      }, [handleObserver]);


    

return(
    <div className="displayKrdeBhai">
     <div >

      <div  ref={loader}>
        {(photos&&queryValue&&type=='file'&&path!='root')&&photos.map((image:any, index:number) => (
          <div key={index} className="col-md-4">
{
                <>
                {/* <img
                  src={image.urls.regular}
                  alt="Image"
                  style={{ width:"250px" ,height: "250px",margin:"20px",borderRadius:"20px", objectFit: "cover" }}
                /> */}
                <img width="300px" height="300px" style={{margin:"20px",borderRadius:"15px"}}key={index} src={image.urls.small}  data-toggle="modal" data-target={`#exampleModalCenterDiv${index}`} /> 

                <div className="modal fade"  id={`exampleModalCenterDiv${index}`} tabIndex={-1} role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                      <div className="modal-dialog modal-dialog-centered" role="document">
                      <div className="modal-content">
                        {/* <div className="modal-header">

                        </div> */}
                        <div className="modal-body">

                        <img width="450px" height="450px" style={{margin:"10px",borderRadius:"15px"}}key={index} src={image.urls.small} /> 

                        </div>
                        <div className="modal-footer">
                          <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>

                        </div>
                      </div>
                      </div>
                </div>
                </>
              }

          </div>
        ))}
      </div>

      {<Button  className="btnForLoadMore">Load More ..</Button>}
    </div>
    </div>
)

}

export default DisplayImage





// import axios from "axios";
// import { useCallback, useRef, useState } from "react";

// import "./customFolder.css";

// // import ImageThumbnail from "../../common/ImageThumbnail";

// const Images = (props: AppProps) => {
//   const observer = useRef<IntersectionObserver>();

//   const [imageData, setImageData] = useState<Array<any>>(JSON.parse(localStorage[props.folderName] || null) || []);
//   const [errorMessage, setErrorMessage] = useState<string>("");

//   const LoadMore = async () => {
//     let randomPosts;
//     let newImages: any;
//     try {
//       randomPosts = await axios.get(
//         `https://api.unsplash.com/photos/random?page=1&query=${props.folderName}&count=10&client_id=A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I`
//       );
//       newImages = randomPosts.data;
//     } catch (error: any) {
//       newImages = [];
//       if (error.response.status === 404) {
//         setErrorMessage("Images Not Found.");
//       } else {
//         setErrorMessage(error.message);
//       }
//     }
//     // TcS3v_GtSFzM9_jiqfdfLD-l8wmfuIZ_H5__afwvPec
//     // A2Yc5MAMwsJ4NJ0bPX851Zs7n3l3GILUXoIbuvqib3I
//     // iCJ88n7zrJEbDaDih1boz9UbAFAb3vXVitmfo6UNWek

//     setImageData((prevData: any) => [...prevData, ...newImages]);
//     localStorage.setItem(props.folderName, JSON.stringify(imageData));
//   };

//   const lastElementRef = useCallback(
//     (node: HTMLImageElement) => {
//       if (observer.current) observer.current.disconnect();

//       observer.current = new IntersectionObserver((loader) => {
//         if (loader[0].intersectionRatio) LoadMore();
//       });

//       if (node) observer.current.observe(node);
//     },
//     [LoadMore]
//   );

//   return (
//     <div>
//       {/* error message */}
//       {props.type=="file" && errorMessage.length > 0 && (
//         <div className="cuf198Error">
//           <div></div>
//           <h2>{errorMessage}</h2>
//         </div>
//       )}

//       <>{props.children}</>

//       {/* images */}
//       {props.type==="file" && errorMessage.length === 0 && (
//         <>
//           {imageData.map((data: any) => {
//             return <ImageThumbnail {...data} />;
//           })}
//         </>
//       )}

//       {/* loader */}
//       {props.type==="file" && errorMessage.length === 0 && (
//         <div ref={lastElementRef} className="cuf197LoadImagesParent">
//           <div className="cuf196LoadImages"></div>
//         </div>
//       )}
//     </div>
//   );
// };

// type AppProps = {
//   folderName: string;
//   children: React.ReactNode;
//   type: string;
// };

// export default Images;




// import React, { Component } from "react";
// import axios from "axios";
// import InInfiniteScroll from "react-infinite-scroll-component";
// import Image from "./DisplayImage";

// export class Images extends Component {
//   state = {
//     images: [],
//     count: 30,
//     start: 1
//   };

//   componentDidMount() {
//     const { count, start } = this.state;
//     axios
//       .get(`/api/photos?count=${count}&start=${start}`)
//       .then(res => this.setState({ images: res.data }));
//   }

//   fetchImage = () => {
//     const { count, start } = this.state;
//     this.setState({ start: this.state.start + count });
//     axios
//       .get(`/api/photos?count=${count}&start=${start}`)
//       .then(res =>
//         this.setState({ images: this.state.images.concat(res.data) })
//       );
//   };
  
//   render() {
//     return (
//       <div className='images'>
//         <InInfiniteScroll
//           dataLength={this.state.images.length}
//           next={this.fetchImage}
//           hasMore={true}
//           loader={<h4>Loading...</h4>}
//         >
//           {this.state.images.map(data => (
//             <Image image={data} />
//           ))}
//         </InInfiniteScroll>
//       </div>
//     );
//   }
// }

// export default Images;










