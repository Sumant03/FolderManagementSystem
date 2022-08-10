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
import { actionCreators } from "../../exportFile";
import { RootState } from "../../reducers/index";

import grid1 from "../../images/grid1.png";
import grid2 from "../../images/grid2.png";
import grid3 from "../../images/grid3.png";
import grid4 from "../../images/grid4.png";
import err from "../../images/error.png";
import ThreeDots from "../../images/ThreeDots.png";
import menu from "../../images/menu.png";
import noImage from "../../images/noImage.png";
import DisplayData from "../DisplayData/DisplayData";


import "./rightBar.css";
import DisplayImage from "../DisplayImages/DisplayImages";


interface Props {


  path: string;
  type: string;
  name: string;
  size: number;
  error: string;
  creator: string;
  loading: boolean;
  queryValue: string;
  result: structure[];
  list: structure[];
  pathArray: string[];
  currentList: structure[];
  setPath: Dispatch<SetStateAction<string>>;setPathArray: Dispatch<SetStateAction<string[]>>;setCurrentList: Dispatch<SetStateAction<structure[]>>;updateCurrentList(validPath: string): void;settingPathValue(val: string, type: string): void;settingLeftBarPathValue(name: string, type: string, parent?: string): void;updatePath: () => void;handleChange: (event: ChangeEvent<HTMLInputElement>) => void;buttonHandler: () => void;setType: Dispatch<SetStateAction<string>>;setError: Dispatch<SetStateAction<string>>;setLoading: Dispatch<SetStateAction<boolean>>;

}

