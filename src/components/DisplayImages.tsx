import React, { useEffect, useState } from "react";
import { Card, Button, Space } from "antd";
import { DoubleArrow } from "@mui/icons-material";
const clientID = `?client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cYU`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

const DisplayImage=()=>{
    const [loading, setLoading] = useState<boolean>(false);
    const [photos, setPhotos] = useState<[]>([]);
    const [page, setPage] = useState<number>(0);
    const [query, setQuery] = useState<string>("");
    
    useEffect(() => {
        fetchImages();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [page]);

    const fetchImages = async () => {
        setLoading(true);
        let url;
        const urlPage = `&page=${page}`;
        const urlQuery = `&query=${query}`;
        if (query) {
          url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
        } else {
          url = `${mainUrl}${clientID}${urlPage}`;
        }
        try {
          const response = await fetch(url);
          const data = await response.json();
          console.log("data", data);
          setPhotos((oldPhotos) => {
            if (query && page === 1) {
              return data.results;
            } else if (query) {
              return [...oldPhotos, ...data.results];
            } else {
              return [...oldPhotos, ...data];
            }
          });
          setLoading(false);
        } catch (error) {
          console.log(error);
        //   alert('Api not working')
          setLoading(false);
        }
      };

      useEffect(() => {
        let div=document.querySelector(".rightContent") as HTMLElement;
        const event:any = div.addEventListener("scroll", () => {
          if (
            (!loading && window.innerHeight + window.scrollY) >=
            document.body.scrollHeight - 2
          ) {
            setPage((oldPage) => {
              return oldPage + 1;
            });
          }
        });
    
        // return () => div.removeEventListener("scroll", event);
      }, []);


      const handleSubmit = (e:React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setPage(1);
      };

return(
    <div className="displayKrdeBhai">
     <div className="container">
      <Space style={{ marginBottom: 16, marginTop: 10 }}>
        <input
          type="text"
          placeholder="Search Images"
          value={query}
          style={{ width: 300 }}
          onChange={(e) => setQuery(e.target.value)}
          className="form-control"
        />
        <Button type="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Space>
      <div className="row">
        {photos.map((image:any, index:number) => (
          <div key={index} className="col-md-4">
            <Card
              cover={
                <img
                  src={image.urls.regular}
                  alt="Image"
                  style={{ width:"250px" ,height: "250px",margin:"20px",borderRadius:"20px", objectFit: "cover" }}
                />
              }
            />
          </div>
        ))}
      </div>
    </div>
    </div>
)

}

export default DisplayImage
