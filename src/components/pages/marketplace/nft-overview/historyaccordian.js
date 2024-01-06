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
import { useSelector } from 'react-redux';


export default function SimpleAccordion() {
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [history, setHistory] = useState([]);
  const [hoursAgos, setHoursAgos] = useState("");
  const [lineChartData, setLineChartkData] = useState([]);
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
    // if (history.length > 0) {
    //             // Format your data to match the series structure for ApexCharts
    //   const data = history.map((item) => ({
    //     x: new Date(item.date).getTime(),
    //     y: [parseFloat(item.price), parseFloat(item.price), parseFloat(item.price), parseFloat(item.price)],
    //   }));
    //   console.log(data,"data");
    //   setLineChartkData(data);
    // }

    //filter only those data in history whose category is mint,gift,transfer
    const filteredData = history.filter((item) => {
      return item.category == "mint" || item.category == "gift" || item.category == "transfer" || item.category == "closeSale" || item.category == "originalPrice"
    }
    )
    console.log(filteredData,"filteredData");
    // Format your data to match the series structure for ApexCharts
    const data = filteredData.map((item) => ({
      x: new Date(item.date).getTime(),
      y: parseFloat(item.price),
    }));
    console.log(data,"data");
    setLineChartkData(data);
  }
  , [history]);

  console.log(history,"history");


 

  const options = {
    chart: {
      type: 'line',
      height: 350
    },
    title: {
      text: 'Price History',
      align: 'left'
    },
    xaxis: {
      type: 'datetime'
    },
    yaxis: {
      tooltip: {
        enabled: true
      }
    },
    //change color of graph
    colors: ['#FF1654'],
    // stroke: {
    //   curve: 'smooth',
    // },
    //change color of graph
    // fill: {
    //   type: 'gradient',
    //   gradient: {
    //     shadeIntensity: 1,
    //     opacityFrom: 0.7,
    //     opacityTo: 0.9,
    //     stops: [0, 90, 100]
    //   }
    // },
   
    //tooltip customization style
    tooltip: {
      theme: nightModeStatus ? 'light' : 'dark',
      x: {
        format: 'dd/MM/yy HH:mm'
      },
    },



  };

  //line chart for price history
  const series = [{
    name: 'Price',
    data: lineChartData
  }];



  
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
            <Chart options={options}  series={series} type="line" height={350} />
            </div>
            {/* <div id="chart-bar">
             <Chart options={optionsBar} series={seriesBar} type="bar" height={350} />
            </div> */}
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