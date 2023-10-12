//import React, { Component } from 'react'
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Footer from "../../common-components/footer/footer";
import { Header } from "../../common-components/header/header";
import "./job-detail.scss";
//import { FaSuitcase, FaUserAlt, FaMapMarkerAlt } from "react-icons/fa";
//import { Link } from "react-router-dom";

const JobDetail = () => {
  return (
    <div>
      <Header />
      <div className="faqOuter">
        <div className="container">
          <div className="jobDetHdBx">
            <div className="jobDetLeft">
              <h3>Senior Frontend Engineer (React)</h3>
              <span>REMOTE /ENGINEERING /FULL-TIME</span>
            </div>
            <div className="jobDetRight">
              <button>Apply For This Job</button>
            </div>
          </div>
          <div className="jobdesc">
            <h3>Job Description</h3>
            <p>
              Lorem ipsum, or lipsum as it is sometimes known, is dummy text
              used in laying out print, graphic or web designs. The passage is
              attributed to an unknown typesetter in the 15th century who is
              thought to have scrambled parts of Cicero's De Finibus Bonorum et
              Malorum for use in a type specimen book. It usually begins with:
            </p>
            <p>
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.” The
              purpose of lorem ipsum is to create a natural looking block of
              text (sentence, paragraph, page, etc.) that doesn't distract from
              the layout. A practice not without controversy, laying out pages
              with meaningless filler text can be very useful when the focus is
              meant to be on design, not content.
            </p>
            <p>
              The passage experienced a surge in popularity during the 1960s
              when Letraset used it on their dry-transfer sheets, and again
              during the 90s as desktop publishers bundled the text with their
              software. Today it's seen all around the web; on templates,
              websites, and stock designs. Use our generator to get your own, or
              read on for the authoritative history of lorem ipsum.
            </p>
          </div>
          <div className="jobdesc">
            <h3>Responsibilities</h3>
            <ul>
              <li>
                Dummy text used in laying out print, graphic or web designs.
              </li>
              <li>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt.
              </li>
              <li>
                The purpose of lorem ipsum is to create a natural looking block
                of text.
              </li>
              <li>
                The passage experienced a surge in popularity during the 1960s
                when
              </li>
            </ul>
          </div>
          <div className="jobdesc">
            <h3>What do we offer</h3>
            <ul>
              <li>📍 Working for a kryptomerch expanding global startup</li>
              <li>
                📍 Mentorship, training and career progression plans with
                leadership focused on developing the teams
              </li>
              <li>📍 Team that cares about products and working conditions</li>
              <li>📍 Flexible Hours</li>
              <li>
                📍 Full-time, paid vacations remote first with relocation
                packages available, hardware and software support
              </li>
              <li>
                📍 Attractive package to include base equity and/or tokens,
                equity as well as health benefits
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default JobDetail;
