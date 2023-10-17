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
import CollectionSlider from "./collectionSlider";

export default function HotCollectionsTab() {
  const [activeTab, setActiveTab] = React.useState("1");
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [hotCollections, setHotCollections] = useState([]);
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
    getAllCollections();
  }, []);

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

          <div className="collectListOuter">
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
                        <CollectionSlider item={item?.nft} />
                      </div>
                    </a>
                  </div>
                );
              })}
          </div>

          {hotCollections?.length == 0 && (
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
          )}
        </TabPane>
        <TabPane tabId="2">
          <div className="collectionHd">
            <div className="colBx1">Collection</div>
            <div className="colBx2">Day volume</div>
            <div className="colBx2">Floor price</div>
            <div className="colBx3"></div>
          </div>

          <div className="collectListOuter">
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
                        <strong>{item?.dayVolume || 0}</strong>{" "}
                        <small>KDA</small>
                        <span>+{item?.dayVolumePercentage || 0}%</span>
                      </div>
                      <div className="collectListBx2">
                        <i>Floor</i>
                        <strong>{item?.floorPrice || 0}</strong>{" "}
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

          {hotCollections?.length == 0 && (
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
          )}
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
