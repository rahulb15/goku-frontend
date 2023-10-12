import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { MarketplaceFooter } from "../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import "./bug-bounty.scss";

const BugBounty = () => {
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <div className="profileHd bold">Submission Form</div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Summary Title</strong>
              <span>
                Help us get an idea of what this vulnerability is about.
              </span>
            </div>
            <div className="submission_Right">
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">Submission title</Label>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Enter your display name"
                  />
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Target</strong>
              <span>
                Targets that are not explicitly in scope may not be eligible for
                acceptance.
              </span>
            </div>
            <div className="submission_Right">
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">Target</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Select Target</option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Technical Severity</strong>
              <span>
                The Vulnerability Rating Taxonomy is the baseline guide used for
                classifying technical severity.
              </span>
            </div>
            <div className="submission_Right">
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">VRT Category</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Select or search for a vulnerability type</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">VRT Subcategory (optional)</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    disabled
                  >
                    <option></option>
                  </Input>
                </FormGroup>
              </div>
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">VRT Variant (optional)</Label>
                  <Input
                    type="select"
                    name="select"
                    id="exampleSelect"
                    disabled
                  >
                    <option></option>
                  </Input>
                </FormGroup>
              </div>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Vulnerability Details</strong>
            </div>
            <div className="submission_Right">
              <div className="urlCont">
                <strong>URL / Location of vulnerability (optional)</strong>
                <span>
                  For example: https://secure.server.com/some/path/file.php
                </span>
              </div>
              <div className="subffmBx">
                <FormGroup>
                  <Label for="exampleEmail">Target</Label>
                  <Input type="select" name="select" id="exampleSelect">
                    <option>Enter your display name</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="urlCont">
                <strong>Description</strong>
                <span>
                  Describe the vulnerability and its impact.
                  <br /> Provide a proof of concept or replication steps.
                </span>
                <small>Maximum 25,000 characters.</small>
              </div>
              <div className="subffmBx">
                <Input type="textarea" name="text" id="exampleText" />
              </div>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Attachments (optional)</strong>
              <span>
                Attach proof-of-concept scripts, screenshots, screen recordings,
                etc.
              </span>
            </div>
            <div className="submission_Right">
              <div className="addAttachment">
                <button>
                  Add attachments
                  <Input type="file" name="file" id="exampleFile" />
                </button>
              </div>
              <div className="urlCont">
                <span>
                  You can attach up to 20 files. Please keep individual upload
                  size under 400MiB.
                  <br />
                  <br /> You can embed attachments (.jpg/.gif/.png, smaller than
                  2MB) into the Markdown fields. You can copy the embed code
                  using the ‘Copy as Markdown’ button.
                </span>
              </div>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Email</strong>
              <span>
                By providing your email address you can claim your submission on
                bugcrowd.com.
              </span>
            </div>
            <div className="submission_Right">
              <FormGroup>
                <Label for="exampleEmail">Researcher email (optional)</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder=""
                />
              </FormGroup>
            </div>
          </div>
          <div className="submissionTitle_Outer">
            <div className="submission_Left">
              <strong>Confirmation</strong>
              <span>
                Confirm your submission is accurate and adheres to Bugcrowd’s
                terms & conditions
              </span>
            </div>
            <div className="submission_Right">
              <div className="termsBx">
                <FormGroup check>
                  <Label check>
                    <Input type="checkbox" />I agree to Bugcrowd’s terms &
                    conditions as well as any additional rules and instructions
                    provided by the organization hosting this program
                  </Label>
                </FormGroup>
              </div>
              <div className="reportBtnBx">
                <button>Report Vulnerability</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default BugBounty;
