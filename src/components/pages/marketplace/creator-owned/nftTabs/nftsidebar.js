import * as React from 'react';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CollectImg1 from '../../../../../assets/collection-img1.png'
import CollectImg2 from '../../../../../assets/collection-img2.png'

export default function SimpleAccordion() {
    return (
        <div>
            <Accordion>
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
            </Accordion>
            <Accordion>
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
            </Accordion>
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
                        <div className='collectionList'>
                            <ul>
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
                            </ul>
                        </div>
                    </Typography>
                </AccordionDetails>
            </Accordion>

        </div>
    );
}