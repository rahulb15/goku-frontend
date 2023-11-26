import Axios from "axios";
import Pact from "pact-lang-api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TagsInput from "react-tagsinput";
import "react-tagsinput/react-tagsinput.css";
import { toast } from "react-toastify";
import {
  Button,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { SpinnerCircular } from "spinners-react";
import { collectionCategory } from "../../../common-components/common_json/collection_category";

const NETWORK_ID = process.env.REACT_APP_NETWORK_ID;
const CHAIN_ID = process.env.REACT_APP_CHAIN_ID;
const API_HOST = `https://api.testnet.chainweb.com/chainweb/0.0/${NETWORK_ID}/chain/${CHAIN_ID}/pact`;
const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
const GAS_PRICE = 0.01111;

const ModalExample = () => {
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Art");
  const [shortUrl, setShortUrl] = useState("");
  const [image, setImage] = useState("");
  const [totalSupply, setTotalSupply] = useState(0);
  const [mintPrice, setMintPrice] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [price, setPrice] = useState(0);
  const [price1, setPrice1] = useState(0);
  const [royaltyAddress, setRoyaltyAddress] = useState("");
  const [bannerUrl, setBannerUrl] = useState("");
  const [propertyFile, setPropertyFile] = useState("");
  // const [screenLoading , setScreenLoading] = useState(false);

  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  // import "slick-carousel/slick/slick-theme.css";
  const [royaltyFee, setRoyaltyFee] = useState(0);
  const [fee, setFee] = useState(0);

  const { walletName, walletAddress } = useSelector(
    (state) => state.walletStatus
  );
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const toggle = () => {
    setModal(!modal);
  };

  // const validationSchema = Yup.object().shape({
  //   displayName: Yup.string().required("Display Name is required"),
  //   symbol: Yup.string().required("Symbol is required"),
  //   description: Yup.string().required("Description is required"),
  //   category: Yup.string().required("Caimport "slick-carousel/slick/slick.css";
  // import "slick-carousel/slick/slick-theme.css";tegory is required"),
  //   shortUrl: Yup.string().required("Short Url is required"),
  //   image: Yup.string().required("Image is required"),
  //   totalSupply: Yup.number().required("Total Supply is required"),
  //   mintPrice: Yup.number().required("Mint Price is required"),
  // });
  const handleTokenList = (e) => {
    if (e.length == 0) {
      setTokenList([]);
    }
    const arr = e.map((item) => {
      if (item.split(",").length > 1) {
        //regular expression to remove all special characters except comma
        const regex = /[^a-zA-Z0-9,]/g;
        const str = item.replace(regex, "");
        setTokenList(str.split(","));
      } else {
        setTokenList(e);
      }
    });
  };

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    switch (name) {
      case "displayName":
        setDisplayName(value);
        break;
      case "symbol":
        setSymbol(value);
        break;
      case "description":
        setDescription(value);
        break;

      case "totalSupply":
        console.log("value", value);
        if (value < 0) {
          setTotalSupply(0);
        } else setTotalSupply(value);
        break;
      case "tokenList":
        // setTokenList(...tokenList, value);
        break;

      case "mintPrice":
        console.log("value", value);
        if (value < 0) {
          // setMintPrice(0);
          setAmount(0);
        } else setAmount(value);
        // setMintPrice(value);
        break;
      case "royalityFee":
        console.log("value", value);
        if (value < 0) {
          setFee(0);
        } else setFee(value);
        break;

      case "royalityAddress":
        console.log("value", value);
        setRoyaltyAddress(value);
        break;

      case "category":
        setCategory(value);
        break;

      case "shortUrl":
        setShortUrl(value);
        break;

      case "bannerUrl":
        setBannerUrl(value);
        break;

      default:
        break;
    }
  };
  React.useEffect(() => {
    setMintPrice(parseFloat(amount).toFixed(2));
    setRoyaltyFee(parseFloat(fee).toFixed(2) / 100);
    setPrice1(parseFloat(price).toFixed(1));
  }, [amount, fee, price]);

  console.log("category", category);
  console.log("shortUrl", shortUrl);
  console.log("description", description);
  console.log("symbol", symbol);
  console.log("displayName", displayName);
  console.log("tokenList", tokenList);
  console.log("totalSupply", totalSupply);
  console.log("mintPrice", mintPrice);
  console.log("royaltyFee", royaltyFee);
  console.log("royaltyAddress", royaltyAddress);
  console.log("price", price);
  console.log("price1", price1);
  console.log("bannerUrl", bannerUrl);

  const create_col_one = async () => {
    console.log("walletName", walletName);
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const b =
      "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

    const pactCode = `(free.marketplacefinal002.create-nft-collection  "${displayName}" "${symbol}" ${totalSupply} (read-keyset "guards") ${JSON.stringify(
      a
    )}   
${tokenList.length > 0 ? JSON.stringify(tokenList) : "[]"} 
   ${mintPrice}
 free.merchfinalpolicy001
 ${JSON.stringify(shortUrl)}
 ${parseFloat(royaltyFee)}
 ${JSON.stringify(royaltyAddress)}
 )`;
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
            [a, b, parseFloat(price1)]
          ),
          Pact.lang.mkCap(
            "Transfer",
            "Capability to allow coin transfer",
            "free.marketplacefinal002.REQUEST-COLLECTION ",
            [`${displayName}`]
          ),
        ],

        sender: a,
        gasLimit: 150000,
        chainId: CHAIN_ID,
        ttl: 28800,
        envData: {
          guards: guard,
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
          setModal(false);
          setLoading(true);
          const reqKey = await Pact.wallet.sendSigned(cmd, API_HOST);

          console.log(reqKey, "Reqkey");
          const signedtxx = await Pact.fetch.listen(
            { listen: reqKey.requestKeys[0] },
            API_HOST
          );
          console.log(signedtxx, "xxxxxxxxxxxxxx");
          if (signedtxx.result.status === "success") {
            submitAftrSign();
          }
        } else {
          setLoading(false);
          setModal(true);
        }
      } else {
        setLoading(false);
        setModal(true);
      }
    }

    if (walletName == "Xwallet") {
      const creationTime = () => Math.round(new Date().getTime() / 1000) - 15;
      // console.log("walletName", walletName);
      // // const nonce = Date.now().toString();
      // const accountName = walletAddress;
      // const publicKey = accountName.slice(2, accountName.length);
      // console.log("publicKeycw", publicKey);
      // console.log("accountnamecw", accountName);
      // const guard = { keys: [publicKey], pred: "keys-all" };

      // const a = accountName;

      //     const walletInfo = await window.kadena.request({
      //       method: "kda_checkStatus",
      //       networkId: NETWORK_ID,
      //     });

      //     console.log("wallet info", walletInfo);
      //     const p = walletInfo.account.account;
      //     console.log("wallet info", p);
      //     const guard = { keys: [publicKey], pred: "keys-all" };
      //     // const guard = { keys: [walletInfo.account.publicKey], pred: "keys-all" };

      //     // const guard = { keys: ["260fe7bca08c45c03d4fc5f3d0a7fafaa8d28d4a3c3db0b2158dd18725ab0586"], pred: "keys-all", }

      //     // const a = walletInfo.account.account;
      //     const a = accountName;

      //     const b =
      //       "k:56609bf9d1983f0c13aaf3bd3537fe00db65eb15160463bb641530143d4e9bcf";

      //     // const pactCode = `(free.marketplacefinal002.create-nft-collection "${displayName}" "${symbol}" ${totalSupply} (read-keyset "guard-test") ${JSON.stringify(accountName)} ${JSON.stringify(tokenList)} ${parseFloat(mintPrice)} free.merchfinalpolicy001 ${JSON.stringify(shortUrl)})`;
      //     const pactCode = `(free.marketplacefinal002.create-nft-collection  "${displayName}" "${symbol}" ${totalSupply} (read-keyset "account-ks") ${JSON.stringify(
      //       a
      //     )}
      //   ${tokenList.length > 0 ? JSON.stringify(tokenList) : "[]"}
      //    ${parseFloat(mintPrice)}
      //  free.merchfinalpolicy001
      //  ${JSON.stringify(shortUrl)}
      //  ${parseFloat(royaltyFee)}
      //  ${JSON.stringify(royaltyAddress)}
      //  )`;

      const XWalletRequest = {
        networkId: NETWORK_ID,
        signingCmd: {
          sender: a,
          chainId: CHAIN_ID,
          gasPrice: 0.0000001,
          gasLimit: 150000,
          ttl: 28800,
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
              [a, b, parseFloat(price1)]
            ),
            Pact.lang.mkCap(
              "Transfer",
              "Capability to allow coin transfer",
              "free.marketplacefinal002.REQUEST-COLLECTION ",
              [`${displayName}`]
            ),
          ],
          envData: {
            guards: guard,
          },
          pactCode: pactCode,
          networkId: NETWORK_ID,
          signingPubKey: publicKey,
          creationTime: creationTime(),
        },
      };

      try {
        const cmd = await window.kadena.request({
          method: "kda_requestSign",
          networkId: NETWORK_ID,
          data: XWalletRequest,
        });
        console.log("cmd", cmd);
        if (cmd.status === "success") {
          toast.success("Transaction Submitted", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setModal(false);
          setLoading(true);
          const gore2 = await Pact.wallet.sendSigned(cmd.signedCmd, API_HOST);
          console.log("sdsf", gore2);

          const txResult = await Pact.fetch.listen(
            { listen: `${gore2.requestKeys[0]}` },
            API_HOST
          );
          console.log("txn result", txResult);

          // const txResult1 = await Pact.fetch.listen({ listen: `${gore2}` }, API_HOST);
          // console.log("txn result", txResult1.result);
          console.log("Ssffs", txResult);
          if (txResult.result.status === "success") {
            setModal(false);
            setLoading(true);
            submitAftrSign();
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

            setLoading(false);
            setModal(true);
          }
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
          setLoading(false);
          setModal(true);
        }
      } catch (err) {
        toast.error(err, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setLoading(false);
        setModal(true);
        console.error(err);
      }
    }
  };

  const getFee = async () => {
    const accountName = walletAddress;
    const publicKey = accountName.slice(2, accountName.length);
    console.log("publicKeycw", publicKey);
    console.log("accountnamecw", accountName);
    const guard = { keys: [publicKey], pred: "keys-all" };

    const a = accountName;
    const signCmd = {
      pactCode: `(free.marketplacefinal002.get-fee "collection-creation")`,
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
      setPrice(datum);
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
      setPrice(0);
    }
  };

  useEffect(() => {
    getFee();
  }, []);

  console.log("price", price);

  const submitAftrSign = async () => {
    console.log(
      "formdatas",
      displayName,
      symbol,
      description,
      category,
      shortUrl,
      bannerUrl,
      image,
      totalSupply,
      mintPrice,
      tokenList,
      royaltyAddress,
      royaltyFee
    );
    const formData = new FormData();
    formData.append("collectionName", displayName);
    formData.append("tokenSymbol", symbol);
    formData.append("collectionInfo", description);
    formData.append("category", category);
    formData.append("collectionUrl", shortUrl);
    formData.append("bannerUrl", bannerUrl);
    formData.append("avatar", image);
    formData.append("totalSupply", totalSupply);
    formData.append("mintPrice", mintPrice);
    formData.append("tokenList", tokenList);
    formData.append("royaltyAddress", royaltyAddress);
    formData.append("royaltyFee", parseFloat(royaltyFee));

    Axios.post("/collection/saveCollection", formData, {
      headers: { authorization: localStorage.getItem("accessJWT") },
    })
      .then((response) => {
        setModal(false);
        setLoading(false);
        setRefresh(!refresh);
        window.location.reload();
        toast.success("New Collection Created", {
          position: "top-right",
        });
        navigate("/marketplace/my-profile-owned?tab=Collections");
        console.log("heyllo2", response);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const handleOnSubmit = () => {
    console.log("formdatas", displayName, symbol, description, category);
    if (displayName === "") {
      toast.error("Please enter collection name", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (symbol === "") {
      toast.error("Please enter token symbol", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (category === "") {
      toast.error("Please enter collection category", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (shortUrl === "") {
      toast.error("Please enter collection url", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (bannerUrl === "") {
      toast.error("Please enter banner url", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
      });
    } else if (image === "") {
      toast.error("Please upload collection image", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (totalSupply === "") {
      toast.error("Please enter total supply", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (mintPrice == 0) {
      toast.error("Please enter mint price", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (tokenList.length === 0) {
      toast.error("Please enter token list", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (tokenList.length != totalSupply) {
      toast.error("Please enter token list equal to total supply", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      royaltyFee == 0 ||
      royaltyFee == "" ||
      royaltyFee == null ||
      royaltyFee == undefined
    ) {
      toast.error("Please enter royalty fee in %", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
      });
    } else if (
      royaltyAddress == "" ||
      royaltyAddress == null ||
      royaltyAddress == undefined
    ) {
      toast.error("Please enter royalty address", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      create_col_one();
    }
  };
  console.log("image", image);
  console.log("mintPrice", parseFloat(mintPrice));
  console.log("totalSupply", parseInt(totalSupply));
  console.log("totalSupply", tokenList.length);
  console.log("royaltyFee", royaltyFee);

const uploadProperty = async () => {
  console.log("propertyFile", propertyFile);
  const formData = new FormData();
  formData.append("propertyFile", propertyFile);
  Axios.post("/properties/insertProperty", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      authorization: localStorage.getItem("accessJWT"),
    },
  })
    .then((response) => {
      console.log("heyllo2", response);
      if (response.data.status == "success") {
        toast.success("Property Uploaded", {
          position: "top-right",
        });
      } else {
        toast.error("Property Upload Failed", {
          position: "top-right",
        });
      }
    })
    .catch((error) => {
      console.log("error", error);
      toast.error("Property Upload Failed or Already Exists", {
        position: "top-right",
      });
    });
};


  useEffect(() => {
    if (propertyFile){
    uploadProperty();
    }
  }, [propertyFile]);

  return (
    <div className="modalOuterBx">
      <Button
        onClick={toggle}
        className={
          nightModeStatus ? "createCollectBtnDark" : "createCollectBtn"
        }
      >
        Create a collection
      </Button>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalBody>
          <div className="createColelctionOuter">
            <div className="createCollectionHd" style={{ color: "black" }}>
              Create Collection
            </div>
            <div className="collectionImg">
              <i>
                <img src={image ? URL.createObjectURL(image) : ""} alt="" />
              </i>
              <span style={{ color: "black" }}>
                We recommend an image of at least 300x300. Gifs work too. Max
                5mb.
              </span>
              <button>
                Choose File
                <input
                   type="file"
                   name="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </button>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <button>
                Upload Property
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setPropertyFile(e.target.files[0])}
                />
              </button>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Display name*
                </Label>
                <Input
                  type="email"
                  name="displayName"
                  value={displayName}
                  onChange={handleOnChange}
                  id="exampleEmail"
                  placeholder="Enter collection name"
                />
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Short Description*
                </Label>
                <Input
                  type="name"
                  name="description"
                  value={description}
                  onChange={handleOnChange}
                  id="exampleEmail"
                  placeholder="Enter short description"
                />
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Symbol*
                </Label>
                <Input
                  type="email"
                  name="symbol"
                  value={symbol}
                  onChange={handleOnChange}
                  id="exampleEmail"
                  placeholder="Enter token symbol"
                />
              </FormGroup>
            </div>
            {/* <div className='createFrmBx'>
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>Description</Label>
                <Input type="email" name="description" onChange={handleOnChange} value={description} id="exampleEmail" placeholder="Spread some words about your token collection" />
              </FormGroup>
            </div> */}
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Total Supply
                </Label>
                <Input
                  type="number"
                  name="totalSupply"
                  onChange={handleOnChange}
                  // value={totalSupply}
                  id="exampleEmail"
                  placeholder="Enter total supply"
                />
              </FormGroup>
            </div>

            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Token List
                </Label>
                <br />
                <span style={{ color: "black" }}>
                  Enter multiple tokens by separating them with a comma (,).
                </span>
                {/* <Input
                  type="email"
                  name="tokenList"
                  onChange={handleOnChange}
                  value={tokenList}
                  id="exampleEmail"
                  placeholder="Enter token list"
                /> */}
                <TagsInput
                  value={tokenList}
                  onlyUnique={true}
                  onChange={handleTokenList}
                  inputProps={{
                    placeholder: "Enter token list",
                  }}
                />
                <span style={{ color: "black" }}>
                  {tokenList.length} tokens added
                </span>
              </FormGroup>
            </div>

            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Mint Price
                </Label>
                <Input
                  type="number"
                  name="mintPrice"
                  min="0"
                  max="100"
                  required
                  step="0.01"
                  onChange={handleOnChange}
                  // value={amount}
                  id="exampleEmail"
                  placeholder="Enter mint price"
                />
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Royality Fee in %
                </Label>
                <Input
                  type="number"
                  name="royalityFee"
                  min="0"
                  max="100"
                  required
                  step="0.01"
                  onChange={handleOnChange}
                  // value={fee}
                  id="exampleEmail"
                  placeholder="Enter Royality Fee"
                />
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Royality Address
                </Label>
                <Input
                  type="email"
                  name="royalityAddress"
                  value={royaltyAddress}
                  onChange={handleOnChange}
                  id="exampleEmail"
                  placeholder="Enter Royality Address"
                />
              </FormGroup>
            </div>

            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleSelect" style={{ color: "black" }}>
                  Category
                </Label>
                <Input
                  type="select"
                  name="category"
                  value={category}
                  onChange={handleOnChange}
                  id="exampleSelect"
                >
                  {collectionCategory.map((data) => {
                    return <option>{data.collectionName}</option>;
                  })}
                </Input>
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Short url
                </Label>
                <Input
                  type="email"
                  name="shortUrl"
                  onChange={handleOnChange}
                  value={shortUrl}
                  id="exampleEmail"
                  placeholder="kyrptomerch.io/ Enter short url"
                />
              </FormGroup>
            </div>
            <div className="createFrmBx">
              <FormGroup>
                <Label for="exampleEmail" style={{ color: "black" }}>
                  Banner Url
                </Label>
                <Input
                  type="email"
                  name="bannerUrl"
                  onChange={handleOnChange}
                  value={bannerUrl}
                  id="exampleEmail"
                  placeholder="kyrptomerch.io/ Enter banner url"
                />
              </FormGroup>
            </div>
            <div className="collectionFrmBtn">
              <Button onClick={handleOnSubmit}>Create Collection</Button>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="collectionFooter">
          <Button className="closeModal" onClick={toggle}>
            x
          </Button>
        </ModalFooter>
      </Modal>
      {/* <Modal isOpen={loading}>
        <div style={{ textAlign: "center" }}>
          {" "}
          <SpinnerCircular />
        </div>
      </Modal> */}
      <div
        className="spinner"
        style={{
          display: loading ? "flex" : "none",
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
        {loading ? (
          <>
            <SpinnerCircular size={80} color="black" secondaryColor="red" />
          </>
        ) : null}
      </div>
    </div>
  );
};

export default ModalExample;

//  ["712dfabad6d640a7a23cfd1693c99787f37594aea4d809d76a2a8df1f292d6f7", "b715ecd0f2cfac28f907efb2e661424a890a9a2ffe861546dfc72992b4d04806", "9d63750242ff649af5ef832698099f4205caa74949fd3759abda19dfc77fe968",
//     "f57eedb66419ddbaec60539ce31e6ecefe8428f9a656c1aeddd9887a53025f3e", "98393529fdaf301c9207ab6fc5f66930320e9c4f6eeca885b04664c2a3438e97", "9c9ad6fa9cc3693f6d361370c2274783767f849c99289f260a4e1d95f0ab8fc3",
//     "f938318c6adb48954789b5724cb66240d0301b0e1ccede60f2e6b741eabf1202", "50b217e2638759c4c4066159219c05a8829c061100a9fefebac3f6b0529469a3", "4772a39c96578f47793b59b728c0b3711c796439e008945d2b73e9b96810809a",
//      "7868dbf0dba09b502c92c8e5bf60bfb7638fcdf37b9e95bf80daed4270161c9c", "4f5ff781d706257e07e842517aaae146467e96782fa8a0ccba9f643df3172921", "55bc5a95e03b2ab0b4e53ee612df944a05dbe7424b2c797991b4bae7f7697db2",
//      "9c525fdb747c818544335cf533df9faca1197b1d0ead564ad45d32411c17b96b", "gb35467609d878fabbd02dd17d4dd30b48eb20ed30bc7b57b6f57ff3ab86dcfc", "e12cb638177c4c0d03f523849553eb857aa6688cd8a5163b76540110fa7e9744",
//      "760fc652e6ccdb5dda6ee3dd1fc57cef8d167ef92936cef4d555a1530db83059", "d2dca100ffa08efdf98c625ccf6f406060b4040241aa13c2f121d05339151fb7", "5f47b9d97553b84b59468e640cbb47a245ae24e4dc2bd7baae68aae8ef93df9f",
//      "g97982c1396ff0921b6912863437b11251a0923359578c902268ed8b56e18b3a", "6451adc421325d2c89834102c12caa9df9a50c0699b3e979fc9b9fa847159f61"]