const Rightbar = ({

  path,
  result,
  name,
  creator,
  size,
  error,
  type,
  loading,
  pathArray,
  currentList,
  setPath,
  setType,
  setError,
  updatePath,
  setLoading,
  settingPathValue,
  handleChange,
  buttonHandler,
  setPathArray,
  setCurrentList,
  updateCurrentList,
  queryValue,
  settingLeftBarPathValue,
}: Props) => {
  const dispatch = useDispatch();


  const rootList = useSelector((state: RootState) => state.rootList);
  const list = useSelector((state: RootState) => state.list);
  const [toggle, setToggle] = useState<boolean>(false);
  const [toggleDelete, setToggleDelete] = useState<boolean>(false);
  const [typeOfDisplay, setTypeOfDisplay] = useState<number>(1);

  const breadCrumStyle= { display: "flex", justifyContent: "space-around" }
  const pathStyle={ display: "flex", justifyContent: "space-between" }
  const gridStyle={ margin: "10px", width: "40px" }
  const noImageStyle={ margin: "10px", width: "40px" }
  let toggleStyle={ margin: "20px", fontSize: "20px", fontWeight: "200" }
  let itemStyle={ display: "flex" }
  let uploadStyle={margin: "0 10px 0 10px",fontSize: "20px",fontWeight: "200",padding: "24px",color: "#6CA0DC",
  }

  useEffect(() => {
    console.log(pathArray);
    console.log(typeOfDisplay);
  }, [pathArray, toggle, toggleDelete, typeOfDisplay]);

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

  function sortArryOnSize() {
    let arr = currentList.sort((a, b) => {
      return a.size - b.size;
    });
    let arr2 = list.sort((a, b) => {
      return a.size - b.size;
    });
    // console.log("clicked");
    // console.log(arr);

    updateCurrentList(path);
    setCurrentList(arr);
    setToggle(!toggle);
    // updatePath();
  }

  function sortArryOnName() {
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
    // console.log("clicked");
    // console.log(arr);

    updateCurrentList(path);
    setCurrentList(arr);
    setToggle(!toggle);
    // updatePath();
  }

  return (
    <div className="rb22right">
      <div className="rb22navbar  navbar">
        <div className="rb22backAndBread"
         style={breadCrumStyle}>
          <div  className="rb22path"
            style={pathStyle}
          >
            <i className="rb22Left bi bi-arrow-left"
              onClick={updatePath}
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
                    <p className="rightBar22bread">{val + " >"}</p>
                  </span>
                );
              })}
            </span>
          </div>
          <div className=" dropdown show"
            style={{ display: "flex", flexDirection: "row", padding: "20px" }}
          >
            <a className="rb22sortFolders bi bi-filter-left dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLink"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={{ fontSize: "25px" }}
            ></a>
            <div
              className="rb22dropdown dropdown-menu"
              aria-labelledby="dropdownMenuLink"
            >
              <p
                className=" rb22sortBySize dropdown-item"
                onClick={sortArryOnSize}
              >
                Size
              </p>
              <p
                className="rb22sortByName dropdown-item"
                onClick={sortArryOnName}
              >
                Name
              </p>
            </div>
          </div>
          <div 
          style={{ color: "white" }}>
            <h1>{"i d dvdasgj"}</h1>
          </div>
        </div>


        <div className="rb22dropdowndiv" 
          style={{ display: "flex" }}>
          <div
            className=" rb22dropdown dropdown show"
            style={{ padding: "20px" }}
          >
            <a
              className="bi bi-tags-fill dropdown-toggle"
              href="#"
              role="button"
              id="dropdownMenuLinkFortags"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              style={toggleStyle}
            ></a>

            <div
              className="dropdown-menu"
              aria-labelledby="dropdownMenuLinkFortags"
              style={{ padding: "3px" }}
            >
              <input
                type="text"
                style={{ padding: "5px", borderRadius: "10px" }}
                placeholder="Add your tags......"
              />
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "red", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Red</span>
              </p>
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "blue", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Blue</span>
              </p>
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "grey", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Grey</span>
              </p>
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "green", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Green</span>
              </p>
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "yellow", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Yellow</span>
              </p>
              <p
                className="dropdown-item"
                style={itemStyle}
              >
                <span
                  style={{ color: "purple", marginRight: "10px" }}
                  className="bi bi-circle-fill "
                >
                  {" "}
                </span>
                <span>Purple</span>
              </p>
              <p className="dropdown-item">
                {" "}
                # Show All
              </p>
            </div>
          </div>

          <div
            className="rb22uploadIcon  bi bi-upload"
            style={uploadStyle}></div>

          <div
            className="rb22dropdown dropdown show"
            style={{ padding: "20px" }}
          >
            <img
              className="rb22toggle dropdown-toggle"
              width="30px"
              role="button"
              id="dropdownMenuLinkForAllItems"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
              height="30px"
              src={ThreeDots}
            />

            <div
              className="rb22dropdownMenu dropdown-menu"
              aria-labelledby="dropdownMenuLinkForAllItems"
              style={{ padding: "5px" }}
            >
              <img height="350px" src={menu} />
            </div>
          </div>
        </div>


        <div className="rb22gridView" 
         style={{ display: "flex" }}>
          <img
            className="rb22grid"
            onClick={() => setTypeOfDisplay(1)}
            style={gridStyle}
            src={grid1}
          />
          <img
            className="rb22grid"
            onClick={() => setTypeOfDisplay(2)}
            style={gridStyle}
            src={grid2}
          />
          <img
            className="rb22grid"
            onClick={() => setTypeOfDisplay(3)}
            style={gridStyle}
            src={grid3}
          />
          <img
            className="rb22grid"
            onClick={() => setTypeOfDisplay(4)}
            style={gridStyle}
            src={grid4}
          />
        </div>


        <div className="rb22Search">
          <div className="rb22container"
            style={{
              display: "flex",
              flexDirection: "row",
              marginLeft: "20px",
            }}>
            <span
              className="rb22searchIcon bi bi-search"
              style={{ fontSize: "20px" }}>
            </span>
            <span>
              {" "}
              <input
                className="rightBar22searchBar"
                onChange={(e) => myDebouncedFunction(e.target.value)}
                placeholder="Search your Folder/File...."
                type="text"
                list="suggestions"
                style={{ width: "200px", height: "45px", borderRadius: "1px" }}
              />
            </span>

            <datalist className="rb22sgg" id="suggestions">
              <option>docs</option>
              <option>apple</option>
              <option>videos</option>
              <option>new.txt</option>
              <option>downloads</option>
            </datalist>
          </div>
        </div>

      </div>

      <DisplayData
        path={path}
        currentList={currentList}
        rootList={rootList}
        settingPathValue={settingPathValue}
        setType={setType}
        toggleDelete={toggleDelete}
        setToggleDelete={setToggleDelete}
        handleChange={handleChange}
        buttonHandler={buttonHandler}
        name={name}
        creator={creator}
        size={size}
        typeOfDisplay={typeOfDisplay}
        type={type}
        settingLeftBarPathValue={settingLeftBarPathValue}
      />

      <div className="rb22Images" >
        {!error && result?.length > 0 ? (
          result.map((photo: any, key: number) => {
            return (
              <>
                <img
                  className="rb22Images"
                  width="250px"
                  height="250px"
                  style={{ margin: "10px", borderRadius: "15px" }}
                  key={key}
                  src={photo.urls.small}
                  data-toggle="modal"
                  data-target={`#exampleModalCenterDiv${key}`}
                />

                <div
                  className="rb22Modal modal fade"
                  id={`exampleModalCenterDiv${key}`}
                  tabIndex={-1}
                  role="dialog"
                  aria-labelledby="exampleModalCenterTitle"
                  aria-hidden="true"
                >
                  <div className="rb22centerModal modal-dialog modal-dialog-centered"
                    role="document"
                  >
                    <div className=" rb22modalContent modal-content">
                      <div className="rb22modalBody modal-body">
                        <img
                          className="rb22imageUrl"
                          width="450px"
                          height="450px"
                          style={{ margin: "10px", borderRadius: "15px" }}
                          key={key}
                          src={photo.urls.small}
                        />
                      </div>
                      <div className="rb22modalFooter modal-footer">
                        <button
                          className="rb22button btn btn-secondary"
                          type="button"
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
        ) : error.length > 1 && path != "root" && type != "folder" ? (
          <div>
            <h1>{error}</h1>
            <img  src={err} />
          </div>
        ) : path != "root" && type == "file" ? (
          <>
          {/* <img width="450px" height="450px" style={noImageStyle} src={noImage} /> */}
          <h1>No Image Found !!!</h1></>

        ) : (
          ""
        )}
      </div>
      {/* <DisplayImage queryValue={queryValue} type={type} path={path} setError={setError} setLoading={setLoading} error={error} loading={loading}/> */}

    </div>
  );
};

export default Rightbar;
