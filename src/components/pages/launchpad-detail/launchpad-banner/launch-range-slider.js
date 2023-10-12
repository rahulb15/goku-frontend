import React, { useEffect, useState } from "react";
// import Slider from 'react-range';
import { Range } from "react-range";

import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { upcomingProjects } from "../../launchpad/upcoming-projects/upcomingProjectList";

const LaunchRangeSlider = () => {
  const [project, setProject] = useState({});
  const [value, setValue] = useState(0);
  const params = useParams();
  // const dispatch = useDispatch();
  // const { mintStatus, error } = useSelector(
  //   (state) => state.priorityMintStatus
  // );

  const { passDetails } = useSelector((state) => state.passDetails);

  // const { dbcooperStatus, dbCoopererror } = useSelector(
  //   (state) => state.dbcooperMintStatus
  // );

  useEffect(() => {
    const project = upcomingProjects.filter((data) => {
      return data.id == params.id;
    });
    setProject(project[0]);
  }, []);

  // const handleChangeStart = () => {
  // };

  const handleChange = (value) => {
    setValue(value);
  };

  const handleChangeComplete = () => {};

  return (
    <div className="slider">
      <div className="slidval">
        {project.projectName == "Priority Pass" ? (
          <div className="value medium">
            {passDetails ? passDetails.priorityPassMintedNumber : null}
          </div>
        ) : (
          <div className="value medium">
            {passDetails ? passDetails.dbCooperMintedNumber : null}
          </div>
        )}
        {project.projectName == "Priority Pass" ? (
          <div className="fixvalue medium">
            {passDetails ? passDetails.priorityPassNumber : null}
          </div>
        ) : (
          <div className="fixvalue medium">
            {passDetails ? passDetails.dbCooperTotalNumber : null}
          </div>
        )}
      </div>
      {/* {project.projectName == "Priority Pass" ?
        <Slider
          min={0}
          max={passDetails ? passDetails.priorityPassNumber : null}
          value={passDetails ? passDetails.priorityPassMintedNumber : null}
          onChangeStart={handleChangeStart}

          onChangeComplete={handleChangeComplete}
        /> : <Slider
          min={0}
          max={passDetails ? passDetails.dbCooperTotalNumber : null}
          value={passDetails ? passDetails.dbCooperMintedNumber : null}
          onChangeStart={handleChangeStart}

          onChangeComplete={handleChangeComplete}
        />
      } */}
      {project.projectName == "Priority Pass" ? (
        <Range
          values={[passDetails ? passDetails.priorityPassMintedNumber : null]}
          step={1}
          min={0}
          max={passDetails ? passDetails.priorityPassNumber : null}
          onChange={handleChange}
          onFinalChange={handleChangeComplete}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  // background: getTrackBackground({
                  //   values: [
                  //     passDetails ? passDetails.priorityPassMintedNumber : null,
                  //   ],
                  //   colors: ["#FF0000", "#ccc"],
                  //   min: 0,
                  //   max: passDetails ? passDetails.priorityPassNumber : null,
                  // }),
                  background: `linear-gradient(to right,
                    #FF0000 0%,     
                    #FFFF00 ${
                      passDetails
                        ? (passDetails.priorityPassMintedNumber /
                            (passDetails.priorityPassNumber || 1)) *
                          100
                        : 0
                    }%,
                    #00FF00 ${
                      passDetails
                        ? (passDetails.priorityPassMintedNumber /
                            (passDetails.priorityPassNumber || 1)) *
                          100
                        : 0
                    }%, 
                    #0000FF ${
                      passDetails
                        ? (passDetails.priorityPassMintedNumber /
                            (passDetails.priorityPassNumber || 1)) *
                          100
                        : 0
                    }%, 
                    rgb(204, 204, 204) ${
                      passDetails
                        ? (passDetails.priorityPassMintedNumber /
                            (passDetails.priorityPassNumber || 1)) *
                          100
                        : 100
                    }%)`,
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              // style={{
              //   ...props.style,
              //   height: "42px",
              //   width: "42px",
              //   borderRadius: "4px",
              //   backgroundColor: "#FFF",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   boxShadow: "0px 2px 6px #AAA"
              // }}
            >
              <div
              // style={{
              //   height: "16px",
              //   width: "5px",
              //   backgroundColor: "#FF0000"
              // }}
              />
            </div>
          )}
        />
      ) : (
        <Range
          values={[passDetails ? passDetails.dbCooperMintedNumber : null]}
          step={1}
          min={0}
          max={passDetails ? passDetails.dbCooperTotalNumber : null}
          onChange={handleChange}
          onFinalChange={handleChangeComplete}
          renderTrack={({ props, children }) => (
            <div
              {...props}
              style={{
                ...props.style,
                height: "36px",
                display: "flex",
                width: "100%",
              }}
            >
              <div
                ref={props.ref}
                style={{
                  height: "5px",
                  width: "100%",
                  borderRadius: "4px",
                  // background: getTrackBackground({
                  //   values: [
                  //     passDetails ? passDetails.dbCooperMintedNumber : null,
                  //   ],
                  //   colors: ["#FF0000", "#ccc"],
                  //   min: 0,
                  //   max: passDetails ? passDetails.dbCooperTotalNumber : null,
                  // }),
                  background: `linear-gradient(to right,
                    #FF0000 0%,     
                    #FFFF00 ${
                      passDetails
                        ? (passDetails.dbCooperMintedNumber /
                            (passDetails.dbCooperTotalNumber || 1)) *
                          100
                        : 0
                    }%,
                    #00FF00 ${
                      passDetails
                        ? (passDetails.dbCooperMintedNumber /
                            (passDetails.dbCooperTotalNumber || 1)) *
                          100
                        : 0
                    }%, 
                    #0000FF ${
                      passDetails
                        ? (passDetails.dbCooperMintedNumber /
                            (passDetails.dbCooperTotalNumber || 1)) *
                          100
                        : 0
                    }%, 
                    rgb(204, 204, 204) ${
                      passDetails
                        ? (passDetails.dbCooperMintedNumber /
                            (passDetails.dbCooperTotalNumber || 1)) *
                          100
                        : 100
                    }%)`,
                  alignSelf: "center",
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ props }) => (
            <div
              {...props}
              // style={{
              //   ...props.style,
              //   height: "42px",
              //   width: "42px",
              //   borderRadius: "4px",
              //   backgroundColor: "#FFF",
              //   display: "flex",
              //   justifyContent: "center",
              //   alignItems: "center",
              //   boxShadow: "0px 2px 6px #AAA"
              // }}
            >
              <div

              // style={{
              //   height: "16px",
              //   width: "5px",
              //   backgroundColor: "#FF0000"
              // }}
              />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default LaunchRangeSlider;
