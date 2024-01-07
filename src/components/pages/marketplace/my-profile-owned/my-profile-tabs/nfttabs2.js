import React, { Component, useState, useEffect } from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";
//import ownedImg1 from "../../../../../assets/profile-owned-img1.png";
//import ownedImg2 from "../../../../../assets/profile-owned-img2.png";
//import ownedImg3 from "../../../../../assets/profile-owned-img3.png";
import { FaTshirt } from "react-icons/fa";
import { HiCheckCircle } from "react-icons/hi";
import { MdArrowBackIos } from "react-icons/md";
import { BsGridFill, BsSearch } from "react-icons/bs";
import { RiGridFill } from "react-icons/ri";
import { TbRefresh } from "react-icons/tb";
import Axios from "axios";
import { Link } from "react-router-dom";
import NFTSideBar from "./nftsidebar";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Pact from "pact-lang-api";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import "./nfttabs1.css";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const NftTabs1 = () => {
  const [filteredNft, setFilteredNft] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [hover, setHover] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);
  const [screenLoading, setScreenLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = React.useState([]);
  const [minAmount, setMinAmount] = React.useState(0);
  const [maxAmount, setMaxAmount] = React.useState(0);
  const [options, setOptions] = React.useState([]);

  
  
  
  
  

  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );



  useEffect(() => {
    //getNftList();
    if (activeTab === "1") {
      getNftOnSale();
    }
    if (activeTab === "2") {
      getNftOnAuction();
    }
  }, [refresh, activeTab, search, limit, selected]);

  const getNftOnAuction = () => {
    setScreenLoading(true);

    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
    };
    Axios.post(
      "/nft/user-nft-marketplace-true-all-collection-on-auction-1?page=" +
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

  const getNftOnSale = () => {
    setScreenLoading(true);

    const dataFinal = {
      search: search ? search : "",
      minAmount: minAmount ? minAmount : 0,
      maxAmount: maxAmount ? maxAmount : 10000000,
      selected: selected,
    };
    Axios.post(
      "/nft/user-nft-marketplace-true-all-collection-on-sale-1?page=" +
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

  const getNftList = () => {
    setScreenLoading(true);
    Axios.get("/nft/user-nft", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        
        if (response.data.status == "success") {
          let nftList = response.data.data;

          let filteredNftList = nftList.filter(
            (data) => data.onMarketplace == true
          );
          
          setFilteredNft(filteredNftList);
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
              sellingType: "All",
              duration: "",
              onMarketplace: false,
              tokenId: data.tokenId,
              nftPrice: data.bidInfo[0].bidPrice,
              history: {
                owner: walletAddress,
                price: data.bidInfo[0].bidPrice,
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
            creator: data.bidInfo[0].bidder,
            sellingType: "All",
            duration: "",
            onMarketplace: false,
            tokenId: data.tokenId,
            nftPrice: data.bidInfo[0].bidPrice,
            history: {
              owner: walletAddress,
              price: data.bidInfo[0].bidPrice,
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

  // const declineBid = async (data) => {
  //   setLoading(true);
  //   const accountName = walletAddress;
  //   const publicKey = accountName.slice(2, accountName.length);
    
    
  //   const guard = { keys: [publicKey], pred: "keys-all" };
  //   const tokenId2 = data.tokenId;

  //   const a = accountName;

  //   // id:string buyer:string amount:decimal bid_days:integer
  //   const pactCode = `(free.marketplacefinal002.decline-bid ${JSON.stringify(
  //     tokenId2
  //   )})`;

  //   if (walletName == "Zelcore" || walletName == "Chainweaver") {
  //     const signCmd = {
  //       pactCode: pactCode,
  //       caps: [],
  //       sender: a,
  //       gasLimit: 150000,
  //       chainId: CHAIN_ID,
  //       ttl: 28800,
  //       envData: {
  //         "demothreeaccount-keyset": guard,
  //       },
  //     };
      
  //     const cmd = await Pact.wallet.sign(signCmd);
  //     if (cmd === undefined) {
  //       toast.error("User cancelled request", {
  //         position: "top-right",
  //       });
  //       setLoading(false);
  //       return;
  //     }
      
  //     const localRes = await fetch(`${API_HOST}/api/v1/local`, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       method: "POST",
  //       body: JSON.stringify(cmd),
  //     });
      
  //     const rawRes = await localRes;
  //     const resJSON = await rawRes.json();
      
  //     if (resJSON.result.status === "success") {
  //       const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST);

        
  //       const signedtxx = await Pact.fetch.listen(
  //         { listen: reqKey.requestKeys[0] },
  //         API_HOST
  //       );
        
  //       if (signedtxx.result.status == "success") {
  //         const obj = {
  //           onAuction: true,
  //           _id: data._id,
  //           bidPrice: "",
  //           bidder: "",
  //           history: {
  //             owner: walletAddress,
  //             price: data.nftPrice,
  //             category: "rejectBid",
  //           },
  //         };
          
  //         const accessJWT = localStorage.getItem("accessJWT");
  //         const config = {
  //           headers: {
  //             Authorization: accessJWT,
  //           },
  //         };
  //         Axios.patch("/nft/update-nft", obj, config)
  //           .then((response) => {
              
  //             if (response.data.status == "success") {
  //               toast.success("NFT Bid Declined");
  //               setRefresh(!refresh);
  //               setLoading(false);
  //             } else {
                
  //               toast.error("NFt bid not declined");
  //               setLoading(false);
  //             }
  //           })
  //           .catch((error) => {
              
  //             toast.error("NFt bid not declined");
  //             setLoading(false);
  //           });
  //       } else {
  //         toast.error("NFt bid not declined");
  //         setLoading(false);
  //       }
  //     } else {
  //       toast.error("NFt bid not declined");
  //       setLoading(false);
  //     }
  //   }

  //   if (walletName == "Xwallet") {
  //     const XWalletRequest = {
  //       networkId: NETWORK_ID,
  //       signingCmd: {
  //         sender: a,
  //         chainId: CHAIN_ID,
  //         gasPrice: 0.0000001,
  //         gasLimit: 150000,
  //         ttl: 28000,
  //         caps: [],
  //         envData: {
  //           guard: guard,
  //         },
  //         pactCode: pactCode,
  //         networkId: NETWORK_ID,
  //         signingPubKey: publicKey,
  //         creationTime: creationTime(),
  //       }, //alert to sign tx
  //     };

  //     // 18.87350
      
  //     const cmd = await window.kadena.request({
  //       method: "kda_requestSign",
  //       networkId: NETWORK_ID,
  //       data: XWalletRequest,
  //     });
      
  //     if (cmd.status === "success") {
        
  //       const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
  //       // setSpinner("true");
        
  //       const txResult = await Pact.fetch.listen(
  //         { listen: `${gore2.requestKeys[0]}` },
  //         API_HOST
  //       );

        
  //       if (txResult.result.status == "success") {
  //         const obj = {
  //           onAuction: true,
  //           _id: data._id,
  //           bidPrice: "",
  //           bidder: "",
  //           history: {
  //             owner: walletAddress,
  //             price: data.nftPrice,
  //             category: "rejectBid",
  //           },
  //         };
          
  //         const accessJWT = localStorage.getItem("accessJWT");
  //         const config = {
  //           headers: {
  //             Authorization: accessJWT,
  //           },
  //         };
  //         Axios.patch("/nft/update-nft", obj, config)
  //           .then((response) => {
              
  //             if (response.data.status == "success") {
  //               toast.success("NFT Bid Declined");
  //               setRefresh(!refresh);
  //               setLoading(false);
  //             } else {
                
  //               toast.error("NFt bid not declined");
  //               setLoading(false);
  //             }
  //           })
  //           .catch((error) => {
              
  //             toast.error("NFT bid not declined");
  //             setLoading(false);
  //           });
  //       } else {
  //         toast.error("NFt bid not declined");
  //         setLoading(false);
  //       }
  //     }
  //   } else {
  //     toast.error("NFt bid not declined");
  //     setLoading(false);
  //   }
  // };

  const declineBid = async (data) => {
    setLoading(true);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2);
  
    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId2 = data.tokenId;
    const a = accountName;
  
    const pactCode = `(free.marketplacefinal002.decline-bid ${JSON.stringify(tokenId2)})`;
  
    try {
      let cmd, txResult;
  
      if (walletName === "Zelcore" || walletName === "Chainweaver") {
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
  
        cmd = await Pact.wallet.sign(signCmd);
        if (cmd === undefined) {
          throw new Error("User cancelled request");
        }
      } else if (walletName === "Xwallet") {
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
          },
        };
  
        const xWalletCmd = await window.kadena.request({
          method: "kda_requestSign",
          networkId: NETWORK_ID,
          data: XWalletRequest,
        });
  
        if (xWalletCmd.status === "success") {
          cmd = xWalletCmd.signedCmd;
        } else {
          throw new Error("Xwallet command failed");
        }
      } else {
        throw new Error("Unsupported wallet");
      }
  
      const sendCmd = await Pact.wallet.sendSigned(cmd, API_HOST);
      txResult = await Pact.fetch.listen({ listen: sendCmd.requestKeys[0] }, API_HOST);
  
      if (txResult.result.status === "success") {
        const obj = {
          onAuction: true,
          onMarketplace: true,
          nftPrice:data.nftPrice,
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
        const config = { headers: { Authorization: accessJWT } };
  
        await Axios.patch("/nft/update-nft", obj, config);
        toast.success("NFT Bid Declined");
        setRefresh(!refresh);
      } else {
        throw new Error("NFT bid not declined");
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
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
            nftPrice:data.nftPrice,
            onMarketplace: false,
            _id: data._id,
            imageIndex: data.imageIndex,
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
            onMarketplace: false,
            imageIndex: data.imageIndex,
            nftPrice:data.nftPrice,
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
              imageIndex: data.imageIndex,
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
                    type="text"
                    name="search"
                    id="exampleSearch"
                    placeholder="Search for items"
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
          />{" "}
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
          </div>
          <div className="nftList">
            <ul>
              {filteredNft.length ? (
                filteredNft
                  //.filter((data) => {
                  //if (activeTab == "1") {
                  //return data.onSale == true;
                  //} else if (activeTab == "2") {
                  //return data.onAuction == true;
                  //}
                  //})
                  .map((data) => {
                    return (
                      <li key={data._id}>
                        <div
                          className="featItemBx"
                          onMouseOver={() => {
                            setHover(true);
                            setUserId(data._id);
                          }}
                          onMouseLeave={() => {
                            setHover(false);
                            // setUserId("");
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
                                  // src={data.tokenImage}
                                  src={data?.fileImageUrl ? data?.fileImageUrl : data?.tokenImage ? data?.tokenImage : ""}
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
                                        onClick={() => {
                                          acceptLastBid(data);
                                        }}
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        Accept Bid
                                      </Button>
                                      &nbsp;
                                      &nbsp;

                                      <Button
                                        className="btn-reject-bid"
                                        onClick={() => {
                                          declineBid(data);
                                        }}
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
                                        }}
                                      >
                                        Reject Bid
                                      </Button>
                                      &nbsp;
                                      &nbsp;

                                      <Button
                                        className="btn-cancel-bid"
                                        onClick={() => {
                                          cancelBid(data);
                                        }}
                                        style={{
                                          backgroundColor: "#666",
                                          color: "#fff",
                                          width: "100%",
                                          height: "50px",
                                          borderRadius: "10px",
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
                                {data.fileName  ? data.fileName : data?.collectionName} <HiCheckCircle />
                                </small>
                                <span className="bold">
                                  {/* {data.collectionName} #{data.imageIndex} */}
                                  {data.fileName  ? data.fileName : data?.collectionName} {data?.fileName ? "" : "#" + data?.imageIndex}
                                </span>
                              </div>
                              <div className="featpriceOut">
                                <div className="featprice">
                                  <small>From</small>
                                  <span className="bold">
                                    {data.onAuction
                                      ? "Open For Bids"
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
      </div>
    </>
  );
};

export default NftTabs1;
