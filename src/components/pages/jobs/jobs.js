import React from "react";
import { FaMapMarkerAlt, FaSuitcase, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FormGroup, Input } from "reactstrap";
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./jobs.scss";

const Jobs = () => {
  return (
    <div>
      <Header />
      <div className="faqOuter">
        <div className="container">
          <div className="jobFltr">
            <span>Filter By:</span>
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect">
                <option>Location</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect">
                <option>Team</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Input type="select" name="select" id="exampleSelect">
                <option>Work Type</option>
              </Input>
            </FormGroup>
          </div>
          <div className="jobMainHd extrabold">Engineering</div>
          <div className="jobBx">
            <div className="jobTitleOuter">
              <div className="jobTitle_Left">
                <h3>Senior Frontend Engineer (React)</h3>
                <span>
                  <FaSuitcase /> Salary not disclosed
                </span>
                <span>
                  <FaUserAlt /> Engineering
                </span>
                <span>
                  <FaMapMarkerAlt /> Full-Time
                </span>
              </div>
              <div className="jobpostTime">10 days ago</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Link to="/">Apply</Link>
          </div>
          <div className="jobMainHd extrabold">Product</div>
          <div className="jobBx">
            <div className="jobTitleOuter">
              <div className="jobTitle_Left">
                <h3>Engineering Manager</h3>
                <span>
                  <FaSuitcase /> Salary not disclosed
                </span>
                <span>
                  <FaUserAlt /> Engineering
                </span>
                <span>
                  <FaMapMarkerAlt /> Full-Time
                </span>
              </div>
              <div className="jobpostTime">10 days ago</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Link to="/">Apply</Link>
          </div>
          <div className="jobBx">
            <div className="jobTitleOuter">
              <div className="jobTitle_Left">
                <h3>Engineering Manager</h3>
                <span>
                  <FaSuitcase /> Salary not disclosed
                </span>
                <span>
                  <FaUserAlt /> Engineering
                </span>
                <span>
                  <FaMapMarkerAlt /> Full-Time
                </span>
              </div>
              <div className="jobpostTime">10 days ago</div>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <Link to="/">Apply</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Jobs;
