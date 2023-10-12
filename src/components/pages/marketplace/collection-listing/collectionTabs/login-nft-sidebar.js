import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { FormGroup, Input, Label } from "reactstrap";
//import CollectImg1 from '../../../../../assets/collection-img1.png'
//import CollectImg2 from '../../../../../assets/collection-img2.png'
import { BsSearch } from "react-icons/bs";

export default function SimpleAccordion() {
  const [selectItem, setSelectItem] = React.useState("");
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="bold">Status</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Buy now
                      <Input
                        type="checkbox"
                        onChange={(e) => setSelectItem(e.target.value)}
                        value="Buy now"
                        checked={selectItem === "Buy now"}
                      />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      On Auction
                      <Input
                        type="checkbox"
                        onChange={(e) => setSelectItem(e.target.value)}
                        value="On Auction"
                        checked={selectItem === "On Auction"}
                      />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      New
                      <Input
                        type="checkbox"
                        onChange={(e) => setSelectItem(e.target.value)}
                        value="New"
                        checked={selectItem === "New"}
                      />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Has Offers
                      <Input
                        type="checkbox"
                        onChange={(e) => setSelectItem(e.target.value)}
                        value="Has Offers"
                        checked={selectItem === "Has Offers"}
                      />
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
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className="bold">Price</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="PriceOuter">
              <div className="priceSel">
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    placeholder="Trending"
                    id="exampleSelect"
                  >
                    <option>KDA</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="pricemin">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Min"
                  />
                </FormGroup>
              </div>
              <div className="priceTo">to</div>
              <div className="pricemax">
                <FormGroup>
                  <Input
                    type="email"
                    name="email"
                    id="exampleEmail"
                    placeholder="Max"
                  />
                </FormGroup>
              </div>
            </div>
            <div className="loadmoreBtn">
              <button>Apply</button>
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
          <Typography className="bold">Properties</Typography>
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
          <Typography className="bold">Background</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Gray
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Blue
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Yellow
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Orange
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
          <Typography className="bold">Eyes</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Gray
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Blue
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Yellow
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Orange
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
          <Typography className="bold">Mouth</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Gray
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Blue
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Yellow
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Orange
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
          <Typography className="bold">Hands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Gray
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Blue
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Yellow
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Orange
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
          <Typography className="bold">Winds</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="statusList">
              <ul>
                <li>
                  <FormGroup check>
                    <Label check>
                      Gray
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Blue
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Yellow
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
                <li>
                  <FormGroup check>
                    <Label check>
                      Orange
                      <Input type="checkbox" />
                    </Label>
                  </FormGroup>
                </li>
              </ul>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
