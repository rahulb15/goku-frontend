import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import { FormGroup, Input, Label } from "reactstrap";
import CollectImg1 from "../../../../assets/collection-img1.png";
import CollectImg2 from "../../../../assets/collection-img2.png";
import CollectImg3 from "../../../../assets/collection-img3.png";
import CollectImg4 from "../../../../assets/collection-img4.png";
import CollectImg5 from "../../../../assets/collection-img5.png";
import CollectImg6 from "../../../../assets/collection-img6.png";

export default function SimpleAccordion() {
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="bold">Sizes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      17.5" x 9.5"
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      XS
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      S
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      M
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      L
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
              </ul>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>

      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3a-content"
          id="panel3a-header"
        >
          <Typography className="bold">Print areas</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      All Over Print
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Front Side
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
              </ul>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className="bold">Designer Collection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="collectionList">
              <div className="collectionSrch">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Search by collection"
                  />
                </FormGroup>
                <button>
                  <BsSearch />
                </button>
              </div>
              <ul>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg1} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg2} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg3} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg4} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg5} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg6} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg1} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
                <li>
                  <div className="collectionLeft">
                    <i>
                      <img src={CollectImg2} alt="" />
                    </i>
                    <strong>Reese Hoffman</strong>
                  </div>
                  <div className="collectionRight">
                    <strong>2.5k</strong>
                  </div>
                </li>
              </ul>
              <div className="loadmoreBtn">
                <button>Load More</button>
              </div>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
