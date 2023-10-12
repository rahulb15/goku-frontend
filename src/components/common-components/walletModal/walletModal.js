import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Axios from "axios";
import Pact from "pact-lang-api";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { Button, FormGroup, Input, Modal, ModalBody } from "reactstrap";
import { userLogin } from "../../../api/userApi";
import Chainweaver from "../../../assets/chainweaver-logo.png";
import Walletconnect from "../../../assets/walletConnect-logo.jpg";
import Xwallet from "../../../assets/xwallet.svg";
import Zeclore from "../../../assets/zeclore-icon.png";
import { walletStatusUpdate } from "../../pages/home/connect-wallet-popup/connectWalletAction";
import { userRegisterSuccess } from "../../pages/home/connect-wallet-popup/connectWalletSlice";
import {
  loginFail,
  loginSuccess,
} from "../../pages/home/connect-wallet-popup/loginSlice";

export const WalletModal = (props) => {
  const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
  const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;

  const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;

  const [userRegistered, setUserRegistered] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal, setModal] = useState(false);
  const [walletAdd, setWalletAdd] = useState("");

  const dispatch = useDispatch();

  const toggle3 = () => {
    setModal3(!modal3);
  };

  const connectChainweaver = () => {
    props.setModal(!props.modal);
    toggle3();
  };

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
    } else {
      toast.error("Account not found in the preferred chain", {
        position: "top-right",
      });

      return;
    }
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "walletAdd":
        setWalletAdd(value);
        break;

      default:
        break;
    }
  };

  const isXWalletInstalled = () => {
    const { kadena } = window;
    return Boolean(kadena && kadena.isKadena);
  };
  const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
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
        } else {
          setUserRegistered(false);
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

      // 

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
      props.setModal(!props.modal);
      checkUserRegisteration();
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
          // checkUserRegisteration()
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
  return (
    <div>
      <Modal isOpen={props.modal} toggle={props.toggle} className="modlOuterBx">
        <Button onClick={props.toggle} className="popclose">
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
              <span>
                <button>
                  <img src={Zeclore} alt="" onClick={connectWallet} />
                  <strong>Zelcore</strong>
                </button>
              </span>
              <span>
                <button>
                  <img
                    src={Walletconnect}
                    alt=""
                    onClick={connectWalletConnect}
                  />
                  <strong>Wallet Connect</strong>
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
    </div>
  );
};
