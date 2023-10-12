import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AboutBanImg from "../../../../assets/about-bannerImg.png";
import { upcomingProjects } from "../../launchpad/upcoming-projects/upcomingProjectList";

const LaunchpadAbout = () => {
  const params = useParams();
  const [project, setProject] = useState({});
  useEffect(() => {
    //
    const project = upcomingProjects.filter((data) => {
      return data.id == params.id;
    });
    //
    setProject(project[0]);
  }, []);

  return (
    <div id="slide2">
      <div className="aboutLaunchpadOuter">
        <div className="aboutTagline">EXPLORE THE VERTICAL WAY</div>
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>1</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Project</h3>
            <h2 className="extrabold">About</h2>
          </div>
          {project.projectName == "DB cooper" ? (
            <div className="aboutlaunchBanner">
              <img src={AboutBanImg} alt="" />
            </div>
          ) : (
            <div className="aboutlaunchBanner">
              <img src={project.priorityPassBanner} alt="" />
            </div>
          )}
          <div className="aboutLaunchCont">
            <div className="aboutCont">
              <p>{project.bannerContentf}</p>
            </div>
            <div className="aboutCont">
              <p>{project.bannerContents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaunchpadAbout;
