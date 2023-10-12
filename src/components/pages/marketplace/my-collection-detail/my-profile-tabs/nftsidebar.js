import * as React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { BsSearch } from "react-icons/bs";

export default function SimpleAccordion(props) {
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (props.selected.includes(value)) {
      props.setSelected((prev) => prev.filter((val) => val !== value));
    } else {
      props.setSelected((prev) => [...prev, value]);
    }
    //add checked value to selected array and remove unchecked value from selected array
  };

  const rangeSelect = () => {
    props.setRefresh(!props.refresh);
  };

  return (
    <div>
      {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography className='bold'>Status</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='statusList'>
                            <ul>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Buy now
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            On Auction
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            New
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Has Offers
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
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography className='bold'>Price</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='PriceOuter'>
                            <div className='priceSel'>
                                <FormGroup>
                                    <Input type="select" name="select" placeholder='Trending' id="exampleSelect">
                                        <option>KDA</option>
                                    </Input>
                                </FormGroup>
                            </div>
                            <div className='pricemin'>
                                <FormGroup>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Min" />
                                </FormGroup>
                            </div>
                            <div className='priceTo'>to</div>
                            <div className='pricemax'>
                                <FormGroup>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Max" />
                                </FormGroup>
                            </div>
                        </div>
                        <div className='loadmoreBtn'>
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
                    <Typography className="bold" >Properties</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='collectionList'>
                            <div className='collectionSrch'>
                                <FormGroup>
                                    <Input type="email" name="email" id="exampleEmail" placeholder="Search by collection" />
                                </FormGroup>
                                <button><BsSearch /></button>
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
                    <Typography className="bold" >Background</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>

                        <div className='statusList'>
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
                        <div className='statusList'>
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
                        <div className='statusList'>
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
                        <div className='statusList'>
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
                        <div className='statusList'>
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
            </Accordion> */}

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
                        onChange={handleChange}
                        value="Buy now"
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
                        onChange={handleChange}
                        value="On Auction"
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
                        onChange={handleChange}
                        value="New"
                      />
                    </Label>
                  </FormGroup>
                </li>
                {/* <li>
                      <FormGroup check>
                        <Label check>
                          Has Offers
                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            value="Has Offers"
                          />
                        </Label>
                      </FormGroup>
                    </li> */}
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
          onClick={() => {
            props.setMinAmount(0);
            props.setMaxAmount(0);
            props.setRefresh(!props.refresh);
          }}
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
                    onChange={(e) => props.setOptions(e.target.value)}
                  >
                    <option>KDA</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="pricemin">
                <FormGroup>
                  <Input
                    type="number"
                    name="min"
                    id="min"
                    placeholder="Min"
                    value={props.minAmount}
                    onChange={(e) => props.setMinAmount(e.target.value)}
                  />
                </FormGroup>
              </div>
              <div className="priceTo">to</div>
              <div className="pricemax">
                <FormGroup>
                  <Input
                    type="number"
                    name="max"
                    id="max"
                    placeholder="Max"
                    value={props.maxAmount}
                    onChange={(e) => props.setMaxAmount(e.target.value)}
                  />
                </FormGroup>
              </div>
            </div>
            <div className="loadmoreBtn">
              <button onClick={() => rangeSelect()}>Apply</button>
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
                    type="name"
                    name="name"
                    id="exampleName"
                    placeholder="Search by collection"
                    value={props.search}
                    onChange={(e) => props.setSearch(e.target.value)}
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
    </div>
  );
}
