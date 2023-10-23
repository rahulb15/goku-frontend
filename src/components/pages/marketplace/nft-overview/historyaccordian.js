import * as React from 'react';
//import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState,useEffect } from 'react'
import { BsGraphUp, BsListStars } from "react-icons/bs";
import { FaTags } from "react-icons/fa";
import HistGraph from '../../../../assets/history-graph.png'
import Chart from "react-apexcharts";
import Axios from "axios";
import moment from 'moment';


export default function SimpleAccordion() {
  const [history, setHistory] = useState([]);
  const [hoursAgos, setHoursAgos] = useState("");
  const [candlestickData, setCandlestickData] = useState([]);
  const search = window.location.search
  const params = new URLSearchParams(search)
      let foo = params.get('id')
      let foo2 = params.get("for");


  const getAllAuction = () => {
      const body = {
          _id: foo,
          };
          if (foo2 == "all") {

      Axios.post("/nft/getNftbyId", body, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
              setHistory(response.data.data[0].history);
          } else {
              setHistory([]);
          }
        })
        .catch((error) => {
        });
      }else {
          Axios.post("/passDetails/getNftPassbyId", body)
            .then((response) => {
              
              if (response.data.status == "success") {
                  setHistory(response.data.data[0].history);
              } else {
                  setHistory([]);
              }
            })
            .catch((error) => {
              
            });
        }
    };
  useEffect(() => {
      getAllAuction();
  }, [])
  useEffect(() => {
    if (history.length > 0) {
                // Format your data to match the series structure for ApexCharts
      const data = history.map((item) => ({
        x: new Date(item.date).getTime(),
        y: [parseFloat(item.price), parseFloat(item.price), parseFloat(item.price), parseFloat(item.price)],
      }));
      console.log(data,"data");
      setCandlestickData(data);
    }
  }, [history]);

  console.log(history,"history");

  //candlestick chart for price history

  const series = [{
    data: [{
      x: new Date(1538778600000),
      y: [6629.81, 6650.5, 6623.04, 6633.33] //y: [open, close, low, high]
    },
    // {
    //   x: new Date(1538780400000),
    //   y: [6632.01, 6643.59, 6620, 6630.11]
    // },
    // {
    //   x: new Date(1538782200000),
    //   y: [6630.71, 6648.95, 6623.34, 6635.65]
    // },
    // {
    //   x: new Date(1538784000000),
    //   y: [6635.65, 6651, 6629.67, 6638.24]
    // },
    // {
    //   x: new Date(1538785800000),
    //   y: [6638.24, 6640, 6620, 6624.47]
    // },
    // {
    //   x: new Date(1538787600000),
    //   y: [6624.53, 6636.03, 6621.68, 6624.31]
    // },
    // {
    //   x: new Date(1538789400000),
    //   y: [6624.61, 6632.2, 6617, 6626.02]
    // },
    // {
    //   x: new Date(1538791200000),
    //   y: [6627, 6627.62, 6584.22, 6603.02]
    // },
    // {
    //   x: new Date(1538793000000),
    //   y: [6605, 6608.03, 6598.95, 6604.01]
    // },
    // {
    //   x: new Date(1538794800000),
    //   y: [6604.5, 6614.4, 6602.26, 6608.02]
    // },
    // {
    //   x: new Date(1538796600000),
    //   y: [6608.02, 6610.68, 6601.99, 6608.91]
    // },
    // {
    //   x: new Date(1538798400000),
    //   y: [6608.91, 6618.99, 6608.01, 6612]
    // }
    ]
  }];

  const options = {
    chart: {
      type: 'candlestick',
      height: 350
    },
    title: {
      text: 'CandleStick Chart',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    }
  };
  const seriesBar = [
    {
      name: "series-1",
      data: [30, 40, 45, 50],
    },
  ];
  const optionsBar = {
    chart: {
      height: 350,
      type: "bar",
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Buy", "Sell", "Auction", "Bid"],
    },
  };

  

  // const options = {
  //   chart: {
  //     type: 'candlestick',
  //     height: 350,
  //   },
  //   title: {
  //     text: 'Candlestick Chart',
  //     align: 'left',
  //   },
  //   xaxis: {
  //     type: 'datetime',
  //   },
  //   yaxis: {
  //     tooltip: {
  //       enabled: true,
  //     },
  //   },
  // };

  // const series = [
  //   {
  //     data: candlestickData,
  //   },
  // ];

  // const series = [
  //   {
  //     data: [
  //       { x: new Date("2016-12-01").getTime(), y: [ 5, 9, 5, 9 ] }, //y: [open, close, low, high]
  //       { x: new Date("2016-12-02").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-03").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-04").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-05").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-06").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-07").getTime(), y: [ 5, 6, 2, 5 ] },
  //       { x: new Date("2016-12-08").getTime(), y: [ 5, 6, 2, 5 ] },
        
      
  //     ]
  //   }
  // ];


  console.log(series,"series");


  
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
            <div id="chart-candlestick">
            <Chart options={options} series={series} type="candlestick" />
            </div>
            <div id="chart-bar">
             <Chart options={optionsBar} series={seriesBar} type="bar" height={350} />
            </div>
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