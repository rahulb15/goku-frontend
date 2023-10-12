import React, { Component, useEffect, useState } from "react";
//import CollectionImg1 from "../../../../../assets/nft-img4.png";
//import CollectionImg2 from "../../../../../assets/overviewDet-img.png";
//import CollectionImg3 from "../../../../../assets/owned-img1.png";
//import CollectionImg4 from "../../../../../assets/kitty-img5.png";
import { collectionCategory } from "../../../../common-components/common_json/collection_category";
import Axios from "axios";
import { HiCheckCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import UpcomingProjects from "./project";

const ExpolreTabs1 = ({ tabno }) => {
  const [collectionName, setCollectionName] = useState("");
  const [active, setActive] = useState(false)
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("tab");
  

  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    if (foo === null) {
      // setActiveTab("1")
      setCollectionName("Art");
      navigate("/marketplace/explore-collections?tab=Art");
    }
    if (foo === "Art") {
      // setActiveTab("1")
      setCollectionName("Art");
    }
    if (foo === "Collectibles") {
      // setActiveTab("2")
      setCollectionName("Collectibles");
    }
    if (foo === "Domain-names") {
      // setActiveTab("3")
      setCollectionName("Domain Names");
    }
    if (foo === "Music") {
      // setActiveTab("4")
      setCollectionName("Music");
    }
    if (foo === "Photography") {
      // setActiveTab("5")
      setCollectionName("Photography");
    }
    if (foo === "Sports") {
      // setActiveTab("6")
      setCollectionName("Sports");
    }
    if (foo === "Trading-cards") {
      // setActiveTab("7")
      setCollectionName("Trading Cards");
    }
    if (foo === "Utility") {
      // setActiveTab("8")
      setCollectionName("Utility");
    }
    if (foo === "Launchpad") {
      // setActiveTab("9")
      setCollectionName("Launchpad");
    }
    // if (foo === "PriorityPass") {
    //   // setActiveTab("10")
    //   setCollectionName("Priority Pass");
    // }
    // getCollection()
  }, [foo]);
  useEffect(() => {
    getCollection();
  }, [collectionName]);
  
  const getCollection = () => {
    // 
    // const tabno=tabno
    if (collectionName === "Launchpad") {
      //
      setActive(true)
      // const tab=collectionCategory[tabno].collectionName
      //   const tab = collectionName;
      //   const formdata = { tab };
      //   Axios.post("/passDetails/user-pass-category", formdata)
      //     .then((response) => {
      //       
      //       if (response.data.status == "success") {
      //         let filteredCollectionList = response.data.data;
      //         // 
      //         // let filteredCollectionList=collectionList.filter(data=>data.category===collectionName )
      //         // 
      //         setCollectionList(filteredCollectionList);
      //       } else {
      //         setCollectionList([]);
      //       }
      //     })
      //     .catch((error) => {
      //       setCollectionList([]);
      //       //   setUserRegistered(false)
      //       
      //     });
    } else {
      setActive(false)
      const tab = collectionCategory[tabno].collectionName;
      const formdata = { tab };
      Axios.post("/collection/user-collection-category", formdata)
        .then((response) => {
          
          if (response.data.status == "success") {
            let filteredCollectionList = response.data.data;
            // 
            // let filteredCollectionList=collectionList.filter(data=>data.category===collectionName )
            // 
            setCollectionList(filteredCollectionList);
          } else {
            setCollectionList([]);
          }
        })
        .catch((error) => {
          setCollectionList([]);
          //   setUserRegistered(false)
          
        });
    }
  };
  

  return (
    <>
      <div className="collectionLest">
        <ul>
          {active === false ? (
            <>
              {collectionList.length ? (
                collectionList.map((data) => {
                  
                  return (
                    <>
                    { data?.isActive &&
                    <Link
                      to={{
                        pathname: "/marketplace/collection-listing",
                        search: `?id=${data._id}&for=all`,
                      }}
                    >
                      <li style={{ cursor: "pointer" }}>
                        <div className="collectionImg">
                          <img src={data.imageUrl} alt="" />
                          <i>
                            <img src={data.imageUrl} alt="" />
                          </i>
                        </div>
                        <div className="collectionHd bold">
                          {data.collectionName} <HiCheckCircle />
                        </div>
                        <div className="ownersValueOuter">
                          <div className="ownvalueInn">
                            <span>Owners</span>
                            <strong>504</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Total Volume</span>
                            <strong>843.8K</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Floor</span>
                            <strong>482</strong>
                          </div>
                        </div>
                      </li>
                    </Link>
                    }
                    </>
                  );
                })
              ) : (
                <h1>No collections</h1>
                // <UpcomingProjects/>
              )}
            </>) : (
            <>
              <UpcomingProjects />
            </>
          )}
        </ul>
      </div>
      {/* <div className='loadmoreBtn'>
                    <button>Load More</button>
                </div> */}
    </>
  );
};

export default ExpolreTabs1;
