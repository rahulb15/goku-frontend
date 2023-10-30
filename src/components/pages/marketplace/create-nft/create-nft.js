import React, { useEffect, useState } from "react";
import { FormGroup, Input } from "reactstrap";
import { MarketplaceFooter } from "../../../common-components/marketplace-footer/marketplace-footer";
import HeaderafterLogin from "../../../common-components/marketplace-header-after-login/marketplace-header-after-login";
//import SwitchOnOff from "./switchonoff";
import { MdNoteAlt } from "react-icons/md";
import Switch from "react-switch";
//import { BiInfinite } from "react-icons/bi";
import { AiOutlineFieldTime } from "react-icons/ai";
//import { FaPercent } from "react-icons/fa";
//import { Header } from "../../../common-components/header/header";
import Axios from "axios";
import Pact from "pact-lang-api";
import { BiArrowBack } from "react-icons/bi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { SpinnerCircular } from "spinners-react";
import "./create-nft.scss";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const CommunityMarketplace = () => {
  const navigate = useNavigate();

  const [onMarketPlace, setOnMarketPlace] = useState(false);
  const [fixedPrice, setFixedPrice] = useState("");
  const [timedAuction, setTimedAuction] = useState("");
  const [nftPrice, setNftPrice] = useState(0);
  const [price, setPrice] = useState();
  const [digitalCode, setDigitalCode] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const [description, setDescription] = useState("");
  const [externalLink, setExternalLink] = useState("");
  const [royalities, setRoyalities] = useState("");
  const [properties1, setProperties1] = useState("");
  const [properties2, setProperties2] = useState("");
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(false);
  const [unlockable, setUnlockable] = useState(false);
  const [nft, setNft] = useState("");
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [serviceFee, setServiceFee] = useState(0);
  const [royalityRate, setRoyalityRate] = React.useState("");
  const [receive, setReceive] = React.useState(0);
  const { walletStatus, walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const search = window.location.search;
  const params = new URLSearchParams(search);
  let foo = params.get("nftId");
  let foo2 = params.get("type");

  useEffect(() => {
    getNftDetails();
  }, []);

  const getNftDetails = () => {
    if (foo2 == "pass") {
      const formdta = {
        _id: foo,
      };
      Axios.post("/passDetails/getNftPassbyId", formdta, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            setNft(response.data.data);
          } else {
            setNft([]);
          }
        })
        .catch((error) => {
          setNft([]);
        });
    } else {
      const formdta = {
        _id: foo,
      };
      Axios.post("/nft/getNftbyId", formdta, {
        headers: { authorization: localStorage.getItem("accessJWT") },
      })
        .then((response) => {
          if (response.data.status == "success") {
            setNft(response.data.data);
          } else {
            setNft([]);
          }
        })
        .catch((error) => {
          setNft([]);
        });
    }
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "fixedPrice":
        setFixedPrice(value);
        break;
      case "timedAuction":
        setTimedAuction(value);
        break;

      case "nftPrice":
        setPrice(value);
        break;
      case "digitalCode":
        setDigitalCode(value);
        break;

      case "collectionId":
        setCollectionId(value);
        break;

      case "description":
        setDescription(value);
        break;

      case "duration":
        setDuration(value);
        break;

      case "externalLink":
        setExternalLink(value);
        break;

      case "royalities":
        setRoyalities(value);
        break;

      case "properties1":
        setProperties1(value);
        break;

      case "properties2":
        setProperties2(value);
        break;
      default:
        break;
    }
  };

  const getRoyalityRate = async (data) => {
    console.log("data", data?.collectionName);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.marketplacefinal002.get-royalty-rate "${data?.collectionName}")`,
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

  React.useEffect(async () => {
    console.log(nft);
    let royaltyR = 0;
    if (nftPrice > 0) {
      royaltyR = await getRoyalityRate(nft[0]);
    }
    console.log("royaltyR", royaltyR);
    console.log("nftPrice", nftPrice, serviceFee / 100);
    console.log("price", price);
    console.log("parseFloat(nftPrice)", parseFloat(nftPrice));
    const MarketplaceCharges = (serviceFee / 100) * parseFloat(nftPrice);
    console.log("MarketplaceCharges", MarketplaceCharges);
    const priceWithoutMarketplaceCharges =
      parseFloat(nftPrice) - MarketplaceCharges;
    console.log(
      "priceWithoutMarketplaceCharges",
      priceWithoutMarketplaceCharges
    );

    const royaltyPayout = royaltyR * priceWithoutMarketplaceCharges;
    console.log("royaltyPayout", royaltyPayout);
    const sellerPayout = priceWithoutMarketplaceCharges - royaltyPayout;
    console.log("sellerPayout", sellerPayout);
    setReceive(sellerPayout);
  }, [nftPrice]);

  React.useEffect(async () => {
    setNftPrice(parseFloat(price).toFixed(2));
  }, [price]);

  const handleOnSubmit = () => {
    console.log(nftPrice, "nftPrice");
    if (timedAuction == "") {
      toast.error("Please select selling type");
      return;
    }
    if (onMarketPlace == false) {
      toast.error("Please enable marketplace");
      return;
    }
    if (nftPrice == 0 || nftPrice == 'NaN') {
      toast.error("Please enter price");
      return;
    }
    if (duration == 0) {
      toast.error("Please enter duration");
      return;
    }

    if (timedAuction == "Timed Auction") {
      openForBidSale(nft[0]);
    }
    if (timedAuction == "Fixed Price") {
      openDirectSale(nft[0]);
    }
  };

  const openDirectSale = async (data) => {
    setLoading(true);
    const tokenId = data.tokenId;

    const accountName = walletAddress;

    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const b =
      "00fd7ca27f0ab6cfb03e3316c23599890f7a82043cb73925dc080307b771528d";

    const pactCode = `(free.marketplacefinal002.open-sale "direct-sale" ${JSON.stringify(
      tokenId
    )}  ${JSON.stringify(a)} ${nftPrice} 0 ${parseInt(duration)} false)`;

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
            "Capability to allow  transfer",
            "marmalade.ledger.TRANSFER",
            [tokenId, a, b, 1.0]
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
            const obj = {
              _id: data._id,
              onMarketplace: true,
              sellingType: "Fixed Price",
              nftPrice: nftPrice,
              duration: duration,
              onSale: true,
              imageIndex: data.imageIndex,
              history: {
                owner: walletAddress,
                price: nftPrice,
                category: "sale",
              },
            };
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            if (foo2 == "pass") {
              Axios.patch("/passDetails/update-nft-pass", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                    navigate(-1);
                  } else {
                    toast.error("NFT not on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                });
            } else {
              Axios.patch("/nft/update-nft", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                    navigate(-1);
                  } else {
                    toast.error("NFT not on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                });
            }
          }
        } else {
          toast.error("Wallet not connected", {
            position: "top-right",
          });
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
            Pact.lang.mkCap(
              "GAS",
              "Capability to allow buying gas",
              "coin.GAS",
              []
            ),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow  transfer",
              "marmalade.ledger.TRANSFER",
              [tokenId, a, b, 1.0]
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
        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status === "success") {
          const obj = {
            _id: data._id,
            onMarketplace: true,
            sellingType: "Fixed Price",
            nftPrice: nftPrice,
            duration: duration,
            onSale: true,
            imageIndex: data.imageIndex,
            history: {
              owner: walletAddress,
              price: nftPrice,
              category: "sale",
            },
          };
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "pass") {
            Axios.patch("/passDetails/update-nft-pass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                  navigate(-1);
                } else {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT not on sale", {
                  position: "top-right",
                });
                setLoading(false);
              });
          } else {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                  navigate(-1);
                } else {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT not on sale", {
                  position: "top-right",
                });
                setLoading(false);
              });
          }
        } else {
          toast.error("NFT not on sale", {
            position: "top-right",
          });
          setLoading(false);
        }
      } else {
        toast.error("Wallet not connected", {
          position: "top-right",
        });
        setLoading(false);
      }
    }
  };

  const openForBidSale = async (data) => {
    setLoading(true);
    const tokenId = data.tokenId;
    // const accountName =
    //   "k:c1d0eb761e0faf97d1d1082cd7a3b319b93ef2d2aac7952a24cccbafbdf0779d";
    const accountName = walletAddress;

    const publicKey = accountName.slice(2, accountName.length);

    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const b =
      "00fd7ca27f0ab6cfb03e3316c23599890f7a82043cb73925dc080307b771528d";

    const pactCode = `(free.marketplacefinal002.open-sale "Auction" ${JSON.stringify(
      tokenId
    )}  ${JSON.stringify(a)} ${nftPrice} 0 ${parseInt(duration)} true)`;

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
            "Capability to allow  transfer",
            "marmalade.ledger.TRANSFER",
            [tokenId, a, b, 1.0]
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
            const obj = {
              _id: data._id,
              onMarketplace: true,
              sellingType: "Timed Auction",
              nftPrice: nftPrice,
              duration: duration,
              // onSale: true,
              onAuction: true,
              imageIndex: data.imageIndex,
              history: {
                owner: walletAddress,
                price: nftPrice,
                category: "auction",
              },
            };
            const accessJWT = localStorage.getItem("accessJWT");
            const config = {
              headers: {
                Authorization: accessJWT,
              },
            };
            if (foo2 == "pass") {
              Axios.patch("/passDetails/update-nft-pass", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                    navigate(-1);
                  } else {
                    toast.error("NFT not on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                });
            } else {
              Axios.patch("/nft/update-nft", obj, config)
                .then((response) => {
                  if (response.data.status == "success") {
                    toast.success("NFT on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                    navigate(-1);
                  } else {
                    toast.error("NFT not on sale", {
                      position: "top-right",
                    });
                    setLoading(false);
                  }
                })
                .catch((error) => {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                });
            }
          } else {
            toast.error("NFT not on sale", {
              position: "top-right",
            });
            setLoading(false);
          }
        } else {
          toast.error("NFT not on sale", {
            position: "top-right",
          });
          setLoading(false);
        }
      } else {
        toast.error("Wallet not connected", {
          position: "top-right",
        });
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
              "Capability to allow  transfer",
              "marmalade.ledger.TRANSFER",
              [tokenId, a, b, 1.0]
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
        const txResult = await Pact.fetch.listen(
          { listen: `${gore2.requestKeys[0]}` },
          API_HOST
        );

        if (txResult.result.status === "success") {
          const obj = {
            _id: data._id,
            onMarketplace: true,
            sellingType: "Timed Auction",
            nftPrice: nftPrice,
            duration: duration,
            // onSale: true,
            onAuction: true,
            imageIndex: data.imageIndex,
            history: {
              owner: walletAddress,
              price: nftPrice,
              category: "auction",
            },
          };
          const accessJWT = localStorage.getItem("accessJWT");
          const config = {
            headers: {
              Authorization: accessJWT,
            },
          };
          if (foo2 == "pass") {
            Axios.patch("/passDetails/update-nft-pass", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                  navigate(-1);
                } else {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT not on sale", {
                  position: "top-right",
                });
                setLoading(false);
              });
          } else {
            Axios.patch("/nft/update-nft", obj, config)
              .then((response) => {
                if (response.data.status == "success") {
                  toast.success("NFT on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                  navigate(-1);
                } else {
                  toast.error("NFT not on sale", {
                    position: "top-right",
                  });
                  setLoading(false);
                }
              })
              .catch((error) => {
                toast.error("NFT not on sale", {
                  position: "top-right",
                });
                setLoading(false);
              });
          }
        } else {
          toast.error("NFT not on sale", {
            position: "top-right",
          });
          setLoading(false);
        }
      } else {
        toast.error("Wallet not connected", {
          position: "top-right",
        });
        setLoading(false);
      }
    }
  };

  const handleOnSwitch = (checked) => {
    setChecked(checked);
    setOnMarketPlace(checked);
  };

  const options = [];
  function optionsFill() {
    for (let i = 0; i < 31; i++) {
      options.push({ value: i, label: i });
    }
  }
  optionsFill();

  const ErrorShow = () => {
    toast.error("You have Already Summited this NFT", {
      position: "top-right",
    });
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
      console.log(datum, "feeeeeeeeee");
      setServiceFee(datum * 100);
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
      setServiceFee(0);
    }
  };

  useEffect(() => {
    getFee();
  }, []);
  console.log(serviceFee, "serviceFee");

  //
  return (
    <div>
      <HeaderafterLogin />
      <div className="midSectionBx">
        <div className="container">
          <BiArrowBack className="backArrow" onClick={() => navigate(-1)} />
          <div className="createnft_Outer">
            <h2 className="bold">Put on Marketplace</h2>
            {/* <div className='uploadfirlBx'>
                                <label>Upload File</label>
                                <div className='upldfile'>
                                    <span>PNG, GIF, WEBP, MP4 or MP3. Max 100mb.</span>
                                    <button>Choose File</button>
                                    <FormGroup>
                                        <Input type="file" name="file" id="exampleFile" />
                                    </FormGroup>
                                </div>
                            </div> */}
            <div className="putmrktplace">
              <div className="putmrkLeft">
                <strong>Put On Marketplace</strong>
                <span style={{ color: nightModeStatus ? "#fff" : "#000" }}>
                  Enter price to allow users instantly purchase your NFT
                </span>
              </div>
              <div className="putmrkRgt">
                <label>
                  <Switch onChange={handleOnSwitch} checked={checked} />
                </label>
              </div>
            </div>
            <div className="fixedPriceBx">
              <label>
                <input
                  type="radio"
                  name="timedAuction"
                  value="Fixed Price"
                  onChange={handleOnChange}
                />
                <span style={{ color: "#000" }}>
                  Fixed price{" "}
                  <i>
                    <MdNoteAlt />
                  </i>
                </span>
              </label>
            </div>
            {/* <div className='fixedPriceBx'>
                                <label>
                                    <input type='radio' name='radio' /> 
                                    <span>Open for bids <i><BiInfinite /></i></span>
                                </label>
                            </div> */}
            <div className="fixedPriceBx">
              <label>
                <input
                  type="radio"
                  name="timedAuction"
                  value="Timed Auction"
                  onChange={handleOnChange}
                />
                <span style={{ color: "#000" }}>
                  Timed auction{" "}
                  <i>
                    <AiOutlineFieldTime />
                  </i>
                </span>
              </label>
            </div>

            <div className="putmrktplace">
              <div className="putmrkLeft">
                <strong>Price</strong>
              </div>
            </div>
            <div className="collectionFrmBx1">
              <FormGroup>
                <Input
                  type="number"
                  min="0.01"
                  max="100"
                  step="0.01"
                  required
                  className="royInp"
                  name="nftPrice"
                  value={price}
                  onChange={handleOnChange}
                  placeholder="Enter price for one piece"
                  id="name"
                />
              </FormGroup>
              <i>KDA</i>
            </div>
            <div className="priceListBx">
              <ul>
                <li>
                  <span>Service fee</span>
                  <strong>{serviceFee}%</strong>
                </li>
                <li>
                  <span>You will receive</span>
                  {/* <strong>{price - (price * serviceFee) / 100} KDA</strong> */}
                  <strong>{receive ? receive.toFixed(2)
                   : 0} KDA</strong>
                </li>
              </ul>
            </div>
            <div className="putmrktplace">
              <strong>Durations</strong>
              <span>Choose the duration of your sale</span>
            </div>
            <div className="collectionFrmBx1">
              <FormGroup>
                <Input
                  type="select"
                  className="royInp"
                  name="duration"
                  onChange={handleOnChange}
                  value={duration}
                  id="exampleSelect"
                >
                  {options.map((item, index) => (
                    <option key={index} value={item.value}>
                      {item.label} Days
                    </option>
                  ))}
                </Input>
              </FormGroup>
            </div>
            {/* <div className="putmrktplace">
                    <strong>Reserve Price</strong>
                    <span>Set a reserve price to ensure you get the price you want</span>
                </div> */}

            {/* <div className='putmrktplace'>
                                <div className='putmrkLeft'>
                                    <strong>Unlockable Content</strong>
                                    <span>Include unlockable content that can only be revealed by the owner of the item.</span>
                                </div>
                                <div className='putmrkRgt'>
                                <Switch onChange={handleOnSwitch2} checked={checked2} />
                                </div>
                            </div> */}
            {/* <div className='collectionFrmBx'>
                                <FormGroup>
                                    <Input type="textarea"  className='txtarea2' name="digitalCode" onChange={handleOnChange} value={digitalCode} id="exampleText" />
                                </FormGroup>
                            </div> */}
            {/* <div className="collectionFrmBx">
              <FormGroup>
                <Label className="bold" for="exampleEmail">
                  Choose Collection
                </Label>
                <Input
                  type="select"
                  className="royInp"
                  name="collectionId"
                  value={collectionId}
                  onChange={handleOnChange}
                  id="exampleSelect"
                >
                  <option>Select</option>
                  {collectionList.length
                    ? collectionList.map((data) => {
                        return (
                          <option value={data._id}>
                            {data.collectionName}
                          </option>
                        );
                      })
                    : null}
                </Input>
              </FormGroup>
            </div> */}
            {/* <div className='collectionFrmBx'>
                                <FormGroup>
                                    <Label className='bold' for="exampleEmail">Description</Label>
                                    <Input type="textarea" className='txtarea2' name="description" value={description} onChange={handleOnChange} id="exampleText" />
                                </FormGroup>
                            </div>
                            <div className='collectionFrmBx'>
                                <FormGroup>
                                    <Label className='bold' for="exampleEmail">External Link</Label>
                                    <Input type="text" className='royInp' name="externalLink" value={externalLink} onChange={handleOnChange} id="name" placeholder="https://" />
                                </FormGroup>
                            </div>
                            <div className='collectionFrmBx'>
                                <FormGroup>
                                    <Label className='bold' for="exampleEmail">Royalties</Label>
                                    <Input type="text" className='royInp' name="royalities" value={royalities} onChange={handleOnChange} id="name" placeholder="Royalties" />
                                </FormGroup>
                                <i><FaPercent /></i>
                            </div> */}
            {/* <div className='suggestedTitle'>Suggested: 0%, 10%, 20%, 30%. Maximum is 50%</div> */}
            {/* <div className='collectionFrmBx'>
                                <label className='bold'>Properties</label>
                                <div className='propertiesBx'>
                                    <div className='propLeft'>
                                        <FormGroup>
                                            <Input type="text" className='royInp' name="properties1" value={properties1} onChange={handleOnChange} id="name" placeholder="Royalties" />
                                        </FormGroup>
                                    </div>
                                    <div className='propLeft'>
                                        <FormGroup>
                                            <Input type="text" className='royInp'name="properties2" value={properties2} onChange={handleOnChange} id="name" placeholder="Royalties" />
                                        </FormGroup>
                                    </div>
                                </div>
                            </div> */}
            <div className="createItems">
              <button
                onClick={() => (loading ? ErrorShow() : handleOnSubmit())}
                style={{
                  backgroundColor: nightModeStatus ? "#fff" : "#000",
                  color: nightModeStatus ? "#000" : "#fff",
                }}
                className="btn"
              >
                {loading ? (
                  <SpinnerCircular size={20} color="white" />
                ) : (
                  "Create Item"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {loading ? (
        <>
          <div
            className="loading"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <SpinnerCircular size={80} color="black" secondaryColor="red" />
          </div>
        </>
      ) : null} */}
      <MarketplaceFooter />
    </div>
  );
};

export default CommunityMarketplace;
