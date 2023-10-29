import Axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineStar } from "react-icons/ai";
import { BsFillShareFill } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";
import { MdOutlineContentCopy } from "react-icons/md";
import { useSelector } from "react-redux";
import Background from "../../../../assets/creator-banner.png";
import CreatorImg from "../../../../assets/creator-img.png";
import { Header } from "../../../common-components/header/header";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import CollectionListingTab from "./collection-listing-tab";
import "./collection-listing.scss";
import { toast } from "react-toastify";
import { WalletModal } from "../../../common-components/walletModal/walletModal";
import { SpinnerCircular } from "spinners-react";
import Pact from "pact-lang-api";
import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookIcon,
  TelegramShareButton,
  TelegramIcon,
  WhatsappShareButton,
  WhatsappIcon,
  TwitterShareButton,
  TwitterIcon,
} from "react-share";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const CommunityMarketplace = () => {
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [filteredNft, setFilteredNft] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [baseValue, setBaseValue] = useState(0);
  const [totalNftPrice, setTotalNftPrice] = useState(0.0);
  const [ownerCount, setOwnerCount] = useState(0);
  const { isAuth } = useSelector((state) => state.loginStatus);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [loading, setLoading] = useState(false);

  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  //   const navigate = useNavigate();
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("id");

  useEffect( () => {
   getCollection();
  }, []);

  const getCollection = () => {
    Axios.get(`/collection/user-collection-by-id2?id=${foo}`, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          console.log(response.data.data[0], "collection data");
          if (response.data.data[0]) {
            setCollectionData(response.data.data[0]);
          } else {
            console.log("no data");
            Axios.get(`/collection/user-collection-by-id?id=${foo}`, {
              headers: { authorization: localStorage.getItem("accessJWT") },
            })
              .then((response) => {
                if (response.data.status == "success") {
                  console.log(response.data.data[0], "collection data");
                  if (response.data.data[0]) {
                    console.log("collection found");
                    setCollectionData({ collection_info: [response.data.data[0]] });
                  }
                  else{
                    toast.error("Collection not found");
                  }

                  // setCollectionData({
                  //   collection_info: [response.data.data[0]],
                  // });
                  // if (response.data.data[0]) {
                  // }
                }
              })
              .catch((error) => {
                console.log(error);
              });
          }
          // setCollectionName(response.data.data[0].collectionName);
          // setCollectionData(response.data.data[0]);
        }
      })
      .catch((error) => {
        //   setUserRegistered(false)
      });
  };

  useEffect(() => {
    getNft();
  }, [refresh]);

  const getNft = () => {
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        console.log("heyllo6", response.data.data);
        if (response.data.status == "success") {
          setBaseValue(response.data.baseNftPrice);
          setTotalNftPrice(response.data.totalNftPrice);
          setOwnerCount(response.data.uniqueOwner);
          let nftList = response.data.data;
          const search = window.location.search;
          const params = new URLSearchParams(search);
          let foo = params.get("id");

          let filteredNftList = nftList.filter(
            (data) => data.collectionId === foo
          );
          console.log("filteredddd2", filteredNftList);
          const list = filteredNftList.filter((item) => {
            if (item.onMarketplace == false) {
              return item;
            }
          });
          setFilteredNft(list);
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
          setFilteredNft([]);
          console.log("hello");
        }
      })
      .catch((error) => {
        setFilteredNft([]);
        //   setCollectionList([])
        //   setUserRegistered(false)
        console.log("error", error);
      });
  };

  console.log("collectionData", collectionData);
  console.log("collectionName", collectionName);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Copied to clipboard");
  };

  const shareCollection = () => {
    navigator.clipboard.writeText(
      `${process.env.REACT_APP_URL}marketplace/collection-listing?id=${foo}&for=all`
    );
    toast.success("Copied to clipboard");
  }
  const shareToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Copied to clipboard");
  };


  var collectionCreator = "";
  var collectionPrice = 0;
  const getCollectionPrice = async () => {
    const accountName1 = walletAddress;
    const publicKey1 = accountName1.slice(2, accountName1.length);
    const guard1 = { keys: [publicKey1], pred: "keys-all" };
    const a = accountName1;
    const pactCode = `(free.merchfinal001.get-collection-price "${collectionData?.collection_info[0]?.collectionName}")`;
    const signCmd = {
      pactCode: pactCode,
      caps: [
        Pact.lang.mkCap(
          "GAS",
          "Capability to allow buying gas",
          "coin.GAS",
          []
        ),
      ],
      meta: {
        creationTime: creationTime(),
        gasLimit: 100000,
        chainId: CHAIN_ID,
        ttl: 28800,
        gasPrice: GAS_PRICE,
        // IMPORTANT: the API requires this attribute even if it's an empty value like in this case
        sender: "",
      },
    }; //alert to sign tx
    const response = await Pact.fetch.local(signCmd, API_HOST);
    if (response.result.status === "success") {
      // setCollectionPrice(response.result.data);
      collectionPrice = response.result.data;
    }
  };

  const getCollectionCreator = async () => {
    setLoading(true);
    const accountName1 = walletAddress;
    const publicKey1 = accountName1.slice(2, accountName1.length);
    const guard1 = { keys: [publicKey1], pred: "keys-all" };
    const a = accountName1;
    const pactCode = `(free.merchfinal001.get-collection-creator "${collectionData?.collection_info[0]?.collectionName}")`;
    const signCmd = {
      pactCode: pactCode,
      caps: [
        Pact.lang.mkCap(
          "GAS",
          "Capability to allow buying gas",
          "coin.GAS",
          []
        ),
      ],
      meta: {
        creationTime: creationTime(),
        gasLimit: 100000,
        chainId: CHAIN_ID,
        ttl: 28800,
        gasPrice: GAS_PRICE,
        // IMPORTANT: the API requires this attribute even if it's an empty value like in this case
        sender: "",
      },
    }; //alert to sign tx
    const response = await Pact.fetch.local(signCmd, API_HOST);
    if (response.result.status === "success") {
      // setCollectionCreator(response.result.data);
      collectionCreator = response.result.data;
    }
  };
  const mintCollectionTwo = async () => {
    const accountName1 = collectionCreator;
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    const guard = { keys: [publicKey], pred: "keys-all" };
    const a = accountName;
    const b = accountName1; //comment
    if (walletName == "Zelcore" || walletName == "Chainweaver") {
      const pactCode = `(free.merchfinal001.mint ${JSON.stringify(
        a
      )} (read-keyset "guard") 1.0 "${collectionData?.collection_info[0]?.collectionName}" 1)`;
      let signCmd;
      if (a === b) {
        signCmd = {
          pactCode: pactCode,
          caps: [
            Pact.lang.mkCap(
              "GAS",
              "Capability to allow buying gas",
              "coin.GAS",
              []
            ),
            //  Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal002.COOPER"),
            //    Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
            //       [a, b, 2.0]
            //), //if creaotr == mint user  comment this 2419 to 2421
            Pact.lang.mkCap(
              "MINT-COOPER",
              "Capability for owner",
              "free.merchfinal001.MINT",
              [a, 1.0]
            ),
          ],
          sender: a,
          gasLimit: 150000,
          chainId: CHAIN_ID,
          ttl: 28800,
          envData: {
            guard: guard,
          },
        }; //alert to sign tx
      } else {
        signCmd = {
          pactCode: pactCode,
          caps: [
            Pact.lang.mkCap(
              "GAS",
              "Capability to allow buying gas",
              "coin.GAS",
              []
            ),
            //  Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal002.COOPER"),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, b, collectionPrice]
            ), //if creaotr == mint user  comment this 2419 to 2421
            Pact.lang.mkCap(
              "MINT-COOPER",
              "Capability for owner",
              "free.merchfinal001.MINT",
              [a, 1.0]
            ),
          ],
          sender: a,
          gasLimit: 150000,
          chainId: CHAIN_ID,
          ttl: 28800,
          envData: {
            guard: guard,
          },
        }; //alert to sign tx
      }
      const cmd = await Pact.wallet.sign(signCmd);
      if (cmd) {
        const localRes = await fetch(`${API_HOST}/api/v1/local`, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(cmd),
        });
        const rawRes = await localRes;
        const resJSON = await rawRes.json();
        if (resJSON.result.status === "success") {
          const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST);
          const signedtxx = await Pact.fetch.listen(
            { listen: reqKey.requestKeys[0] },
            API_HOST
          );
          if (signedtxx.result.status === "success") {
            const token_id = signedtxx.events[3].params[0];
            // const token_owner = signedtxx.events[3].params[1];
            nftSubmit(token_id);
          } else {
            toast.error("Transaction failed");
            setLoading(false);
          }
        } else {
          toast.error("Transaction failed");
          setLoading(false);
        }
      } else {
        toast.error("Rejected from wallet");
        setLoading(false);
      }
    }
    if (walletName == "Xwallet") {
      const pactCode = `(free.merchfinal001.mint ${JSON.stringify(
        a
      )} (read-keyset "guard") 1.0 "${collectionData?.collection_info[0]?.collectionName}" 1)`;
      const XWalletRequest = {
        networkId: NETWORK_ID,
        signingCmd: {
          sender: a,
          chainId: CHAIN_ID,
          gasPrice: 0.0000001,
          gasLimit: 150000,
          ttl: 28000,
          caps: [
            Pact.lang.mkCap(
              "GAS",
              "Capability to allow buying gas",
              "coin.GAS",
              []
            ),
            //  Pact.lang.mkCap("MERCH","Capability for owner", "free.dbcfinal002.COOPER"),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, b, collectionPrice]
            ), //if creaotr == mint user  comment this 2419 to 2421
            Pact.lang.mkCap(
              "MINT-COOPER",
              "Capability for owner",
              "free.merchfinal001.MINT",
              [a, 1.0]
            ),
          ],
          envData: {
            guard: guard,
          },
          pactCode: pactCode,
          networkId: NETWORK_ID,
          signingPubKey: publicKey,
          creationTime: creationTime(),
        }, //alert to sign tx
      };
      // 18.87350
      const cmd = await window.kadena.request({
        method: "kda_requestSign",
        networkId: NETWORK_ID,
        data: XWalletRequest,
      });
      const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
      // setSpinner("true");
      const txResult = await Pact.fetch.listen(
        { listen: `${gore2.requestKeys[0]}` },
        API_HOST
      );
      if (txResult.result.status === "success") {
        const token_id = txResult.events[3].params[0];
        // const token_owner = signedtxx.events[3].params[1];
        nftSubmit(token_id);
      } else {
        toast.error("Transaction failed");
        setLoading(false);
      }
      if (txResult.result.status == "failure") {
        toast.error("Minting Issue", {
          position: "top-right",
        });
      }
    }
  };
  const nftSubmit = async (token) => {
    // const token_id =
    // "newCollectionGuy:dU4W2bg2_QhqkPTvwbH3afcqzkvr30AOhcxugfmlxlc";
    // const tokenId = token_id.split(":")[1];
    const tokenId = token;
    const collectionId = foo;
    const obj = {
      tokenId: tokenId,
      walletAddress: walletAddress,
      // clientId: props.collectionData.clientId,
      collectionId: collectionData?.collection_info[0]?._id,
      onMarketplace: false,
      history: [
        {
          owner: walletAddress,
          price: "0.00",
          category: "mint",
        },
      ],
    };
    Axios.post("/nft/add-nft-marketplace", obj, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          toast.success("NFT added successfully");
          setRefresh(!refresh);
          setLoading(false);
        } else {
          toast.error("NFT not added");
          setLoading(false);
        }
      })
      .catch((error) => {
        
        setLoading(false);
      });
  };
  const submitData = async () => {
    await getCollectionPrice();
    await getCollectionCreator();
    mintCollectionTwo();
    // nftSubmit();
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <div>
      {/* <MarketplaceHeader /> */}
      {isAuth ? <HeaderafterLogin /> : <Header />}
      <div
        className="creatorOuterBx"
        style={{ background: `url(${Background})` }}
      >
        <div className="container">
          <div className="creatorDetBx">
            <div className="creatorImg">
              <img src={collectionData?.collection_info[0]?.imageUrl} alt="" />
            </div>
            <div className="creatorDet">
              <div className="creatorNameOuter">
                <div className="creatorName">
                  {collectionData?.collection_info[0]?.collectionName}

                  <HiCheckCircle />
                </div>
                <div className="wishlist">
                  <span>
                    <EmailShareButton url={window.location.href}>
                      <EmailIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </EmailShareButton>
                    <FacebookShareButton url={window.location.href}>
                      <FacebookIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </FacebookShareButton>
                    <TwitterShareButton url={window.location.href}>
                      <TwitterIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TwitterShareButton>
                    <WhatsappShareButton url={window.location.href}>
                      <WhatsappIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </WhatsappShareButton>
                    <TelegramShareButton url={window.location.href}>
                      <TelegramIcon
                        style={{
                          width: "40px",
                          height: "40px",
                          marginRight: "10px",
                          cursor: "pointer",
                          borderRadius: "50%",
                        }}
                      />
                    </TelegramShareButton>
                    {/* <BsGlobe style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={()=>{window.open(window.location.href)}}/> */}
                    {/* <BsTwitter style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToTwitter}/> */}
                    {/* <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToInstagram}/> */}
                    {/* <span style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}> */}
                    {/* <InstapaperShareButton url={window.location.href}>
                                                <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}/>
                                            </InstapaperShareButton> */}

                    {/* </span> */}
                    {/* <FaDiscord style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }} onClick={shareToDiscord}/> */}
                  </span>
                  <button onClick={shareToClipboard}>
                    <BsFillShareFill />
                  </button>
                </div>
              </div>
              <div className="kryptoId">
                <div className="kryptoInn">
                  {walletAddress.slice(0, 10)}...{walletAddress.slice(-5)}&nbsp;
                  <MdOutlineContentCopy
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      copyToClipboard();
                    }}
                  />
                </div>
                <div className="kryptocreator">
                  Created By
                  <strong>{collectionData?.user_info ? collectionData?.user_info[0]?.name : collectionData?.collection_info[0]?.clientId?.name}</strong>   
                  
                </div>
              </div>
              <div className="kryptoCont">
                {/* The collection name here is a collection of 10,000 unique
                Collection NFTs— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "}
                <a href="">Show more</a> */}
                                {collectionData?.collection_info[0]?.collectionInfo  ? collectionData?.collection_info[0]?.collectionInfo : "The collection name here is a collection of 10,000 unique Collection NFTsd— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to..."}

              </div>
              <div className="items_qty">
                <div className="itemQtyBx">
                  <small>Items</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.collection_info[0]?.totalSupply}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Owners</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.totalNftUser ? collectionData?.totalNftUser : 0}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Total Volume</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.totalNftPrice ? collectionData?.totalNftPrice : 0} KDA
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Floor Price</small>
                  <strong
                    style={
                      nightModeStatus ? { color: "#fff" } : { color: "#000" }
                    }
                  >
                    {collectionData?.minNftPrice ? collectionData?.minNftPrice : 0} KDA
                  </strong>
                </div>
              </div>
              <div className="editProf_Outer">
            
                 
                  {/* {isAuth ? (
                    <button onClick={() => (loading ? null : submitData())}>
                      {loading ? <SpinnerCircular /> : <span>Mint <span style={{color:'#FFC300',fontWeight:'bold'}}
                      >NFT</span></span>}
                    </button>
                  ) : (
                    <button style={{width:'20%'}} onClick={() => toggle() }>
                      <span>Connect <span style={{color:'#FFC300',fontWeight:'bold'}} >Wallet</span></span>
                    </button>
                  )} */}

                  {isAuth ? (
                    <button onClick={() => (loading ? null : submitData())}>
                      {loading ? <SpinnerCircular /> : "Mint NFT"}
                    </button>
                  ) : (
                    <button style={{width:'20%'}} onClick={() => toggle() }>
                      <span>Connect Wallet</span>
                    </button>
                  )}
                    
                
                {/* <button onClick={submitData}>
                   Mint NFT
                   </button> */}
                {/* <Link to="/marketplace/profile-setting">Edit Profile</Link> */}
              </div>
            </div>
          </div>
        </div>
        <WalletModal toggle={toggle} modal={modal} setModal={setModal} />
        <div className="creatortabOuter">
          <div className="container">
            <CollectionListingTab
              filteredNft={filteredNft}
              collectionData={collectionData}
              setRefresh={setRefresh}
              loading={loading}
              setLoading={setLoading}
              refresh={refresh}
              collectionName={collectionName}
            />
          </div>
        </div>
      </div>
      <MarketplaceFooter />
    </div>
  );
};

export default CommunityMarketplace;
