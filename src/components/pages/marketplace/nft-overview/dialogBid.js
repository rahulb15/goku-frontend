import React, { useState } from "react";
import {
  Modal,
  TextField,
  Button,
  //FormControl,
  //InputLabel,
  //Input,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import Pact from "pact-lang-api";
import { toast } from "react-toastify";
import Axios from "axios";
import { IconButton } from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import "../collection-listing/collectionTabs/nfttabs1.css";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4, 8, 5),
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  form: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  fileInput: {
    width: "97%",
    margin: "10px 0",
  },
  buttonSubmit: {
    marginBottom: 10,
    backgroundColor: "#666",
    color: "#fff"
  },
  modalClose: {
    position: "absolute",
    right: "0px",
    top: "0px",
    color: "black",
  },
}));

const DialogBid = ({ dataUSer, setRefresh, refresh, setLoading, loading,setSelectedData,selectedData }) => {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [bidAmount, setBidAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [bidAmountError, setBidAmountError] = useState(false);
  const [bidAmountErrorMessage, setBidAmountErrorMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [serviceFee, setServiceFee] = useState(0.0);
  const [totalFee, setTotalFee] = useState(0.0);
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const { walletStatus, walletAddress, walletName,userEmail } = useSelector(
    (state) => state.walletStatus
  );
  

  const handleClose = () => {
    
    setOpen(false);
  };
  const handleOpen = () => {
    
    setOpen(true);
  };

  const handleBidAmountChange = (e) => {
    setAmount(e.target.value);
    if (e.target.value == 0) {
      setBidAmountError(true);
      setBidAmountErrorMessage("Bid Amount is Required");
    } else {
      setBidAmountError(false);
      setBidAmountErrorMessage("");
    }
  };
  

  const handleBid = (e) => {
    e.preventDefault();
    if (bidAmount == 0) {
      setBidAmountError(true);
      setBidAmountErrorMessage("Bid Amount is Required");
    } else if (bidAmount < parseFloat(dataUSer.bidInfo.bidPrice)) {
      setBidAmountError(true);
      setBidAmountErrorMessage(
        "Bid Amount must be greater than or equal to " +
        parseFloat(dataUSer.bidInfo.bidPrice)
      );
    } else {
      bid();
      // setBidAmountError(false);
      // setBidAmountErrorMessage("");
    }
  };

  React.useEffect(() => {
    setBidAmount(parseFloat(amount).toFixed(2));
    setServiceFee(parseFloat((amount * parseFloat(2)) / 100));
    setTotalFee(parseFloat(amount) + parseFloat(amount * 2) / 100);
  }, [amount]);

  

  const bid = async () => {
    setLoading(true);
    setSelectedData(dataUSer);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    
    
    const guard = { keys: [publicKey], pred: "keys-all" };
    const tokenId = dataUSer.tokenId;
    
    
    const a = accountName;
    const b = "00fd7ca27f0ab6cfb03e3316c23599890f7a82043cb73925dc080307b771528d";
    // id:string buyer:string amount:decimal bid_days:integer
    const pactCode = `(free.marketplacefinal002.bid ${JSON.stringify(
      tokenId
    )} ${JSON.stringify(a)} ${parseFloat(bidAmount).toFixed(2)} 0)`;

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
            [a, b, totalFee]
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
              onAuction: true,
              onMarketplace: true,
              _id: dataUSer._id,
              bidPrice: bidAmount,
              bidder: walletAddress,
            };
            
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            Axios.patch("/passDetails/bidding", obj, config)
              .then((response) => {
                
                if (response.data.status == "success") {
                  toast.success("NFT Bidded");
                  setLoading(false);
                  setRefresh(!refresh);
                } else {
                  
                  setLoading(false);
                  toast.error("NFT not Bidded");
                }
              })
              .catch((error) => {
                
                setLoading(false);
                toast.error("NFT not Bidded");
              });
          } else {
            setLoading(false);
            toast.error("NFT not Bidded");
          }
        }
      } else {
        toast.error("NFT not Bidded");
        handleOpen();
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
              "Transfer",
              "Capability to allow coin transfer",
              "coin.TRANSFER",
              [a, b, totalFee]
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
            onMarketplace: true,
            _id: dataUSer._id,
            bidPrice: bidAmount,
            bidder: walletAddress,
            history: {
              owner: walletAddress,
              price: bidAmount,
              category: "bid",
            },
          };
          
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          Axios.patch("/passDetails/bidding", obj, config)
            .then((response) => {
              
              if (response.data.status == "success") {
                toast.success("NFT Bidded");
                setLoading(false);
                setRefresh(!refresh);
              } else {
                
                setLoading(false);
                toast.error("NFt not Bidded");
              }
            })
            .catch((error) => {
              
              setLoading(false);
              toast.error("NFT not Bidded");
            });
        } else {
          setLoading(false);
          toast.error("NFT not Bidded");
        }
      }
      else {
        toast.error("NFT not Bidded");
        setLoading(false);
      }
    }
  };

  return (
    <div>
    
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
                        onClick={handleOpen}>
                        Place a Bid
                      </button>

      <Modal open={open} onClose={handleClose}>
        <div className={classes.modal}>
          <div className={classes.modalClose}>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <form
            className={classes.form}
            noValidate
            autoComplete="off"
            onSubmit={handleBid}
          >
            <TextField
              type="number"
              // step="0.01"
              inputProps={{ min: "0", max: "1000000", step: "0.1" }}
              name="bidAmount"
              variant="outlined"
              label="Bid Amount"
              fullWidth
              value={amount}
              onChange={handleBidAmountChange}
              error={bidAmountError}
              helperText={bidAmountErrorMessage}
            />
            <br />
            <br />
            <br />
            <br />
            <div
              className="priceListBx"
              style={{ textAlign: "left", marginLeft: "10px", color: "#000" }}
            >
              <ul>
                <li>
                  <span>Service fee</span>
                 
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <strong style={{ float: "right" }}
                  >{serviceFee.toFixed(3)}{" (2%)"}</strong>
                  
                </li>
                <li>
                  <span>Your Bid</span>
                  
                  




                  <strong style={{ float: "right" }}>{bidAmount}</strong>
                </li>
                <li>
                  <span>Total</span>
                 



                  <strong style={{ float: "right" }}>
                  {totalFee.toFixed(3)}</strong>
                </li>
              </ul>
            </div>
            <br />
            <br />
            <br />
            <br />
            <Button
              className={classes.buttonSubmit}
              variant="contained"
              size="large"
              type="submit"
              fullWidth
              style={{ borderRadius: "10px" }}
            >
              Bid
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default DialogBid;
