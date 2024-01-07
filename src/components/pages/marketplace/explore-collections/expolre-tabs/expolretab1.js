import React, { Component, useEffect, useState } from "react";
import { collectionCategory } from "../../../../common-components/common_json/collection_category";
import Axios from "axios";
import { HiCheckCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import UpcomingProjects from "./project";
import { useDispatch, useSelector } from "react-redux";

const ExpolreTabs1 = ({ tabno }) => {
  const [collectionName, setCollectionName] = useState("");
  const [active, setActive] = useState(false)
  const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("tab");
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  

  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    if (foo === null) {
      setCollectionName("Art");
      navigate("/marketplace/explore-collections?tab=Art");
    }
    if (foo === "Art") {
      setCollectionName("Art");
    }
    if (foo === "Collectibles") {
      setCollectionName("Collectibles");
    }
    if (foo === "Domain-names") {
      setCollectionName("Domain Names");
    }
    if (foo === "Music") {
      setCollectionName("Music");
    }
    if (foo === "Photography") {
      setCollectionName("Photography");
    }
    if (foo === "Sports") {
      setCollectionName("Sports");
    }
    if (foo === "Trading-cards") {
      setCollectionName("Trading Cards");
    }
    if (foo === "Utility") {
      setCollectionName("Utility");
    }
    if (foo === "Launchpad") {
      setCollectionName("Launchpad");
    }
  }, [foo]);
  useEffect(() => {
    getCollection();
  }, [collectionName]);
  
  const getCollection = () => {
    if (collectionName === "Launchpad") {
      //
      setActive(true)
    } else {
      setActive(false)
      const tab = collectionCategory[tabno].collectionName;
      const formdata = { tab };
      Axios.post("/collection/user-collection-category-1", formdata)
        .then((response) => {
          
          if (response.data.status == "success") {
            let filteredCollectionList = response.data.data;
            setCollectionList(filteredCollectionList);
          } else {
            setCollectionList([]);
          }
        })
        .catch((error) => {
          setCollectionList([]);
          
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
                          <span style={{ color: nightModeStatus ? "#fff" : "#000" }}
                          >{data.collectionName}</span> <HiCheckCircle />
                        </div>
                        <div className="ownersValueOuter">
                          <div className="ownvalueInn">
                            <span>Owners</span>
                            <strong>{data?.totalNftUser}</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Total Volume</span>
                            <strong>{data?.totalNftPrice}</strong>
                          </div>
                          <div className="ownvalueInn">
                            <span>Floor</span>
                            <strong>{data?.minNftPrice}</strong>
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
