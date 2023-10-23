import React, { useEffect, useState } from "react";
import { Button } from "reactstrap";
import classnames from "classnames";
import { FaTshirt } from "react-icons/fa";
import Axios from "axios";
import { HiCheckCircle } from "react-icons/hi";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import axios from "axios";
import Pact from "pact-lang-api";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { SpinnerCircular } from "spinners-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import NFTSideBar from './'

const HotCollectionsTab = (props) => {
  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("name");
  

  var publickKey;
  var accountName;
  const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

  //   const NETWORK_ID = "testnet04";
  // const CHAIN_ID = "1";
  // mainnet01
  const GAS_PRICE = 0.01111;
  const GAS_LIMIT = 150000;
  const TTL = 28000;

  const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
  const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const [hover, setHover] = useState(false);
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [userId, setUserId] = useState("");
  const [revealSpinnerId, setrevealSpinnerIdId] = useState("");
  const [spinner, setSpinner] = useState("");
  const [reload, setReload] = useState(false);
  const [giftModal, setGiftModal] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState("");
  const [loadingGift, setLoadingGift] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  if (walletName == "Xwallet") {
    const getAccountInfo = async () => {
      const checkNetwork = await window.kadena.request({
        method: "kda_getNetwork",
      });

      var walletInfo;
      if (checkNetwork.name == "Testnet") {
        walletInfo = await window.kadena.request({
          method: "kda_requestAccount",
          networkId: "testnet04",
        });
      }

      if (checkNetwork.name == "Mainnet") {
        walletInfo = await window.kadena.request({
          method: "kda_requestAccount",
          networkId: "mainnet01",
        });
      }

      // const walletInfo = await window.kadena.request({
      //   method: 'kda_requestAccount',
      //   networkId: "testnet04",
      // });
      if (walletInfo.status == "success") {
        
        publickKey = walletInfo.wallet.publicKey;
        accountName = walletInfo.wallet.account;
        
        
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

  useEffect(() => {
    setScreenLoading(true);
    if (activeTab == "1") {
      axios
        .get(
          "/passDetails/user-nft-on-sale?page=" +
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
          
          const data = response.data.data;
          if (data) {
            setPasses(data);
          } else {
            setPasses([]);
          }
          setScreenLoading(false);

          // const data = response.data.data.filter((item) => {
          //   return item.onMarketplace == false;
          // });

          // setPasses(data);
        })
        .catch((error) => {
          setScreenLoading(false);
          
        });
    } else if (activeTab == "2") {
      axios
        .get(
          "/passDetails/user-nft-on-auction?page=" +
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
          
          const data = response.data.data;
          
          if (data) {
            setPasses(data);
          } else {
            setPasses([]);
          }
          setScreenLoading(false);
          // const data = response.data.data.filter((item) => {
          //   return item.onMarketplace == false;
          // });

          //   setPasses(data);
        })
        .catch((error) => {
          setScreenLoading(false);
          
        });
    }
  }, [reload, refresh, props.search, limit, props.refresh, activeTab]);

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
              creator: data.bidInfo.bidder,
              sellingType: "",
              duration: "",
              onMarketplace: false,
              tokenId: data.tokenId,
              passTokenId: data.passTokenId,
              history: {
                owner: walletAddress,
                price: data.nftPrice,
                category: "bid",
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
                
                toast.error("NFt bid not accepted");
                setLoading(false);
              });
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
            passTokenId: data.passTokenId,
            history: {
              owner: walletAddress,
              price: data.nftPrice,
              category: "bid",
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
              category: "cancelBid",
            },
          };
          
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          Axios.patch("/passDetails/update-nft-pass", obj, config)
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
              category: "cancelBid",
            },
          };
          
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          Axios.patch("/passDetails/update-nft-pass", obj, config)
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
          Axios.patch("/passDetails/update-nft-pass", obj, config)
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
          Axios.patch("/passDetails/update-nft-pass", obj, config)
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
              imageIndex: data.imageIndex,
              _id: data._id,
              bidPrice: "",
              bidder: "",
              history: {
                owner: walletAddress,
                price: data.nftPrice,
                category: "cancelAuction",
              },
            };
            
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            Axios.patch("/passDetails/update-nft-pass", obj, config)
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
              category: "cancelAuction",
            },
          };
          
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          Axios.patch("/passDetails/update-nft-pass", obj, config)
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
          toast.error("NFt Sale not closed");
          setLoading(false);
        }
      } else {
        toast.error("NFt Sale not closed");
        setLoading(false);
      }
    }
  };

  return (
    <div className="listing_TabOuter">
      <div className="nftProdListOuter">
        {/* <div className='nftFlt_Left'>
                        <NFTSideBar />
                    </div> */}
        <div className="nftFlt_Right">
          {/* <div className="listing_TabOuter"> */}
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "1" })}
                onClick={() => setActiveTab("1")}
                style={{ cursor: "pointer" }}

              >
                Sale
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === "2" })}
                onClick={() => setActiveTab("2")}
                style={{ cursor: "pointer" }}

              >
                Auction
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabPane tabId="1"></TabPane>
            <TabPane tabId="2"></TabPane>
          </TabContent>
          {/* </div> */}
          <div className="nftList">
            <ul>
              {passes.length ? (
                passes.map((data) => {
                  
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
                                  src={data.tokenImage ? data.tokenImage : null}
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
                            <br />
                            {data._id == userId &&
                              loading == false &&
                              hover && (
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
                                    <div className="featpriceOut" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flex: 1 }}>
                                      <Button
                                        className="btm-accept-bid"
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
                                        onClick={() => {
                                          acceptLastBid(data);
                                        }}
                                      >
                                        Accept Bid
                                      </Button>
                                      &nbsp;
                                      &nbsp;
                                      <Button
                                        className="btn-reject-bid"
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
                                        onClick={() => {
                                          declineBid(data);
                                        }}
                                      >
                                        Reject Bid
                                      </Button>
                                       &nbsp;
                                      &nbsp;
                                      <Button
                                        className="btn-cancel-bid"
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
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
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
                                        onClick={() => {
                                          closeSale(data);
                                        }}
                                      >
                                        Close Sale
                                      </Button>
                                    </>
                                  )}
                                </div>
                              )}
                            <Link
                              to={{
                                pathname: "/marketplace/nft-overview",
                                search: `?id=${data._id}`,
                              }}
                            >
                              <div className="feattitle">
                                <small>
                                  {data.passName} <HiCheckCircle />
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
                    </>
                  );
                })
              ) : (
                <h1 style={{ textAlign: "center" }}>No NFTs</h1>
              )}
            </ul>
          </div>
          {/* <div className='loadmoreBtn'>
            <button>Load More</button>
          </div> */}
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
