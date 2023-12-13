import React, { Component, useState, useEffect } from "react";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import ProfileListingTab from "./profile-listing-tab";
import { FaDiscord, FaKickstarterK } from "react-icons/fa";
import { toast } from "react-toastify";
import TagsInput from "react-tagsinput";
import {
  BsFillShareFill,
  BsGlobe,
  BsTwitter,
  BsInstagram,
} from "react-icons/bs";
import { MdOutlineContentCopy } from "react-icons/md";
import { Link, useParams, useNavigate } from "react-router-dom";
import CreatorImg from "../../../../assets/nft-img2.png";
import { useDispatch, useSelector } from "react-redux";
import Axios from "axios";
import "./my-collection-detail.scss";
import Background from "../../../../assets/profile-banner.png";
import Pact from "pact-lang-api";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { SpinnerCircular } from "spinners-react";
import { WalletModal } from "../../../common-components/walletModal/walletModal";
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

export default function CommunityMarketplace() {
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [filteredNft, setFilteredNft] = useState([]);
  const [modal, setModal] = useState(false);
  const [authModal, setAuthModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [tokenList, setTokenList] = useState([]);
  const [propertyFile, setPropertyFile] = useState("");
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const [modal2, setModal2] = useState(false);
  const { isAuth } = useSelector((state) => state.loginStatus);
  const [loading, setLoading] = useState(false);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  //   const navigate = useNavigate();

  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("id");

  useEffect(() => {
    getCollection();
  }, []);

  const uploadProperty = async () => {
    console.log("propertyFile", propertyFile);
    const formData = new FormData();
    formData.append("propertyFile", propertyFile);
    Axios.post("/properties/insertProperty", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        authorization: localStorage.getItem("accessJWT"),
      },
    })
      .then((response) => {
        console.log("heyllo2", response);
        if (response.data.status == "success") {
          toast.success("Property Uploaded", {
            position: "top-right",
          });
        } else {
          toast.error("Property Upload Failed", {
            position: "top-right",
          });
        }
      })
      .catch((error) => {
        console.log("error", error);
        toast.error("Property Upload Failed or Already Exists", {
          position: "top-right",
        });
      });
  };

  useEffect(() => {
    if (propertyFile) {
      uploadProperty();
    }
  }, [propertyFile]);

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
                  setCollectionData({
                    collection_info: [response.data.data[0]],
                  });
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
        console.log(error);
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
        if (response.data.status == "success") {
          let nftList = response.data.data;
          const search = window.location.search;
          const params = new URLSearchParams(search);
          let foo = params.get("id");

          let filteredNftList = nftList.filter(
            (data) => data.collectionId === foo
          );

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
        }
      })
      .catch((error) => {
        setFilteredNft([]);
        console.log(error);
        //   setCollectionList([])
        //   setUserRegistered(false)
      });
  };
  //
  //
  const shareToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied");
  };

  const toggle = () => {
    setModal(!modal);
  };

  const toggle2 = () => {
    console.log("toggle2");
    setModal2(!modal2);
  };
  const authToggle = () => {
    setAuthModal(!authModal);
  };

  const handleTokenList = (e) => {
    if (e.length == 0) {
      setTokenList([]);
    }
    const arr = e.map((item) => {
      if (item.split(",").length > 1) {
        //regular expression to remove all special characters except comma
        const regex = /[^a-zA-Z0-9,]/g;
        const str = item.replace(regex, "");
        setTokenList(str.split(","));
      } else {
        setTokenList(e);
      }
    });
  };

  const updateTokenList = async () => {
    setLoading(true);
    console.log(tokenList, "tokenListsss");
    console.log(
      collectionData?.collection_info[0]?._id,
      "collectionData?.collection_info[0]?._id"
    );

    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;

    console.log(tokenList, "tokenList");

    const pactCode = `(free.merchfinal001.updatetokenlist ${
      tokenList.length > 0 ? JSON.stringify(tokenList) : "[]"
    } 
    "${collectionData?.collection_info[0]?.collectionName}")`;
    if (walletName == "Zelcore" || walletName == "Chainweaver") {
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
        sender: a,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        envData: {
          guard: guard,
        },
      }; //alert to sign tx
      console.log(signCmd, "signcmd");
      const cmd = await Pact.wallet.sign(signCmd);
      console.log("cmjj", cmd);

      const localRes = await fetch(`${API_HOST}/api/v1/local`, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(cmd),
      });
      console.log(localRes, "localrp");
      const rawRes = await localRes;
      const resJSON = await rawRes.json();
      console.log("rawraw", resJSON);
      if (resJSON.result.status === "success") {
        const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST);

        console.log(reqKey, "Reqkey");
        const signedtxx = await Pact.fetch.listen(
          { listen: reqKey.requestKeys[0] },
          API_HOST
        );
        console.log(signedtxx, "xxxxxxxxxxxxxx");
        if (signedtxx.result.status === "success") {
          Axios.put(
            "/collection/update-token-list",
            {
              tokenList: tokenList,
              collectionId: collectionData?.collection_info[0]?._id,
              totalSupply:
                collectionData?.collection_info[0]?.totalSupply +
                tokenList.length,
            },
            {
              headers: { authorization: localStorage.getItem("accessJWT") },
            }
          )
            .then((response) => {
              if (response.data.status == "success") {
                toast.success("Token List Added Successfully", {
                  position: "top-right",
                });
                setModal(false);
                setLoading(false);
              } else {
                toast.error("Token List Not Added", {
                  position: "top-right",
                });
              }
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          toast.error("Token List Not Added", {
            position: "top-right",
          });
        }
      }
    }
    if (walletName == "Xwallet") {
      const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
      const XWalletRequest = {
        networkId: NETWORK_ID,
        signingCmd: {
          sender: a,
          chainId: CHAIN_ID,
          gasPrice: 0.0000001,
          gasLimit: 150000,
          ttl: 28800,
          caps: [
            Pact.lang.mkCap(
              "GAS",
              "Capability to allow buying gas",
              "coin.GAS",
              []
            ),
          ],
          envData: {
            guards: guard,
          },
          pactCode: pactCode,
          networkId: NETWORK_ID,
          signingPubKey: publicKey,
          creationTime: creationTime(),
        },
      };

      try {
        const cmd = await window.kadena.request({
          method: "kda_requestSign",
          networkId: NETWORK_ID,
          data: XWalletRequest,
        });
        console.log("cmd", cmd);
        if (cmd.status === "success") {
          toast.success("Token List Added Successfully", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setModal(false);
          setLoading(true);
          const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
          console.log("sdsf", gore2);

          const txResult = await Pact.fetch.listen(
            { listen: `${gore2.requestKeys[0]}` },
            API_HOST
          );
          console.log("txn result", txResult);

          // const txResult1 = await Pact.fetch.listen({ listen: `${gore2}` }, API_HOST);
          // console.log("txn result", txResult1.result);
          console.log("Ssffs", txResult);
          if (txResult.result.status === "success") {
            Axios.put(
              "/collection/update-token-list",
              {
                tokenList: tokenList,
                collectionId: collectionData?.collection_info[0]?._id,
                totalSupply:
                  collectionData?.collection_info[0]?.totalSupply +
                  tokenList.length,
              },
              {
                headers: { authorization: localStorage.getItem("accessJWT") },
              }
            )
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("Token List Added Successfully", {
                    position: "top-right",
                  });
                  setModal(false);
                  setLoading(false);
                } else {
                  toast.error("Token List Not Added", {
                    position: "top-right",
                  });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            toast.error("Token List Not Added", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });

            setLoading(false);
            setModal(true);
          }
        } else {
          toast.error("Token List Not Added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setLoading(false);
          setModal(true);
        }
      } catch (err) {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        setModal(true);
        console.error(err);
      }
    }
  };

  const handleOnSubmit = () => {
    if (tokenList.length == 0) {
      toast.error("Please enter token list to add", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      //add function here
      console.log(tokenList, "tokenList");
      updateTokenList();
      setModal(!modal);
    }
  };

  const shareToTwitter = () => {
    // window.open(`https://twitter.com/intent/tweet?text=${window.location.href}`);
    toast.error("Coming Soon", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const shareToInstagram = () => {
    // window.open(`https://www.instagram.com/?url=${window.location.href}`);
    toast.error("Coming Soon", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const shareToDiscord = () => {
    // window.open(`https://discord.com/channels/@me`);
    toast.error("Coming Soon", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const shareToWebsite = () => {
    // window.open(`${window.location.href}`);
    toast.error("Coming Soon", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
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
      )} (read-keyset "guard") 1.0 "${
        collectionData?.collection_info[0]?.collectionName
      }" 1)`;
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
      )} (read-keyset "guard") 1.0 "${
        collectionData?.collection_info[0]?.collectionName
      }" 1)`;
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
      // history: [
      //   {
      //     owner: walletAddress,
      //     price: "0.00",
      //     category: "mint",
      //   },
      // ],
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

  console.log(collectionData, "collectionData");
  return (
    <div>
      {/* <MarketplaceHeader /> */}
      <HeaderafterLogin />
      <div
        className="creatorOuterBx"
        style={{
          background: `url(${
            collectionData?.collection_info[0]?.bannerUrl
              ? collectionData?.collection_info[0]?.bannerUrl
              : Background
          })`,
        }}
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
                </div>
                <div className="wishlist">
                  <span>
                    {/* <EmailShareButton url={window.location.href}>
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
                    </TelegramShareButton> */}
                    <BsGlobe
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={shareToWebsite}
                    />
                    <BsTwitter
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={shareToTwitter}
                    />
                    <BsInstagram
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={shareToInstagram}
                    />
                    {/* <span style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}> */}
                    {/* <InstapaperShareButton url={window.location.href}>
                                                <BsInstagram style={{ width: '20px', height: '20px',marginRight:'10px',cursor:'pointer' }}/>
                                            </InstapaperShareButton> */}

                    {/* </span> */}
                    <FaDiscord
                      style={{
                        width: "20px",
                        height: "20px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                      onClick={shareToDiscord}
                    />
                  </span>
                  <button onClick={shareToClipboard}>
                    <BsFillShareFill />
                  </button>
                </div>
              </div>

              <div className="kryptoCont">
                {/* The collection name here is a collection of 10,000 unique
                Collection NFTsd— unique digital collectibles living on the
                Kadena blockchain. Your Collection doubles as your Collection
                membership card, and grants access to...{" "} */}
                {/* <a href="">Show more</a> */}
                {collectionData?.collection_info[0]
                  ? collectionData?.collection_info[0]?.collectionInfo
                  : "The collection name here is a collection of 10,000 unique Collection NFTsd— unique digital collectibles living on the Kadena blockchain. Your Collection doubles as your Collection membership card, and grants access to..."}
              </div>
              <div className="items_qty">
                <div className="itemQtyBx">
                  <small>Items</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.collection_info[0]?.totalSupply}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Owners</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.totalNftUser
                      ? collectionData?.totalNftUser
                      : 0}
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Total Volume</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.totalNftPrice
                      ? collectionData?.totalNftPrice
                      : 0}{" "}
                    KDA
                  </strong>
                </div>
                <div className="itemQtyBx">
                  <small>Floor Price</small>
                  <strong
                    style={{ color: `${nightModeStatus ? "#fff" : "#000"}` }}
                  >
                    {collectionData?.minNftPrice
                      ? collectionData?.minNftPrice
                      : 0}{" "}
                    KDA
                  </strong>
                </div>
              </div>
              <div className="editProf_Outer">
                {/* <button className="editProf" onClick={toggle}>
                  Add Token
                </button> */}
                {/* <Link to="/marketplace/profile-setting">Edit Profile</Link> */}
                {isAuth ? (
                  <>
                    <button
                      className="editProf"
                      onClick={() => (loading ? null : toggle())}
                    >
                      {loading ? <SpinnerCircular /> : "Add Token"}
                    </button>
                    <button onClick={() => (loading ? null : submitData())}>
                      {loading ? <SpinnerCircular /> : "Mint NFT"}
                    </button>
                    <button
                      onClick={() => (loading ? null : toggle2())}
                      style={{ width: "20%" }}
                    >
                      {loading ? <SpinnerCircular /> : "Update Metadata"}
                    </button>
                  </>
                ) : (
                  <button style={{ width: "20%" }} onClick={() => authToggle()}>
                    <span>Connect Wallet</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        <Modal isOpen={modal} toggle={toggle} style={{ marginTop: "300px" }}>
          <ModalBody>
            <div className="modalContent">
              <div className="createFrmBx">
                <FormGroup>
                  <Label for="exampleEmail" style={{ color: "black" }}>
                    Token List
                  </Label>
                  <br />
                  <span style={{ color: "black" }}>
                    Enter multiple tokens by separating them with a comma (,).
                  </span>
                  {/* <Input
                  type="email"
                  name="tokenList"
                  onChange={handleOnChange}
                  value={tokenList}
                  id="exampleEmail"
                  placeholder="Enter token list"
                /> */}
                  <TagsInput
                    value={tokenList}
                    onlyUnique={true}
                    onChange={handleTokenList}
                    inputProps={{
                      placeholder: "Enter token list",
                    }}
                  />
                  <span style={{ color: "black" }}>
                    {tokenList.length} tokens added
                  </span>
                </FormGroup>
              </div>
              <div className="collectionFrmBtn">
                <Button onClick={handleOnSubmit}>Add Token</Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="collectionFooter">
            <Button className="closeModal" onClick={toggle}>
              x
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={modal2} toggle={toggle2} style={{ marginTop: "300px" }}>
          <ModalBody>
            <div className="modalContent">
              <div className="createFrmBx">
                <FormGroup>
                  <Label for="exampleEmail" style={{ color: "black" }}>
                    Update Metadata
                  </Label>
                  <br />
                  <span style={{ color: "black", fontSize: "15px",justifyContent:'center',display:'flex' }}>
                    Upload Metadata JSON file by specific format.
                  </span>

                  {/* <button>
                Upload Metadata
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setPropertyFile(e.target.files[0])}
                />
              </button> */}
                  <div class="file file--upload" style={{ marginTop: "10px" }}>
                    <label for="input-file">Upload Metadata</label>
                    <input
                      id="input-file"
                      type="file"
                      onChange={(e) => setPropertyFile(e.target.files[0])}
                    />
                  </div>
                </FormGroup>
              </div>
              <div className="collectionFrmBtn">
                <Button onClick={handleOnSubmit}>Add Token</Button>
              </div>
            </div>
          </ModalBody>
          <ModalFooter className="collectionFooter">
            <Button className="closeModal" onClick={toggle2}>
              x
            </Button>
          </ModalFooter>
        </Modal>
        <WalletModal
          toggle={authToggle}
          modal={authModal}
          setModal={setAuthModal}
        />
        <div className="creatortabOuter">
          <div className="container">
            <ProfileListingTab
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
}
