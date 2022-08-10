
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { structure } from "../../interfaces/interface";
import { RootState } from "../../reducers";

import DisplayChildName from "../DisplayChild/DisplayChild";

interface Props {
  listDetails: structure;
  settingLeftBarPathValue(name: string, type: string, parent?: string): void;
}

const DisplayName = ({ listDetails, settingLeftBarPathValue }: Props) => {
  const list = useSelector((state: RootState) => state.list);

  let displayNameStyle={ display: "flex", margin: "25px" };
  let folderStyle={ margin: "15px", color: "#00BFFF" }

  return (
    <div>
      {
        <div className=" displayName_23_hoverAdded accordion-item ">
          <h2
            className="dn23header accordion-header"
            style={displayNameStyle}
            id="headingOne"
          >
            <span>
              <i className="dn23folder bi bi-folder-fill"  style={folderStyle}></i>
            </span>
            <button
              onClick={() => {
                settingLeftBarPathValue(
                  listDetails.name,
                  listDetails.type,
                  listDetails.parent
                );
              }}
              className="dn23Btn accordion-button"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapseOne"
              aria-expanded="true"
              aria-controls="collapseOne"
            >
              <h4
                className="displayNameh4_23_hoverAdded"
                style={{ color: "#36454F" }}
              >
                {listDetails.name}
              </h4>
            </button>
          </h2>

          <DisplayChildName
            settingLeftBarPathValue={settingLeftBarPathValue}
            h3Name={listDetails.name}
            h3Parent={listDetails.parent}
          />
        </div>
      }
    </div>
  );
};

export default DisplayName;
