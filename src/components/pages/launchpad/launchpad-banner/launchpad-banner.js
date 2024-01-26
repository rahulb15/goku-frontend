import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
//import LaunchpadCountDown from './launchpad-countdown'
//import {fetchPriorityPass} from "../../launchpad-detail/launchpad-banner/getPriorityPass.action"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { upcomingProjects } from "../../launchpad/upcoming-projects/upcomingProjectList";
import { useParams } from "react-router-dom";

const LaunchpadBanner = () => {
  const { passDetails } = useSelector((state) => state.passDetails);
  console.log("passDetails", passDetails);
  const params = useParams();
  const [project, setProject] = useState("db-cooper");
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const project = upcomingProjects.filter((data) => {
  //     return data.id == params.id;
  //   });
  //   setProject(project[0]);
  // }, []);
  // console.log("project", project);

  return (
    <div>
      <div className="launch_bannerOuter" id="slide1">
        <div className="container">
          <div className="Banner_cont">
            <div className="bannerCont_Left">
              <h2 className="extrabold">
                <span>Kryptomerch</span>
                <br /> is Live Now
              </h2>
              {/* <LaunchpadCountDown /> */}
              <a href="https://discord.com/invite/Zk7E4WKKSC" target="_blank">
                {" "}
                <div className="whitelistBtn" style={{ marginTop: "30px" }}>
                  <Button className="semibold">Join Whitelist</Button>
                </div>
              </a>
            </div>
            <div className="bannerCont_Right">
              <div className="launchpadDate">
                <ul>
                  <li>
                    <span>Mint Date</span>
                    <strong>January 14th, 2024</strong>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Total NFTS</span>
                    <strong>
                    {project.projectName == "Priority Pass" ? (
          <div className="fixvalue medium">
            {passDetails ? passDetails.priorityPassNumber : null}
          </div>
        ) : (
          <div className="fixvalue medium">
            {passDetails ? passDetails.dbCooperTotalNumber : null}
          </div>
        )}
                    </strong>
                  </li>
                  <li>
                    <span>Max Mint Allocation</span>
                    <strong>5 x (WL)</strong>
                  </li>
                </ul>
                <ul>
                  <li>
                    <span>Price</span>
                    <strong>25/30 KDA</strong>
                  </li>
                  <li>
                    <span>Total Minted</span>
                    {/* <strong></strong> */}
                    <strong>
                    {project.projectName == "Priority Pass" ? (
          <div className="value medium">
            {passDetails ? passDetails.priorityPassMintedNumber : null}
          </div>
        ) : (
          <div className="value medium">
            {passDetails ? passDetails.dbCooperMintedNumber : null}
          </div>
        )}
                    </strong>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="tagline">EXPLORE THE VERTICAL WAY</div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadBanner;
