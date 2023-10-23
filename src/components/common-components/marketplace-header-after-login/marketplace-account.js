import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, CardBody } from "reactstrap";
import { RegisterationModal } from "../../common-components/registerationModal/registerationModal";
import { walletStatusUpdate } from "../../pages/home/connect-wallet-popup/connectWalletAction";
import { userRegisterSuccess } from "../../pages/home/connect-wallet-popup/connectWalletSlice";
import { logout } from "../../pages/home/connect-wallet-popup/loginSlice";
import ThemeButton from "./themebutton";

const MarketplaceAccount = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { walletStatus, walletAddress, walletName } = useSelector(
    (state) => state.walletStatus
  );

  const [userRegistered, setUserRegistered] = useState(false);
  const [collapse, setCollapse] = useState(false);
  const [modal2, setModal2] = useState(false);

  const toggle2 = () => {
    setModal2(!modal2);
  };

  useEffect(() => {
    checkUserRegisteration();
  }, []);

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

  const toggle = () => {
    setCollapse(!collapse);
  };

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

      navigate("/");
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

      navigate("/");
    }
    if (walletName == "Xwallet") {
      const checkNetwork = await window.kadena.request({
        method: "kda_getNetwork",
      });
      if (checkNetwork.name == "Mainnet") {
        const disconnects = await window.kadena.request({
          method: "kda_disconnect",
          networkId: "mainnet01",
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

        navigate("/");
      }
      if (checkNetwork.name == "Testnet") {
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
        } else {
          navigate("/");
        }
      }
    }
    dispatch(logout());
    localStorage.removeItem("accessJWT");
  };

  return (
    <div>
      <Button className="myaccountBtn dotsToggle " onClick={toggle}></Button>

      <div
        className={
          collapse
            ? "mpMyAccount marketplaceMenu open"
            : "mpMyAccount marketplaceMenu"
        }
      >
        <Card>
          <CardBody>
            <ThemeButton />
            <Button className="closeBtn" onClick={toggle}>
              x
            </Button>
            <div className="markMEnuList">
              <div className="myaccName bold">
                <i></i>
                {walletAddress.slice(0, 8)}...&nbsp;
              </div>
              <ul>
                {userRegistered ? (
                  <li>
                    <Link to="/marketplace/my-profile-owned" className="bold">
                      Profile
                    </Link>
                  </li>
                ) : (
                  <li>
                    <Link onClick={toggle2} className="bold">
                      Profile
                    </Link>
                  </li>
                )}
                {/* <li><Link to="/marketplace/my-profile-owned"  className='bold'>Profile</Link></li> */}
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
                  <Link to="" className="bold">
                    Settings
                  </Link>
                </li>
                <li onClick={disconnect}>
                  <a className="bold">Logout</a>
                </li>
              </ul>
            </div>
          </CardBody>
        </Card>
        <RegisterationModal toggle2={toggle2} modal2={modal2} />
      </div>
    </div>
  );
};
export default MarketplaceAccount;
