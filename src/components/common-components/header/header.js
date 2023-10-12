import React, { useEffect, useState } from "react";
import { BsFillMoonFill, BsFillSunFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Switch from "react-switch";
import { Button } from "reactstrap";
import Moblogo from "../../../assets/LogoIcon.png";
import DarkLogo from "../../../assets/logo-white.svg";
import LightLogo from "../../../assets/logo.svg";
import ConnectPopup from "../../pages/home/connect-wallet-popup/connect-wallet-popup";
import Menu from "./menu";
import { nightModeStatusUpdate } from "./nightModeAction";

import "./header.scss";

export const Header = () => {
  const dispatch = useDispatch();
  const { nightModeStatus } = useSelector((state) => state.nightModeStatus);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    window.onscroll = function () {
      myFunction();
    };
    var header = document.getElementById("myHeader");
    var sticky = header.offsetTop;
    function myFunction() {
      if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
      } else {
        header.classList.remove("sticky");
      }
    }

    setChecked(nightModeStatus);
  }, []);

  useEffect(() => {
    if (checked) {
      document.body.classList.add("darkTheme");
      dispatch(nightModeStatusUpdate(checked));
    } else {
      document.body.classList.remove("darkTheme");
      dispatch(nightModeStatusUpdate(checked));
    }
  }, [checked]);
  // componentDidMount(){
  //     window.onscroll = function() {myFunction()};
  //     var header = document.getElementById("myHeader");
  //     var sticky = header.offsetTop;
  //     function myFunction() {
  //         if (window.pageYOffset > sticky) {
  //             header.classList.add("sticky");
  //         } else {
  //             header.classList.remove("sticky");
  //         }
  //     }
  // }

  const handleChange = (checked) => {
    setChecked(checked);
  };

  return (
    <>
      <header id="myHeader">
        <div className="container">
          <div className="hdrInn">
            <div className="logoBx">
              <Link to="/">
                <img src={LightLogo} alt="" className="webLogo logoblack" />
                <img src={Moblogo} alt="" className="MobLogo" />
                <img className="logowhite" src={DarkLogo} alt="" />
              </Link>
            </div>
            <div className="menuBx">
              <div className="Nav bold">
                <Menu />
              </div>
              <div className="hdrtokenBx">
                {/* <div className='butoknBx'><Link className='buytoken' to="/toknomics">Buy Token</Link></div> */}
                <div className="conPopupBtn">
                  <ConnectPopup />
                </div>
                {/* <div className='conPopupBtn'>
                                        <FormGroup>
                                            <Input type="select" name="select" id="exampleSelect">
                                                <option>Connect</option>
                                                <option>Disconnect</option>
                                            </Input>
                                        </FormGroup>
                                        <i><MdKeyboardArrowDown /></i>
                                    </div> */}

                {/* <div className='myaccountBx'><MarketplaceAccount /></div> */}
                <div className="darkmodeBtn">
                  <Button className="webModeBtn lightMode onChange={handleChange}">
                    <BsFillSunFill className="sunIcon" />
                    <BsFillMoonFill className="moonIcon" />
                  </Button>
                  <Switch
                    checked={checked}
                    onChange={handleChange}
                    onColor="#fa457c"
                    onHandleColor="#cc285a"
                    handleDiameter={0}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={10}
                    width={10}
                    className="react-switch"
                    id="material-switch"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};
