import Axios from "axios";
import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import {
  Form,
  FormGroup,
  Input,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import KadenaImg from "../../../../../assets/kadena-komodos.png";
import yellowCheck from "../../../../../assets/yellow-check.png";
import dbCooperGif from "../../../../../assets/DBCooper.gif";

import CollectionSlider from "./collectionSlider";
import { Link, useNavigate } from "react-router-dom";


export default function HotCollectionsTab() {
  const [activeTab, setActiveTab] = React.useState("1");
  const [screenLoading, setScreenLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [filteredDbCooper, setFilteredDbCooper] = useState([]);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [hotCollections, setHotCollections] = useState([]);
  const [dbVolume, setDbVolume] = useState(0);
  const [dbFloor, setDbFloor] = useState(0);
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const getAllCollections = () => {
    Axios.get("/nft/all-users-nft-hot-collections-1", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          setHotCollections(response.data.data);
        } else {
          setHotCollections([]);
        }
      })
      .catch((error) => {});
  };
  useEffect(() => {
    getDbCooper();
    getAllCollections();
  }, []);
  const getDbCooper = () => {
    setScreenLoading(true);
    Axios.get(
      "/passDetails/all-nft-on-marketplace-dbcooper?page=" +
        page +
        "&limit=" +
        limit +
        "&search=" +
        searchInput,
      {
        headers: { authorization: localStorage.getItem("accessJWT") },
      }
    )
      .then((response) => {
        if (response.data.status == "success") {
          let dbCopperList = response.data?.data ? response.data?.data : [];
          setTotalPage(response.data?.count ? response.data?.count : 0);
          setDbVolume(response.data?.nftPriceSum ? response.data?.nftPriceSum : 0);
          setDbFloor(response.data?.passCostSum ? response.data?.passCostSum : 0);
          const list = dbCopperList;

          setFilteredDbCooper(list);
        }
      })
      .catch((error) => {
        
      });
  };


  useEffect(() => {
    getDbCooper();
  }, [searchInput, page, limit]);

  console.log("filteredDbCooper", filteredDbCooper, page, limit, searchInput);

  return (
    <div className="marketplace_tabsOuter">
      <div className="lcollistNumb">
        <Form>
          <FormGroup>
            <Input type="select" name="select" id="exampleSelect">
              <option>24</option>
            </Input>
          </FormGroup>
        </Form>
      </div>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => toggle("1")}
          >
            Trending
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => toggle("2")}
          >
            Top
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <div className="collectionHd">
            <div className="colBx1">Collection</div>
            <div className="colBx2">Day volume</div>
            <div className="colBx2">Floor price</div>
            <div className="colBx3"></div>
          </div>
          <div class="border-container">
          <div className="collectListOuter">
              <div className="colListOutBx">
              <Link
                      to={{
                        pathname: "/marketplace/create-owned",
                        search: `?name=DBCooper`,
                      }}>
                  <div className="collectListBx1">
                    <i>
                      <img src={dbCooperGif} alt="" width="50px" height="50px" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>DB Cooper</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>DB Cooper</strong>
                    )}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>{dbVolume || 0}</strong> <small>KDA</small>
                    <span>+0%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>{dbFloor || 0}</strong> <small>KDA</small>
                
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider item={filteredDbCooper} />
                  </div>
                  </Link>
              </div>
              
            
             
             
             
            


            {hotCollections?.length > 0 &&
              hotCollections?.map((item, index) => {
                console.log("item", item);
                return (
                  <div className="colListOutBx" key={index}>
                    <Link
                      to={{
                        pathname: "/marketplace/collection-listing",
                        search: `?id=${item._id}&for=all`,
                      }}>
                      <div className="collectListBx1">
                     
                        <i>
                          
                          <img
                            src={item?.image}
                            alt=""
                            width="50px"
                            height="50px"
                          />
                          <img
                            className="yellowcheck"
                            src={yellowCheck}
                            alt=""
                          />
                        </i>
                        {nightModeStatus ? (
                          <strong>{item?.name}</strong>
                        ) : (
                          <strong style={{ color: "#000" }}>
                            {item?.name}
                          </strong>
                        )}
                        <span>
                          <BsFillArrowRightCircleFill />
                        </span>
                      </div>
                      <div className="collectListBx2">
                        <i>Day Volume</i>
                        <strong>{item?.totalNftPrice || 0}</strong>{" "}
                        <small>KDA</small>
                        <span>+{item?.dayVolumePercentage || 0}%</span>
                      </div>
                      <div className="collectListBx2">
                        <i>Floor</i>
                        <strong>{item?.minNftPrice || 0}</strong>{" "}
                        <small>KDA</small>
                      </div>
                      <div className="collectListBx3">
                        <CollectionSlider item={item?.nft} />
                      </div>
                      </Link>
                  </div>
                );
              })}
          </div>
          </div>

          {/* {hotCollections?.length == 0 && (
            <div className="collectListOuter">
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
            </div>
          )} */}
        </TabPane>
        <TabPane tabId="2">
          <div className="collectionHd">
            <div className="colBx1">Collection</div>
            <div className="colBx2">Day volume</div>
            <div className="colBx2">Floor price</div>
            <div className="colBx3"></div>
          </div>

          <div className="collectListOuter">

             <div className="colListOutBx">
              <Link
                      to={{
                        pathname: "/marketplace/create-owned",
                        search: `?name=DBCooper`,
                      }}>
                  <div className="collectListBx1">
                    <i>
                      <img src={dbCooperGif} alt="" width="50px" height="50px" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>DB Cooper</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>DB Cooper</strong>
                    )}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>{dbVolume || 0}</strong> <small>KDA</small>
                    <span>+0%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>{dbFloor || 0}</strong> <small>KDA</small>
                
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider item={filteredDbCooper} />
                  </div>
                  </Link>
              </div>

            {hotCollections?.length > 0 &&
              hotCollections?.map((item, index) => {
                return (
                  <div className="colListOutBx" key={index}>
                    <a href="">
                      <div className="collectListBx1">
                        <i>
                          <img
                            src={item?.image}
                            alt=""
                            width="50px"
                            height="50px"
                          />
                          <img
                            className="yellowcheck"
                            src={yellowCheck}
                            alt=""
                          />
                        </i>
                        {nightModeStatus ? (
                          <strong>{item?.name}</strong>
                        ) : (
                          <strong style={{ color: "#000" }}>
                            {item?.name}
                          </strong>
                        )}
                        <span>
                          <BsFillArrowRightCircleFill />
                        </span>
                      </div>
                      <div className="collectListBx2">
                        <i>Day Volume</i>
                        <strong>{item?.totalNftPrice || 0}</strong>{" "}
                        <small>KDA</small>
                        <span>+{item?.dayVolumePercentage || 0}%</span>
                      </div>
                      <div className="collectListBx2">
                        <i>Floor</i>
                        <strong>{item?.minNftPrice || 0}</strong>{" "}
                        <small>KDA</small>
                      </div>
                      <div className="collectListBx3">
                        <CollectionSlider item={item.nft} />
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>

          {/* {hotCollections?.length == 0 && (
            <div className="collectListOuter">
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
              <div className="colListOutBx">
                <a href="">
                  <div className="collectListBx1">
                    <i>
                      <img src={KadenaImg} alt="" />
                      <img className="yellowcheck" src={yellowCheck} alt="" />
                    </i>
                    {nightModeStatus ? (
                      <strong>Kadena Komodos</strong>
                    ) : (
                      <strong style={{ color: "#000" }}>Kadena Komodos</strong>
                    )}{" "}
                    <span>
                      <BsFillArrowRightCircleFill />
                    </span>
                  </div>
                  <div className="collectListBx2">
                    <i>Day Volume</i>
                    <strong>2.2K</strong> <small>KDA</small>
                    <span>+485.8%</span>
                  </div>
                  <div className="collectListBx2">
                    <i>Floor</i>
                    <strong>10.2</strong> <small>KDA</small>
                  </div>
                  <div className="collectListBx3">
                    <CollectionSlider />
                  </div>
                </a>
              </div>
            </div>
          )} */}
        </TabPane>
      </TabContent>
    </div>
  );
}

// export default class HotCollectionsTab extends React.Component {
//   constructor(props) {
//     super(props);

//     this.toggle = this.toggle.bind(this);
//     this.state = {
//       activeTab: '1'
//     };

//   }

//   toggle(tab) {
//     if (this.state.activeTab !== tab) {
//       this.setState({
//         activeTab: tab
//       });
//     }
//   }

//   render() {

//     return (
//       <div className='marketplace_tabsOuter'>
//         <div className='lcollistNumb'>
//             <Form>
//                 <FormGroup>
//                     <Input type="select" name="select" id="exampleSelect">
//                         <option>24</option>
//                     </Input>
//                 </FormGroup>
//             </Form>
//         </div>
//         <Nav tabs>
//           <NavItem>
//             <NavLink className={classnames({ active: this.state.activeTab === '1' })}
//               onClick={() => { this.toggle('1'); }}>
//               Trending
//             </NavLink>
//           </NavItem>
//           <NavItem>
//             <NavLink
//               className={classnames({ active: this.state.activeTab === '2' })}
//               onClick={() => { this.toggle('2'); }}>
//               Top
//             </NavLink>
//           </NavItem>
//         </Nav>
//         <TabContent activeTab={this.state.activeTab}>
//           <TabPane tabId="1">
//             <div className='collectionHd'>
//                 <div className='colBx1'>Collection</div>
//                 <div className='colBx2'>Day volume</div>
//                 <div className='colBx2'>Floor price</div>
//                 <div className='colBx3'></div>
//             </div>
//             <div className='collectListOuter'>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//             </div>

//           </TabPane>
//           <TabPane tabId="2">
//             <div className='collectionHd'>
//                 <div className='colBx1'>Collection</div>
//                 <div className='colBx2'>Day volume</div>
//                 <div className='colBx2'>Floor price</div>
//                 <div className='colBx3'></div>
//             </div>
//             <div className='collectListOuter'>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//                 <div className='colListOutBx'>
//                     <a href=''>
//                         <div className='collectListBx1'>
//                             <i><img src={KadenaImg} alt='' />
//                                 <img className='yellowcheck' src={yellowCheck} alt='' />
//                             </i>
//                             <strong>Kadena Komodos</strong>
//                             <span><BsFillArrowRightCircleFill /></span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Day Volume</i>
//                             <strong>2.2K</strong> <small>KDA</small>
//                             <span>+485.8%</span>
//                         </div>
//                         <div className='collectListBx2'>
//                             <i>Floor</i>
//                             <strong>10.2</strong> <small>KDA</small>
//                         </div>
//                         <div className='collectListBx3'>
//                             <CollectionSlider />
//                         </div>
//                     </a>
//                 </div>
//             </div>
//           </TabPane>
//         </TabContent>
//       </div>
//     );
//   }
// }
