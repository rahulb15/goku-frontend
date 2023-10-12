import React from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { upcomingProjects } from "./upcomingProjectList";

const UpcomingProjects = () => {
  return (
    <div>
      <div className="upcomingProject_outer" id="slide2">
        <div className="container">
          <div className="stepBx">
            <i></i>
            <span>1</span>
          </div>
          <div className="mainHd">
            <h3 className="bold">Launchpad</h3>
            <h2 className="extrabold">Upcoming Projects</h2>
          </div>
          <div className="upcmingProjList">
            <Row>
              {upcomingProjects.map((data) => {
                return (
                  // <div key={data}>
                  //   {data.company +
                  //     " , " +
                  //     data.ticker +
                  //     " ," +
                  //     data.stockPrice +
                  //     ", " +
                  //     data.timeElapsed}
                  // </div>
                  <Col sm="12" md="4" key={data.id}>
                    <div className="upcmingproj">
                      <div className="projImg">
                        <img src={data.img1} alt="" />
                      </div>
                      <div className="prodOwnerImg">
                        <img src={data.img2} alt="" />
                        <strong>{data.projectName}</strong>
                      </div>
                      <div className="itemList">
                        <ul>
                          <li>
                            <span>Total items</span>
                            <strong>{data.totalItems}</strong>
                          </li>
                          <li>
                            <span>Price</span>
                            <strong>{data.price} KDA</strong>
                          </li>
                          <li>
                            <span>Mint Date</span>
                            <strong>{data.mintDate}</strong>
                          </li>
                        </ul>
                      </div>
                      {/* {data.projectName=="Priority Pass"?  <a className='comingsoonBtn' href={`/launchpad/${data.id}`}>Live Now</a>:<a className='comingsoonBtn' href={`/launchpad/${data.id}`}>Live Now</a>} */}
                      {data.projectName == "Priority Pass" ? (
                        <Link
                          className="comingsoonBtn"
                          to={`/launchpad/${data.id}`}
                        >
                          Live Now
                        </Link>
                      ) : (
                        <Link
                          className="comingsoonBtn"
                          to={`/launchpad/${data.id}`}
                        >
                          Live Now
                        </Link>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          </div>
          {/* <Row>
                                <Col sm="12" md="4">
                                    <div className='upcmingproj'>
                                        <div className='projImg'>
                                            <img src={ProdImg1} alt="" />
                                        </div>
                                        <div className='prodOwnerImg'>
                                            <img src={ProdownImg} alt='' />
                                            <strong>DBCooper</strong>
                                        </div>
                                        <div className='itemList'>
                                            <ul>
                                                <li>
                                                    <span>Total items</span>
                                                    <strong>2777</strong>
                                                </li>
                                                <li>
                                                    <span>Price</span>
                                                    <strong>40/50 KDA</strong>
                                                </li>
                                                <li>
                                                    <span>Mint Date</span>
                                                    <strong>October 25th, 2022</strong>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href='/launchpad-detail' className='comingsoonBtn'>Coming Soon</a>
                                    </div>
                                </Col>
                                <Col sm="12" md="4">
                                    <div className='upcmingproj'>
                                        <div className='projImg'>
                                            <img src={ProdImg2} alt="" />
                                        </div>
                                        <div className='prodOwnerImg'>
                                            <img src={ProdownImg2} alt='' />
                                            <strong>DBCooper</strong>
                                        </div>
                                        <div className='itemList'>
                                            <ul>
                                                <li>
                                                    <span>Total items</span>
                                                    <strong>2777</strong>
                                                </li>
                                                <li>
                                                    <span>Price</span>
                                                    <strong>40/50 KDA</strong>
                                                </li>
                                                <li>
                                                    <span>Mint Date</span>
                                                    <strong>October 25th, 2022</strong>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href='/launchpad-detail' className='comingsoonBtn'>Coming Soon</a>
                                    </div>
                                </Col>
                                <Col sm="12" md="4">
                                    <div className='upcmingproj'>
                                        <div className='projImg'>
                                            <img src={ProdImg2} alt="" />
                                        </div>
                                        <div className='prodOwnerImg'>
                                            <img src={ProdownImg2} alt='' />
                                            <strong>DBCooper</strong>
                                        </div>
                                        <div className='itemList'>
                                            <ul>
                                                <li>
                                                    <span>Total items</span>
                                                    <strong>2777</strong>
                                                </li>
                                                <li>
                                                    <span>Price</span>
                                                    <strong>40/50 KDA</strong>
                                                </li>
                                                <li>
                                                    <span>Mint Date</span>
                                                    <strong>October 25th, 2022</strong>
                                                </li>
                                            </ul>
                                        </div>
                                        <a href='/launchpad-detail' className='comingsoonBtn'>Coming Soon</a>
                                    </div>
                                </Col>
                            </Row>  */}
        </div>
      </div>
    </div>
  );
};

export default UpcomingProjects;
