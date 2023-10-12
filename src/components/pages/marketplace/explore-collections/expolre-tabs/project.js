import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import { upcomingProjects } from "../../../launchpad/upcoming-projects/upcomingProjectList";
import { Link, useNavigate } from "react-router-dom";

const UpcomingProjects = () => {
  return (
    <div>
      <div className="upcomingProject_outer" id="slide2">
        <div className="container">
          <div className="upcmingProjList" style={{ display: "flex", flexWrap: "wrap" }}>
            <Row>

              <Col sm="12" md="4" key={upcomingProjects[0].id}>

                <div className="upcmingproj">
                  <div className="projImg">
                    <Link
                      to={{
                        pathname: "/marketplace/create-owned",
                        search: `?name=${"PriorityPass"}`,
                      }}
                    >
                      <img src={upcomingProjects[0].img1} alt="" />
                    </Link>

                  </div>
                  <div className="prodOwnerImg">
                    <img src={upcomingProjects[0].img2} alt="" />
                    <strong>{upcomingProjects[0].projectName}</strong>
                  </div>
                </div>
              </Col>

              <Col sm="12" md="4" key={upcomingProjects[1].id}>
                <div className="upcmingproj">
                  <div className="projImg">
                    <Link
                      to={{
                        pathname: "/marketplace/create-owned",
                        search: `?name=${"DBCooper"}`,
                      }}
                    >
                      <img src={upcomingProjects[1].img1} alt="" />
                    </Link>

                  </div>
                  <div className="prodOwnerImg">
                    <img src={upcomingProjects[1].img2} alt="" />
                    <strong>{upcomingProjects[1].projectName}</strong>
                  </div>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;
