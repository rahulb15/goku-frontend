import React, { Component, useEffect, useState } from "react";
import Axios from "axios";


export default function OverviewTab1() {
    const [filteredNft, setFilteredNft] = useState([]);
    const [forAll, setForAll] = useState(false);
    const [userId, setUserId] = useState("");
    const [propertyData, setPropertyData] = useState();


    useEffect(() => {
        getNft();
      }, []);
    const getNft = () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        let foo = params.get("id");
        let foo2 = params.get("for");
        const formdta = {
          _id: foo,
        };
        if (foo2 == "all") {
          setForAll(true);
          Axios.post("/nft/getNftbyId2", formdta)
            .then((response) => {
              if (response.data.status == "success") {
                let nftList = response.data.data;
                setFilteredNft(nftList);
                setUserId(nftList.creator);
    
                // setCollectionList(filteredCollectionList)
              } else {
                // setCollectionList([])
                setFilteredNft([]);
              }
            })
            .catch((error) => {
              setFilteredNft([]);
              //   setCollectionList([])
              //   setUserRegistered(false)
            });
        } else {
          setForAll(false);
          Axios.post("/passDetails/getNftPassbyId2", formdta)
            .then((response) => {
              if (response.data.status == "success") {
                console.log("response.data.dataProperty", response.data.data);
                let nftList = response.data.data;
                setFilteredNft(nftList);
                setUserId(nftList.creator);
    
                // setCollectionList(filteredCollectionList)
              } else {
                // setCollectionList([])
                setFilteredNft([]);
              }
            })
            .catch((error) => {
              setFilteredNft([]);
              //   setCollectionList([])
              //   setUserRegistered(false)
            });
        }
      };

      useEffect(() => {
        console.log("filteredNftUSEEFFECT", filteredNft);
        const fakeTokenId = "dbc:yHxNRKzSUSGEN2VaE6gLzqjqWXF47uTz0Xw-t565Q0E"
        //http://localhost:3001/properties/getPropertyByToken?token=dbc:yHxNRKzSUSGEN2VaE6gLzqjqWXF47uTz0Xw-t565Q0E
        if (filteredNft) {
          let token = filteredNft.tokenId;
          if(filteredNft.tokenId.split(":")[0] != "dbc"){
            //add collection name to token
            token = filteredNft.tokenId.split(":")[1]
          }
          else{
            token = filteredNft.tokenId
          }
          console.log("token", token);

          Axios.get(
            `/properties/getPropertyByToken?token=${token}`
            // `/properties/getPropertyByToken?token=${fakeTokenId}`

          )
            .then((response) => {
              if (response.data.status == "success") {
                let propertyList = response.data.data;
                // setFilteredNft(nftList);
                // setUserId(nftList.creator);
                console.log("propertyList", propertyList);
                setPropertyData(propertyList[0]);
                // setCollectionList(filteredCollectionList)
              } else {
                // setCollectionList([])
                // setFilteredNft([]);
              }
            })
            .catch((error) => {
              // setFilteredNft([]);
              //   setCollectionList([])
              //   setUserRegistered(false)
            });
        }
        

      }, [filteredNft]);

        return (
            <div className='propertiesList'>
                <h3>Properties</h3>
                <ul>
                    {propertyData && propertyData.attributes.map((item, index) => {
                        return (
                            <li key={index}>
                                <span>{item?.trait_type}</span>
                                <strong>{item?.value}</strong>
                            </li>
                        )
                    }
                    )}

                    {!propertyData && <li>
                        <span>No Properties</span>
                    </li>}


                    {/* <li>
                        <span>BACKGROUND</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li>
                    <li>
                        <span>Clothes</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li>
                    <li>
                        <span>Eyes</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li>
                    <li>
                        <span>Hair</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li>
                    <li>
                        <span>Headdress</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li>
                    <li>
                        <span>Mouth</span>
                        <strong>Dusty Pink</strong>
                        <small>3% have this trait</small>
                    </li> */}
                </ul>
            </div>
        )
    };