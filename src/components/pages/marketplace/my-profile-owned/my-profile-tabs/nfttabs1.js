import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import questionMark from "../../../../../assets/questionMark.jpg";
import ownedImg1 from "../../../../../assets/profile-owned-img1.png";
import ownedImg2 from "../../../../../assets/profile-owned-img2.png";
import ownedImg3 from "../../../../../assets/profile-owned-img3.png";
import { useParams, useNavigate } from "react-router-dom";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import Axios from "axios";
import { Link } from "react-router-dom";
import NFTSideBar from "./nftsidebar";
import Pact from "pact-lang-api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./nfttabs1.css";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const NftTabs1 = () => {
  const [nftList, setNftList] = useState([]);
  const [loadingGift, setLoadingGift] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [hover, setHover] = useState(false);
  const [userId, setUserId] = useState("");
  const [screenLoading, setScreenLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [selectedNft, setSelectedNft] = React.useState();
  const [userNft, setUserNft] = useState([]);
  const [nftPrice, setNftPrice] = useState(0);

  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const navigate = useNavigate();

  const { id } = useParams();

  const searchs = window.location.search;
  const params = new URLSearchParams(searchs);
  let foo = params.get("id");

  useEffect(() => {
    getUserNft();
    getNft();
  }, [refresh, search, limit, selected]);
  useEffect(() => {
    getNftPrice();
  }, [userNft]);

  const getUserNft = () => {
    setScreenLoading(true);
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          console.log("userNft", response.data.data);
          let nfts = response.data.data;
          setUserNft(nfts);
          setScreenLoading(false);

          // setCollectionList(filteredCollectionList)
        } else {
          setUserNft([]);
          setScreenLoading(false);
        }
      })
      .catch((error) => {
        setNftList([]);
        setScreenLoading(false);
      });
  };

  const getNft = () => {
    setScreenLoading(true);

    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
    };
    Axios.post(
      "/nft/user-nft-marketplace-false-all-collection-1?page=" +
        page +
        "&limit=" +
        limit,
      dataFinal,
      {
        headers: { authorization: localStorage.getItem("accessJWT") },
      }
    )
      .then((response) => {
        if (response.data.status == "success") {
          let nftList = response.data.data.paginatedResults;
          setTotal(response.data.data.totalCount);
          setNftList(nftList);
          setScreenLoading(false);
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
          setNftList([]);
          setScreenLoading(false);
        }
      })
      .catch((error) => {
        setNftList([]);
        setScreenLoading(false);
        //   setCollectionList([])
        //   setUserRegistered(false)
      });
  };

  const getNftPrice = async () => {
    console.log("nftPrice", userNft);
    const accountName1 = walletAddress;
    const publicKey1 = accountName1.slice(2, accountName1.length);
    const guard1 = { keys: [publicKey1], pred: "keys-all" };
    const a = accountName1;
    const pactCode = `(free.merchfinalpolicy001.get-nft-price "${
      userNft?.collectionName || ""
    }")`;
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
      console.log("nftPricexcxc", response.result.data);
      // setCollectionPrice(response.result.data);
      // nftPrice = response.result.data;
      setNftPrice(response.result.data);
    }
  };

  const revealPass = async (data) => {
    const tokenId = data.tokenId;

    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);

    //Locading

    // const pactCode = `(marmalade.ledger.get-manifest  ${JSON.stringify(tokenId)})`
    const signCmd = {
      pactCode: `(marmalade.ledger.get-manifest  ${JSON.stringify(tokenId)})`,

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

    if (response.result.status == "success") {
      const datum = response.result.data.data[0].datum;

      const filteredNft = data;
      let fileImageUrl;
      let fileName;
      let obj;
      if (filteredNft) {
        let token;
        if (
          filteredNft.tokenId &&
          filteredNft.tokenId.split(":")[0] === "dbc"
        ) {
          // token = filteredNft.tokenId.split(":")[1]
          token = filteredNft.tokenId;
          //   console.log("filteredNft", filteredNft.tokenId.split(":")[1]);

          // //   //add collection name to token
          //   token = filteredNft.tokenId.split(":")[1]
        } else {
          console.log(filteredNft, "filteredNft1234 ");
          token = datum["hash"];
        }
        console.log(token, "tokenxdxdxdxd");
        // // console.log("token", token);

        Axios.get(
          `/properties/getPropertyByToken?token=${token}`
          // `/properties/getPropertyByToken?token=${fakeTokenId}`
        )
          .then(async (response) => {
            if (response.data.status == "success" && response.data.data.length > 0) {
              let propertyList = response.data.data;
              // setFilteredNft(nftList);
              // setUserId(nftList.creator);
              console.log("propertyList", propertyList);
              fileImageUrl = propertyList[0].image;
              fileName = propertyList[0].name;
              obj = {
                _id: data._id,
                tokenId: `${datum["collectionName"]}:${datum["tokenId"]}`,
                collectionName: datum["collectionName"],
                // creator: datum.creator,
                creator: walletAddress,
                tokenImage: datum["imageUrl"],
                revealed: true,
                nftPrice: nftPrice,
                hash: datum["hash"],
                imageIndex: datum.imageIndex.int,
                history: {
                  owner: walletAddress,
                  price: nftPrice,
                  category: "mint",
                },
                fileImageUrl: fileImageUrl,
                fileName: fileName,
              };
              console.log("obj", obj);
              const accessJWT = localStorage.getItem("accessJWT");
              const config = {
                headers: {
                  Authorization: accessJWT,
                },
              };
              Axios.patch("/nft/update-nft", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT revealed successfully");
                    setRefresh(!refresh);
                  } else {
                    toast.error("NFT not revealed");
                  }
                })
                .catch((error) => {});
              // setCollectionList(filteredCollectionList)
            } else {
              obj = {
                _id: data._id,
                tokenId: `${datum["collectionName"]}:${datum["tokenId"]}`,
                collectionName: datum["collectionName"],
                // creator: datum.creator,
                creator: walletAddress,
                tokenImage: datum["imageUrl"],
                revealed: true,
                nftPrice: nftPrice,
                hash: datum["hash"],
                imageIndex: datum.imageIndex.int,
                history: {
                  owner: walletAddress,
                  price: nftPrice,
                  category: "mint",
                },
              };
              console.log("obj", obj);
              const accessJWT = localStorage.getItem("accessJWT");
              const config = {
                headers: {
                  Authorization: accessJWT,
                },
              };
              Axios.patch("/nft/update-nft", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT revealed successfully");
                    setRefresh(!refresh);
                  } else {
                    toast.error("NFT not revealed");
                  }
                })
                .catch((error) => {});
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

      const accessJWT = localStorage.getItem("accessJWT");
      const config = {
        headers: {
          Authorization: accessJWT,
        },
      };
      Axios.patch("/nft/update-nft", obj, config)
        .then((response) => {
          if (response.data.status == "success") {
            toast.success("NFT revealed successfully");
            setRefresh(!refresh);
          } else {
            toast.error("NFT not revealed");
          }
        })
        .catch((error) => {});
    }
  };

  const giftNft = async (data) => {
    console.log(data, "data");
    setLoadingGift(true);

    if (recipientAddress == walletAddress) {
      toast.error("You can't gift to yourself");
      setLoadingGift(false);
      return;
    }

    if (recipientAddress.length > 0) {
      const accessJWT = localStorage.getItem("accessJWT");
      const config = {
        headers: {
          Authorization: accessJWT,
        },
      };
      Axios.post("/user/checkUserByWallet", { recipientAddress }, config)
        .then(async (response) => {
          console.log("response", response);
          if (response.data.status == "error") {
            toast.error(
              "The user you are trying to gift the nft is not registered with Kryptomerch"
            );
            setLoadingGift(false);
            return;
          } else {
            const tokenId = data.tokenId;

            // const accountName = "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"//owner
            const accountName = walletAddress;
            //   const receiver="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
            const receiver = recipientAddress;

            const publicKey = accountName.slice(2, accountName.length);

            const guard = { keys: [publicKey], pred: "keys-all" };

            const a = accountName;
            const b = receiver;

            const pactCode = `(free.marketplacefinal002.gift-nft ${JSON.stringify(
              tokenId
            )} ${JSON.stringify(a)} ${JSON.stringify(b)})`;

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
                  Pact.lang.mkCap(
                    "TRANSFER",
                    "Capability to allow buying gas",
                    "free.marketplacefinal002.TRANSFER",
                    []
                  ),
                ],
                sender: a,
                gasLimit: 150000,
                chainId: CHAIN_ID,
                ttl: 28800,
                envData: {
                  "demothreeaccount-keyset": guard,
                },
              };

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

                  if (signedtxx.result.status == "success") {
                    const obj = {
                      tokenId: tokenId,
                      creator: receiver,
                      clientId: data.clientId,
                      imageIndex: data.imageIndex,
                      sellingType: "All",
                      history: {
                        owner: walletAddress,
                        price: data.nftPrice,
                        category: "transfer",
                      },
                    };

                    const accessJWT = localStorage.getItem("accessJWT");
                    const config = {
                      headers: {
                        Authorization: accessJWT,
                      },
                    };
                    Axios.patch("/nft/update-nft-gift", obj, config)
                      .then((response) => {
                        if (response.data.status == "success") {
                          setLoadingGift(false);
                          toast.success("NFT gifted successfully");
                          setRefresh(!refresh);
                          setGiftModal(false);
                        } else {
                          toast.error("NFT not gifted");
                          setGiftModal(false);
                          setLoadingGift(false);
                        }
                      })
                      .catch((error) => {
                        toast.error("NFT not gifted");
                        setGiftModal(false);
                        setLoadingGift(false);
                      });
                  } else {
                    toast.error("NFT not gifted");
                    setGiftModal(false);
                    setLoadingGift(false);
                  }
                }
              } else {
                toast.error("NFT not gifted");
                setGiftModal(false);
                setLoadingGift(false);
              }
            }
            if (walletName == "Xwallet") {
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
                    Pact.lang.mkCap(
                      "TRANSFER",
                      "Capability to allow buying gas",
                      "free.marketplacefinal002.TRANSFER",
                      []
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

              const gore2 = await Pact.wallet.sendSigned(
                cmd.signedCmd,
                API_HOST
              );
              setSpinner("true");

              const txResult = await Pact.fetch.listen(
                { listen: `${gore2.requestKeys[0]}` },
                API_HOST
              );

              if (txResult.result.status == "success") {
                const obj = {
                  tokenId: tokenId,
                  imageIndex: data.imageIndex,
                  sellingType: "All",
                  creator: receiver,
                  clientId: data.clientId,
                  history: {
                    owner: walletAddress,
                    price: data.nftPrice,
                    category: "transfer",
                  },
                };

                const accessJWT = localStorage.getItem("accessJWT");
                const config = {
                  headers: {
                    Authorization: accessJWT,
                  },
                };
                Axios.patch("/nft/update-nft-gift", obj, config)
                  .then((response) => {
                    if (response.data.status == "success") {
                      setLoadingGift(false);
                      toast.success("NFT gifted successfully");
                      setRefresh(!refresh);
                      setGiftModal(false);
                    } else {
                      toast.error("NFT not gifted");
                      setGiftModal(false);
                      setLoadingGift(false);
                    }
                  })
                  .catch((error) => {
                    toast.error("NFT not gifted");
                    setGiftModal(false);
                    setLoadingGift(false);
                  });
              } else {
                toast.error("NFT not gifted");
                setGiftModal(false);
                setLoadingGift(false);
              }
            }
          }
        })
        .catch((error) => {});
    }
  };
  return (
    <>
      <div className="filterBx">
        <div className="FltrLeft">
          <div className="fltrBtnBx">
            <Button className="filterBtn">
              <MdArrowBackIos /> Filter
            </Button>
          </div>
        </div>
        <div className="FltrRight">
          <div className="fltrRgtInn">
            <div className="fltrRgtInn_Left">
              <div className="iftSrch">
                <FormGroup>
                  <Input
                    type="name"
                    name="name"
                    id="exampleName"
                    placeholder="Search by NFTs"
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </FormGroup>
                <button onClick={() => setRefresh(!refresh)}>
                  <BsSearch />
                </button>
              </div>
            </div>
            <div className="fltrRgtInn_Right">
              <div className="trendingBtn">
                <FormGroup>
                  <Input
                    type="select"
                    name="select"
                    placeholder="Trending"
                    id="exampleSelect"
                  >
                    <option>Recently listed</option>
                  </Input>
                </FormGroup>
              </div>
              <div className="gridBtnBx">
                <Button className="gridBtn">
                  <BsGridFill />
                </Button>
                <Button className="gridListBtn">
                  <RiGridFill />
                </Button>
              </div>
              <div className="refreshBtnBx">
                <Button onClick={() => setRefresh(!refresh)}>
                  <TbRefresh />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="nftProdListOuter">
        <div className="nftFlt_Left">
          <NFTSideBar
            setSelected={setSelected}
            selected={selected}
            setMinAmount={setMinAmount}
            setMaxAmount={setMaxAmount}
            setOptions={setOptions}
            options={options}
            setRefresh={setRefresh}
            refresh={refresh}
          />
        </div>
        <div className="nftFlt_Right">
          <div className="nftList">
            <ul>
              {nftList.length ? (
                nftList.map((data) => {
                  return (
                    <>
                      <li key={data._id}>
                        <div
                          className="featItemBx"
                          onMouseOver={() => {
                            setHover(true);
                            setUserId(data._id);
                          }}
                          onMouseLeave={() => {
                            setHover(false);
                            setUserId("");
                          }}
                        >
                          <div className="glow">
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${data._id}&for=all`,
                              }}
                            >
                              <div className="featImg">
                                <img
                                  src={
                                    // data.tokenImage
                                    //   ? data.tokenImage
                                    //   : questionMark
                                    data?.fileImageUrl ? data?.fileImageUrl : data?.tokenImage ? data?.tokenImage : questionMark

                                  }
                                  // style={data._id == userId && hover ? { opacity: 0.5 } : { opacity: 1 }}
                                />
                                <div className="tshirtIcon">
                                  <FaTshirt />
                                </div>
                              </div>
                            </Link>

                            {data._id == userId && loading ? (
                              <>
                                <div
                                  className="loading"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <SpinnerCircular
                                    size={80}
                                    color="black"
                                    secondaryColor="red"
                                  />
                                </div>
                              </>
                            ) : null}

                            {data._id == userId &&
                            loading == false &&
                            hover &&
                            data.isRevealed ? (
                              <div className="createItemBtnBx">
                                <div
                                  className="featpriceOut"
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                  }}
                                >
                                  <Button
                                    className="btn-sell"
                                    style={{
                                      backgroundColor: "#666",
                                      color: "#fff",
                                      width: "100%",
                                      height: "50px",
                                      borderRadius: "10px",
                                    }}
                                    onClick={() =>
                                      navigate(
                                        "/marketplace/create-nft?nftId=" +
                                          data._id
                                      )
                                    }
                                  >
                                    Sell
                                  </Button>
                                  <Button
                                    className="btn-gift"
                                    style={{
                                      backgroundColor: "#666",
                                      color: "#fff",
                                      width: "100%",
                                      height: "50px",
                                      borderRadius: "10px",
                                    }}
                                    onClick={() => {
                                      setGiftModal(true);
                                      setSelectedNft(data);
                                    }}
                                  >
                                    Gift
                                  </Button>
                                </div>
                              </div>
                            ) : data._id == userId ? (
                              <div className="featpriceOut">
                                <Button
                                  onClick={() => revealPass(data)}
                                  style={{
                                    backgroundColor: "#666",
                                    color: "#fff",
                                    width: "100%",
                                    height: "50px",
                                    borderRadius: "10px",
                                  }}
                                >
                                  Reveal
                                </Button>
                              </div>
                            ) : null}

                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${data._id}`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {data.collectionName}
                                  <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {/* {data.collectionName
                                    ? data.collectionName
                                    : "Not Revealed"}{" "}
                                  #{data.imageIndex} */}
                               {data.fileName  ? data.fileName : data?.collectionName} {data?.fileName ? "" : "#" + data?.imageIndex}

                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {data.onAuction
                                      ? data.onAuction
                                        ? "Open For Bids"
                                        : data.nftPrice + " KDA"
                                      : data.nftPrice + " KDA"}
                                  </span>{" "}
                                </div>
                                <div className="featprice">
                                  <small>Highest Bid</small>
                                  <span className="bold">
                                    {data?.bidInfo?.bidPrice
                                      ? data?.bidInfo?.bidPrice
                                      : "Not Bids"}
                                  </span>{" "}
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </li>
                      {giftModal && (
                        <Modal
                          isOpen={giftModal}
                          toggle={() => setGiftModal(false)}
                          className="giftModal"
                          //mid of the screen
                          style={{ width: "500px", top: "30%" }}
                        >
                          <ModalHeader
                            toggle={() => setGiftModal(false)}
                            style={{ borderBottom: "none" }}
                          >
                            <span
                              style={{
                                color: "#000",
                                fontSize: "18px",
                                fontWeight: "bold",
                              }}
                            >
                              Gift NFT
                            </span>
                          </ModalHeader>
                          <ModalBody>
                            <input
                              style={{
                                width: "100%",
                                height: "40px",
                                borderRadius: "5px",
                                border: "1px solid #ccc",
                                padding: "0 10px",
                              }}
                              type="text"
                              placeholder="Enter Recipient Address"
                              value={recipientAddress}
                              onChange={(e) =>
                                setRecipientAddress(e.target.value)
                              }
                            />
                            <Button
                              onClick={() =>
                                loadingGift ? null : giftNft(selectedNft)
                              }
                              style={{
                                marginTop: "15px",
                                // marginLeft: " 116px",
                                width: "100%",
                                height: "40px",
                              }}
                            >
                              {loadingGift ? (
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <SpinnerCircular
                                    size={15}
                                    thickness={100}
                                    speed={100}
                                    color="white"
                                  />
                                </div>
                              ) : (
                                "Gift"
                              )}
                            </Button>
                          </ModalBody>
                        </Modal>
                      )}
                    </>
                  );
                })
              ) : (
                <h1>No NFTS</h1>
              )}
            </ul>
          </div>
          {limit > total ? null : (
            <>
              {limit >= 10 ? (
                <div className="loadmoreBtn">
                  <button
                    onClick={() => setLimit(limit + 10)}
                    style={{ width: "100%" }}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </>
          )}
          <div
            className="spinner"
            style={{
              display: screenLoading ? "flex" : "none",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              width: "100vw",
              position: "fixed",
              top: 0,
              left: 0,
              zIndex: 999,
            }}
          >
            {screenLoading ? (
              <>
                <SpinnerCircular size={80} color="black" secondaryColor="red" />
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default NftTabs1;
