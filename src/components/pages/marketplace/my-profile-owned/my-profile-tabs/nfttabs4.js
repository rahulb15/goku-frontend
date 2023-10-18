import React, { Component, useState, useEffect } from "react";
import CollectionImg from "../../../../../assets/kishu-img1.png";
import CreateCollection from "../create-collection";
import {
  Button,
  Form,
  FormGroup,
  ModalBody,
  Modal,
  ModalFooter,
  Label,
  Input,
  FormText,
} from "reactstrap";
import Axios from "axios";
import { HiCheckCircle } from "react-icons/hi";
import { FaTshirt } from "react-icons/fa";
import { Link } from "react-router-dom";
const NftTabs1 = () => {
  const [collectionList, setCollectionList] = useState([]);
  useEffect(() => {
    getCollection();
  }, []);

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
  return (
    <>
      {collectionList.length ? (
        <>
          {" "}
          <CreateCollection />
          <div className="collectionLest">
            <ul>
              {collectionList.map((data) => {
                
                return (

                  <>
                    {data.isActive ? (
                      <Link
                        to={{
                          pathname: "/marketplace/my-collection-detail",
                          search: `?id=${data._id}`,
                        }}
                      >
                        <li>
                          <div className="collectionImg" style={data.isActive ? { opacity: 1 } : { opacity: 0.5 }}>
                            <img src={data.imageUrl} alt="" />
                            <i>
                              <img src={data.imageUrl} alt="" />
                            </i>
                          </div>
                          <div className="collectionHd bold" style={data.isActive ? { opacity: 1 } : { opacity: 0.5 }}>
                            {data.collectionName} <HiCheckCircle />
                          </div>
                          {data.isActive ? (
                            <div className="ownersValueOuter">
                              <div className="ownvalueInn">
                                <span>Owners</span>
                                <strong>{data.totalNftUser}</strong>
                              </div>
                              <div className="ownvalueInn">
                                <span>Total Volume</span>
                                <strong>{data.totalNftPrice}</strong>
                              </div>
                              <div className="ownvalueInn">
                                <span>Floor</span>
                                <strong>{data.minNftPrice}</strong>
                              </div>
                            </div>
                          ) : (
                            <div >
                              <span style={{ color: "red" }}
                              >Admin Approval Needed</span>
                            </div>
                          )
                          }

                        </li>
                      </Link>
                    ) : (
                      <li>
                        <div className="collectionImg" style={data.isActive ? { opacity: 1 } : { opacity: 0.5 }}>
                          <img src={data.imageUrl} alt="" />
                          <i>
                            <img src={data.imageUrl} alt="" />
                          </i>
                        </div>
                        <div className="collectionHd bold" style={data.isActive ? { opacity: 1 } : { opacity: 0.5 }}>
                          {data.collectionName} <HiCheckCircle />
                        </div>
                        {data.isActive ? (
                          <div className="ownersValueOuter">
                            <div className="ownvalueInn">
                              <span>Owners</span>
                              <strong>{data.totalNftUser}</strong>
                            </div>
                            <div className="ownvalueInn">
                              <span>Total Volume</span>
                              <strong>{data.totalNftPrice}</strong>
                            </div>
                            <div className="ownvalueInn">
                              <span>Floor</span>
                              <strong>{data.minNftPrice}</strong>
                            </div>
                          </div>
                        ) : (
                          <div style={{ marginBottom: "25px", justifyContent: "center", display: "flex" }}>
                            <span style={{ color: "#FF6969" }}
                            >Admin Approval Needed</span>
                          </div>
                        )
                        }

                      </li>
                    )}

                  </>
                );
              })}
            </ul>
          </div>
        </>
      ) : (
        <div className="noCollectOuter">
          <div className="noCollectBx">
            <strong>No Collections Found</strong>
            <small>
              We couldn't find any of your collections. Looks like you don't
              have any
            </small>
            <CreateCollection />
            <button className="importExistBtn">Import an existing</button>
          </div>
        </div>
      )}
    </>
  );
};

export default NftTabs1;
