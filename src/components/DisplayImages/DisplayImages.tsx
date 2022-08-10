import React, {
  useCallback,
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
} from "react";

import err from "../../images/error.png";
import noImage from "../../images/noImage.png";

const clientID = `?client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cY`;
const mainUrl = `https://api.unsplash.com/photos/`;
const searchUrl = `https://api.unsplash.com/search/photos/`;

interface Props {
  queryValue: string;
  type: string;
  path: string;
  setError: Dispatch<SetStateAction<string>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  error: string;
  loading: boolean;
}

const DisplayImage = ({
  queryValue,
  type,
  path,
  setError,
  setLoading,
  error,
  loading,
}: Props) => {
  const [photos, setPhotos] = useState<[]>([]);
  const [page, setPage] = useState<number>(0);
  const [clicked, setClicked] = useState<boolean>(false);
  const loader = useRef(null);

  let btnShow = document.querySelector(".btnForLoadMore") as HTMLElement;
  if (path !== "root") {
    if (path != "root" && type == "file") {
      if (btnShow) {
        btnShow.style.display = "block";
      }
    } else {
      btnShow.style.display = "none";
    }
  } else {
    if (btnShow) {
      btnShow.style.display = "none";
    }
  }

  useEffect(() => {
    fetchImages();
  }, [page]);

  const fetchImages = async () => {
    setLoading(true);
    let url = "";
    const urlPage = `&page=${page}`;
    const urlQuery = `&query=${queryValue}`;
    if (queryValue) {
      url = `${searchUrl}${clientID}${urlPage}${urlQuery}`;
    }
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("data", data);
      console.log(queryValue, "querya  at 24");
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
    } catch (err: any) {
      setLoading(true);
      if (error?.length > 0) {
        setError(error);
      } else {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    let div = document.querySelector(".btnForLoadMore") as HTMLElement;
    const event: any = div.addEventListener("click", () => {
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

  const handleObserver = useCallback((entries: any) => {
    fetchImages();
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };

    setClicked(!clicked);

    const observer = new IntersectionObserver(handleObserver, option);
    if (loader.current) observer.observe(loader.current);
  }, [handleObserver]);

  const isPhotosVisible =
    photos?.length > 0 &&
    queryValue &&
    type === "file" &&
    path !== "root" &&
    !error;

  return (
    <div className="di55displayImage">
      <div className="di55div"
        style={{ display: "flex", flexDirection: "column" }}>
        <div ref={loader}>
          {isPhotosVisible ? (
            photos.map((image: any, index: number) => (
              <div
                key={index}
                className="col-md-2"
                style={{ marginRight: "20px" }}
              >
                {
                  <>
                    <img
                      width="250px"
                      height="250px"
                      style={{ margin: "50px", borderRadius: "15px" }}
                      key={index}
                      src={image.urls.small}
                      data-toggle="modal"
                      data-target={`#exampleModalCenterDiv${index}`}
                    />
                    <div
                      className="modal fade"
                      id={`exampleModalCenterDiv${index}`}
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
                              width="250px"
                              height="250px"
                              style={{ margin: "10px", borderRadius: "15px" }}
                              key={index}
                              src={image.urls.small}
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
                }
              </div>
            ))
          ) : error?.length > 1 ? (
            <div>
              <h1>{error}</h1>
              <img src={err} />
            </div>
          ) : path != "root" && type == "file" ? (
            <img width="400px" height="300px" src={noImage} />
          ) : (
            ""
          )}
        </div>
        <div>
          {
            <button
            className="di55btnForLoadMore"
              style={{
                display: "none",
                background: "linear-gradient(75deg, #00E39F, #00C4E1)",
                padding: "10px",
                margin: "auto",
                marginBottom: "40px",
              }}

            >
              Load More ..
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
