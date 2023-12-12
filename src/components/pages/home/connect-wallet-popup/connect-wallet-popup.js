import Axios from "axios";
import Pact from "pact-lang-api";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import Chainweaver from "../../../../assets/chainweaver-logo.png";
import Walletconnect from "../../../../assets/walletConnect-logo.jpg";
import Xwallet from "../../../../assets/xwallet.svg";
import Zeclore from "../../../../assets/zeclore-icon.png";
//import NodeWalletConnect from "@walletconnect/node";
//import WalletConnectQRCodeModal from "@walletconnect/qrcode-modal";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import { useDispatch, useSelector } from "react-redux";
import { walletStatusUpdate } from "./connectWalletAction";
//import walletContext from "./walletContext";
import { userLogin } from "../../../../api/userApi";
import { loginFail, loginSuccess, logout } from "./loginSlice";
//import { MdKeyboardArrowDown } from "react-icons/md";
import { FaWallet } from "react-icons/fa";
import { Card, CardBody, Collapse } from "reactstrap";
//import { removeDbPass } from "../../../../api/passApi";
//import { FaCopy } from 'react-icons/fa'
import { userRegisterSuccess } from "./connectWalletSlice";
// import { NavLink } from 'react-router-dom';

const ConnectPopup = () => {
  const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

  const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [walletConnected, setWalletConnected] = useState(false);
  // const [walletAddress, setWalletAddress] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [balance, setBalance] = useState("");
  const [walletValue, setWalletValue] = useState("Register");
  const [collapse, setCollapse] = useState(false);
  const [updateMessage, setUpdatedMessage] = useState(false);
  const [walletAdd, setWalletAdd] = useState("");
  const [errorWC, setError] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [emailError, setEmailError] = useState("");
  const dispatch = useDispatch();
  const [tooltipOpen, setTooltipOpen] = React.useState(false); 

  const { walletStatus, walletAddress, walletName } = useSelector(
    (state) => state.walletStatus
  );
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name == "email") {
      //validate email
      // const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      // if (!emailRegex.test(value)) {
      //   // toast.error("Please enter a valid email address", {
      //   //   position: "top-right"
      //   // })
      //   return;
      // }
    }

    switch (name) {
      case "firstName":
        setFirstName(value);
        if (value != "") {
          setEmailError("");
        }
        break;

      case "email":
        const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        setEmail(value.toLowerCase());
        if (!emailRegex.test(value)) {
          setEmailError("Please enter a valid email address");
          return;
        } else {
          setEmailError("");
        }

        break;

      case "walletAdd":
        setWalletAdd(value);
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    checkUserRegisteration();
    checkConnection2();
  }, [refresh]);

  // useEffect(()=>{
  //   if(modal){

  //     checkConnection()

  //   }
  // },[modal])

  useEffect(() => {
    setTimeout(() => {
      setUpdatedMessage("");
    }, 3000);
  }, [updateMessage]);

  const disconnect = async () => {
    if (walletName == "Chainweaver") {
      localStorage.removeItem("chainWeaverWalletAdd");
      dispatch(
        walletStatusUpdate({
          walletStatus: "false",
          walletName: " ",
          walletAddress: "",
        })
      );
      dispatch(userRegisterSuccess({ firstName: "", email: "" }));
      if (
        window.location.href ==
        `${process.env.REACT_APP_URL}marketplace/create-owned`
      ) {
        navigate("/");
      }
    }
    if (walletName == "Zelcore") {
      localStorage.removeItem("zelcorewalletadd");
      dispatch(
        walletStatusUpdate({
          walletStatus: "false",
          walletName: " ",
          walletAddress: "",
        })
      );
      dispatch(userRegisterSuccess({ firstName: "", email: "" }));
      if (
        window.location.href ==
        `${process.env.REACT_APP_URL}marketplace/create-owned`
      ) {
        navigate("/");
      }
    }
    if (walletName == "Xwallet") {
      // const checkNetwork= await window.kadena.request({
      //   method: 'kda_getNetwork',
      // });
      // if(checkNetwork.name=="Mainnet"){

      const disconnects = await window.kadena.request({
        method: "kda_disconnect",
        networkId: "testnet04",
      });
      dispatch(
        walletStatusUpdate({
          walletStatus: "false",
          walletName: " ",
          walletAddress: "",
        })
      );
      dispatch(userRegisterSuccess({ firstName: "", email: "" }));
      setCollapse(false);
      if (
        window.location.href ==
        `${process.env.REACT_APP_URL}marketplace/create-owned`
      ) {
        navigate("/");
      }
    }
    dispatch(logout());
    localStorage.removeItem("accessJWT");

    //   if(checkNetwork.name=="Testnet"){

    //    const disconnects= await window.kadena.request({
    //         method: 'kda_disconnect',
    //         networkId: 'testnet04',

    //       });
    //       dispatch(walletStatusUpdate({walletStatus:"false",walletName:" ",walletAddress:""}))
    // setCollapse(false)
    //       
    // if( window.location.href==`${process.env.REACT_APP_URL}marketplace/create-owned`){
    //   navigate("/")
    // }

    //     }
  };

  const checkConnection2 = async () => {
    try {
      const checkNetwork = await window.kadena.request({
        method: "kda_getNetwork",
      });
      if (checkNetwork.name == "Testnet") {
        var checkConnection = await window.kadena.request({
          method: "kda_checkStatus",
          networkId: "testnet04",
        });
        if (checkConnection.status == "fail") {
          setWalletConnected(false);
          // setWalletAddress("")
        }

        if (checkConnection.status == "success") {
          var getBalance = await window.kadena.request({
            method: "kda_requestAccount",
            networkId: "testnet04",
          });
          setBalance(getBalance.wallet.balance);
          setWalletConnected(true);
          // setWalletAddress(checkConnection.account.account)
        }
      }

      if (checkNetwork.name == "Mainnet") {
        var checkConnection = await window.kadena.request({
          method: "kda_checkStatus",
          networkId: "mainnet01",
        });
        if (checkConnection.status == "fail") {
          setWalletConnected(false);
          // setWalletAddress("")
        }

        if (checkConnection.status == "success") {
          var getBalance = await window.kadena.request({
            method: "kda_requestAccount",
            networkId: "mainnet01",
          });
          setBalance(getBalance.wallet.balance);
          setWalletConnected(true);
          // setWalletAddress(checkConnection.account.account)
        }
      }
      const chainweaverAdd = localStorage.getItem("chainWeaverWalletAdd");
    } catch (e) {
      console.error(e);
    }
  };

  // const checkConnection=async()=>{
  //   try{
  //     
  //   var checkConnection=  await window.kadena.request({
  //     method: 'kda_checkStatus',
  //     networkId: "testnet04",
  //   });
  //   
  //   if(checkConnection.status=="fail"){
  //     
  //     setWalletConnected(false)
  //     setWalletAddress("")
  //   }

  //   if(checkConnection.status=="success"){

  //     setWalletConnected(true)
  //     setWalletAddress(checkConnection.account.account)
  //   }

  // }
  // catch(e){
  //   console.error(e);
  // }
  // }

  const toggle2 = () => {
    setRefresh(!refresh);
    //   setModal2(!modal2)
    //  setCollapse(!collapse)
  };

  const userRegisteration = () => {
    const params = {
      name: firstName,
      email: email,
    };
    //email regex
    const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Please enter a valid email address", {
        position: "top-right",
      });
      return;
    }
    Axios.patch("/user/updateUser", params, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        const {
          data: { data },
        } = response;
        setUpdatedMessage(response.data.message);
        checkUserRegisteration();
        dispatch(userRegisterSuccess({ firstName, email }));
        window.location.href = `${process.env.REACT_APP_URL}marketplace/profile-setting`;
        // navigate("/marketplace/create-owned");
        // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
        //     position: "top-right"
        // })
        // setMessage(data.message);
        // setEmail("");
        // setEnquiryTitle("");
        // setBokkingId("");
        // setEnquiry("");s
      })
      .catch((error) => {
        //setLoading(false);
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const isXWalletInstalled = () => {
    const { kadena } = window;
    return Boolean(kadena && kadena.isKadena);
  };

  const handleChange = (e) => {
    setWalletValue(e.target.value);
  };
  const connectWallet = async () => {
    //https://api.testnet.chainweb.com/chainweb/0.0/"testnet04"/chain/"1"/pact
    const host = "http://127.0.0.1:9467/v1/accounts";
    try {
      toast.success("Please select an account in Zelcore app", {
        position: "top-right",
      });
      const res = await fetch(host, {
        method: "POST",

        body: JSON.stringify({
          asset: "kadena",
        }),
      });

      const res2 = await res.json();

      if (res2.data == "User cancelled request") {
        toast.error(res2.data, {
          position: "top-right",
        });
        return;
      }

      let data = await Pact.fetch.local(
        {
          pactCode: `(coin.details ${JSON.stringify(res2.data[0])})`,
          meta: Pact.lang.mkMeta("", "1", 0.01111, 3000, creationTime(), 600),
        },
        API_HOST
      );

      if (data.result.status === "failure") {
        toast.error("Account not found in the preferred chain", {
          position: "top-right",
        });
        return;
      }

      const isAuth = await userLogin({ walletAddress: res2.data[0] });
      if (isAuth.status === "error") {
        return dispatch(loginFail(isAuth.message));
      }
      dispatch(loginSuccess());
      dispatch(
        walletStatusUpdate({
          walletStatus: "true",
          walletName: "Zelcore",
          walletAddress: res2.data[0],
        })
      );
      localStorage.setItem("zelcorewalletadd", res2.data[0]);
      setModal(!modal);
      checkUserRegisteration();
      window.location.reload();

      //
    } catch (e) {
      e.message.includes("Failed to fetch")
        ? toast.error("Please open and login to Zelcore", {
            position: "top-right",
          })
        : toast.error(e.message, {
            position: "top-right",
          });
    }

    // return await res.json()
  };

  const checkUserRegisteration = () => {
    Axios.get("/user/checkUser", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          const firstName = response.data.userName;
          const email = response.data.userEmail;
          setUserRegistered(true);
          dispatch(userRegisterSuccess({ firstName, email }));
          // navigate("/marketplace/create-owned");
        } else {
          setUserRegistered(false);
          setModal2(!modal2);
          setCollapse(!collapse);
        }
        // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
        //     position: "top-right"
        // })
        // setMessage(data.message);
        // setEmail("");
        // setEnquiryTitle("");
        // setBokkingId("");
        // setEnquiry("");s
      })
      .catch((error) => {
        setUserRegistered(false);
        
        //setLoading(false);
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  const checkXWallet = async () => {
    if (isXWalletInstalled()) {
      setModal(!modal);

      // const checkStat=window.kadena.request({
      //   method: 'kda_checkStatus',
      //   networkId: NETWORKID,
      // });

      const checkNetwork = await window.kadena.request({
        method: "kda_getNetwork",
      });

      // if  (checkNetwork.id!="8"){
      //   toast.error("Invalid Chain", {
      //     position: "top-right"

      // });

      // }

      if (checkNetwork.name == "Testnet") {
        // toast.error("Network Invalid", {
        //   position: "top-right"

        // });
        // const checkStat=await window.kadena.request({
        //   method: 'kda_checkStatus',
        //   networkId: "testnet04",
        // });

        // if(checkStat.message=="Not connected"){
        const staat = await window.kadena.request({
          method: "kda_connect",
          networkId: "testnet04",
        });
        // afterConnection()

        const checkStat2 = await window.kadena.request({
          method: "kda_checkStatus",
          networkId: "testnet04",
        });

        if (checkStat2.status == "success") {
          const isAuth = await userLogin({
            walletAddress: checkStat2.account.account,
          });
          if (isAuth.status === "error") {
            return dispatch(loginFail(isAuth.message));
          }
          dispatch(loginSuccess());
          dispatch(
            walletStatusUpdate({
              walletStatus: "true",
              walletName: "Xwallet",
              walletAddress: checkStat2.account.account,
            })
          );
          checkUserRegisteration();
          window.location.reload();
        } else {
          toast.error("Please Reconnect Wallet", {
            position: "top-right",
          });
        }

        return;
      }

      // if (checkNetwork.name == "Mainnet") {
      //   const checkStat = await window.kadena.request({
      //     method: 'kda_checkStatus',
      //     networkId: "mainnet01",
      //   });

      //   

      //   if (checkStat.message == "Not connected") {
      //     const connectXwallet = await window.kadena.request({
      //       method: 'kda_connect',
      //       networkId: "mainnet01",
      //     });
      //     
      //     let data = await Pact.fetch.local(
      //       {
      //         pactCode: `(coin.details ${JSON.stringify(connectXwallet.account.account)})`,
      //         meta: Pact.lang.mkMeta(
      //           "",
      //           "1",
      //           0.01111,
      //           3000,
      //           creationTime(),
      //           600,
      //         ),
      //       },
      //       `https://api.chainweb.com/chainweb/0.0/${process.env.REACT_APP_NETWORK_ID}/chain/${process.env.REACT_APP_CHAIN_ID}/pact`,
      //     );

      //     
      //     if (data.result.status === "success") {
      //       const checkStat2 = await window.kadena.request({
      //         method: 'kda_checkStatus',
      //         networkId: "mainnet01",
      //       });
      //       
      //       if (checkStat2.status == "success") {

      //         const isAuth = await userLogin({ walletAddress: checkStat2.account.account });
      //         
      //         if (isAuth.status === 'error') {
      //           return dispatch(loginFail(isAuth.message));
      //         }
      //         dispatch(loginSuccess());
      //         dispatch(walletStatusUpdate({ walletStatus: "true", walletName: "Xwallet", walletAddress: checkStat2.account.account }))
      //         checkUserRegisteration()
      //       }
      //     } else {
      //       const discon = await window.kadena.request({
      //         method: 'kda_disconnect',
      //         networkId: 'mainnet01 ',
      //       });

      //       toast.error("Account not found in the preferred chain", {
      //         position: "top-right"

      //       });

      //       return
      //     }

      //   }

      // }
    }

    if (!isXWalletInstalled()) {
      toast.error("Wallet not Installed", {
        position: "top-right",
      });
    }
  };

  const getDropdown = () => {
    setCollapse(!collapse);
  };

  const connectWalletConnect = () => {
    // const walletConnector = new NodeWalletConnect(
    //   {
    //     bridge: "https://bridge.walletconnect.org", // Required
    //   },
    //   {
    //     clientMeta: {
    //       description: "WalletConnect NodeJS Client",
    //       url: "https://nodejs.org/en/",
    //       icons: ["https://nodejs.org/static/images/logo.svg"],
    //       name: "WalletConnect",
    //     },
    //   }
    // );

    // 

    // // Check if connection is already established
    // if (!walletConnector.connected) {
    //   // create new session
    //   walletConnector.createSession().then(() => {
    //     // get uri for QR Code modal
    //     const uri = walletConnector.uri;
    //     
    //     // display QR Code modal
    //     WalletConnectQRCodeModal.open(
    //       uri,

    //       true // isNode = true
    //     );
    //   });
    // }

    // walletConnector.on("connect", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }

    //   // Close QR Code Modal
    //   WalletConnectQRCodeModal.close(
    //     true // isNode = true
    //   );

    //   // Get provided accounts and chainId
    //   const { accounts, chainId } = payload.params[0];
    //   
    // });

    // walletConnector.on("session_update", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }

    //   // Get updated accounts and chainId
    //   const { accounts, chainId } = payload.params[0];
    // });

    // walletConnector.on("disconnect", (error, payload) => {
    //   if (error) {
    //     throw error;
    //   }});

    // Create a connector

    const connector = new WalletConnect({
      bridge: "https://bridge.walletconnect.org", // Required
      qrcodeModal: QRCodeModal,
    });

    // Check if connection is already established
    if (!connector.connected) {
      // create new session
      connector.createSession();
    }

    connector.on("connect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("session_update", (error, payload) => {
      if (error) {
        throw error;
      }

      // Get updated accounts and chainId
      const { accounts, chainId } = payload.params[0];
    });

    connector.on("disconnect", (error, payload) => {
      if (error) {
        throw error;
      }

      // Delete connector
    });
  };

  const connectChainweaver = () => {
    setModal(!modal);
    toggle3();
  };

  // useEffect(()=>{
  //   if(errorWC){
  //   toast.error(errorWC, {
  //     position: "top-right"

  //   });
  // }
  // },[errorWC])

  const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;

  const walletAddressChain = async () => {
    if (!walletAdd) {
      toast.error("Account name can't be empty", {
        position: "top-right",
      });
      return;
    }

    if (!walletAdd.includes("k:")) {
      toast.error("Only k: accounts are allowed", {
        position: "top-right",
      });

      return;
    }

    let data = await Pact.fetch.local(
      {
        pactCode: `(coin.details ${JSON.stringify(walletAdd)})`,
        meta: Pact.lang.mkMeta("", "1", 0.01111, 3000, creationTime(), 600),
      },
      API_HOST
    );

    if (data.result.status === "success") {
      const isAuth = await userLogin({ walletAddress: walletAdd });
      if (isAuth.status === "error") {
        return dispatch(loginFail(isAuth.message));
      }
      dispatch(loginSuccess());
      dispatch(
        walletStatusUpdate({
          walletStatus: "true",
          walletName: "Chainweaver",
          walletAddress: walletAdd,
        })
      );
      localStorage.setItem("chainWeaverWalletAdd", walletAdd);
      setModal3(!modal3);
      checkUserRegisteration();
      // window.location.reload();
    } else {
      toast.error("Account not found in the preferred chain", {
        position: "top-right",
      });

      return;
    }
  };

  const toggle3 = () => {
    setModal3(!modal3);
  };
  const onExited = () => {
    setCollapse(false);
  };
  // const onExiting = () => {
  //   setCollapse(true);
  // };
  return (
    <div>
      {/* {(balance!=='' && window.location.href=="http://localhost:3000/launchpad")?<div><Button className='dis_connectBtn'  style={{  whiteSpace: "nowrap", overflow:"hidden",textOverflow: "ellipsis"} } onClick={getDropdown}><FaWallet />{balance} Bal <i><MdKeyboardArrowDown /></i> </Button> <Collapse isOpen={collapse}>
          <Card>
            <CardBody>
              <ul className='connectList'>
                <li><a  onClick={toggle2}>Profile</a></li>
                <li><a  onClick={toggle2}>Favorites</a></li>
                <li><a  onClick={toggle2}>Watchlist</a></li>
                <li><a  onClick={toggle2}>Collections</a></li>
                <li><a  onClick={toggle2}>Settings</a></li>
                <li><a onClick={disconnect} >Logout</a></li>
              </ul> */}
      {/* <Button onClick={disconnect}>Disconnect</Button> */}
      {/* </CardBody>
          </Card>
        </Collapse></div>: */}
      {walletAddress != "" ? (
        <div>
          {/* <div className="dis_connectBtnBox"> */}
          {/* <FaWallet style={{marginLeft:'10px'}} /> */}
          <Button
            className="dis_connectBtn"
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
            onClick={getDropdown}
          >
            <FaWallet />
            {walletAddress}{" "}
            {/* <i>
              <MdKeyboardArrowDown />
            </i> */}{" "}
          </Button>{" "}
          {/* </div> */}
          <Collapse isOpen={collapse}>
            <Card>
              <CardBody>
                <ul className="connectList">
                  {/* {userRegistered?<li><a href="/marketplace/create-owned">Profile</a></li>:<li><a  onClick={toggle2}>Profile</a></li>} */}
                  {userRegistered ? (
                    <>
                      <li>
                        <Link
                          to="/marketplace/my-profile-owned"
                          className="bold"
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link
                          to="/marketplace/my-profile-owned?tab=Favorites"
                          className="bold"
                        >
                          Favorites
                        </Link>
                      </li>
                      <li>
                        <a href="" className="bold">
                          Watchlist
                        </a>
                      </li>
                      <li>
                        {" "}
                        <Link
                          to="/marketplace/my-profile-owned?tab=Collections"
                          className="bold"
                        >
                          Collections
                        </Link>
                      </li>
                      <li>
                        <Link to="/marketplace/profile-setting" className="bold">
                          Settings
                        </Link>
                      </li>
                    </>
                  ) : // <li>
                  //   <a onClick={toggle2}>Profile</a>
                  // </li>
                  null}
                  <li>
                    <a onClick={disconnect}>Logout</a>
                  </li>
                </ul>
                {/* <Button onClick={disconnect}>Disconnect</Button> */}
              </CardBody>
            </Card>
          </Collapse>
        </div>
      ) : (
        <Button className="connectBtn" onClick={toggle}>
          Connect Wallet
        </Button>
      )}
      {/* {walletStatus=="true" ?<Button className='connectBtn'  style={{  whiteSpace: "nowrap", overflow:"hidden",textOverflow: "ellipsis"}}>{walletAddress} </Button> :<Button className='connectBtn' onClick={toggle}>Connect</Button>} */}

      <Modal isOpen={modal} toggle={toggle} className="modlOuterBx">
        <Button onClick={toggle} className="popclose">
          X
        </Button>
        <ModalBody className="modelOuter">
          <div className="connectWalletBody">
            <h2>Connect To Wallet</h2>
            <div className="walletIcon">
              <span>
                <button onClick={checkXWallet}>
                  <img src={Xwallet} alt="" />
                  <strong>eckoWALLET</strong>
                </button>
              </span>
              <span className="walletConnectDisable" onMouseOver={() => setTooltipOpen(true)} onMouseLeave={() => setTooltipOpen(false)}>
                <button onClick={connectWallet} disabled={true}>
                  <img src={Zeclore} alt="" style={{ opacity: "0.5" }} />
                  {/* <strong>Zelcore</strong> */}
                  {tooltipOpen ? ( <strong style={{color: "black"}}>Coming Soon</strong>) : ( <strong>Zelcore</strong>)}
                </button>
              </span>
              <span className="walletConnectDisable" onMouseOver={() => setTooltipOpen(true)} onMouseLeave={() => setTooltipOpen(false)}>
                <button onClick={connectWalletConnect} disabled={true}>
                  <img src={Walletconnect} alt="" style={{ opacity: "0.5" }} />
                  {/* <strong>Wallet Connect</strong> */}
                    {tooltipOpen ? ( <strong style={{color: "black"}}>Coming Soon</strong>) : ( <strong>Wallet Connect</strong>)}
                </button>
              </span>

              <span>
                <button onClick={connectChainweaver}>
                  <img src={Chainweaver} alt="" />
                  <strong>Chainweaver</strong>
                </button>
              </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
      <Modal isOpen={modal3} toggle={toggle3} className="regModlBx">
        <Button onClick={toggle3} className="popclose">
          X
        </Button>
        <ModalBody className="regmodlOuter">
          <h2>Connect Chainweaver</h2>

          <h5>
            Please enter an account and make sure that it is linked in
            chainweaver.
          </h5>
          <FormGroup>
            <Input
              type="text"
              name="walletAdd"
              value={walletAdd}
              onChange={handleOnChange}
              className="regInp"
              placeholder="k:accounts"
            />
          </FormGroup>

          <Button className="regBtn" onClick={walletAddressChain}>
            Connect
          </Button>
          {/* {updateMessage?<div style={{marginTop: "11px"}}>{updateMessage}</div>:null} */}
        </ModalBody>
      </Modal>

      <Modal isOpen={modal2} toggle={toggle2} className="regModlBx">
        <Button onClick={toggle2} className="popclose">
          X
        </Button>
        <ModalBody className="regmodlOuter">
          <h2>You need to Register First</h2>
          <FormGroup>
            <Input
              type="text"
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              className="regInp"
              placeholder="Name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="regInp"
              placeholder="Email Address"
            />
          </FormGroup>
          {emailError ? (
            <div style={{ color: "red", marginTop: "-10px" }}>{emailError}</div>
          ) : null}
          <Button className="regBtn" onClick={userRegisteration}>
            Register
          </Button>
          {updateMessage ? (
            <div style={{ marginTop: "11px" }}>{updateMessage}</div>
          ) : null}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ConnectPopup;
