import React, { useContext, useEffect, useState } from "react";
// import {Button } from 'reactstrap';
import Axios from "axios";
//import LpDetImg1 from "../../../../assets/cooper_PosterImage.png";
//import LpDetImg2 from "../../../../assets/GIF-DBCooper.gif";
import WalletConnect from "@walletconnect/client";
import QRCodeModal from "@walletconnect/qrcode-modal";
import Pact from "pact-lang-api";
import Tooltip from "react-bootstrap/Tooltip";
import { BsGlobe, BsTelegram, BsTwitter } from "react-icons/bs";
import { FaDiscord } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  //ModalFooter,
  FormGroup,
  Input,
  Modal,
  //ModalHeader,
  ModalBody,
} from "reactstrap";
import { userLogin } from "../../../../api/userApi";
import { walletStatusUpdate } from "../../home/connect-wallet-popup/connectWalletAction";
import {
  loginFail,
  //loginPending,
  loginSuccess,
} from "../../home/connect-wallet-popup/loginSlice";
import walletContext from "../../home/connect-wallet-popup/walletContext";
import { upcomingProjects } from "../../launchpad/upcoming-projects/upcomingProjectList";
import LaunchRangeSlider from "./launch-range-slider";
//import ReactTooltip from "react-tooltip";
import { revealPriorityPassSuccess } from "./revealPassSlice";
// import Tooltip from "@material-ui/core/Tooltip";
import "semantic-ui-css/semantic.min.css";
//import { removePass, removeDbPass } from "../../../../api/passApi";
import { Button } from "semantic-ui-react";
import { fetchPriorityPass } from "./getPriorityPass.action";
import { fetchDbPass } from "./getdbcooper.action";
//import { mintSuccess, mintFail } from "./prioritypassSlice";
//import { dbcooperSuccess, dbcooperFail } from "./dbCooperSlice";
import { SpinnerCircular } from "spinners-react";
import Chainweaver from "../../../../assets/chainweaver-logo.png";
import Walletconnect from "../../../../assets/walletConnect-logo.jpg";
import Xwallet from "../../../../assets/xwallet.svg";
import Zeclore from "../../../../assets/zeclore-icon.png";
import { passDetailSuccess } from "./passDetailSlice";
// import { Tooltip, Whisper, Button, ButtonToolbar } from 'rsuite';
// import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
//import { applyPatches } from "immer";

const tooltip = (
  <Tooltip>
    This is a help <i>tooltip</i> .
  </Tooltip>
);
const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
// mainnet01
const GAS_PRICE = 0.01111;
const GAS_LIMIT = 150000;
const TTL = 28000;

const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
//testnet
// const pactCodePPtotalPass=`(free.policytest15.get-total-supply)`
// const pactCodePPtotalMint=`(free.policytest15.get-minted)`
// const pactCodeDBtotalPass=`(free.dbpolicytest10.get-total-supply)`
// const pactCodeDBtotalMint=`(free.dbpolicytest10.get-minted)`

//mainnet
const pactCodePPtotalPass = `(free.passfinalpolicy001.get-total-supply)`;
const pactCodePPtotalMint = `(free.passfinalpolicy001.get-minted)`;
const pactCodeDBtotalPass = `(free.dbcfinalpolicy002.get-total-supply)`;
const pactCodeDBtotalMint = `(free.dbcfinalpolicy002.get-minted)`;

// ${node}/chainweb/0.0/${networkId}/chain/${chainId}/pact
// `https://api.testnet.chainweb.com/chainweb/0.0/testnet04/chain/${chainId}/pact`;

const KPTWO = {
  publicKey: "fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934",
  secretKey: "a0c28907dce337e1d11042a4169615f5609be1204d847cdf68974f5c8a55df80",
};

