import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import axios from "axios";

import { structure } from "./interfaces/interface";
import { useDispatch, useSelector } from "react-redux";

import Leftbar from "../src/components/LeftBar/LeftBar";
import Rightbar from "../src/components/RightBar/RightBar";
import { bindActionCreators } from "redux";
import { actionCreators } from "./exportFile";
import { RootState } from "../src/reducers/index";

import "./App.css";

function App() {
  let url = "";
  let pathValue = "";

  const dispatch = useDispatch();

  const rootList = useSelector((state: RootState) => state.rootList);
  const list = useSelector((state: RootState) => state.list);

  const { addRootList, addList } = bindActionCreators(actionCreators, dispatch);
  const [type, setType] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [creator, setCreator] = useState<string>("");
  const [size, setSize] = useState<number>(0);
  const [sideBarList, setSidebarList] = useState<structure[]>([]);
  let [currentList, setCurrentList] = useState<structure[]>([]);
  const [result, setResult] = useState<any>({});
  const [queryValue, setQueryValue] = useState<string>("");
  const [path, setPath] = useState<string>("root");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [pathArray, setPathArray] = useState<string[]>(["root"]);
  const [toggleFolder, setToggleFolder] = useState<boolean>(false);

  const buttonHandler = () => {
    let id = new Date().getTime() * Math.random() * 100000;
    const newList = {
      id: id,
      type: type,
      name: name,
      creator: creator,
      size: size,
      parent: path,
    };
    console.log(newList, " newList at 38");
    addList([newList]);
    if (newList.parent == "root") {
      // setRootList([...rootList,newList])
      console.log(rootList, rootList);

      addRootList([newList]);

      console.log(rootList);
      sideBar([newList]);
    }
    const _list = [...list, newList];
    if (path != "root") {
      let listToberender = _list.filter((singleList) => {
        if (path == singleList.parent) {
          return singleList;
        }
      });
      updateCurrentList(pathValue);
      if (listToberender != null) {
        setCurrentList(listToberender);
      } else {
        setCurrentList([]);
      }
    }
    setToggleFolder(!toggleFolder);
    setType(type);
    setName("");
    setCreator("");
    setSize(0);
  };

  useEffect(() => {
    url =
      "https://api.unsplash.com/search/photos?&per_page=100&page=100&query=" +
      queryValue +
      "&client_id=nkIb2TlHTpFd4IRQWTgFMF9cFwA60eemmLpwZ7H-cYU";
  }, [list, path, result, queryValue, toggleFolder]);

  useEffect(() => {
    sideBar([]);
    // console.log("display it");
    // console.log("------------------------");
    return () => {
      // console.log("unmounted");
    };
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "name") {
      setName(event.target.value);
    } else if (event.target.name == "creator") {
      setCreator(event.target.value);
    } else if ((event.target.name = "size")) {
      setSize(Number(event.target.value));
    }
  };

  const settingPathValue = (val: string, type: string) => {
    console.log("inside settingpath at 124");

    let newPath = [];
    if (type == "file") {
      setQueryValue(val);

      if (queryValue.length > 1) {
        pathValue = path + "/" + val;
        newPath = path.split("/");
        if (newPath[newPath.length - 1] != val) {
          pathValue = path + "/" + val;
          localStorage.setItem("path", pathValue);
          if (pathArray.length < 1) {
            setPathArray(["root"]);
          } else {
            if (pathArray[pathArray.length - 1] != val) {
              setPathArray([...pathArray, val]);
            }
          }
          setPath(pathValue);
          handleSubmit();
        } else {
          console.log("'same value");
        }
      }
      if (path != "root") {
        let listToberender = list.filter((singleList) => {
          if (pathValue == singleList.parent) {
            return singleList;
          }
        });

        let btnShow = document.querySelector(".btnForLoadMore") as HTMLElement;

        if (path != "root" && type == "file") {
          btnShow.style.display = "block";
        } else {
          btnShow.style.display = "none";
        }

        console.log(currentList, "currentList at 118");

        updateCurrentList(pathValue);
        if (pathArray.length < 1) {
          setPathArray(["root"]);
        } else {
          if (pathArray[pathArray.length - 1] != val) {
            setPathArray([...pathArray, val]);
          }
        }

        console.log(pathArray, "pathArray at 155");

        if (listToberender != null) {
          setCurrentList(listToberender);
        } else {
          setCurrentList([]);
        }
        console.log(currentList, "currentList at 122");
      }
    } else {
      setQueryValue(val);

      let newPath = [];
      if (queryValue.length > 1) {
        newPath = path.split("/");
        if (newPath[newPath.length - 1] != val) {
          pathValue = path + "/" + val;
          localStorage.setItem("path", pathValue);
          if (pathArray.length < 1) {
            setPathArray(["root"]);
          } else {
            if (pathArray[pathArray.length - 1] != val) {
              setPathArray([...pathArray, val]);
            }
          }
          setPath(path + "/" + val);
        } else {
          console.log("'same value");
        }
      }
      if (path != "root") {
        let listToberender = list.filter((singleList) => {
          if (path == singleList.parent) {
            return singleList;
          }
        });
        updateCurrentList(pathValue);
        if (pathArray.length < 1) {
          setPathArray(["root"]);
        } else {
          if (pathArray[pathArray.length - 1] != val) {
            setPathArray([...pathArray, val]);
          }
        }
        console.log(pathArray, "pathARRAY AT 199");

        if (listToberender != null) {
          setCurrentList(listToberender);
        } else {
          setCurrentList([]);
        }
      }
    }
    setType(type);
  };

  const settingLeftBarPathValue = (
    name: string,
    type: string,
    parent?: string
  ) => {
    console.log("inside settingpath at 124");

    let newPath = [];
    if (type == "file") {
      setQueryValue(name);

      if (queryValue.length > 1) {
        pathValue = parent + "/" + name;
        newPath = pathValue.split("/");
        if (newPath[newPath.length - 1] != name) {
          pathValue = parent + "/" + name;
          localStorage.setItem("path", pathValue);
          if (pathArray.length < 1) {
            setPathArray(["root"]);
          } else {
            if (pathArray[pathArray.length - 1] != name) {
              setPathArray([...pathArray, name]);
            }
          }
          setPath(pathValue);
          handleSubmit();
        } else {
          console.log("'same value");
        }
      }
      if (pathValue != "root") {
        let listToberender = list.filter((singleList) => {
          if (pathValue == singleList.parent) {
            return singleList;
          }
        });
        console.log(currentList, "currentList at 118");

        updateCurrentList(pathValue);
        if (listToberender != null) {
          setCurrentList(listToberender);
        } else {
          setCurrentList([]);
        }
        console.log(currentList, "currentList at 122");
      }
    } else {
      setQueryValue(name);

      let newPath = [];
      if (queryValue.length > 1) {
        newPath = pathValue.split("/");
        if (newPath[newPath.length - 1] != name) {
          pathValue = parent + "/" + name;
          localStorage.setItem("path", pathValue + "/" + name);
          setPath(pathValue + "/" + name);
          if (pathArray.length < 1) {
            setPathArray(["root"]);
          } else {
            if (pathArray[pathArray.length - 1] != name) {
              setPathArray([...pathArray, name]);
            }
          }
        } else {
          console.log("'same value");
        }
      }
      if (path != "root") {
        let listToberender = list.filter((singleList) => {
          if (pathValue == singleList.parent) {
            return singleList;
          }
        });
        updateCurrentList(pathValue);
        if (listToberender != null) {
          setCurrentList(listToberender);
        } else {
          setCurrentList([]);
        }
      }
    }
  };

  function handleSubmit() {
    axios
      .get(url)
      .then((response: any) => {
        setLoading(false);
        setResult(response.data.results);
        console.log(result);
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(true);
        setError(err.message);
      });
  }

  const updatePath = () => {
    let newPath = path.split("/");
    newPath.splice(newPath.length - 1, 1);

    if (newPath.length == 0) {
      newPath = ["root"];
      setResult({});
    }
    let validPath = newPath.join("/");

    updateCurrentList(validPath);
    localStorage.setItem("path", pathValue);
    setPath(validPath);
    pathArray.pop();
    if (pathArray.length == 0) {
      setPathArray(["root"]);
    } else {
      setPathArray(pathArray);
    }
    console.log(pathArray, "pathArray at 315");
    let btnShow = document.querySelector(".btnForLoadMore") as HTMLElement;
    if (path !== "root") {
      if (path != "root" && type == "file") {
        btnShow.style.display = "block";
      } else {
        btnShow.style.display = "none";
      }
    } else {
      btnShow.style.display = "none";
    }

    setResult([]);
    setQueryValue("");
    setError("");
  };

  const updateCurrentList = (validPath: string) => {
    console.log(currentList, "currentList at 204");
    let listToberender = list.filter((singleList) => {
      if (validPath == singleList.parent) {
        return singleList;
      }
    });
    if (listToberender !== null) {
      setCurrentList(listToberender);
    } else {
      setCurrentList([]);
    }
    console.log(currentList, "currentList at 212");
  };

  const sideBar = (newList: structure[]) => {
    let leftContent = [];

    leftContent = list.filter((singleList) => {
      if (singleList.parent == "root") {
        leftContent.push(singleList);
      }
      return singleList;
    });

    setSidebarList([...leftContent, ...newList]);
  };

  return (
    <div className="App">
      <Leftbar
        sideBarList={sideBarList}
        settingLeftBarPathValue={settingLeftBarPathValue}
      />
      <Rightbar
        size={size}
        error={error}
        loading={loading}
        path={path}
        result={result}
        list={list}
        name={name}
        creator={creator}
        type={type}
        pathArray={pathArray}
        queryValue={queryValue}
        currentList={currentList}
        setPath={setPath} setType={setType} setError={setError}  updatePath={updatePath} setLoading={setLoading}      setPathArray={setPathArray}      handleChange={handleChange}      buttonHandler={buttonHandler}      setCurrentList={setCurrentList}      settingPathValue={settingPathValue}      updateCurrentList={updateCurrentList}      settingLeftBarPathValue={settingLeftBarPathValue}
      />
    </div>
  );
}
export default App;
