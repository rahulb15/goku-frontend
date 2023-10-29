import React, { Component, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import overviewDetImg from "../../../../assets/overviewDet-img.png";
import { WalletModal } from "../../../../components/common-components/walletModal/walletModal";
import {
  FaTshirt,
  FaEarlybirds,
  FaRegHeart,
  FaHeart,
  FaPause,
  FaExclamationTriangle,
} from "react-icons/fa";
import {
  HiCheckCircle,
  HiEye,
  HiShare,
  HiOutlineRefresh,
  HiOutlineShoppingCart,
} from "react-icons/hi";
import { useSelector } from "react-redux";
import NftCheckout from "./nft-checkout";
import Pact from "pact-lang-api";
import { toast } from "react-toastify";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SpinnerCircular } from "spinners-react";
import { Button } from "reactstrap";
import Axios from "axios";
import DialogBid from "./dialogBid";

//import { Link } from "react-router-dom";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const OverviewDetail = () => {
  const navigate = useNavigate();
  const { isLoading, isAuth, error } = useSelector(
    (state) => state.loginStatus
  );
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);
  const [filteredNft, setFilteredNft] = useState([]);
  const [modal, setModal] = useState(false);
  const [forAll, setForAll] = useState(false);
  const [likeNo, setLikeNo] = useState("");
  const [likenftstatus, setLikenftstatus] = useState(false);
  const [likeDislike, setLikeDisklike] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loadingGift, setLoadingGift] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [spinner, setSpinner] = useState(false);
  const [userId, setUserId] = useState("");
  const [fee, setFee] = useState(0);
  const [royalityAddress, setRoyalityAddress] = React.useState("");
  const [royalityRate, setRoyalityRate] = React.useState("");
  console.log("royalityAddress", royalityAddress);
  console.log("royalityRate", royalityRate);
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo2 = params.get("for");
  console.log("foo2", foo2);

  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  console.log("walletStatus", walletAddress);

  const toggle = () => {
    setModal(!modal);
  };
  const toggleGift = () => {
    setGiftModal(!giftModal);
  };

  useEffect(() => {
    getNft();
    getNftLikes();
    getNftLikeStatus();
  }, []);

  useEffect(() => {
    getNftLikeStatus();
    getNftLikes();
  }, [likeDislike]);

  // useEffect(()=>{

  //     getNftLikes()
  //     },[likenft])

  const getNftLikeStatus = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let foo = params.get("id");
    const type = params.get("for") == "all" ? "nft" : "pass";
    console.log("type", type);

    const formdata = {
      nftLiked: foo,
      type: type,
    };

    Axios.post("/liked-nft/user-liked-nft", formdata, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        //
        if (response.data.status == "success") {
          let likeList = response.data.data;
          likeList == true ? setLikenftstatus(true) : setLikenftstatus(false);
        } else {
          setLikenftstatus(false);
        }
      })
      .catch((error) => {
        setLikenftstatus(false);
      });
  };

  const getNftLikes = () => {
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let foo = params.get("id");
    const type = params.get("for") == "all" ? "nft" : "pass";
    console.log("type", type);

    const formdata = {
      nftLiked: foo,
      type: type,
    };
    Axios.post("/liked-nft/getLikedNft", formdata)
      .then((response) => {
        if (response.data.status == "success") {
          let likeList = response.data.data;

          setLikeNo(likeList);
        } else {
          setLikeNo("-");
        }
      })
      .catch((error) => {
        setLikeNo("-");
      });
  };

  const likeDislikeNft = () => {
    if (likenftstatus == false) {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      const type = params.get("for") == "all" ? "nft" : "pass";
      let foo = params.get("id");

      const formdata = {
        nftLiked: foo,
        type: type,
      };

      Axios.post("/liked-nft/addLikedNft", formdata, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            setLikeDisklike(true);
          } else {
            setLikeDisklike(false);
          }
        })
        .catch((error) => {
          setLikeDisklike(false);
        });
    } else {
      const search = window.location.search;
      const params = new URLSearchParams(search);
      let foo = params.get("id");
      const type = params.get("for") == "all" ? "nft" : "pass";

      const formdata = {
        nftLiked: foo,
        type: type,
      };

      Axios.post("/liked-nft/removeLikeNft", formdata, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            setLikeDisklike(false);
          } else {
            setLikeDisklike(true);
          }
        })
        .catch((error) => {
          setLikeDisklike(true);
        });
    }
  };

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

  const getFee = async () => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.marketplacefinal002.get-fee "marketplace")`,
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
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        gasPrice: GAS_PRICE,
        // IMPORTANT: the API requires this attribute even if it's an empty value like in this case
        sender: "",
      },
    }; //alert to sign tx

    const response = await Pact.fetch.local(signCmd, API_HOST);
    console.log("response", response);
    if (response?.result?.status == "success") {
      const datum = response?.result?.data;
      setFee(datum);
    } else {
      toast.error("Transaction Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFee(0);
    }
  };

  useEffect(() => {
    getFee();
  }, []);

  const getRoyalityAddress = async (data) => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.marketplacefinal002.get-royalty-account "${data.collectionName}")`,
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
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        gasPrice: GAS_PRICE,
        // IMPORTANT: the API requires this attribute even if it's an empty value like in this case
        sender: "",
      },
    }; //alert to sign tx

    const response = await Pact.fetch.local(signCmd, API_HOST);
    console.log("response", response);
    if (response.result.status == "success") {
      const datum = response.result.data;
      setRoyalityAddress(datum);
      return datum;
    } else {
      setRoyalityAddress("");
      toast.error("Transaction Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }
  };

  const getRoyalityRate = async (data) => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.marketplacefinal002.get-royalty-rate "${data.collectionName}")`,
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
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        gasPrice: GAS_PRICE,
        // IMPORTANT: the API requires this attribute even if it's an empty value like in this case
        sender: "",
      },
    }; //alert to sign tx

    const response = await Pact.fetch.local(signCmd, API_HOST);
    console.log("response", response);
    if (response.result.status == "success") {
      const datum = response.result.data;
      console.log("datumxxxxxxxxxxxx", datum);
      setRoyalityRate(datum);
      return datum;
    } else {
      setRoyalityRate("");
      toast.error("Transaction Failed", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return 0;
    }
  };

  const buyIdOnSale = async (data) => {
    console.log("dataOverview", data);
    setLoading(true);
    const royaltyA = await getRoyalityAddress(data);
    const royaltyR = await getRoyalityRate(data);
    console.log("royaltyA", royaltyA);
    console.log("royaltyR", royaltyR);

    console.log("data", data);
    const MarketplaceCharges = fee * parseFloat(data.nftPrice);
    console.log("MarketplaceCharges", MarketplaceCharges);
    const priceWithoutMarketplaceCharges =
      parseFloat(data.nftPrice) - MarketplaceCharges;
    console.log(
      "priceWithoutMarketplaceCharges",
      priceWithoutMarketplaceCharges
    );
    // const royaltyPayout =
    //   data.collection_info[0].royaltyFee * priceWithoutMarketplaceCharges;
    const royaltyPayout = royaltyR * priceWithoutMarketplaceCharges;
    console.log("royaltyPayout", royaltyPayout);
    const sellerPayout = priceWithoutMarketplaceCharges - royaltyPayout;
    console.log("sellerPayout", sellerPayout);
    console.log("data", data);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    // (test-capability (pass.coin.TRANSFER "user2" "arya" 0.08))
    // (test-capability (pass.coin.TRANSFER "user2" "user" 1.96))

    // const a = accountName;
    // // const b = "k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
    // const b = data.creator;
    // const c = "00fd7ca27f0ab6cfb03e3316c23599890f7a82043cb73925dc080307b771528d";
    // console.log("b", b, "c", c, "a", a);
    const a = accountName;
    // account -> a = buyer account
    // account -> b = royalty account
    // account -> c = marketplace admin account
    //account -> d = seller account
    // const b = data.collection_info[0].royaltyAddress;
    const b = royaltyA;
    const c =
      "00fd7ca27f0ab6cfb03e3316c23599890f7a82043cb73925dc080307b771528d";
    const d = data.creator;

    console.log("a", a, "b", b, "c", c, "d", d);

    const pactCode = `(free.marketplacefinal002.buy ${JSON.stringify(
      data.tokenId
    )} ${JSON.stringify(a)})`;
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
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, c, MarketplaceCharges]
          ),
          Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, b, royaltyPayout]
          ),
          Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "coin.TRANSFER",
            [a, d, sellerPayout]
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
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

      if (cmd) {
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
          if (signedtxx.result.status == "success") {
            if (foo2 == "all") {
              const obj = {
                tokenId: data.tokenId,
                creator: walletAddress,
                clientId: data.clientId,
                onMarketplace: false,
                sellingType: "",
                creatorName: data.creatorName,
                // nftPrice: nftPrice,
                duration: "All",
                history: {
                  owner: walletAddress,
                  price: data.nftPrice,
                  category: "transfer",
                },
              };
              console.log("obj", obj);
              const accessJWT = localStorage.getItem("accessJWT");
              const config = {
                headers: {
                  Authorization: accessJWT,
                },
              };
              Axios.patch("/nft/update-nft-gift", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("Successfully bought");
                    setLoading(false);
                    setRefresh(!refresh);
                  } else {
                    console.log("hello");
                    setLoading(false);
                    toast.error("NFT not bought");
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  setLoading(false);
                  toast.error("NFT not bought");
                });
            } else {
              const obj = {
                tokenId: data.tokenId,
                creator: walletAddress,
                clientId: data.clientId,
                onMarketplace: false,
                sellingType: "All",
                creatorName: data.creatorName,
                passTokenId: data.passTokenId,
                // nftPrice: nftPrice,
                duration: "",
                history: {
                  owner: walletAddress,
                  price: data.nftPrice,
                  category: "transfer",
                },
              };
              console.log("obj", obj);
              const accessJWT = localStorage.getItem("accessJWT");
              const config = {
                headers: {
                  Authorization: accessJWT,
                },
              };
              Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
                .then((response) => {
                  console.log("Updatezzzzz", response.data.data);
                  if (response.data.status == "success") {
                    toast.success("Successfully bought");
                    setLoading(false);
                    setRefresh(!refresh);
                  } else {
                    console.log("hello");
                    setLoading(false);
                    toast.error("NFT not bought");
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  setLoading(false);
                  toast.error("NFT not bought");
                });
            }
          } else {
            toast.error("NFT not bought");
            setLoading(false);
          }
        } else {
          toast.error("Rejected by user");
          setLoading(false);
        }
      }
    }

    if (walletName == "Xwallet") {
      console.log("XWalet");
      console.log("MarketplaceCharges", MarketplaceCharges);
      console.log("royaltyPayout", royaltyPayout);
      console.log("sellerPayout", sellerPayout);
      console.log("a", a, "b", b, "c", c, "d", d);
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
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, c, MarketplaceCharges]
            ),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, b, royaltyPayout]
            ),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, d, sellerPayout]
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
      console.log("nml");
      const cmd = await window.kadena.request({
        method: "kda_requestSign",
        networkId: NETWORK_ID,
        data: XWalletRequest,
      });
      console.log("cmd", cmd);
      if (cmd.status == "success") {
        console.log("WALLETINFB", cmd.signedCmd.cmd);
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");
        console.log("sdsf", gore2);
        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        console.log("Ssffs", txResult);
        if (txResult.result.status == "success") {
          if (foo2 == "all") {
            const obj = {
              tokenId: data.tokenId,
              creator: walletAddress,
              clientId: data.clientId,
              onMarketplace: false,
              sellingType: "All",
              creatorName: data.creatorName,
              // nftPrice: nftPrice,
              duration: "",
              history: {
                owner: walletAddress,
                price: data.nftPrice,
                category: "transfer",
              },
            };
            console.log("obj", obj);
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            Axios.patch("/nft/update-nft-gift", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("Successfully bought");
                  setLoading(false);
                  setRefresh(!refresh);
                } else {
                  console.log("hello");
                  setLoading(false);
                  toast.error("NFT not bought");
                }
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
                toast.error("NFT not bought");
              });
          } else {
            const obj = {
              tokenId: data.tokenId,
              creator: walletAddress,
              clientId: data.clientId,
              onMarketplace: false,
              sellingType: "All",
              creatorName: data.creatorName,
              passTokenId: data.passTokenId,
              // nftPrice: nftPrice,
              duration: "",
              history: {
                owner: walletAddress,
                price: data.nftPrice,
                category: "transfer",
              },
            };
            console.log("obj", obj);
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
              .then((response) => {
                console.log("Updatezzzzz", response.data.data);
                if (response.data.status == "success") {
                  toast.success("Successfully bought");
                  setLoading(false);
                  setRefresh(!refresh);
                } else {
                  console.log("hello");
                  setLoading(false);
                  toast.error("NFT not bought");
                }
              })
              .catch((error) => {
                console.log("error", error);
                setLoading(false);
                toast.error("NFT not bought");
              });
          }
        } else {
          toast.error("NFT not bought");
          setLoading(false);
        }
      } else {
        toast.error("Rejected by user");
        setLoading(false);
      }
    }
  };

  const acceptLastBid = async (data) => {
    setLoading(true);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId = data.tokenId;

    const a = accountName;

    const pactCode = `(free.marketplacefinal002.accept-last-bid ${JSON.stringify(
      tokenId
    )} )`;
    if (walletName == "Zelcore" || walletName == "Chainweaver") {
      const signCmd = {
        pactCode: pactCode,
        caps: [
          // Pact.lang.mkCap(
          //   "GAS",
          //   "Capability to allow buying gas",
          //   "coin.GAS",
          //   []
          // ),
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
      console.log("cmd", cmd);
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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
              onAuction: false,
              _id: data._id,
              bidPrice: "",
              bidder: "",
              creator: data.bidInfo[0].bidder,
              sellingType: "",
              duration: "",
              onMarketplace: false,
              tokenId: data.tokenId,
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
            if (foo2 == "all") {
              const obj = {
                onAuction: false,
                _id: data._id,
                bidPrice: "",
                bidder: "",
                creator: data.bidInfo[0].bidder,
                sellingType: "",
                passTokenId: data.passTokenId,
                duration: "",
                onMarketplace: false,
                tokenId: data.tokenId,

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
                    toast.success("NFT Bid Accepted");
                    setRefresh(!refresh);
                    setLoading(false);
                  } else {
                    toast.error("NFt bid not accepted");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFt bid not accepted");
                  setLoading(false);
                });
            } else {
              Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT Bid Accepted");
                    setRefresh(!refresh);
                    setLoading(false);
                  } else {
                    toast.error("NFt bid not accepted");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFt bid not accepted");
                  setLoading(false);
                });
            }
          } else {
            toast.error("NFt bid not accepted");
            setLoading(false);
          }
        } else {
          toast.error("NFt bid not accepted");
          setLoading(false);
        }
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
            // Pact.lang.mkCap(
            //   "GAS",
            //   "Capability to allow buying gas",
            //   "coin.GAS",
            //   []
            // ),
          ],
          envData: {
            "demothreeaccount-keyset": guard,
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

      if (cmd.status === "success") {
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");

        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status == "success") {
          const obj = {
            onAuction: false,
            _id: data._id,
            bidPrice: "",
            bidder: "",
            creator: data.bidInfo.bidder,
            sellingType: "",
            duration: "",
            onMarketplace: false,
            tokenId: data.tokenId,
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
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft-gift", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Accepted");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not accepted");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT bid not accepted");
                setLoading(false);
              });
          } else {
            const obj = {
              onAuction: false,
              _id: data._id,
              bidPrice: "",
              bidder: "",
              creator: data.bidInfo.bidder,
              sellingType: "",
              passTokenId: data.passTokenId,
              duration: "",
              onMarketplace: false,
              tokenId: data.tokenId,

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
            Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Accepted");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not accepted");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT bid not accepted");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt bid not accepted");
          setLoading(false);
        }
      } else {
        toast.error("NFt bid not accepted");
        setLoading(false);
      }
    }
  };

  const declineBid = async (data) => {
    setLoading(true);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId2 = data.tokenId;

    const a = accountName;

    // id:string buyer:string amount:decimal bid_days:integer
    const pactCode = `(free.marketplacefinal002.decline-bid ${JSON.stringify(
      tokenId2
    )})`;

    if (walletName == "Zelcore" || walletName == "Chainweaver") {
      const signCmd = {
        pactCode: pactCode,
        caps: [],
        sender: a,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        envData: {
          "demothreeaccount-keyset": guard,
        },
      };

      const cmd = await Pact.wallet.sign(signCmd);
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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
            onAuction: true,
            _id: data._id,
            bidPrice: "",
            bidder: "",
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "rejectBid",
            },
          };

          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Declined");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not declined");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFt bid not declined");
                setLoading(false);
              });
          } else {
            Axios.patch("/passDetails/updatePass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Declined");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not declined");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFt bid not declined");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt bid not declined");
          setLoading(false);
        }
      } else {
        toast.error("NFt bid not declined");
        setLoading(false);
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
          caps: [],
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

      if (cmd.status === "success") {
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");

        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status == "success") {
          const obj = {
            onAuction: true,
            _id: data._id,
            bidPrice: "",
            bidder: "",
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "rejectBid",
            },
          };

          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Declined");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not declined");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT bid not declined");
                setLoading(false);
              });
          } else {
            Axios.patch("/passDetails/updatePass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Bid Declined");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt bid not declined");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT bid not declined");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt bid not declined");
          setLoading(false);
        }
      }
    } else {
      toast.error("NFt bid not declined");
      setLoading(false);
    }
  };

  const closeSale = async (data) => {
    setLoading(true);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId2 = data.tokenId;

    const a = accountName;

    const pactCode = `(free.marketplacefinal002.close-sale ${JSON.stringify(
      tokenId2
    )})`;

    if (walletName == "Zelcore" || walletName == "Chainweaver") {
      const signCmd = {
        pactCode: pactCode,
        caps: [
          // Pact.lang.mkCap(
          //   "GAS",
          //   "Capability to allow buying gas",
          //   "coin.GAS",
          //   []
          // ),
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
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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
            onSale: false,
            sellingType: "All",
            onMarketplace: false,
            imageIndex: data.imageIndex,
            _id: data._id,
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "closeSale",
            },
          };

          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFt Sale not closed");
                setLoading(false);
              });
          } else {
            Axios.patch("/passDetails/updatePass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFt Sale not closed");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt Sale not closed");
          setLoading(false);
        }
      } else {
        toast.error("NFt Sale not closed");
        setLoading(false);
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
            // Pact.lang.mkCap(
            //   "GAS",
            //   "Capability to allow buying gas",
            //   "coin.GAS",
            //   []
            // ),
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

      if (cmd.status === "success") {
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");

        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status == "success") {
          const obj = {
            onSale: false,
            sellingType: "All",
            imageIndex: data.imageIndex,
            onMarketplace: false,
            _id: data._id,
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "closeSale",
            },
          };

          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT Sale not closed");
                setLoading(false);
              });
          } else {
            Axios.patch("/passDetails/updatePass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT Sale not closed");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt Sale not closed");
          setLoading(false);
        }
      } else {
        toast.error("NFt Sale not closed");
        setLoading(false);
      }
    }
  };

  const cancelBid = async (data) => {
    setLoading(true);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId2 = data.tokenId;

    const a = accountName;

    const pactCode = `(free.marketplacefinal002.close-sale ${JSON.stringify(
      tokenId2
    )})`;

    if (walletName == "Zelcore" || walletName == "Chainweaver") {
      const signCmd = {
        pactCode: pactCode,
        caps: [
          // Pact.lang.mkCap(
          //   "GAS",
          //   "Capability to allow buying gas",
          //   "coin.GAS",
          //   []
          // ),
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
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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
              onAuction: false,
              sellingType: "All",
              onMarketplace: false,
              _id: data._id,
              imageIndex: data.imageIndex,
              bidPrice: "",
              bidder: "",
              history: {
                owner: walletAddress,
                price: data.nftPrice,
                category: "cancelBid",
              },
            };

            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            if (foo2 == "all") {
              Axios.patch("/nft/update-nft", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT Sale Closed");
                    setRefresh(!refresh);
                    setLoading(false);
                  } else {
                    toast.error("NFt Sale not closed");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                });
            } else {
              Axios.patch("/passDetails/updatePass", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT Sale Closed");
                    setRefresh(!refresh);
                    setLoading(false);
                  } else {
                    toast.error("NFt Sale not closed");
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT Sale not closed");
                  setLoading(false);
                });
            }
          } else {
            toast.error("NFt Sale not closed");
            setLoading(false);
          }
        } else {
          toast.error("NFt Sale not closed");
          setLoading(false);
        }
      } else {
        toast.error("NFt Sale not closed");
        setLoading(false);
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
            // Pact.lang.mkCap(
            //   "GAS",
            //   "Capability to allow buying gas",
            //   "coin.GAS",
            //   []
            // ),
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

      const cmd = await window.kadena.request({
        method: "kda_requestSign",
        networkId: NETWORK_ID,
        data: XWalletRequest,
      });

      if (cmd.status === "success") {
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");

        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status == "success") {
          const obj = {
            onAuction: false,
            sellingType: "",
            onMarketplace: false,
            _id: data._id,
            bidPrice: "",
            bidder: "",
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "cancelBid",
            },
          };

          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "all") {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT Sale not closed");
                setLoading(false);
              });
          } else {
            Axios.patch("/passDetails/updatePass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT Sale Closed");
                  setRefresh(!refresh);
                  setLoading(false);
                } else {
                  toast.error("NFt Sale not closed");
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT Sale not closed");
                setLoading(false);
              });
          }
        } else {
          toast.error("NFt Sale not closed");
          setLoading(false);
        }
      } else {
        toast.error("NFt Sale not closed");
        setLoading(false);
      }
    }
  };

  const giftNft = async (data) => {
    setLoading(true);
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
          if(response.data.status == 'error'){
            toast.error("User not found");
            setLoadingGift(false);
            return;
          }
          else {

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
      if (cmd === undefined) {
        toast.error("User cancelled request", {
          position: "top-right",
        });
        setLoading(false);
        return;
      }

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
            if (foo2 == "all") {
              Axios.patch("/nft/update-nft-gift", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    setLoadingGift(false);
                    toast.success("NFT gifted successfully");
                    setRefresh(!refresh);
                    setGiftModal(false);
                    setLoading(false);
                  } else {
                    toast.error("NFT not gifted");
                    setGiftModal(false);
                    setLoadingGift(false);
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT not gifted");
                  setGiftModal(false);
                  setLoadingGift(false);
                  setLoading(false);
                });
            } else {
              const obj = {
                passTokenId: tokenId,
                creator: receiver,
                clientId: data.clientId,
                history: {
                  owner: walletAddress,
                  price: data.nftPrice,
                  category: "transfer",
                },
              };
              console.log("obj", obj);
              const accessJWT = localStorage.getItem("accessJWT");
              const config = {
                headers: {
                  Authorization: accessJWT,
                },
              };
              Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
                .then((response) => {
                  console.log("Updatezzzzz", response.data.data);
                  if (response.data.status == "success") {
                    setLoadingGift(false);
                    toast.success("NFT gifted successfully");
                    setRefresh(!refresh);
                    setGiftModal(false);
                  } else {
                    console.log("hello");
                    toast.error("NFT not gifted");
                    setGiftModal(false);
                    setLoadingGift(false);
                  }
                })
                .catch((error) => {
                  console.log("error", error);
                  toast.error("NFT not gifted");
                  setGiftModal(false);
                  setLoadingGift(false);
                });
            }
          } else {
            toast.error("NFT not gifted");
            setGiftModal(false);
            setLoadingGift(false);
            setLoading(false);
          }
        }
      } else {
        toast.error("NFT not gifted");
        setGiftModal(false);
        setLoadingGift(false);
        setLoading(false);
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

      const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
      setSpinner("true");

      const txResult = await Pact.fetch.listen(
        { listen: `${gore2.requestKeys[0]}` },
        API_HOST
      );

      if (txResult.result.status == "success") {
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
        if (foo2 == "all") {
          Axios.patch("/nft/update-nft-gift", obj, config)
            .then((response) => {
              if (response.data.status == "success") {
                setLoadingGift(false);
                toast.success("NFT gifted successfully");
                setRefresh(!refresh);
                setGiftModal(false);
                setLoading(false);
              } else {
                toast.error("NFT not gifted");
                setGiftModal(false);
                setLoadingGift(false);
                setLoading(false);
              }
            })
            .catch((error) => {
              toast.error("NFT not gifted");
              setGiftModal(false);
              setLoadingGift(false);
              setLoading(false);
            });
        } else {
          const obj = {
            passTokenId: tokenId,
            creator: receiver,
            clientId: data.clientId,
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "transfer",
            },
          };
          console.log("obj", obj);
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          Axios.patch("/passDetails/update-nft-pass-gift", obj, config)
            .then((response) => {
              console.log("Updatezzzzz", response.data.data);
              if (response.data.status == "success") {
                setLoadingGift(false);
                toast.success("NFT gifted successfully");
                setRefresh(!refresh);
                setGiftModal(false);
              } else {
                console.log("hello");
                toast.error("NFT not gifted");
                setGiftModal(false);
                setLoadingGift(false);
              }
            })
            .catch((error) => {
              console.log("error", error);
              toast.error("NFT not gifted");
              setGiftModal(false);
              setLoadingGift(false);
            });
        }
      } else {
        toast.error("NFT not gifted");
        setGiftModal(false);
        setLoadingGift(false);
        setLoading(false);
      }
    }

          }
        
        })
        .catch((error) => {
          
          
        });
    }

  };

  const onShare = async (e) => {
    //copy to clipboard current page url  and toast
    e.preventDefault();
    const url = window.location.href;
    navigator.clipboard.writeText(url);

    toast.success("Link copied to clipboard", {
      position: "top-right",
    });
  };

  // filteredNft.duration is in string number format like 3 or 4 or 5 etc convert it to number and add it to current time to get the end time
  const endTime = new Date(
    new Date().getTime() + filteredNft.duration * 24 * 60 * 60 * 1000
  ).toLocaleString();
  console.log("isAuth", walletAddress, userId);
  console.log("filteredNft", filteredNft);
  return (
    <div>
      <div className="overDet_Outer">
        <div className="overDet_Left">
          <div className="featItemBx">
            <div className="glow">
              <div className="featImg">
                <img
                  src={
                    filteredNft?.tokenImage
                      ? filteredNft?.tokenImage
                      : overviewDetImg
                  }
                  alt=""
                />
                <div className="tshirtIcon">
                  <FaTshirt />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="overDet_Right">
          <div className="overviewTitl bold">
            <span>
              {/* <FaEarlybirds /> */}
              <img
                src={
                  filteredNft?.collection_info ? (
                    filteredNft?.collection_info[0]?.imageUrl
                  ) : (
                    <FaEarlybirds />
                  )
                }
                alt=""
              />
            </span>
            &nbsp;
            {filteredNft?.collectionName
              ? filteredNft?.collectionName
              : "--"}{" "}
            &nbsp;
            <i>
              <HiCheckCircle />
            </i>
          </div>
          <div className="overviewName bold">
            {filteredNft?.collectionName ? filteredNft?.collectionName : "--"}#
            {filteredNft?.imageIndex ? filteredNft?.imageIndex : "--"}
          </div>
          <div className="overviewOwnerOuter">
            <div className="overwOwner">
              <a href="/marketplace/my-profile-owned?tab=Owned">
                <i></i>
                <span>Creator</span>
                <strong>
                  {" "}
                  {filteredNft?.creatorName
                    ? filteredNft?.creatorName
                    : "kryptomerch"}
                </strong>
              </a>
            </div>
            <div className="overwOwner">
              {/* <a href='/marketplace/create-owned'> */}
              <i></i>
              <span>Royality</span>
              <strong>
                {" "}
                {filteredNft?.collection_info
                  ? filteredNft?.collection_info[0]?.royaltyFee * 100 + "%"
                  : 0}
              </strong>
              {/* </a> */}
            </div>
          </div>
          <div className="viewsBx">
            <div className="view">
              <a href="">
                <i>
                  <HiEye />
                </i>
                {filteredNft?.views ? filteredNft?.views : "--"}
              </a>
            </div>
            <div className="view">
              {isAuth ? (
                likenftstatus == true ? (
                  <i>
                    <FaHeart onClick={likeDislikeNft} />
                  </i>
                ) : (
                  <i>
                    <FaRegHeart onClick={likeDislikeNft} />
                  </i>
                )
              ) : (
                <i>
                  <FaRegHeart onClick={toggle} />
                </i>
              )}
              {/* <i><FaHeart  /></i> */}
              {/* {likeNo} */}
              <span style={{ marginLeft: "5px" }}>{likeNo}</span>
            </div>
            <div className="view">
              {/* <a href="" onClick={onShare}>
                <i>
                  <HiShare />
                </i>
                Share
              </a> */}

              <i style={{ cursor: "pointer" }}>
                <HiShare onClick={onShare} />
              </i>
            </div>
            <div className="view">
              <a href="">
                <i>
                  <HiOutlineRefresh />
                </i>
                Refresh
              </a>
            </div>
          </div>
          {/* <div className='saleendOuter'>
                            <div className='saleendDate'>Sale ends August 25, 2022 at 4:45pm GMT+5:30</div>
                            <div className='saleendTimer'></div>
                            <div className='bidBxOuter'>
                                <div className='bidBx'>
                                    <small>From</small>
                                    <strong>21.58 KDA</strong>
                                    <span>$1,063</span>
                                </div>
                                <div className='bidBx'>
                                    <small>Highest Floor bid</small>
                                    <strong>12.42 KDA</strong>
                                    <span>by 0x576fa468c...8598</span>
                                </div>
                            </div>
                          {forAll==true?(isAuth?<div className='buynowOuter'>
                                <NftCheckout />
                                <button className='placebidBtn'>Place a Bid</button>
                                <button className='cartBtn' ><HiOutlineShoppingCart /></button>
                            </div>:<div className='buynowOuter'>
                                <NftCheckout />
                                <button className='placebidBtn' onClick={toggle}>Place a Bid</button>
                                <button className='cartBtn' onClick={toggle}><HiOutlineShoppingCart /></button>
                            </div>):null}  
                        </div> */}
          {filteredNft ? (
            filteredNft?.onAuction == true ? (
              <div className="saleendOuter">
                <div className="saleendDate">
                  Auction ends{" "}
                  {filteredNft?.duration
                    ? new Date(
                        new Date().getTime() +
                          filteredNft?.duration * 24 * 60 * 60 * 1000
                      ).toLocaleString()
                    : "--"}{" "}
                  GMT+5:30
                </div>
                <div className="saleendTimer"></div>
                <div className="bidBxOuter">
                  <div className="bidBx">
                    <small>From</small>
                    <strong>
                      {filteredNft?.nftPrice ? filteredNft?.nftPrice : "--"} KDA
                    </strong>
                    <span>$1,063</span>
                  </div>
                  <div className="bidBx">
                    <small>Highest Floor bid</small>
                    <strong>
                      {filteredNft?.bidInfo[0]?.bidPrice
                        ? filteredNft?.bidInfo[0]?.bidPrice
                        : "--"}{" "}
                      KDA
                    </strong>
                    <span>
                      by{" "}
                      {filteredNft?.bidInfo[0]?.bidder
                        ? filteredNft?.bidInfo[0]?.bidder.slice(0, 12) +
                          "..." +
                          filteredNft?.bidInfo[0]?.bidder.slice(-4)
                        : "--"}
                    </span>
                  </div>
                </div>
                {isAuth ? (
                  <>
                    {userId == walletAddress ? (
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <button
                          className="placebidBtn"
                          style={{
                            backgroundColor: nightModeStatus ? "#fff" : "#000",
                            color: nightModeStatus ? "#000" : "#fff",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "none",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            height: "76px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginRight: "10px",
                          }}
                          disabled={loading}
                          onClick={() => {
                            acceptLastBid(filteredNft);
                          }}
                        >
                          {loading ? (
                            <SpinnerCircular
                              style={{ color: "#fff", width: "20px" }}
                            />
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: nightModeStatus ? "#000" : "#fff",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color: nightModeStatus ? "#000" : "#fff",
                                }}
                              >
                                Accept Bid
                              </span>
                            </span>
                          )}
                        </button>

                        <button
                          className="placebidBtn"
                          style={{
                            backgroundColor: nightModeStatus ? "#fff" : "#000",
                            color: nightModeStatus ? "#000" : "#fff",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "none",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            height: "76px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                            marginTop: "10px",
                            marginBottom: "10px",
                            marginRight: "10px",
                          }}
                          disabled={loading}
                          onClick={() => {
                            declineBid(filteredNft);
                          }}
                        >
                          {loading ? (
                            <SpinnerCircular
                              style={{ color: "#fff", width: "20px" }}
                            />
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: nightModeStatus ? "#000" : "#fff",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color: nightModeStatus ? "#000" : "#fff",
                                }}
                              >
                                Reject Bid
                              </span>
                            </span>
                          )}
                        </button>

                        <button
                          className="placebidBtn"
                          style={{
                            backgroundColor: nightModeStatus ? "#fff" : "#000",
                            color: nightModeStatus ? "#000" : "#fff",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "none",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            height: "76px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                          disabled={loading}
                          onClick={() => {
                            cancelBid(filteredNft);
                          }}
                        >
                          {loading ? (
                            <SpinnerCircular
                              style={{ color: "#fff", width: "20px" }}
                            />
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: nightModeStatus ? "#000" : "#fff",
                              }}
                            >
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color: nightModeStatus ? "#000" : "#fff",
                                }}
                              >
                                Cancel Auction
                              </span>
                            </span>
                          )}
                        </button>
                      </div>
                    ) : (
                      <div className="buynowOuter">
                        {/* <NftCheckout /> */}
                        {/* <button
                        className="placebidBtn"
                        style={{
                          backgroundColor: nightModeStatus ? "#fff" : "#000",
                          color: nightModeStatus ? "#000" : "#fff",
                        }}
                      >
                        Place a Bid
                      </button> */}
                        <DialogBid
                          dataUSer={filteredNft}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          setLoading={setLoading}
                          loading={loading}
                          setSelectedData={setSelectedData}
                          selectedData={selectedData}
                        />

                        {/* <button
                        className="cartBtn"
                        style={{
                          backgroundColor: nightModeStatus ? "#fff" : "#000",
                          color: nightModeStatus ? "#000" : "#fff",
                          marginLeft: "15px",
                        }}
                      >
                        <HiOutlineShoppingCart />
                      </button> */}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="buynowOuter">
                    {/* <NftCheckout /> */}
                    <button
                      className="placebidBtn"
                      style={{
                        backgroundColor: nightModeStatus ? "#fff" : "#000",
                        color: nightModeStatus ? "#000" : "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        outline: "none",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        height: "76px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "15px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                      disabled={loading}
                      onClick={toggle}
                    >
                      {loading ? (
                        <SpinnerCircular
                          style={{ color: "#fff", width: "20px" }}
                        />
                      ) : (
                        <span
                          style={{
                            display: "flex",
                            alignItems: "center",
                            color: nightModeStatus ? "#000" : "#fff",
                          }}
                        >
                          <span
                            style={{
                              marginLeft: "10px",
                              color: nightModeStatus ? "#000" : "#fff",
                            }}
                          >
                            Place a Bid
                          </span>
                        </span>
                      )}
                    </button>
                    {/* <button
                        className="cartBtn"
                        style={{
                          backgroundColor: nightModeStatus ? "#fff" : "#000",
                          color: nightModeStatus ? "#000" : "#fff",
                        }}
                        onClick={toggle}
                      >
                        <HiOutlineShoppingCart />
                      </button> */}
                  </div>
                )}
              </div>
            ) : filteredNft?.onSale == true ? (
              <div className="saleendOuter">
                <div className="saleendDate">
                  Sale ends{" "}
                  {filteredNft?.duration
                    ? new Date(
                        new Date().getTime() +
                          filteredNft?.duration * 24 * 60 * 60 * 1000
                      ).toLocaleString()
                    : "--"}{" "}
                  GMT+5:30
                </div>
                <div className="saleendTimer"></div>
                <div className="bidBxOuter">
                  <div className="bidBx">
                    <small>Sale Price</small>
                    <strong>
                      {filteredNft?.nftPrice ? filteredNft?.nftPrice : "--"} KDA
                    </strong>
                    <span>$1,063</span>
                  </div>
                  <div className="bidBx">
                    <small>Sale is live</small>
                    <strong>
                      {filteredNft?.duration ? filteredNft?.duration : "--"}{" "}
                      days
                    </strong>
                    <span>
                      by{" "}
                      {filteredNft?.creator
                        ? filteredNft?.creator.slice(0, 10) +
                          "..." +
                          filteredNft?.creator.slice(-10)
                        : "--"}
                    </span>
                  </div>
                </div>

                {isAuth ? (
                  <>
                    {userId == walletAddress ? (
                      <button
                        className="placebidBtn"
                        style={{
                          backgroundColor: nightModeStatus ? "#fff" : "#000",
                          color: nightModeStatus ? "#000" : "#fff",
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          outline: "none",
                          boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                          height: "76px",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                          fontSize: "15px",
                          marginTop: "10px",
                          marginBottom: "10px",
                        }}
                        disabled={loading}
                        onClick={() => {
                          closeSale(filteredNft);
                        }}
                      >
                        {loading ? (
                          <SpinnerCircular
                            style={{ color: "#fff", width: "20px" }}
                          />
                        ) : (
                          <span
                            style={{
                              display: "flex",
                              alignItems: "center",
                              color: nightModeStatus ? "#000" : "#fff",
                            }}
                          >
                            <span
                              style={{
                                marginLeft: "10px",
                                color: nightModeStatus ? "#000" : "#fff",
                              }}
                            >
                              Close Sale
                            </span>
                          </span>
                        )}
                      </button>
                    ) : (
                      <div className="buynowOuter">
                        {/* <NftCheckout /> */}
                        <button
                          className="placebidBtn"
                          style={{
                            backgroundColor: nightModeStatus ? "#fff" : "#000",
                            color: nightModeStatus ? "#000" : "#fff",
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            outline: "none",
                            boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                            height: "76px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontWeight: "bold",
                            fontSize: "15px",
                            marginTop: "10px",
                            marginBottom: "10px",
                          }}
                          disabled={loading}
                          onClick={() => buyIdOnSale(filteredNft)}
                        >
                          {loading ? (
                            <SpinnerCircular
                              style={{ color: "#fff", width: "20px" }}
                            />
                          ) : (
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: nightModeStatus ? "#000" : "#fff",
                              }}
                            >
                              <HiOutlineShoppingCart />
                              <span
                                style={{
                                  marginLeft: "10px",
                                  color: nightModeStatus ? "#000" : "#fff",
                                }}
                              >
                                Buy Now
                              </span>
                            </span>
                          )}
                        </button>

                        {/* <button className="cartBtn">
                        <HiOutlineShoppingCart />
                      </button> */}
                      </div>
                    )}
                  </>
                ) : (
                  <div className="buynowOuter">
                    {/* <NftCheckout /> */}
                    <button
                      className="placebidBtn"
                      onClick={toggle}
                      style={{
                        backgroundColor: nightModeStatus ? "#fff" : "#000",
                        color: nightModeStatus ? "#000" : "#fff",
                        width: "100%",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        outline: "none",
                        boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                        height: "76px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "15px",
                        marginTop: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      Buy Now
                    </button>
                    {/* <button className="cartBtn" onClick={toggle}>
                        <HiOutlineShoppingCart />
                      </button> */}
                  </div>
                )}
              </div>
            ) : (
              <>
                {filteredNft?.passName ? (
                  <>
                    {filteredNft?.passName != "Priority Pass" ? (
                      <>
                        <div className="saleendOuter">
                          <div className="saleendDate">
                            Nft is not on sale or auction. Please click on the
                            button below to make it on sale or auction.
                          </div>
                          <div className="saleendTimer"></div>
                          <div className="bidBxOuter">
                            <div className="bidBx">
                              {/* <small>From</small> */}
                              <button
                                style={{
                                  backgroundColor: "white",
                                  border: "none",
                                  color: "black",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  outline: "2px solid #000",
                                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                                  height: "76px",
                                }}
                                onClick={() => {
                                  foo2 == "all"
                                    ? navigate(
                                        "/marketplace/create-nft?nftId=" +
                                          filteredNft._id
                                      )
                                    : navigate(
                                        "/marketplace/create-nft?nftId=" +
                                          filteredNft._id +
                                          "&type=pass"
                                      );
                                }}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "black",
                                  }}
                                >
                                  <HiOutlineShoppingCart />
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      color: "black",
                                    }}
                                  >
                                    Sale or Auction
                                  </span>
                                </span>
                              </button>
                              {/* <strong>21.58 KDA</strong> */}
                              {/* <span>$1,063</span> */}
                            </div>
                            <div className="bidBx">
                              {/* <small>From</small> */}
                              <button
                                style={{
                                  backgroundColor: "white",
                                  border: "none",
                                  color: "black",
                                  padding: "10px",
                                  borderRadius: "10px",
                                  cursor: "pointer",
                                  fontWeight: "bold",
                                  fontSize: "15px",
                                  marginTop: "10px",
                                  marginBottom: "10px",
                                  width: "100%",
                                  display: "flex",
                                  justifyContent: "center",
                                  alignItems: "center",
                                  outline: "2px solid #000",
                                  boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                                  height: "76px",
                                }}
                                onClick={toggleGift}
                              >
                                <span
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    color: "black",
                                  }}
                                >
                                  <HiOutlineShoppingCart />
                                  <span
                                    style={{
                                      marginLeft: "10px",
                                      color: "black",
                                    }}
                                  >
                                    Gift
                                  </span>
                                </span>
                              </button>
                              {/* <strong>21.58 KDA</strong> */}
                              {/* <span>$1,063</span> */}
                            </div>
                          </div>
                          {/* {forAll == true ? (
                    isAuth ? (
                      <div className="buynowOuter">
                        <NftCheckout />
                        <button className="placebidBtn">Place a Bid</button>
                        <button className="cartBtn">
                          <HiOutlineShoppingCart />
                        </button>
                      </div>
                    ) : (
                      <div className="buynowOuter">
                        <NftCheckout />
                        <button className="placebidBtn" onClick={toggle}>
                          Place a Bid
                        </button>
                        <button className="cartBtn" onClick={toggle}>
                          <HiOutlineShoppingCart />
                        </button>
                      </div>
                    )
                  ) : null} */}
                        </div>
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
                                  loadingGift ? null : giftNft(filteredNft)
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
                    ) : (
                      <>
                        <div className="maintenanceOuter">
                          {/* <div className="maintenanceInner">
                            <div
                              className="maintenanceIcon"
                              style={{
                                color: "red",
                                fontSize: "50px",
                                marginBottom: "20px",
                                marginTop: "20px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >

                              <FaExclamationTriangle />
                            </div>
                            <div className="maintenanceText">
                              <h3>Coming Soon</h3>
                              <p>
                                This feature is currently under development and
                                will be available soon.
                              </p>
                            </div>
                          </div> */}
                        </div>
                      </>
                    )}{" "}
                  </>
                ) : (
                  <>
                    <div className="saleendOuter">
                      <div className="saleendDate">
                        Nft is not on sale or auction. Please click on the
                        button below to make it on sale or auction.
                      </div>
                      <div className="saleendTimer"></div>
                      <div className="bidBxOuter">
                        <div className="bidBx">
                          {/* <small>From</small> */}
                          <button
                            style={{
                              backgroundColor: "white",
                              border: "none",
                              color: "black",
                              padding: "10px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              outline: "2px solid #000",
                              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                              height: "76px",
                            }}
                            onClick={() => {
                              foo2 == "all"
                                ? navigate(
                                    "/marketplace/create-nft?nftId=" +
                                      filteredNft._id
                                  )
                                : navigate(
                                    "/marketplace/create-nft?nftId=" +
                                      filteredNft._id +
                                      "&type=pass"
                                  );
                            }}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "black",
                              }}
                            >
                              <HiOutlineShoppingCart />
                              <span
                                style={{ marginLeft: "10px", color: "black" }}
                              >
                                Sale or Auction
                              </span>
                            </span>
                          </button>
                          {/* <strong>21.58 KDA</strong> */}
                          {/* <span>$1,063</span> */}
                        </div>
                        <div className="bidBx">
                          {/* <small>From</small> */}
                          <button
                            style={{
                              backgroundColor: "white",
                              border: "none",
                              color: "black",
                              padding: "10px",
                              borderRadius: "10px",
                              cursor: "pointer",
                              fontWeight: "bold",
                              fontSize: "15px",
                              marginTop: "10px",
                              marginBottom: "10px",
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              outline: "2px solid #000",
                              boxShadow: "0px 0px 5px 0px rgba(0,0,0,0.75)",
                              height: "76px",
                            }}
                            onClick={toggleGift}
                          >
                            <span
                              style={{
                                display: "flex",
                                alignItems: "center",
                                color: "black",
                              }}
                            >
                              <HiOutlineShoppingCart />
                              <span
                                style={{ marginLeft: "10px", color: "black" }}
                              >
                                Gift
                              </span>
                            </span>
                          </button>
                          {/* <strong>21.58 KDA</strong> */}
                          {/* <span>$1,063</span> */}
                        </div>
                      </div>
                      {/* {forAll == true ? (
                    isAuth ? (
                      <div className="buynowOuter">
                        <NftCheckout />
                        <button className="placebidBtn">Place a Bid</button>
                        <button className="cartBtn">
                          <HiOutlineShoppingCart />
                        </button>
                      </div>
                    ) : (
                      <div className="buynowOuter">
                        <NftCheckout />
                        <button className="placebidBtn" onClick={toggle}>
                          Place a Bid
                        </button>
                        <button className="cartBtn" onClick={toggle}>
                          <HiOutlineShoppingCart />
                        </button>
                      </div>
                    )
                  ) : null} */}
                    </div>
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
                              loadingGift ? null : giftNft(filteredNft)
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
                )}
              </>
            )
          ) : null}
        </div>
        <WalletModal toggle={toggle} modal={modal} setModal={setModal} />
      </div>
    </div>
  );
};

export default OverviewDetail;
