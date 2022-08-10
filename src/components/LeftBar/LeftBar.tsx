import React from "react";
import { structure } from "../../interfaces/interface";
import DisplayName from "../DisplayName/DisplayName";


import "./leftbar.css";

interface Props {
  sideBarList: structure[];
  settingLeftBarPathValue(name: string, type: string, parent?: string): void;
}

const Leftbar = ({ sideBarList, settingLeftBarPathValue }: Props) => {
  let mysidebarDiv = document.getElementById(
    "leftbar11mySidebar"
  ) as HTMLElement;

  let main = document.getElementById("lb11main") as HTMLElement;
  let opnbtn = document.querySelector(".lb11openbtn") as HTMLElement;

  let folderStyle={margin: "10px",marginBottom: "25px",borderRadius: "10px",backgroundColor: "#F2F2F2"}
  let rootStyle={color: "grey",fontWeight: "bold",fontSize: "large",display: "flex",justifyContent: "center",}
  let keywordStyle={justifyContent: "space-around",display: "flex",marginTop: "50px",}
  let valStyle={ display: "flex", justifyContent: "space-evenly" }
  let allTagsStyle={display: "flex",justifyContent: "center",marginBottom: "40px",
  }

  function openNav() {
    mysidebarDiv.style.width = "300px";
    main.style.marginLeft = "300px";
    opnbtn.style.display = "none";
  }

  function closeNav() {
    mysidebarDiv.style.width = "0";
    main.style.marginLeft = "0";
    opnbtn.style.display = "block";
  }
  return (
    <>
      <div className="lb11left">
        <div className="lb11leftContent">
          <div id="lb11main">
            <button className="lb11openbtn" onClick={() => openNav()}>
              ☰
            </button>
          </div>

          <div className="lb11hFoldersName sidebar"
            id="leftbar11mySidebar"
            style={folderStyle}
          >
            <span>
              <div
                className="lb11Root"
                style={rootStyle}
              >
                Root
              </div>
              <a
                href="javascript:void(0)"
                className="lb11Close closebtn"
                style={{ color: "grey" }}
                onClick={() => closeNav()}
              >
                ×
              </a>{" "}
            </span>
            <div
              id="lb11keywords"
              style={keywordStyle}
            >
              <h4 style={{ color: "grey" }}>Favourites</h4> <p> </p>
            </div>

            {sideBarList.map((singleList, key: number) => {
              return (
                <DisplayName
                  settingLeftBarPathValue={settingLeftBarPathValue}
                  key={key}
                  listDetails={singleList}
                />
              );
            })}

            <div className="lb11Location"
              style={keywordStyle}
            >
              <h4 style={{ color: "grey" }}>Location</h4> <p> </p>
            </div>

            <div className="lb11media"
              style={keywordStyle}
            >
              <h4 style={{ color: "grey" }}>Media</h4> <p> </p>
            </div>

            <div className="lb11Music" 
            style={valStyle}>
              <span
                style={{ fontSize: "20px" }}
                className="bi bi-music-note-beamed"
              ></span>
              <span>
                <h4 style={{ color: "grey" }}>Music</h4>
              </span>
            </div>
            <div className="lb11Photos"
              style={valStyle}>
              <span
                style={{ fontSize: "20px" }}
                className="bi bi-camera-fill"
              ></span>
              <span>
                <h4 style={{ color: "grey" }}>Photos</h4>
              </span>
            </div>
            <div className="lb11Movies"
             style={valStyle}>
              <span style={{ fontSize: "25p0" }} className="bi bi-film"></span>
              <span>
                <h4 style={{ color: "grey" }}>Movies</h4>
              </span>
            </div>
            <div className="lb11tags"
             style={{ display: "flex", justifyContent: "space-around" }}>
              <h4 style={{ color: "grey", margin: "20px" }}>Tags</h4> <p> </p>
            </div>
            <h5
             className="lb11AddTasks"
              style={allTagsStyle}
            >
              Add Tags....
            </h5>

            
          </div>
        </div>
      </div>
    </>
  );
};

export default Leftbar;
