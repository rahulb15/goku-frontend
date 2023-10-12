import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import priorityPassIcon from "../../../assets/priority-icon.png";
import RegImg from "../../../assets/prodOwner.png";
import Footer from "../../common-components/footer/footer";
import HeaderInner from "../../common-components/header-inner/header-inner";
import { upcomingProjects } from "../launchpad/upcoming-projects/upcomingProjectList";
import AboutLaunchpad from "./launchpad-about/launchpad-about";
import LaunchpadBanner from "./launchpad-banner/launchpad-banner";
import LaunchpadComunity from "./launchpad-comunity/launchpad-comunity";
import LaunchpadDetailBullets from "./launchpad-detail-bullets/launchpad-detail-bullets";
import "./launchpad-detail.scss";
import LaunchpadRoadmap from "./launchpad-roadmap/launchpad-roadmap";
import LaunchpadTeam from "./launchpad-team/launchpad-team";
//import { getAllPass, getDbPass } from "../../../api/passApi"
import { useSelector } from "react-redux";
//import Pact from "pact-lang-api";

const Launchpad = () => {
  const [project, setProject] = useState({});
  const params = useParams();
  const { passDetails } = useSelector((state) => state.passDetails);

  useEffect(() => {
    window.scrollTo(0, 0);
    const project = upcomingProjects.filter((data) => {
      return data.id == params.id;
    });
    setProject(project[0]);
  }, []);
  return (
    <div>
      <HeaderInner />
      <LaunchpadBanner />
      <div className="regvalueBx">
        <div className="container">
          <div className="regvalueInn">
            {project.projectName == "DB cooper" ? (
              <div className="regImg">
                <img src={RegImg} alt="" />
              </div>
            ) : (
              <div className="regImg">
                <img src={priorityPassIcon} alt="" />
              </div>
            )}
            <div className="regvalBx">
              {project.projectName == "DB cooper" ? (
                <div className="regvalInnBx">
                  <div className="regvalInn">
                    <span>Registration</span>
                    <strong>TBA</strong>
                  </div>
                  <div className="regvalInn">
                    <span>Total Items</span>
                    {
                      <strong>
                        {passDetails
                          ? passDetails.dbCooperTotalNumber -
                            passDetails.dbCooperMintedNumber
                          : null}
                      </strong>
                    }
                  </div>
                  <div className="regvalInn">
                    <span>WL Mint Price</span>
                    <strong>{project.WlMintPrice} KDA</strong>
                  </div>
                  <div className="regvalInn">
                    <span>Public Mint Price</span>
                    <strong>{project.totalMints} KDA</strong>
                  </div>
                </div>
              ) : (
                <div className="regvalInnBx">
                  {" "}
                  <div className="regvalInn">
                    <span>Registration</span>
                    <strong>TBA</strong>
                  </div>
                  <div className="regvalInn">
                    <span>Total Pass</span>
                    {
                      <strong>
                        {passDetails
                          ? passDetails.priorityPassNumber -
                            passDetails.priorityPassMintedNumber
                          : null}
                      </strong>
                    }
                  </div>
                  <div className="regvalInn">
                    <span>Price</span>
                    <strong>
                      {project.WlMintPrice} KDA/ PASS or 8.33 KDA per Mint
                    </strong>
                  </div>
                  <div className="regvalInn">
                    <span>Total Mints</span>
                    <strong>{project.totalMints}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <AboutLaunchpad />
      {project.projectName == "DB cooper" ? (
        <LaunchpadComunity projectName={project.projectName} />
      ) : null}
      <LaunchpadRoadmap projectName={project.projectName} />
      <LaunchpadTeam projectName={project.projectName} />
      <Footer />
      <LaunchpadDetailBullets />
    </div>
  );
};

export default Launchpad;
