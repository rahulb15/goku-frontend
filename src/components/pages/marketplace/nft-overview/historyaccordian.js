import * as React from 'react';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BsGraphUp, BsListStars } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import HistGraph from '../../../../assets/history-graph.png'

export default function SimpleAccordion() {
  return (
    <div className='historyAccordian'>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className='bold'><BsGraphUp /> Price History</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='graphImg'>
              <img src={HistGraph} alt="" />
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion>
      {/* <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2a-content"
          id="panel2a-header"
        >
          <Typography className='bold'><FaTags /> Listings</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='histTable'>
              <table cellPadding="0" cellSpacing="0">
                <tr>
                  <th>Price</th>
                  <th>USD Price</th>
                  <th>Expiration</th>
                  <th>From</th>
                  <th></th>
                </tr>
                <tr>
                  <td>15.45 KDA</td>
                  <td>$18,798.91</td>
                  <td>about 1 month</td>
                  <td>8onFES</td>
                  <td><button className='buyBtn'>Buy</button></td>
                </tr>
              </table>
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
          <Typography className="bold" ><BsListStars /> Offers</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            <div className='histTable'>
              <table cellPadding="0" cellSpacing="0">
                <tr>
                  <th>Price</th>
                  <th>USD Price</th>
                  <th>Floor Differences</th>
                  <th>Expiration</th>
                  <th>From</th>
                </tr>
                <tr>
                  <td>15.45 KDA</td>
                  <td>$18,798.91</td>
                  <td>100%</td>
                  <td>about 1 month</td>
                  <td>8onFES</td>
                </tr>
              </table>
            </div>
          </Typography>
        </AccordionDetails>
      </Accordion> */}

    </div>
  );
}