const LaunchpadDetails = () => {
  const a = useContext(walletContext);
  const params = useParams();
  const dispatch = useDispatch();
  //useEffect(() => { localStorage. setItem('dataKey', JSON. stringify(data)); }, [data]);
  const [project, setProject] = useState({});

  useEffect(() => {
    getPassAll();
  }, []);

  const getPassAll = async () => {
    dispatch(fetchPriorityPass());
    dispatch(fetchDbPass());
    // const passno=await getAllPass()
    // const dbPassno=await getDbPass()
    // 
    // setPassNumber(passno.data.result[0].passNumber)
    // setDbPassNumber(dbPassno.data.result[0].passNumber)
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Simple tooltip
    </Tooltip>
  );

  const { walletStatus, walletName } = useSelector(
    (state) => state.walletStatus
  );

  const { revealPP, revealDb } = useSelector((state) => state.revealPassStatus);
  const { mintStatus, error } = useSelector(
    (state) => state.priorityMintStatus
  );
  const { dbcooperStatus, dbCoopererror } = useSelector(
    (state) => state.dbcooperMintStatus
  );

  const { passDetails } = useSelector((state) => state.passDetails);
  const [modal, setModal] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [spinner, setSpinner] = useState("false");
  const [walletAdd, setWalletAdd] = useState("");
  const [publicPass, setPublicPass] = useState(false);
  const [whiteList, setWhiteList] = useState(false);
  const [userRegistered, setUserRegistered] = useState(false);
  const[passPrice,setPassPrice]=useState(0)
  const[dbCooperPrice,setDbCooperPrice]=useState(0)
  const[dbCooperPriceWl,setDbCooperPriceWl]=useState(0)

  // const dbCooperPrice=
  // useEffect(() => {
  //   checkUserRegisteration()
  // }, [])

  const checkUserRegisteration = () => {
    Axios.get("/user/checkUser", {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        if (response.data.status == "success") {
          setUserRegistered(true);
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

  let price;
  console.log("pricePASSSSSSSS", price);
  const getPassPrice = async () => {
    // const accountName =
    //   "k:";
    // // const accountName = walletAddress;
    // const publicKey = accountName.slice(2, accountName.length);

    const signCmd = {
      pactCode: `(free.passfinalpolicy001.get-price)`,
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
      // setPrice(response.result.data)
      // price = response.result.data;
      setPassPrice(response.result.data);
    }
  };
  const getDbCooperPrice = async () => {
    // const accountName =
    //   "k:";
    // // const accountName = walletAddress;
    // const publicKey = accountName.slice(2, accountName.length);

    const signCmd = {
      pactCode: `(free.dbcfinalpolicy002.get-nft-price)`,
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
      // setPrice(response.result.data)
      // price = response.result.data;
      setDbCooperPrice(response.result.data);
    }
  };

  const getDbCooperPriceWl = async () => {
    // const accountName =
    //   "k:";
    // // const accountName = walletAddress;
    // const publicKey = accountName.slice(2, accountName.length);

    const signCmd = {
      pactCode: `(free.dbcfinalpolicy002.get-wl-price)`,
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
      // setPrice(response.result.data)
      // price = response.result.data;
      setDbCooperPriceWl(response.result.data);
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

  const connectChainweaver = () => {
    setModal(!modal);
    toggle3();
  };

  // const getaccountbalance=async()=>
  // {
  //   //const pactCode = `(coin.get-balance ${JSON.stringify("k:057644c6dc3da0b6e5c695508afd24198171577802fcaaa351ae77bc0f2244c1")})`
  //   const pactCode = `(coin.get-balance ${JSON.stringify("k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934")})`

  //     const cmdObj = {
  //         networkId: NETWORK_ID,
  //         keyPairs: KEY_PAIR,
  //         pactCode:pactCode,
  //         envData: {
  //           },
  //        meta: {
  //         creationTime: creationTime(),
  //         ttl: 28000,
  //         gasLimit: 150000,
  //         chainId: CHAIN_ID,
  //         gasPrice: 0.0000001,
  //         sender: "k:"+ KEY_PAIR.publicKey
  //       }

  //     }
  //     const result = await Pact.fetch.local(cmdObj, API_HOST);
  //     
  // }

  const isXWalletInstalled = () => {
    const { kadena } = window;
    return Boolean(kadena && kadena.isKadena);
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
      setModal(!modal);
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

  const savePass = (id) => {
    const params = {
      passName:
        project.projectName == "Priority Pass" ? "Priority Pass" : "DB Cooper",
      passRound: whiteList ? "Whitelist Round" : "Public Round",
      passCost:
        project.projectName == "Priority Pass"
          ? passPrice
          : whiteList
          ? dbCooperPriceWl
          : dbCooperPrice,
      revealed: "false",
      imageIndex: "",
      onMarketplace: "false",
      passTokenId: id,
      tokenId: id,
    };
    Axios.post("/passDetails/savePass", params, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        // setLoading(false)
        // const { data: { data } } = response;
        // toast.success("We have received your Enquiry and will get get back to you in next 24 hours", {
        //     position: "top-right"
        // })
        // setMessage(data.message);
        // setEmail("");
        // setEnquiryTitle("");
        // setBokkingId("");
        // setEnquiry("");
      })
      .catch((error) => {
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  const toggle = () => {
    setModal(!modal);
  };

  const getPassAllDetails = async () => {
    var priorityPassNumber = 0;
    var priorityPassMintedNumber = 0;
    var dbCooperTotalNumber = 0;
    var dbCooperMintedNumber = 0;

    const signCmd = {
      pactCode: pactCodePPtotalPass,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };

    const signCmd2 = {
      pactCode: pactCodePPtotalMint,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };

    const signCmd3 = {
      pactCode: pactCodeDBtotalPass,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };

    const signCmd4 = {
      pactCode: pactCodeDBtotalMint,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };

    const PNumber = await Pact.fetch.local(signCmd, API_HOST);
    const PMinted = await Pact.fetch.local(signCmd2, API_HOST);
    const DNumber = await Pact.fetch.local(signCmd3, API_HOST);
    const DMinted = await Pact.fetch.local(signCmd4, API_HOST);

    if (PNumber.result.status == "success") {
      priorityPassNumber = PNumber.result.data;
    } else {
      priorityPassNumber = "--";
    }

    if (PMinted.result.status == "success") {
      priorityPassMintedNumber = PMinted.result.data;
    } else {
      priorityPassMintedNumber = "--";
    }

    if (DNumber.result.status == "success") {
      dbCooperTotalNumber = DNumber.result.data;
    } else {
      dbCooperTotalNumber = "--";
    }
    if (DMinted.result.status == "success") {
      dbCooperMintedNumber = DMinted.result.data;
    } else {
      dbCooperMintedNumber = "--";
    }

    dispatch(
      passDetailSuccess({
        priorityPassNumber,
        priorityPassMintedNumber,
        dbCooperTotalNumber,
        dbCooperMintedNumber,
      })
    );
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

      //   if (checkStat.message == "Not connected") {
      //     const connectXwallet = await window.kadena.request({
      //       method: 'kda_connect',
      //       networkId: "mainnet01",
      //     });
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

      //     if (data.result.status === "success") {
      //       const checkStat2 = await window.kadena.request({
      //         method: 'kda_checkStatus',
      //         networkId: "mainnet01",
      //       });
      //       if (checkStat2.status == "success") {

      //         const isAuth = await userLogin({ walletAddress: checkStat2.account.account });
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

  const toggle3 = () => {
    setModal3(!modal3);
  };

  const mintPass2 = async () => {

    Axios.get("/user/checkServer")
      .then(async (response) => {
        if (response.data.status == "success") {
          if (walletName == "Xwallet") {
            const checkNetwork = await window.kadena.request({
              method: "kda_getNetwork",
            });

            var walletInfo;

            // if(checkNetwork.name=="Testnet"){

            walletInfo = await window.kadena.request({
              method: "kda_requestAccount",
              networkId: "testnet04",
            });

            //   const networkInfo= await window.kadena.request({
            //     method: 'kda_getNetwork',
            //   });

            //     const result = await Pact.fetch.local(signCmd4, API_HOST);

            // }

            const guard = {
              keys: [walletInfo.wallet.publicKey],
              pred: "keys-all",
            };

            // 52.63826
            // k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934
            // 2bf96bfc2cfeee85800aff1aa4a83eafe4cb5f81442713be8b64f293f31a5c7e
            const a = walletInfo.wallet.account;
            const b =
              "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
            const pactCode = `(free.passfinal001.mint-pass ${JSON.stringify(
              a
            )} (read-keyset "guard") 1.0 "pass3" 1)`;

            //  const pactCode = `(coin.get-balance ${JSON.stringify("k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934")})`
            const XWalletRequest = {
              networkId: NETWORK_ID,
              signingCmd: {
                sender: walletInfo.wallet.account,
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
                    "MERCH",
                    "Capability for owner",
                    "free.passfinal001.PASS"
                  ),
                  Pact.lang.mkCap(
                    "Transfer",
                    "Capability to allow coin transfer",
                    "coin.TRANSFER",
                    [a, b, passPrice]
                  ),
                  Pact.lang.mkCap(
                    "",
                    "Capability for owner",
                    "free.passfinal001.MINT-PASS",
                    [a, 1.0]
                  ),
                ],
                envData: {
                  guard: guard,
                },
                pactCode: pactCode,
                networkId: NETWORK_ID,
                signingPubKey: walletInfo.wallet.publicKey,
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
              const token_id = txResult.events[3].params[0];
              getPassAllDetails();

              savePass(token_id);
              toast.success("Minting has been Done", {
                position: "top-right",
              });
              dispatch(revealPriorityPassSuccess(true));
            }

            if (txResult.result.status == "failure") {
              toast.error("Minting Issue", {
                position: "top-right",
              });
            }
            setSpinner("false");
          }

          //  // const response = await Pact.fetch.send(cmdObj, API_HOST);
          //   const txResult = await Pact.fetch.listen({ listen: response.requestKeys[0] }, API_HOST);

          if (walletName == "Zelcore" || walletName == "Chainweaver") {
            const accountName =
              walletName == "Chainweaver"
                ? localStorage.getItem("chainWeaverWalletAdd")
                : localStorage.getItem("zelcorewalletadd");

            // const signCmd4 = {

            //   pactCode: `(free.passfinal001.mint-pass ${JSON.stringify(accountName)} (read-keyset "guard") 1.0 "pass2" 1)`,

            //   caps: [

            //     Pact.lang.mkCap("GAS","Capability to allow buying gas","coin.GAS",[]),
            //     Pact.lang.mkCap("MERCH","Capability for owner", "free.passfinal001.PASS"),
            //     Pact.lang.mkCap("Transfer","Capability to allow coin transfer","coin.TRANSFER",
            //        [a, b, 2.0]
            //      ),
            //    Pact.lang.mkCap("MINT-PASS","Capability for owner", "free.passfinal001.MINT-PASS",
            //         [a,1.0]),

            //   ],

            //   meta: {

            //     creationTime: creationTime(),

            //     gasLimit: 100000,

            //     chainId: CHAIN_ID,

            //     ttl: 28800,

            //     gasPrice: GAS_PRICE,

            //     sender: ''

            //   }
            // }

            // const result = await Pact.fetch.local(signCmd4, API_HOST);
            // //balncechecka
            // if (result.result.data <= 101) {

            //   toast.error("Low Balance", {
            //     position: "top-right"

            //   })

            //   return
            // }

            const publicKey = accountName.slice(2, accountName.length);
            const guard = { keys: [publicKey], pred: "keys-all" };

            // 52.63826
            // k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934
            // 2bf96bfc2cfeee85800aff1aa4a83eafe4cb5f81442713be8b64f293f31a5c7e
            const a = accountName;
            const b =
              "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
            const pactCode = `(free.passfinal001.mint-pass ${JSON.stringify(
              a
            )} (read-keyset "guard") 1.0 "pass3" 1)`;

            //  const pactCode=`(free.passtest10.mint-bulk-pass  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "pcol1" 1)`
            //  const pactCode = `(coin.get-balance ${JSON.stringify("k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934")})`
            const signCmd = {
              pactCode: pactCode,

              // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
              //testnet caps:[
              //   Pact.lang.mkCap(
              //     "GAS",
              //     "Capability to allow buying gas",
              //     "coin.GAS",
              //     []
              //   ),
              //   Pact.lang.mkCap("PRIVATE",
              //    "Capability for owner", "free.passtest15.PRIVATE"),
              //    Pact.lang.mkCap(
              //     "Transfer",
              //     "Capability to allow coin transfer",
              //     "coin.TRANSFER",
              //     [a, b, 2.0]
              //   ),
              //   Pact.lang.mkCap("CREDIT",
              //    "Capability for owner", "free.passtest15.CREDIT",
              //     ["",a]),
              //   Pact.lang.mkCap("CREDIT",
              //     "Capability for owner", "free.passtest15.MINT-PASS",
              //      [a,1.0]),
              //   Pact.lang.mkCap("CREDIT_MERCH",
              //     "Capability for owner", "free.passtest15.CREDIT-MERCH",
              //      [a]),
              //   Pact.lang.mkCap("MERCH",
              //    "Capability for owner", "free.passtest15.MERCH",
              //     ["padmin-15-ks"])
              //   ]

              caps: [
                Pact.lang.mkCap(
                  "GAS",
                  "Capability to allow buying gas",
                  "coin.GAS",
                  []
                ),
                Pact.lang.mkCap(
                  "MERCH",
                  "Capability for owner",
                  "free.passfinal001.PASS"
                ),
                Pact.lang.mkCap(
                  "Transfer",
                  "Capability to allow coin transfer",
                  "coin.TRANSFER",
                  [a, b, passPrice]
                ),
                Pact.lang.mkCap(
                  "MINT-PASS",
                  "Capability for owner",
                  "free.passfinal001.MINT-PASS",
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
            };
            setSpinner("true");

            toast.success(
              walletName == "Zelcore"
                ? "Please go to Zelcore app for signing"
                : "Please go to Chaiweaver app for signing",
              {
                position: "top-right",
              }
            );
            const cmd = await Pact.wallet.sign(signCmd);

            if (cmd === undefined) {
              toast.error("User cancelled request", {
                position: "top-right",
              });
              setSpinner("false");
              return;
            }
            // ${node}/chainweb/0.0/${networkId}/chain/${chainId}/pact/api/v1/local
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
                const token_id = signedtxx.events[3].params[0];
                getPassAllDetails();
                savePass(token_id);
                toast.success("Minting has been Done", {
                  position: "top-right",
                });
                dispatch(revealPriorityPassSuccess(true));
              }

              if (signedtxx.result.status == "failure") {
                toast.error("Minting Issue", {
                  position: "top-right",
                });
              }
              setSpinner("false");
            } else {
              toast.error(resJSON.result.error.message, {
                position: "top-right",
              });
              setSpinner("false");
            }
          }
        } else {
          return toast.error("Minting Issue", {
            position: "top-right",
          });
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
        setSpinner("false");
        return toast.error("Minting Issue", {
          position: "top-right",
        });

        //setLoading(false);
        // setMessage('Something went wrong while creating Enquiry! Please try again');
        // setErrorStatus(true);
      });
  };

  const mintDbPass = async () => {
    Axios.get("/user/checkServer")
      .then(async (response) => {
        if (response.data.status == "success") {
          if (walletName == "Xwallet") {
            const checkNetwork = await window.kadena.request({
              method: "kda_getNetwork",
            });
            var walletInfo;
            if (checkNetwork.name == "Testnet") {
              // walletInfo = await window.kadena.request({
              //   method: 'kda_requestAccount',
              //   networkId: "testnet04",
              // });

              walletInfo = await window.kadena.request({
                method: "kda_requestAccount",
                networkId: "testnet04",
              });

              const signCmd4 = {
                pactCode: `(coin.get-balance ${JSON.stringify(
                  walletInfo.wallet.account
                )})`,

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

                  sender: "",
                },
              };

              const result = await Pact.fetch.local(signCmd4, API_HOST);
              //balncechecka
              if (
                whiteList ? result.result.data <= 1 : result.result.data <= 1
              ) {
                toast.error("Low Balance", {
                  position: "top-right",
                });

                return;
              }
            }

            const guard = {
              keys: [walletInfo.wallet.publicKey],
              pred: "keys-all",
            };
            //k:178f05a90477ef6501b08082e93ccd2b6d2d5bd11af70a93e35406c5ba082de8
            // 52.63826
            // k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934
            // 2bf96bfc2cfeee85800aff1aa4a83eafe4cb5f81442713be8b64f293f31a5c7e
            const a = walletInfo.wallet.account;
            // const b = "dbtestacc10"
            const b =
              "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
            // const pactCode = `(free.dbcontracttest8.mint-bulk-cooper  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "mcol3" 1)`
            const pactCode = `(free.dbcfinal002.mint-cooper ${JSON.stringify(
              a
            )} (read-keyset "guard") 1.0 "dbc4" 1)`;
            const XWalletRequest = {
              networkId: NETWORK_ID,
              signingCmd: {
                sender: walletInfo.wallet.account,
                chainId: CHAIN_ID,
                gasPrice: 0.0000001,
                gasLimit: 150000,
                ttl: 28000,
                // caps:[
                //   Pact.lang.mkCap(
                //     "GAS",
                //     "Capability to allow buying gas",
                //     "coin.GAS",
                //     []
                //   ),
                //   Pact.lang.mkCap("PRIVATE",
                //    "Capability for owner", "free.dbcontracttest8.PRIVATE"),
                //    Pact.lang.mkCap(
                //     "Transfer",
                //     "Capability to allow coin transfer",
                //     "coin.TRANSFER",
                //     [a, b, 3.0]
                //   ),
                //   Pact.lang.mkCap("CREDIT",
                //    "Capability for owner", "free.dbcontracttest8.CREDIT",
                //     ["",a]),
                //   Pact.lang.mkCap("CREDIT",
                //     "Capability for owner", "free.dbcontracttest8.MINT-COOPER",
                //      [a,1.0]),
                //   Pact.lang.mkCap("CREDIT_COOPER",
                //     "Capability for owner", "free.dbcontracttest8.CREDIT-COOPER",
                //      [a]),
                //   Pact.lang.mkCap("COOPER",
                //    "Capability for owner", "free.dbcontracttest8.COOPER",
                //     ["dbtest-ks-8"])
                // ]

                caps: [
                  Pact.lang.mkCap(
                    "GAS",
                    "Capability to allow buying gas",
                    "coin.GAS",
                    []
                  ),
                  Pact.lang.mkCap(
                    "MERCH",
                    "Capability for owner",
                    "free.dbcfinal002.COOPER"
                  ),
                  Pact.lang.mkCap(
                    "Transfer",
                    "Capability to allow coin transfer",
                    "coin.TRANSFER",
                    [a, b, dbCooperPrice]
                  ),
                  Pact.lang.mkCap(
                    "MINT-COOPER",
                    "Capability for owner",
                    "free.dbcfinal002.MINT-COOPER",
                    [a, 1.0]
                  ),
                ],
                envData: {
                  guard: guard,
                },
                pactCode: pactCode,
                networkId: NETWORK_ID,
                signingPubKey: walletInfo.wallet.publicKey,
                creationTime: creationTime(),

                // meta: {
                //   creationTime: creationTime(),
                //   ttl: 28000,
                //   gasLimit: 150000,
                //   chainId: CHAIN_ID,
                //   gasPrice: 0.0000001,
                //   sender:"k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934"
                // }
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
              const token_id = txResult.events[3].params[0];
              getPassAllDetails();
              savePass(token_id);
              toast.success("Minting has been Done", {
                position: "top-right",
              });
            }

            if (txResult.result.status == "failure") {
              toast.error("Minting Issue", {
                position: "top-right",
              });
            }
            setSpinner("false");
          }

          if (walletName == "Chainweaver" || walletName == "Zelcore") {
            const accountName =
              walletName == "Chainweaver"
                ? localStorage.getItem("chainWeaverWalletAdd")
                : localStorage.getItem("zelcorewalletadd");
            const signCmd4 = {
              pactCode: `(coin.get-balance ${JSON.stringify(accountName)})`,

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

                sender: "",
              },
            };

            const result = await Pact.fetch.local(signCmd4, API_HOST);
            //balncechecka
            if (whiteList ? result.result.data <= 1 : result.result.data <= 1) {
              toast.error("Low Balance", {
                position: "top-right",
              });

              return;
            }
            const publicKey = accountName.slice(2, accountName.length);
            const guard = { keys: [publicKey], pred: "keys-all" };

            // 52.63826
            // k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934
            // 2bf96bfc2cfeee85800aff1aa4a83eafe4cb5f81442713be8b64f293f31a5c7e
            const a = accountName;
            // const b = "dbtestacc10"
            const b =
              "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";
            //  const pactCode=`(free.passtest10.mint-bulk-pass  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "col4" 1)`
            //  const pactCode = `(coin.get-balance ${JSON.stringify("k:fa48b2939c5b1770c9161f4eb9ccaddc73b18c6501243dd54697d757c1914934")})`
            const signCmd = {
              //  pactCode:`(free.dbcontracttest8.mint-bulk-cooper  ${JSON.stringify(a)} (read-keyset "demothreeaccount-keyset") 1.0 "mcol3" 1)`,
              pactCode: `(free.dbcfinal002.mint-cooper ${JSON.stringify(
                a
              )} (read-keyset "guard") 1.0 "dbc4" 1)`,

              // caps:[
              //   Pact.lang.mkCap(
              //     "GAS",
              //     "Capability to allow buying gas",
              //     "coin.GAS",
              //     []
              //   ),
              //   Pact.lang.mkCap("PRIVATE",
              //    "Capability for owner", "free.dbcontracttest8.PRIVATE"),
              //    Pact.lang.mkCap(
              //     "Transfer",
              //     "Capability to allow coin transfer",
              //     "coin.TRANSFER",
              //     [a, b, 3.0]
              //   ),
              //   Pact.lang.mkCap("CREDIT",
              //    "Capability for owner", "free.dbcontracttest8.CREDIT",
              //     ["",a]),
              //   Pact.lang.mkCap("CREDIT",
              //     "Capability for owner", "free.dbcontracttest8.MINT-COOPER",
              //      [a,1.0]),
              //   Pact.lang.mkCap("CREDIT_COOPER",
              //     "Capability for owner", "free.dbcontracttest8.CREDIT-COOPER",
              //      [a]),
              //   Pact.lang.mkCap("COOPER",
              //    "Capability for owner", "free.dbcontracttest8.COOPER",
              //     ["dbtest-ks-8"])
              //   ]

              caps: [
                Pact.lang.mkCap(
                  "GAS",
                  "Capability to allow buying gas",
                  "coin.GAS",
                  []
                ),
                Pact.lang.mkCap(
                  "MERCH",
                  "Capability for owner",
                  "free.dbcfinal002.COOPER"
                ),
                Pact.lang.mkCap(
                  "Transfer",
                  "Capability to allow coin transfer",
                  "coin.TRANSFER",
                  [a, b, dbCooperPrice]
                ),
                Pact.lang.mkCap(
                  "MINT-COOPER",
                  "Capability for owner",
                  "free.dbcfinal002.MINT-COOPER",
                  [a, 1.0]
                ),
              ],
              sender: a,
              gasLimit: 150000,
              chainId: CHAIN_ID,
              ttl: 28800,
              envData: {
                guard: {
                  keys: [publicKey],
                  pred: "keys-all",
                },
              },
            };
            setSpinner("true");

            toast.success(
              walletName == "Zelcore"
                ? "Please go to Zelcore app for signing"
                : "Please go to Chaiweaver app for signing",
              {
                position: "top-right",
              }
            );
            const cmd = await Pact.wallet.sign(signCmd);
            if (cmd === undefined) {
              toast.error("User cancelled request", {
                position: "top-right",
              });
              setSpinner("false");
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
                const token_id = signedtxx.events[3].params[0];
                getPassAllDetails();
                savePass(token_id);
                toast.success("Minting has been Done", {
                  position: "top-right",
                });
              }

              if (signedtxx.result.status == "failure") {
                toast.error("Minting Issue", {
                  position: "top-right",
                });
              }
              setSpinner("false");
            } else {
              toast.error(resJSON.result.error.message, {
                position: "top-right",
              });
              setSpinner("false");
            }
          }
        } else {
          return toast.error("Server Issue", {
            position: "top-right",
          });
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
        setSpinner("false");
        return toast.error("Minting Issue", {
          position: "top-right",
        });
      });
  };

  const checkWhitelist = async () => {
    const signCmd = {
      pactCode: `(free.dbcfinalpolicy002.check-whitelist)`,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };
    const response = await Pact.fetch.local(signCmd, API_HOST);
    if (response.result.status == "success") {
      setWhiteList(response.result.data);
    }
  };

  const checkPublicRound = async () => {
    const signCmd = {
      pactCode: `(free.dbcfinalpolicy002.check-public)`,

      // pactCode: `(coin.transfer "sender01" "sender00" 1.0)`,
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
    };
    const response = await Pact.fetch.local(signCmd, API_HOST);
    if (response.result.status == "success") {
      setPublicPass(response.result.data);
    }
  };

  useEffect(() => {
    getPassPrice();
    getDbCooperPrice();
    getDbCooperPriceWl();

    const project = upcomingProjects.filter((data) => {
      return data.id == params.id;
    });
    setProject(project[0]);
    checkPublicRound();
    checkWhitelist();
    getPassAllDetails();
  }, []);

  console.log("passPrice", passPrice);
  console.log("dbCooperPrice", dbCooperPrice);

  // const toggle=()=> {
  //     setModal(!modal)
  //   }

  return (
    <div className="launchpadBannerBx" id="slide1">
      <div className="container">
        <div className="launchpadBanInn">
          <div className="lb-topBx">
            {project.projectName == "DB cooper" ? (
              <div className="lb-topLeft">
                <ul>
                  <li>
                    {publicPass === false && whiteList === false ? (
                      <i className="selected">1</i>
                    ) : (
                      <i>1</i>
                    )}

                    <span>Priority Pass</span>
                  </li>
                  <li>
                    {whiteList ? <i className="selected">2</i> : <i>2</i>}
                    <span>WL Round</span>
                  </li>
                  <li>
                    {publicPass ? <i className="selected">3</i> : <i>3</i>}
                    <span>Public Round</span>
                  </li>
                  <li>
                    <i>4</i>
                    <span>Reveal</span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="lb-topLeft">
                <ul>
                  {/* <li>
                                        <i>2</i>
                                        <span>WL Round</span>
                                    </li> */}
                  {/* {revealPP==false?<li style={{marginLeft:"76px"}}>
                                    <i className='selected'>1</i>
                                        <span>Public Round</span>
                                    </li>:<li style={{marginLeft:"76px"}}>
                                    <i >1</i>
                                        <span>Public Round</span>
                                    </li>}  */}

                  <li style={{ marginLeft: "76px" }}>
                    <i className="selected">1</i>
                    <span>Public Round</span>
                  </li>
                  {revealPP == true ? (
                    <li style={{ marginRight: "144px" }}>
                      {" "}
                      <i className="selected">2</i>
                      <span>Reveal</span>
                    </li>
                  ) : (
                    <li style={{ marginRight: "144px" }}>
                      {" "}
                      <i>2</i>
                      <span>Reveal</span>
                    </li>
                  )}
                </ul>
              </div>
            )}
            <div className="lb-topRight">
              <h3>Registration</h3>
              {/* <p className='bold'>The registration date will be announced soon.</p> */}
              {project.projectName == "DB cooper" ? (
                <marquee
                  width="60%"
                  direction="left"
                  height="100px"
                  style={{ marginTop: "11px" }}
                >
                  <h2 className="bold">DB cooper IS LIVE NOW</h2>
                </marquee>
              ) : (
                <marquee
                  width="60%"
                  direction="left"
                  height="100px"
                  style={{ marginTop: "11px" }}
                >
                  <h2 className="bold">PRIORITY PASS IS LIVE NOW</h2>
                </marquee>
              )}
            </div>
          </div>
          <div className="launchWalletBx">
            <div className="lpdetLeft">
              <div className="cooperBx">
                <div className="cooperLeft">
                  {project.projectName == "DB cooper" ? (
                    <div className="lpDetImg">
                      <img src={project.dbCooperGif} alt="" />
                    </div>
                  ) : (
                    <div className="lpDetImg">
                      <img src={project.priorityPassGif} alt="" />
                    </div>
                  )}
                  {project.projectName == "DB cooper" ? (
                    <div className="coopersocial">
                      <a href="https://www.dbctoken.com/" target="_blank">
                        <BsGlobe />
                      </a>
                      <a
                        href="https://twitter.com/dbcoopertoken"
                        target="_blank"
                      >
                        <BsTwitter />
                      </a>
                      <a href="https://t.me/dbcoopertoken" target="_blank">
                        <BsTelegram />
                      </a>
                    </div>
                  ) : (
                    <div className="coopersocial">
                      <Link to="/">
                        <BsGlobe />
                      </Link>
                      <a
                        href="https://twitter.com/KRYPTOMERCH_IO"
                        target="_blank"
                      >
                        <BsTwitter />
                      </a>
                      <a
                        href="https://discord.com/invite/Zk7E4WKKSC"
                        target="_blank"
                      >
                        <FaDiscord />
                      </a>
                    </div>
                  )}
                </div>
                <div className="cooperRight">
                  <h3>{project.projectName}</h3>
                  <p>{project.content}</p>
                  {spinner == "false" ? (
                    walletStatus == "false" ? (
                      project.projectName == "Priority Pass" ? (
                        <Button onClick={toggle}>Buy Pass</Button>
                      ) : (
                        <Button onClick={toggle}>Mint Now</Button>
                      )
                    ) : project.projectName == "Priority Pass" ? (
                      <Button onClick={mintPass2}>Buy Pass</Button>
                    ) : (
                      <Button onClick={mintDbPass}>Mint Now</Button>
                    )
                  ) : (
                    <SpinnerCircular />
                  )}
                  {/* /* <ReactTooltip id="register" place="top" effect="solid">
        Tooltip for the register button
      </ReactTooltip>
                                       {walletStatus=="false"?   <Popup
        trigger={<Button style={{background:"#6b6b6b"}} >Buy Pass</Button>}
        position="top center"
      >Please Connect your Wallet</Popup>:(spinner=="false"?(project.projectName=="Priority Pass"?<Button onClick={mintPass2}>Buy Pass</Button>:<Button onClick={mintDbPass} >Mint Now</Button>):
      <SpinnerCircular />)} */}
                </div>
              </div>
              <div className="launchrangeSlide">
                <span onClick={getPassPrice}>Total Minted</span>
                <LaunchRangeSlider />
              </div>
            </div>
            <div className="lpdetRight">
              <ul>
                <li>
                  {project.projectName == "Priority Pass" ? (
                    <span>Total Pass</span>
                  ) : (
                    <span>Total Items</span>
                  )}
<br/>
                  {project.projectName == "Priority Pass" ? (
                    <strong>
                      {passDetails
                        ? passDetails.priorityPassNumber -
                          passDetails.priorityPassMintedNumber
                        : null}
                    </strong>
                  ) : (
                    <strong>
                      {passDetails
                        ? passDetails.dbCooperTotalNumber -
                          passDetails.dbCooperMintedNumber
                        : null}
                    </strong>
                  )}
                </li>
                <li>
                  {project.projectName == "Priority Pass" ? (
                    <span> Price</span>
                  ) : (
                    <span>WL Mint Price</span>
                  )}
                  <br/>

                  {project.projectName == "Priority Pass" ? (
                    <strong>
                      {passPrice} KDA or 8.33 KDA per Mint
                    </strong>
                  ) : (
                    <strong>{dbCooperPriceWl} KDA</strong>
                  )}
                </li>

                <li>
                  {project.projectName == "Priority Pass" ? (
                    <span>Total Mints</span>
                  ) : (
                    <span>Public Mint Price</span>
                  )}
                  <br/>
                  {project.projectName == "Priority Pass" ? (
                    <div>
                      <strong>{project.totalMints}</strong>
                      <strong style={{ fontSize: "15px", marginLeft: "5px",marginTop:"5px" }}
                      >(1 Free mint for every collection that launches on Kryptomerch.io)</strong>
                    </div>
                  ) : (
                    <strong>{dbCooperPrice} KDA</strong>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
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
              <span>
                <button onClick={connectWallet}>
                  <img src={Zeclore} alt="" />
                  <strong>Zelcore</strong>
                </button>
              </span>
              <span>
                <button onClick={connectWalletConnect}>
                  <img src={Walletconnect} alt="" />
                  <strong>Wallet Connect</strong>
                </button>
              </span>

              <span>
                <button>
                  <img src={Chainweaver} onClick={connectChainweaver} alt="" />
                  <strong>Chainweaver</strong>
                </button>
              </span>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default LaunchpadDetails;
