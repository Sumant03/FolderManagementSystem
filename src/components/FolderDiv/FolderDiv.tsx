import img1 from "../../images/add-folder.png";
import React, { ChangeEvent, Dispatch, SetStateAction } from "react";
interface Props {
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  buttonHandler: () => void;
  setType: Dispatch<SetStateAction<string>>;
  name: string;
  creator: string;
  size: number;
}

const Folderdiv = ({
  setType,
  handleChange,
  buttonHandler,
  name,
  creator,
  size,
}: Props) => {

 let creatbtnStyle={background: "linear-gradient(75deg, #00E39F, #00C4E1)",color: "black",border:"1px white solid"}

  return (
    <div className="fd33div ">
      <div>
        <span>
          <img
            src={img1}
            width="135px"
            className="fd33size size"
            data-toggle="modal"
            data-target="#exampleCenter"
          />
        </span>
      </div>

      <div className="fd33Modal modal fade"
        id="exampleCenter"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="exampleCenterTitle"
        aria-hidden="true"
>
        <div
          className="fd33dialog modal-dialog modal-dialog-centered"
          role="document"
        >
          <div
            className="fd33content modal-content"
            style={{ background: "	##E8E8E8" }}
          >
            <div className="fd33Header modal-header">
              <h3 className="fd33Title modal-title" id="exampleModalLongTitle">
                Create New Folder
              </h3>
              <button
                className="fd33CloseBtn close"
                type="button"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="fd33Body modal-body">
              <span>

                <span>
                  <button
                    style={creatbtnStyle}
                    onClick={() => setType("file")}
                    className="create btn-primary folderDiv33textColor"
                  >
                    Create File
                  </button>
                </span>

                <span>
                  <button
                    style={creatbtnStyle}
                    onClick={() => setType("folder")}
                    className="create btn-primary  folderDiv33textColor"
                  >
                    Create Folder
                  </button>
                </span>

              </span>


              <div className="fd33Inputs modalInputs">
                <div>
                  <input type="text" maxLength={15} value={name}  style={{ padding: "20px" }}    name="name"    onChange={handleChange}    placeholder="Name....."  />
                </div>
                <div>
                  <input type="text"  maxLength={15}  value={creator}  style={{ padding: "20px" }}  name="creator" onChange={handleChange}  placeholder="Creator....."
                  />
                </div>
                <div>
                  <input type="number"  value={size} style={{ padding: "20px" }} name="size" onChange={handleChange}placeholder="Size...."
                  />
                </div>
              </div>



            </div>
            <div className="fd33Footer modal-footer">
              <button
                style={{
                  background: "linear-gradient(75deg, #00E39F, #00C4E1)",
                  color: "black",
                }}
                type="button"
                className="btn btn-secondary folderDiv33textColor"
                data-dismiss="modal"
              >
                Close
              </button>
              <button
                style={{
                  background: "linear-gradient(75deg, #00E39F, #00C4E1)",
                  color: "black",
                }}
                onClick={buttonHandler}
                type="button"
                data-dismiss="modal"
                className="buttonClick btn btn-primary folderDiv33textColor"
              >
                Add Folder
              </button>
            </div>



          </div>
        </div>
      </div>
    </div>
  );
};

export default Folderdiv;
