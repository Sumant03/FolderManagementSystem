// import { getListItemSecondaryActionClassesUtilityClass } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { structure } from "../../interfaces/interface";
import { RootState } from "../../reducers/index";
import LeftbarNext from "../LeftbarNext/LeftbarNext";

import "./displayChild.css"

interface Props {
  h3Name?: string;
  h3Parent?: string;
  settingLeftBarPathValue(name: string, type: string, parent?: string): void;
}

const DisplayChildName = ({
  h3Name,
  h3Parent,
  settingLeftBarPathValue,
}: Props) => {

  const list = useSelector((state: RootState) => state.list);
  let displayNameStyle={ display: "flex", marginLeft: "60px" }
  let folderStyle={ margin: "10px", color: "#00BFFF" }

  let pathPresent = h3Parent + "/" + h3Name;
  const h3listTobeRendered = list.filter((singleList) => {
    if (singleList.parent == pathPresent) {
      console.log(singleList, "list at 22 child");
      return singleList;
    }
  });

  return (
    <>
      {h3listTobeRendered.map((listDetails) => {
        return (
          <div>
            <div className=" DisplayName_23_hoverAdded accordion-item ">
              <h3
                className="dn23accordian accordion-header"
                style={displayNameStyle}
                id="headingOne"
              >
                <span>
                  <i className="dn23folder bi bi-folder-fill"
                    style={folderStyle}
                  ></i>
                </span>
                <button
                  onClick={() => {
                    settingLeftBarPathValue(
                      listDetails.name,
                      listDetails.type,
                      listDetails.parent
                    );
                  }}
                  className="dn23accordianBtn accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  <h4 className="DisplayNameh4_23_hoverAdded">
                    {listDetails.name}
                  </h4>
                </button>

                <h3></h3>
              </h3>

              <LeftbarNext
                settingLeftBarPathValue={settingLeftBarPathValue}
                h4Name={listDetails.name}
                h4Parent={listDetails.parent}
              />
            </div>
          </div>
        );
      })}
    </>
  );
};

export default DisplayChildName;
