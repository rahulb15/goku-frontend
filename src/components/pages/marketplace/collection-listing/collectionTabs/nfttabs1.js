import React, { useEffect, useState } from "react";
import { Button, FormGroup, Input, Label } from "reactstrap";
//import ownedImg1 from "../../../../../assets/owned-img1.png";
import Axios from "axios";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
//import NFTSideBar from "./nftsidebar";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import classnames from "classnames";
import Pact from "pact-lang-api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import { SpinnerCircular } from "spinners-react";
import questionMark from "../../../../../assets/questionMark.jpg";
import { WalletModal } from "../../../../common-components/walletModal/walletModal";
import DialogBid from "./dialogBid";
import "./nfttabs1.css";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;
const NftTabs1 = (props) => {
  const { isLoading, isAuth, error } = useSelector(
    (state) => state.loginStatus
  );
  const [filteredNft, setFilteredNft] = useState([]);
  const [forAll, setForAll] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedData, setSelectedData] = useState();
  const [open, setOpen] = useState(false);
  const [auctionDetails, setAuctionDetails] = useState();
  const [hover, setHover] = useState(false);
  const [userId, setUserId] = useState("");
  const [activeTab, setActiveTab] = useState("1");
  const [spinner, setSpinner] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [modal, setModal] = useState(false);
  const [fee, setFee] = useState(0);
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [serarchCollection, setSearchCollection] = React.useState("");
  const [royalityAddress, setRoyalityAddress] = React.useState("");
  const [royalityRate, setRoyalityRate] = React.useState("");
  console.log("royalityAddress", royalityAddress);
  console.log("royalityRate", royalityRate);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    if (selected.includes(value)) {
      setSelected((prev) => prev.filter((val) => val !== value));
    } else {
      setSelected((prev) => [...prev, value]);
    }
    //add checked value to selected array and remove unchecked value from selected array
  };

  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("id");
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const toggle = () => {
    setModal(!modal);
  };
  // const getLastBid = async (item) => {
  //   const accountName = walletAddress;
  //   const publicKey = accountName.slice(2, accountName.length);
  //   const guard = { keys: [publicKey], pred: "keys-all" };
  //   const tokenId = item.tokenId;
  //   const a = accountName;
  //   const pactCode = `(free.marketplacefinal002.get-last-bid ${JSON.stringify(
  //     tokenId
  //   )})`;
  //   const signCmd = {
  //     pactCode: pactCode,
  //     caps: [
  //       Pact.lang.mkCap(
  //         "GAS",
  //         "Capability to allow buying gas",
  //         "coin.GAS",
  //         []
  //       ),
  //     ],
  //     sender: a,
  //     gasLimit: 150000,
  //     chainId: CHAIN_ID,
  //     ttl: 28800,
  //     envData: {
  //       //  "demothreeaccount-keyset":guard ,
  //     },
  //   };
  //   const cmd = await Pact.wallet.sign(signCmd);
  //   const localRes = await fetch(`${API_HOST}/api/v1/local`, {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     method: "POST",
  //     body: JSON.stringify(cmd),
  //   });
  //   const rawRes = await localRes;
  //   const resJSON = await rawRes.json();
  //   if (resJSON.result.status === "success") {
  //     const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST);
  //     const signedtxx = await Pact.fetch.listen(
  //       { listen: reqKey.requestKeys[0] },
  //       API_HOST
  //     );
  //   }
  // };
  useEffect(() => {
    getNftList();
  }, [refresh, activeTab, searchInput, selected]);

  const getNftList = () => {
    setScreenLoading(true);
    const search = window.location.search;
    const params = new URLSearchParams(search);
    let foo = params.get("id");
    let foo2 = params.get("for");
    if (foo2 == "all") {
      setForAll(true);
      const dataFinal = {
        collectionId: foo,
        search: searchInput,
        minAmount: minAmount ? minAmount : 0,
        maxAmount: maxAmount ? maxAmount : 10000000,
        selected: selected,
      };
      Axios.post(
        "/nft/collection-nft-marketplace?page=" + page + "&limit=" + limit,
        dataFinal,
        {
          headers: { authorization: localStorage.getItem("accessJWT") },
        }
      )
        .then((response) => {
          if (response.data.status == "success") {
            let collectionList = response.data?.data?.paginatedResults
              ? response.data?.data?.paginatedResults
              : [];
            setTotalPage(
              response.data?.data?.totalCount
                ? response.data?.data?.totalCount
                : 0
            );
            const list = collectionList;

            setFilteredNft(list);
            setScreenLoading(false);
          }
        })
        .catch((error) => {
          
          setScreenLoading(false);
        });
    }
    if (foo2 == "user") {
      setForAll(false);
      const dataFinal = { collectionId: foo };
      Axios.post("/nft/user-own-nft", dataFinal, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            let collectionList = response.data.data;
            setFilteredNft(collectionList);
            setScreenLoading(false);
          }
        })
        .catch((error) => {
          
          setScreenLoading(false);
        });
    }
  };
  const getFee = async () => {
    const accountName = walletAddress;
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
    setLoading(true);
    console.log("dataxcxcxcxcxc", data);
  
    const royaltyA = await getRoyalityAddress(data);
    const royaltyR = await getRoyalityRate(data);
    console.log("royaltyA", royaltyA);
    console.log("royaltyR", royaltyR);
    console.log("fee",fee);
    setSelectedData(data);
    const MarketplaceCharges = fee * parseFloat(data.nftPrice);
    console.log("MarketplaceCharges", MarketplaceCharges);
    const priceWithoutMarketplaceCharges =
      parseFloat(data.nftPrice) - MarketplaceCharges;
    console.log("priceWithoutMarketplaceCharges", priceWithoutMarketplaceCharges);
    // const royaltyPayout =
    //   props.collectionData.royaltyFee * priceWithoutMarketplaceCharges;
    const royaltyPayout = royaltyR * priceWithoutMarketplaceCharges;
    console.log("royaltyPayout", royaltyPayout);
    const sellerPayout = priceWithoutMarketplaceCharges - royaltyPayout;
    console.log("sellerPayout", sellerPayout);
    // const sellerPayout = priceWithoutMarketplaceCharges; //for db cooper and priority pass
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    const guard = { keys: [publicKey], pred: "keys-all" };
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
    console.log("royalityAddress", royaltyA);
    console.log("royalityRate", royaltyR);
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
                category: "buy",
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
                  setLoading(false);
                  toast.success("Successfully bought");
                  setRefresh(!refresh);
                } else {
                  setLoading(false);
                  toast.error("NFT not bought");
                }
              })
              .catch((error) => {
                
                setLoading(false);
                toast.error("NFT not bought");
              });
          } else {
            toast.error("NFT not bought");
            setLoading(false);
          }
        }
      } else {
        toast.error("Rejected by user");
        setLoading(false);
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
      const cmd = await window.kadena.request({
        method: "kda_requestSign",
        networkId: NETWORK_ID,
        data: XWalletRequest,
      });
      if (cmd.status == "success") {
        const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
        // setSpinner("true");
        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );
        if (txResult.result.status == "success") {
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
              category: "buy",
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
                toast.success("Successfully bought");
                setLoading(false);
                setRefresh(!refresh);
              } else {
                setLoading(false);
                toast.error("NFT not bought");
              }
            })
            .catch((error) => {
              setLoading(false);
              toast.error("NFT not bought");
            });
        } else {
          setLoading(false);
          toast.error("NFT not bought");
        }
      } else {
        toast.error("Rejected by user");
        setLoading(false);
      }
    }
  };
  var collectionCreator = "";
  var collectionPrice = 0;
  const getCollectionPrice = async () => {
    const accountName1 = walletAddress;
    const publicKey1 = accountName1.slice(2, accountName1.length);
    const guard1 = { keys: [publicKey1], pred: "keys-all" };
    const a = accountName1;
    const pactCode = `(free.merchfinal001.get-collection-price "${props.collectionName}")`;
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
    const pactCode = `(free.merchfinal001.get-collection-creator "${props.collectionName}")`;
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
      )} (read-keyset "guard") 1.0 "${props.collectionName}" 1)`;
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
      )} (read-keyset "guard") 1.0 "${props.collectionName}" 1)`;
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
      setSpinner("true");
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
      collectionId: props.collectionData._id,
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

  const rangeSelect = () => {
    setRefresh(!refresh);
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
                    id="exampleEmail"
                    placeholder="Search by NFTs"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </FormGroup>
                <button>
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
          {/* <NFTSideBar /> */}
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className="bold">Status</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="statusList">
                  <ul>
                    <li>
                      <FormGroup check>
                        <Label check>
                          Buy now
                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            value="Buy now"
                          />
                        </Label>
                      </FormGroup>
                    </li>
                    <li>
                      <FormGroup check>
                        <Label check>
                          On Auction
                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            value="On Auction"
                          />
                        </Label>
                      </FormGroup>
                    </li>
                    <li>
                      <FormGroup check>
                        <Label check>
                          New
                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            value="New"
                          />
                        </Label>
                      </FormGroup>
                    </li>
                    {/* <li>
                      <FormGroup check>
                        <Label check>
                          Has Offers
                          <Input
                            type="checkbox"
                            onChange={handleChange}
                            value="Has Offers"
                          />
                        </Label>
                      </FormGroup>
                    </li> */}
                  </ul>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
              onClick={() => {
                setMinAmount(0);
                setMaxAmount(0);
                setRefresh(!refresh);
              }}
            >
              <Typography className="bold">Price</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="PriceOuter">
                  <div className="priceSel">
                    <FormGroup>
                      <Input
                        type="select"
                        name="select"
                        placeholder="Trending"
                        id="exampleSelect"
                        onChange={(e) => setOptions(e.target.value)}
                      >
                        <option>KDA</option>
                      </Input>
                    </FormGroup>
                  </div>
                  <div className="pricemin">
                    <FormGroup>
                      <Input
                        type="number"
                        name="min"
                        id="min"
                        placeholder="Min"
                        value={minAmount}
                        onChange={(e) => setMinAmount(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                  <div className="priceTo">to</div>
                  <div className="pricemax">
                    <FormGroup>
                      <Input
                        type="number"
                        name="max"
                        id="max"
                        placeholder="Max"
                        value={maxAmount}
                        onChange={(e) => setMaxAmount(e.target.value)}
                      />
                    </FormGroup>
                  </div>
                </div>
                <div className="loadmoreBtn">
                  <button onClick={() => rangeSelect()}>Apply</button>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className="bold">Properties</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                <div className="collectionList">
                  <div className="collectionSrch">
                    <FormGroup>
                      <Input
                        type="name"
                        name="name"
                        id="exampleName"
                        placeholder="Search by collection"
                        onChange={(e) => setSearchInput(e.target.value)}
                      />
                    </FormGroup>
                    <button>
                      <BsSearch />
                    </button>
                  </div>
                </div>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </div>
        <div className="nftFlt_Right">
          <div className="listing_TabOuter">
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "1" })}
                  onClick={() => setActiveTab("1")}
                  style={{ cursor: "pointer" }}
                >
                  All
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "2" })}
                  onClick={() => setActiveTab("2")}
                  style={{ cursor: "pointer" }}

                >
                  Open For Offers
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "3" })}
                  onClick={() => setActiveTab("3")}
                  style={{ cursor: "pointer" }}

                >
                  Buy Now
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: activeTab === "4" })}
                  onClick={() => setActiveTab("4")}
                  style={{ cursor: "pointer" }}

                >
                  Not For Sale
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>
              <TabPane tabId="1"></TabPane>
              <TabPane tabId="2"></TabPane>
            </TabContent>
          </div>
          <div className="nftList">
            <ul>
              {activeTab == "1" ? (
                <div className="loadmoreBtn">
                  {/* <button onClick={() => (loading ? null : submitData())}>
                    {loading ? <SpinnerCircular /> : "Mint"}
                  </button> */}
                  {isAuth ? (
                    <button onClick={() => (loading ? null : submitData())}>
                      {loading ? <SpinnerCircular /> : "Mint"}
                    </button>
                  ) : (
                    <button onClick={() => toggle()}>
                      Connect Wallet to Mint
                    </button>
                  )}
                </div>
              ) : null}
              <br />
              <br />
              {filteredNft.length ? (
                filteredNft
                  .filter((data) => {
                    if (activeTab == "1") {
                      return data;
                    } else if (activeTab == "2") {
                      return data.onAuction == true;
                    } else if (activeTab == "3") {
                      return data.onSale == true;
                    } else if (activeTab == "4") {
                      return data.onSale == false;
                    }
                  })
                  .map((data, index) => {
                    
                    return (
                      <>
                        <li>
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
                                to={
                                  forAll
                                    ? {
                                        pathname: "/marketplace/nft-overview",
                                        search: `?id=${data._id}&for=all`,
                                      }
                                    : {
                                        pathname: "/marketplace/nft-overview",
                                        search: `?id=${data._id}&for=user`,
                                      }
                                }
                              >
                                <div className="featImg">
                                  <img
                                    src={
                                      data.tokenImage
                                        ? data.tokenImage
                                        : questionMark
                                    }
                                    alt=""
                                    // style={
                                    //   data._id == userId && hover
                                    //     ? { opacity: 0.5 }
                                    //     : { opacity: 1 }
                                    // }
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
                                loading === false &&
                                hover && (
                                  <div className="createItemBtnBx">
                                    {data.creator == walletAddress ? null : ( // </button> //   Cancel // <button className="createItemBtn"> // <button className='createItemBtn'>Edit</button>
                                      <>
                                        {data.sellingType == "Fixed Price" ? (
                                          <div className="featpriceOut">
                                            {/* <Button
                                            className="btn-buy-now"
                                            onClick={() => buyIdOnSale(data)}
                                          >
                                            Buy Now
                                          </Button> */}
                                            {isAuth ? (
                                              <Button
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
                                            ) : (
                                              <Button
                                                style={{
                                                  backgroundColor: "#666",
                                                  color: "#fff",
                                                  width: "100%",
                                                  height: "50px",
                                                  borderRadius: "10px",
                                                }}
                                                onClick={() => {
                                                  toggle();
                                                }}
                                              >
                                                Buy Now
                                              </Button>
                                            )}
                                          </div>
                                        ) : // <button className='createItemBtn' onClick={()=>handleOpen()}>Place a Bid</button>
                                        // <DialogBid
                                        //   dataUSer={data}
                                        //   setRefresh={setRefresh}
                                        //   refresh={refresh}
                                        //   setLoading={setLoading}
                                        //   loading={loading}
                                        // />
                                        isAuth ? (
                                          <DialogBid
                                            dataUSer={data}
                                            setRefresh={setRefresh}
                                            refresh={refresh}
                                            setLoading={setLoading}
                                            loading={loading}
                                            setSelectedData={setSelectedData}
                                            selectedData={selectedData}
                                          />
                                        ) : (
                                          <Button
                                            variant="contained"
                                            style={{
                                              backgroundColor: "#666",
                                              color: "#fff",
                                              width: "100%",
                                              height: "50px",
                                              borderRadius: "10px",
                                            }}
                                            onClick={() => {
                                              toggle();
                                            }}
                                          >
                                            Bid
                                          </Button>
                                        )}
                                      </>
                                    )}
                                  </div>
                                )}
                              <Link
                                to={
                                  forAll
                                    ? {
                                        pathname: "/marketplace/nft-overview",
                                        search: `?id=${data._id}&for=all`,
                                      }
                                    : {
                                        pathname: "/marketplace/nft-overview",
                                        search: `?id=${data._id}&for=user`,
                                      }
                                }
                              >
                                <div className="feattitle">
                                  <small>
                                    {data.collectionName}
                                    <HiCheckCircle />
                                  </small>
                                  <span className="bold">
                                    {data.collectionName
                                      ? data.collectionName
                                      : "Not Revealed"}{" "}
                                    #
                                    {data?.imageIndex
                                      ? data?.imageIndex
                                      : "Not Revealed"}{" "}
                                  </span>
                                </div>
                                <div className="featpriceOut">
                                  <div className="featprice">
                                    <small>From</small>
                                    <span className="bold">
                                      {data.onAuction
                                        ? "Open For Bids"
                                        : data.nftPrice + " KDA"}
                                    </span>
                                  </div>
                                  <div className="featprice">
                                    <small>Highest Bid</small>
                                    <span className="bold">
                                      {data?.bidInfo?.length > 0
                                        ? data?.bidInfo[0]?.bidPrice
                                        : "Not Bids"}
                                    </span>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </div>
                        </li>
                      </>
                    );
                  })
              ) : (
                <h1>No NFTs</h1>
              )}
            </ul>
          </div>
          {totalPage.length > 10 && (
            <div className="loadmoreBtn">
              <button>Load More</button>
            </div>
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
        <WalletModal toggle={toggle} modal={modal} setModal={setModal} />
      </div>
      {/* <DialogBid open={open} setOpen={setOpen} handleClose={handleClose} /> */}
    </>
  );
};
export default NftTabs1;
