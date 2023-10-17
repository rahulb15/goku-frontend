import * as React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CollectImg1 from "../../../../../assets/collection-img1.png";
import CollectImg2 from "../../../../../assets/collection-img2.png";
import { useState, useEffect } from "react";
import Axios from "axios";
import moment from "moment/moment";

export default function SimpleAccordion(props) {
  const [collectionList, setCollectionList] = useState([]);

  const getCollection = () => {
    Axios.get("/collection/user-collection-1", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          // const filter = response.data.data.filter((data) => {
          //   return data.isActive == true;
          // });
          setCollectionList(response.data.data);
        } else {
          setCollectionList([]);
        }
      })
      .catch((error) => {
        setCollectionList([]);
        //   setUserRegistered(false)
        
      });
  };
  useEffect(() => {
    getCollection();
  }, []);

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
      {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className="bold" >Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='statusList'>
                            <ul>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            All
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Multiple Edition
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Single Edition
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>

                            </ul>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion> */}
      {/* <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography className="bold" >Options</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        <div className='statusList'>
                            <ul>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Verified only
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Show lazy minted items
                                            <Input type="checkbox" />
                                        </Label>
                                    </FormGroup>
                                </li>
                                <li>
                                    <FormGroup check>
                                        <Label check>
                                            Show NSFW
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
          aria-controls="panel4a-content"
          id="panel4a-header"
        >
          <Typography className="bold">Collection</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className="collectionList">
              <ul>
                {collectionList
                  .filter((data) => {
                    return (data.createdDate = moment(data.createdDate).format(
                      "DD MMM YYYY"
                    ));
                  })
                  .map((data) => {
                    
                    return (
                      <>
                        {data.isActive ? (
                          <li>
                            <div className="collectionLeft">
                              <i>
                                <img src={data?.imageUrl} alt="" />
                              </i>
                              <strong>{data?.collectionName}</strong>
                              <small>Total Supply: {data?.totalSupply}</small>
                            </div>
                            <div className="collectionRight">
                              <strong>{data?.mintPrice}KDA</strong>
                              {/* <small>24h</small> */}
                              <small>{data?.createdDate}</small>
                            </div>
                          </li>
                        ) : null}
                      </>
                    );
                  })}
              </ul>

              {/* <ul>
                                <li>
                                    <div className='collectionLeft'>
                                        <i><img src={CollectImg1} alt="" /></i>
                                        <strong>Reese Hoffman</strong>
                                        <small>Floor: 0.25 KDA</small>
                                    </div>
                                    <div className='collectionRight'>
                                        <strong>6.8 KDA</strong>
                                        <small>24h</small>
                                    </div>
                                </li>
                                <li>
                                    <div className='collectionLeft'>
                                        <i><img src={CollectImg2} alt="" /></i>
                                        <strong>Reese Hoffman</strong>
                                        <small>Floor: 0.25 KDA</small>
                                    </div>
                                    <div className='collectionRight'>
                                        <strong>6.8 KDA</strong>
                                        <small>24h</small>
                                    </div>
                                </li>
                            </ul> */}
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
