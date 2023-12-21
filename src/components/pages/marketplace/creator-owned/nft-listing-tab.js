import { default as Axios, default as axios } from "axios";
import Pact from "pact-lang-api";
import React, { useEffect, useState } from "react";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalHeader } from "reactstrap";
import questionMark from "../../../../assets/questionMark.jpg";
import DialogBid from "../collection-listing/collectionTabs/dialogBid";
//import ProdImg3 from "../../../../assets/preority-banner.png";
//import ProdImg1 from "../../../../assets/proj-img.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpinnerCircular } from "spinners-react";
// import NFTSideBar from './'

const HotCollectionsTab = (props) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("name");
  console.log("foo", foo);
  var publickKey;
  var accountName;
  const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
  //   const NETWORK_ID = "testnet04";
  // const CHAIN_ID = "1";
  // mainnet01
  const GAS_PRICE = 0.01111;
  // const GAS_LIMIT = 150000;
  // const TTL = 28000;

  const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
  const API_HOST = `https://api.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState("");
  const [revealSpinnerId, setrevealSpinnerIdId] = useState("");
  const [spinner, setSpinner] = useState("");
  const [screenLoading, setScreenLoading] = useState(false);
  const [reload, setReload] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loadingGift, setLoadingGift] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [fee, setFee] = useState(0);
  const [fee1, setFee1] = useState(0);
  const [selectedData, setSelectedData] = useState();
  const navigate = useNavigate();
  const [selectedNft, setSelectedNft] = React.useState();
  const [royalityAddress, setRoyalityAddress] = React.useState("");
  const [royalityRate, setRoyalityRate] = React.useState("");
  console.log("royalityAddress", royalityAddress);
  console.log("royalityRate", royalityRate);


  if (walletName == "Xwallet") {
    const getAccountInfo = async () => {
      const checkNetwork = await window.kadena.request({
        method: "kda_getNetwork",
      });

      var walletInfo;
      if (checkNetwork.name == "Testnet") {
        walletInfo = await window.kadena.request({
          method: "kda_requestAccount",
          networkId: NETWORK_ID,
        });
      }

      if (checkNetwork.name == "Mainnet") {
        walletInfo = await window.kadena.request({
          method: "kda_requestAccount",
          networkId: NETWORK_ID,
        });
      }

      // const walletInfo = await window.kadena.request({
      //   method: 'kda_requestAccount',
      //   networkId: "testnet04",
      // });
      if (walletInfo.status == "success") {
        console.log("ssda", walletInfo);
        publickKey = walletInfo.wallet.publicKey;
        accountName = walletInfo.wallet.account;
        console.log("pubk", publickKey);
        console.log("accountn", accountName);
      }

      return;
    };

    getAccountInfo();
  }

  if (walletName == "Zelcore" || walletName == "Chainweaver") {
    accountName =
      walletName == "Chainweaver"
        ? localStorage.getItem("chainWeaverWalletAdd")
        : localStorage.getItem("zelcorewalletadd");
    publickKey = accountName.slice(2, accountName.length);
  }

  const [passes, setPasses] = useState([]);
  const [hashImageUrl, setHashImageUrl] = useState("");

  const revealPass = async (data) => {
    const tokenId = data.passTokenId;
    console.log("tokenid", tokenId);
    console.log("Data", data);
    console.log(walletAddress, "walletAddress");

    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    setSpinner(data._id);

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
    console.log("response", response);
    if (response.result.status == "success") {
      const datum = response.result.data.data[0].datum;
      console.log("datum", datum);
      console.log("dataxcvbnm",data);
      const filteredNft = data;
      let fileImageUrl;
      let fileName;
      let obj;
      if (filteredNft) {
        let token;
        if(filteredNft.tokenId && filteredNft.tokenId.split(":")[0] === "dbc"){
          // token = filteredNft.tokenId.split(":")[1]
          token = filteredNft.tokenId
        //   console.log("filteredNft", filteredNft.tokenId.split(":")[1]);

        // //   //add collection name to token
        //   token = filteredNft.tokenId.split(":")[1]
        }
        else{
          console.log(filteredNft,"filteredNft1234 ")
          token = filteredNft.hash;
        }
        console.log(token,"tokenxdxdxdxd");
        // // console.log("token", token);

        Axios.get(
          `/properties/getPropertyByToken?token=${token}`
          // `/properties/getPropertyByToken?token=${fakeTokenId}`

        )
          .then(async (response) => {
            if (response.data.status == "success" && response.data.data.length > 0) {
              let propertyList = response.data.data;
              console.log("propertyListDBCooper", propertyList);
              // setFilteredNft(nftList);
              // setUserId(nftList.creator);
              console.log("propertyList", propertyList);
              fileImageUrl = propertyList[0].image;
              fileName = propertyList[0].name;
              obj = {
                _id: data._id,
                collectionName: datum["collectionName"],
                creator: walletAddress,
                tokenImage: datum["imageUrl"],
                revealed: true,
                hash: datum["hash"],
                imageIndex: datum.imageIndex.int,
                nftPrice: data.passCost,
                history: {
                  owner: walletAddress,
                  price: data.passCost,
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
              const res = await axios.patch("/passDetails/updatePass", obj, config);
              console.log("res", res);
              if (res.status == 200) {
                console.log("success");
                setReload(!reload);
                setSpinner("");
                toast.success("NFT revealed successfully");
                // const obj2 = {
                //   clientId: data.clientId,
                //   activityType:"mint",
                //   activityInfo:"Nft is Mint",
                //   collectionName:passName,
                //   collectionId:datum["collection-name"],
                //   activityStatus:"Mint",
                //   activityImageUrl:datum["image-url"],
                // }
                // const res2 = await axios.post("/activity/insertActivity" , obj2 , config)
                // console.log("res2", res2)
        
                // setPasses(res.data.data)
              } else {
                console.log("error");
              }
              // setCollectionList(filteredCollectionList)
            } else {
              obj = {
                _id: data._id,
                collectionName: datum["collectionName"],
                creator: walletAddress,
                tokenImage: datum["imageUrl"],
                revealed: true,
                hash: datum["hash"],
                imageIndex: datum.imageIndex.int,
                nftPrice: data.passCost,
                history: {
                  owner: walletAddress,
                  price: data.passCost,
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
              const res = await axios.patch("/passDetails/updatePass", obj, config);
              console.log("res", res);
              if (res.status == 200) {
                console.log("success");
                setReload(!reload);
                setSpinner("");
                toast.success("NFT revealed successfully");
                // const obj2 = {
                //   clientId: data.clientId,
                //   activityType:"mint",
                //   activityInfo:"Nft is Mint",
                //   collectionName:passName,
                //   collectionId:datum["collection-name"],
                //   activityStatus:"Mint",
                //   activityImageUrl:datum["image-url"],
                // }
                // const res2 = await axios.post("/activity/insertActivity" , obj2 , config)
                // console.log("res2", res2)
        
                // setPasses(res.data.data)
              } else {
                console.log("error");
              }
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

 
    

      // setHashImageUrl(response.data.data);
      // })
      // .catch((error) => {
      //   console.log("error", error);
      // });

      //   const accessJWT = localStorage.getItem('accessJWT')
      //   const config = {
      //     headers: {
      //       Authorization: accessJWT
      //     }
      //   }
      //   const res = await axios.patch("/passDetails/updatePass", obj, config)
      //   console.log("res", res)
      //   if (res.status == 200) {
      //     console.log("success")

      //     setSpinner(false)
      //     toast.success("Pass Revealed Successfully")
      //     // setPasses(res.data.data)
      //     setReload(!reload)
      //   }
      // else {
      //   console.log("error")
      // }
    }
  };

  useEffect(() => {
    setScreenLoading(true);
    if (foo) {
      console.log("fooFA", foo);
      let name;
      if (foo == "PriorityPass") {
        name = "Priority Pass";
      } else if (foo == "DBCooper") {
        name = "DB Cooper";
      }
      console.log("name", name);
      axios
        .get("/passDetails/all-nft-on-marketplace", {
          headers: { authorization: localStorage.getItem("accessJWT") },
        })
        .then((response) => {
          console.log("heyllo65", response.data.data);
          const data = response.data.data.filter((item) => {
            return item.passName === name;
          });

          setPasses(data);
          setScreenLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setScreenLoading(false);
        });
    } else {
      axios
        .get(
          "/passDetails/all-nft-off-marketplace?page=" +
            page +
            "&limit=" +
            limit +
            "&search=" +
            props.search,
          {
            headers: { authorization: localStorage.getItem("accessJWT") },
          }
        )
        .then((response) => {
          console.log("heyllo65", response.data.data);
          setTotal(response.data.count);
          const data = response.data.data;
          // const data = response.data.data.filter((item) => {
          //   return item.onMarketplace == false;
          // });

          setPasses(data);
          setScreenLoading(false);
        })
        .catch((error) => {
          console.log("error", error);
          setScreenLoading(false);
        });
    }
  }, [reload, refresh, props.search, limit, props.refresh]);

  const getFee = async () => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.km-marketplace.get-fee "marketplace")`,
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

  const getRoyalityAddress = async (data) => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };
    // console.log("data.collectionName", data.collectionName);

    const a = accountName;
    const signCmd = {
      pactCode: `(free.km-marketplace.get-royalty-account "${data.collectionName}")`,
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
      return "";
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
      pactCode: `(free.km-marketplace.get-royalty-rate "${data.collectionName}")`, 
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

  useEffect(() => {
    getFee();
    // getRoyalityAddress();
    // getRoyalityRate();
    
  }, []);

  React.useEffect(() => {
    setFee1(parseFloat(fee).toFixed(1));
  }, [fee]);

  const buyIdOnSale = async (data) => {
    console.log("dataxcxcxcxcxc", data);

    const royaltyA = await getRoyalityAddress(data);
    const royaltyR = await getRoyalityRate(data);
    console.log("royaltyA", royaltyA);
    console.log("royaltyR", royaltyR);




    setLoading(true);
    const MarketplaceCharges = fee * parseFloat(data.nftPrice);
    console.log("MarketplaceCharges", MarketplaceCharges);
    const priceWithoutMarketplaceCharges =
      parseFloat(data.nftPrice) - MarketplaceCharges;
    console.log(
      "priceWithoutMarketplaceCharges",
      priceWithoutMarketplaceCharges
    );
    // const royaltyPayout =
    //   props.collectionData.royaltyFee * priceWithoutMarketplaceCharges;
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
      "kryptomerch-bank";
    const d = data.creator;
console.log("b", b, "c", c, "a", a, "d", d);
    const pactCode = `(free.km-marketplace.buy ${JSON.stringify(
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
      console.log("cmjj", cmd);
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
            const obj = {
              tokenId: data.tokenId,
              creator: walletAddress,
              clientId: data.clientId,
              passTokenId: data.tokenId,
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
          const obj = {
            tokenId: data.tokenId,
            passTokenId: data.tokenId,
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

  const giftNft = async (data) => {
    if (recipientAddress == "") {
      toast.error("Please enter recipient address");
      setLoading(false);
      return;
    }

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
        .then(async(response) => {
          console.log("response", response);
          if(response.data.status == 'error'){
            toast.error("The user you are trying to gift the nft is not registered with Kryptomerch");
            setLoadingGift(false);
            return;
          }
          else{
            console.log("data", data);
    const tokenId = data.tokenId;
    console.log("tokenid", tokenId);
    console.log("walletAddress", walletAddress);

    // const accountName = "k:a9ca12cafb238d8789899de1b2303783435f201b1dfb9e2fdca28fa3b7077fcf"//owner
    const accountName = walletAddress;
    //   const receiver="k:78a6d3d3ea9f2ad21a347d6715554de20b0ac9234057ed50ae8776fa96493826"
    const receiver = recipientAddress;
    console.log("receiver", receiver, "accountName", accountName);
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const b = receiver;

    const pactCode = `(free.km-marketplace.gift-nft ${JSON.stringify(
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
            "free.km-marketplace.TRANSFER",
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
      console.log(signCmd, "signcmd");
      const cmd = await Pact.wallet.sign(signCmd);
      console.log("cmjj", cmd);
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
          console.log(signedtxx, "xxxxxxxxxxxxxxNFTGIFT");
          if (signedtxx.result.status == "success") {
            const obj = {
              passTokenId: tokenId,
              tokenId: tokenId,
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
          } else {
            toast.error("NFT not gifted");
            setGiftModal(false);
            setLoadingGift(false);
          }
        }
      } else {
        toast.error("Rejected from wallet");
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
              "free.km-marketplace.TRANSFER",
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
        setSpinner("true");
        console.log("sdsf", gore2);
        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        console.log("Ssffs", txResult);
        if (txResult.result.status == "success") {
          const obj = {
            passTokenId: tokenId,
            tokenId: tokenId,
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
        } else {
          toast.error("NFT not gifted");
          setGiftModal(false);
          setLoadingGift(false);
        }
      } else {
        toast.error("Rejected from wallet");
        setGiftModal(false);
        setLoadingGift(false);
      }
    }

          }
        
        })
        .catch((error) => {
          console.log("error", error);
          
        });
    }


    
  };

 

  return (
    <div className="listing_TabOuter">
      <div className="nftProdListOuter">
        {/* <div className='nftFlt_Left'>
                        <NFTSideBar />
                    </div> */}
        <div className="nftFlt_Right">
          {/* <h2>Created NFTs</h2> */}
          <div className="nftList">
            <ul>
              {passes.length ? (
                passes.map((data) => {
                  console.log("dataMAP", data);
                  return (
                    <>
                      {/* <Link
                      to={{
                        pathname: "/marketplace/nft-overview",
                        search: `?id=${data._id}`,
                      }}
                    > */}
                      <li key={data?._id}>
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
                                search: `?id=${data._id}`,
                              }}
                            >
                              <div
                                className="featImg"
                                // style={
                                //   data._id == userId && hover
                                //     ? { opacity: 0.5 }
                                //     : { opacity: 1 }
                                // }
                              >
                                <img
                                  src={
                                   
                                    data?.fileImageUrl ? data?.fileImageUrl : data?.tokenImage ? data?.tokenImage : questionMark
                                  }
                                />
                                <div className="tshirtIcon">
                                  <FaTshirt />
                                </div>
                              </div>
                            </Link>
                            {data?._id == selectedData?._id && loading ? (
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
                            <br />
                            {data._id == userId &&
                            hover &&
                            data.revealed === "true" &&
                            data.onMarketplace == true ? (
                              <>
                                {data._id == userId &&
                                  loading === false &&
                                  hover && (
                                    <div className="createItemBtnBx">
                                      {data.creator ==
                                      walletAddress ? //   Cancel // <button className="createItemBtn"> // <button className='createItemBtn'>Edit</button>
                                      // </button>
                                      null : (
                                        <>
                                          {data.sellingType == "Fixed Price" ? (
                                            <div className="featpriceOut">
                                              <Button
                                                className="btn-buy-now"
                                                style={{
                                                  backgroundColor: "#666",
                                                  color: "#fff",
                                                  width: "100%",
                                                  height: "50px",
                                                  borderRadius: "10px",
                                                }}
                                                onClick={() =>
                                                  buyIdOnSale(data)
                                                }
                                              >
                                                Buy Now
                                              </Button>
                                            </div>
                                          ) : (
                                            // <button className='createItemBtn' onClick={()=>handleOpen()}>Place a Bid</button>
                                            <DialogBid
                                              dataUSer={data}
                                              setRefresh={setRefresh}
                                              refresh={refresh}
                                              setLoading={setLoading}
                                              loading={loading}
                                              setSelectedData={setSelectedData}
                                              selectedData={selectedData}
                                            />
                                          )}
                                        </>
                                      )}
                                    </div>
                                  )}
                              </>
                            ) : (
                              <>
                                {data?._id == userId &&
                                hover &&
                                data?.revealed === "true" && data?.passName != "Priority Pass" ? (
                                  <div className="featpriceOut" style={{display: 'flex', flexDirection: 'row'}}>
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
                                            data._id +
                                            "&type=pass"
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
                                      onClick={() => {setGiftModal(true); setSelectedNft(data);}}

                                    >
                                      Gift
                                    </Button>
                                  </div>
                                ) : spinner == data._id ? (
                                  <SpinnerCircular
                                    style={{
                                      marginTop: "15px",
                                      marginLeft: " 116px",
                                    }}
                                  />
                                ) : data._id == userId &&  data?.revealed === "false" && (
                                  <Button
                                    onClick={() => revealPass(data)}
                                    style={{
                                      backgroundColor: "#666",
                                      color: "#fff",
                                      width: "100%",
                                      height: "50px",
                                      borderRadius: "10px",
                                    }}
                                    className="btn-reveal"
                                  >
                                    Reveal
                                  </Button>
                                ) }
                              </>
                            )}
                            {/* {data._id == userId && loading == false && hover && (
                            <div className="createItemBtnBx">
                              {data.onAuction ? (
                                // <div
                                //   style={{
                                //     display: "flex",
                                //     flexDirection: "row",
                                //     justifyContent: "space-between",
                                //     flex: 1,
                                //   }}
                                // >
                                <div className="featpriceOut">
                                  <Button
                                    className="btm-accept-bid"
                                    onClick={() => {
                                      acceptLastBid(data);
                                    }}
                                  >
                                    Accept Bid
                                  </Button>
                                  <Button
                                    className="btn-reject-bid"
                                    onClick={() => {
                                      declineBid(data);
                                    }}
                                  >
                                    Reject Bid
                                  </Button>
                                  <Button
                                    className="btn-cancel-bid"
                                    onClick={() => {
                                      cancelBid(data);
                                    }}
                                  >
                                    Cancel Auction
                                  </Button>
                                </div>
                              ) : (
                                <>
                                  <Button
                                    className="btm-close-sale"
                                    onClick={() => {
                                      closeSale(data);
                                    }}
                                  >
                                    Close Sale
                                  </Button>
                                </>
                              )}
                            </div>
                          )} */}
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${data?._id}`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {data?.passName} <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {/* {data?.collectionName} #
                                  {data?.imageIndex
                                    ? data?.imageIndex
                                    : "Not Revealed"} */}
                               {data.fileName  ? data.fileName : data?.collectionName} {data?.fileName ? "" : "#" + data?.imageIndex}
                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {data?.nftPrice} KDA
                                  </span>
                                </div>
                                <div className="featprice">
                                  <small>Highest Bid</small>
                                  <span className="bold">
                                    {data?.onAuction
                                      ? data?.bidInfo[0]?.bidPrice
                                      : "Not Revealed"}
                                  </span>
                                </div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </li>
                      {/* </Link> */}
                      {giftModal && (
                        <Modal
                          isOpen={giftModal}
                          toggle={() => setGiftModal(false)}
                          className="giftModal"
                          style={{ width: "500px", top: "30%" }}                        >
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
                <h1 style={{ textAlign: "center" }}>No NFTs</h1>
              )}
            </ul>
          </div>
          {/* {limit >= 2 && (
          <div className='loadmoreBtn'>
            <button onClick={()=>setLimit(limit+2)}
            >Load More</button>
          </div>
          )} */}
          {limit > total ? null : (
            <>
              {limit >= 10 ? (
                <div className="loadmoreBtn">
                  <button
                    onClick={() => setLimit(limit + 2)}
                    style={{ width: "100%" }}
                  >
                    Load More
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
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
  );
};

export default HotCollectionsTab;
