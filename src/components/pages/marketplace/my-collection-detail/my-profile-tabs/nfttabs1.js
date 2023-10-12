import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
import questionMark from "../../../../../assets/questionMark.jpg";
//import ownedImg2 from "../../../../../assets/profile-owned-img2.png";
//import ownedImg3 from "../../../../../assets/profile-owned-img3.png";
import "./nfttabs1.css";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import Axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import NFTSideBar from "./nftsidebar";
import Pact from "pact-lang-api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { WalletModal } from "../../../../common-components/walletModal/walletModal";

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
  // const [collectionPrice,setCollectionPrice]=useState(0)
  // const [collectionCreator,setCollectionCreator]=useState("")
  const [collectionName, setCollectionName] = useState("");
  const [collectionData, setCollectionData] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loadingGift, setLoadingGift] = useState(false);
  const [hover, setHover] = useState(false);
  const [userId, setUserId] = useState("");
  const [screenLoading, setScreenLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const [selectedNft, setSelectedNft] = React.useState();

  
  
  
  

  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );

  const toggle = () => {
    setModal(!modal);
  };

  const navigate = useNavigate();
  
  const { id } = useParams();
  
  const searchData = window.location.search;
  const params = new URLSearchParams(searchData);
  let foo = params.get("id");
  
  

  

  useEffect(() => {
    getCollection();
  }, []);

  const getCollection = () => {
    Axios.get(`/collection/user-collection-by-id?id=${foo}`, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          setCollectionName(response.data.data[0].collectionName);
          setCollectionData(response.data.data[0]);
        }
      })
      .catch((error) => {
        //   setUserRegistered(false)
        
      });
  };

  

  useEffect(() => {
    getNft();
  }, [refresh, search, limit, selected]);

  const getNft = () => {
    setScreenLoading(true);

    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
      collectionId: foo,
    };
    Axios.post(
      "/nft/user-nft-marketplace-false-1?page=" +
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
          setTotal(response.data.totalCount);
          const search = window.location.search;
          const params = new URLSearchParams(search);
          let foo = params.get("id");

          // let filteredNftList = nftList.filter(
          //   (data) => data.collectionId === foo
          // );
          // 
          // const list = filteredNftList.filter((item) => {
          //   if (item.onMarketplace == false) {
          //     return item;
          //   }
          // });
          setFilteredNft(nftList);
          setScreenLoading(false);
          // setCollectionList(filteredCollectionList)
        } else {
          // setCollectionList([])
          setFilteredNft([]);
          setScreenLoading(false);
          
        }
      })
      .catch((error) => {
        setFilteredNft([]);
        setScreenLoading(false);
        //   setCollectionList([])
        //   setUserRegistered(false)
        
      });
  };

  var collectionCreator = "";
  var collectionPrice = 0;

  const getCollectionPrice = async () => {
    const accountName1 = walletAddress;
    const publicKey1 = accountName1.slice(2, accountName1.length);
    const guard1 = { keys: [publicKey1], pred: "keys-all" };

    const a = accountName1;

    const pactCode = `(free.merchfinal001.get-collection-price "${collectionName}")`;
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

    const pactCode = `(free.merchfinal001.get-collection-creator "${collectionName}")`;
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
      )} (read-keyset "guard") 1.0 "${collectionName}" 1)`;
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
      )} (read-keyset "guard") 1.0 "${collectionName}" 1)`;

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
      clientId: collectionData.clientId,
      collectionId: collectionData._id,
      onMarketplace: false,
    };
    

    Axios.post("/nft/add-nft", obj, {
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
      

      const obj = {
        _id: data._id,
        tokenId: `${datum["collectionName"]}:${datum["tokenId"]}`,
        collectionName: datum["collectionName"],
        creator: walletAddress,
        tokenImage: datum["imageUrl"],
        revealed: true,
        hash: datum["hash"],
        imageIndex: datum.imageIndex.int,
        history: {
          owner: walletAddress,
          price: data.nftPrice,
          category: "mint",
        },
      };
      
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
        .catch((error) => {
          
        });
    }
  };

  const giftNft = async (data) => {
    if (recipientAddress == "") {
      toast.error("Please enter recipient address");
      setLoading(false);
      return;
    }
    setLoadingGift(true);
    
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
      
      if (cmd.status == "success") {
        
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
      } else {
        toast.error("Rejected from wallet");
        setGiftModal(false);
        setLoadingGift(false);
      }
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    id="exampleEmail"
                    placeholder="Search by NFTs"
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
          <NFTSideBar
            setSelected={setSelected}
            selected={selected}
            setMinAmount={setMinAmount}
            setMaxAmount={setMaxAmount}
            setOptions={setOptions}
            options={options}
            setRefresh={setRefresh}
            refresh={refresh}
            setSearch={setSearch}
            search={search}
          />{" "}
        </div>
        <div className="nftFlt_Right">
          <div className="nftList">
            <ul>
              <div className="loadmoreBtn">
                <button onClick={() => (loading ? null : submitData())}>
                  {loading ? <SpinnerCircular /> : "Mint"}
                </button>
              </div>
              <br />
              <br />
              {filteredNft.length ? (
                filteredNft.map((data) => {
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
                                // style={data._id == userId && hover ? { opacity: 0.5 } : { opacity: 1 }}
                              >
                                <img
                                  src={
                                    data.tokenImage
                                      ? data.tokenImage
                                      : questionMark
                                  }
                                />
                                <div className="tshirtIcon">
                                  <FaTshirt />
                                </div>
                              </div>
                            </Link>
                            <br />
                            {data._id == userId && hover && data.isRevealed ? (
                              <div className="featpriceOut" style={{display:"flex",justifyContent:"space-between"}}>
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
                            ) : data._id == userId ? (
                              <Button
                                onClick={() => revealPass(data)}
                                className="btn-reveal"
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
                            ) : null}
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${data._id}`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {data.collectionName} <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {data.collectionName} #
                                  {data?.imageIndex
                                    ? data?.imageIndex
                                    : "Not Revealed"}
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
                                      ? data?.bidInfo.bidPrice
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

                      {/* {data.isRevealed ? (
                        <div className="featpriceOut">
                          <Button
                          onClick={() => navigate("/marketplace/create-nft?nftId="+data._id)}
                            style={{
                              marginTop: "15px",
                              marginLeft: " 50px",
                            }}
                          >
                            Sell
                          </Button>
                          <Button
                            onClick={() => setGiftModal(true)}
                            style={{
                              marginTop: "15px",
                              marginLeft: " 50px",
                            }}
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
                      ) : (
                        <Button
                          onClick={() => revealPass(data)}
                          style={{
                            marginTop: "15px",
                            marginLeft: " 116px",
                          }}
                        >
                          Reveal
                        </Button>
                      )} */}

                      {/* <div className="featpriceOut">
                                      {spinner == data._id ? 
                                      (
                                        <SpinnerCircular
                                          style={{
                                            marginTop: "15px",
                                            marginLeft: " 116px",
                                          }}
                                        />
                                      ) 
                                      : (
                                        <Button
                                          onClick={() => revealPass(data)}
                                          style={{
                                            marginTop: "15px",
                                            marginLeft: " 116px",
                                          }}
                                        >
                                          Reveal
                                        </Button>
                                      )}
                                    </div> */}
                    </>
                  );
                })
              ) : (
                <h1>No NFTs</h1>
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
        <WalletModal toggle={toggle} modal={modal} setModal={setModal} />
      </div>
    </>
  );
};

export default NftTabs1;
